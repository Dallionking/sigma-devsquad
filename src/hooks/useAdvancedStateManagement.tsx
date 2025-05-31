
import { useState, useEffect, useCallback, useRef } from 'react';
import { useSessionManager } from './useSessionManager';
import { useDataSync } from './useDataSync';
import { useOptimisticUpdatesManager } from './useOptimisticUpdatesManager';
import { useToast } from '@/hooks/use-toast';

interface StateSnapshot<T> {
  id: string;
  data: T;
  timestamp: Date;
  version: string;
  description?: string;
  checksum: string;
}

interface StateRecoveryOptions {
  maxSnapshots: number;
  autoSaveInterval: number;
  enableErrorRecovery: boolean;
  enableVersionHistory: boolean;
}

interface StateValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export const useAdvancedStateManagement = <T extends Record<string, any>>(
  initialState: T,
  stateKey: string,
  options: StateRecoveryOptions = {
    maxSnapshots: 10,
    autoSaveInterval: 30000,
    enableErrorRecovery: true,
    enableVersionHistory: true
  }
) => {
  const [state, setState] = useState<T>(initialState);
  const [snapshots, setSnapshots] = useState<StateSnapshot<T>[]>([]);
  const [isRecovering, setIsRecovering] = useState(false);
  const [lastError, setLastError] = useState<Error | null>(null);
  const [operationInProgress, setOperationInProgress] = useState(false);
  
  const sessionManager = useSessionManager();
  const dataSync = useDataSync({
    syncInterval: 30000,
    retryAttempts: 3,
    offlineMode: false
  });
  const optimisticUpdates = useOptimisticUpdatesManager();
  const { toast } = useToast();
  
  const stateRef = useRef<T>(state);
  const errorCountRef = useRef(0);
  const autoSaveTimerRef = useRef<NodeJS.Timeout>();

  // Update ref when state changes
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Generate checksum for data integrity
  const generateChecksum = useCallback((data: T): string => {
    try {
      return btoa(JSON.stringify(data)).slice(0, 16);
    } catch (error) {
      console.warn('Failed to generate checksum:', error);
      return 'invalid';
    }
  }, []);

  // Validate state integrity
  const validateState = useCallback((data: T): StateValidationResult => {
    const result: StateValidationResult = {
      isValid: true,
      errors: [],
      warnings: []
    };

    try {
      // Basic validation
      if (!data || typeof data !== 'object') {
        result.isValid = false;
        result.errors.push('State must be a valid object');
        return result;
      }

      // Check for circular references
      JSON.stringify(data);

      // Custom validation based on state structure
      if ('agents' in data && !Array.isArray(data.agents)) {
        result.warnings.push('Agents should be an array');
      }

      if ('tasks' in data && !Array.isArray(data.tasks)) {
        result.warnings.push('Tasks should be an array');
      }

    } catch (error) {
      result.isValid = false;
      result.errors.push(`Validation error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    return result;
  }, []);

  // Create state snapshot
  const createSnapshot = useCallback((description?: string): StateSnapshot<T> => {
    const snapshot: StateSnapshot<T> = {
      id: `snapshot-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      data: JSON.parse(JSON.stringify(stateRef.current)),
      timestamp: new Date(),
      version: `v${snapshots.length + 1}`,
      description,
      checksum: generateChecksum(stateRef.current)
    };

    setSnapshots(prev => {
      const newSnapshots = [snapshot, ...prev].slice(0, options.maxSnapshots);
      
      // Save to session storage
      try {
        sessionStorage.setItem(`${stateKey}-snapshots`, JSON.stringify(newSnapshots));
      } catch (error) {
        console.warn('Failed to save snapshots:', error);
      }
      
      return newSnapshots;
    });

    return snapshot;
  }, [stateKey, snapshots.length, options.maxSnapshots, generateChecksum]);

  // Restore from snapshot
  const restoreFromSnapshot = useCallback(async (snapshotId: string): Promise<boolean> => {
    setOperationInProgress(true);
    
    try {
      const snapshot = snapshots.find(s => s.id === snapshotId);
      if (!snapshot) {
        throw new Error('Snapshot not found');
      }

      // Validate snapshot data
      const validation = validateState(snapshot.data);
      if (!validation.isValid) {
        throw new Error(`Invalid snapshot data: ${validation.errors.join(', ')}`);
      }

      // Verify checksum
      const currentChecksum = generateChecksum(snapshot.data);
      if (currentChecksum !== snapshot.checksum) {
        throw new Error('Snapshot data integrity check failed');
      }

      setState(snapshot.data);
      sessionManager.updateActivity();
      
      toast({
        title: "State Restored",
        description: `Successfully restored from ${snapshot.version}${snapshot.description ? `: ${snapshot.description}` : ''}`
      });

      return true;
    } catch (error) {
      console.error('Failed to restore from snapshot:', error);
      setLastError(error instanceof Error ? error : new Error('Unknown error'));
      
      toast({
        title: "Restore Failed",
        description: error instanceof Error ? error.message : 'Failed to restore state',
        variant: "destructive"
      });

      return false;
    } finally {
      setOperationInProgress(false);
    }
  }, [snapshots, validateState, generateChecksum, setState, sessionManager, toast]);

  // Auto-recovery mechanism
  const attemptRecovery = useCallback(async (): Promise<boolean> => {
    if (isRecovering) return false;
    
    setIsRecovering(true);
    
    try {
      console.log('Attempting state recovery...');
      
      // Try to restore from the most recent valid snapshot
      for (const snapshot of snapshots) {
        const validation = validateState(snapshot.data);
        if (validation.isValid) {
          const success = await restoreFromSnapshot(snapshot.id);
          if (success) {
            console.log('Successfully recovered from snapshot:', snapshot.version);
            errorCountRef.current = 0;
            return true;
          }
        }
      }

      // If no valid snapshots, try to restore from session storage
      try {
        const savedState = sessionStorage.getItem(stateKey);
        if (savedState) {
          const parsedState = JSON.parse(savedState);
          const validation = validateState(parsedState);
          
          if (validation.isValid) {
            setState(parsedState);
            console.log('Recovered from session storage');
            errorCountRef.current = 0;
            return true;
          }
        }
      } catch (error) {
        console.warn('Failed to recover from session storage:', error);
      }

      // Last resort: reset to initial state
      setState(initialState);
      createSnapshot('Emergency reset to initial state');
      console.log('Reset to initial state as last resort');
      
      toast({
        title: "State Reset",
        description: "State was reset to initial values due to recovery failure",
        variant: "destructive"
      });

      return true;
    } catch (error) {
      console.error('Recovery failed:', error);
      return false;
    } finally {
      setIsRecovering(false);
    }
  }, [isRecovering, snapshots, validateState, restoreFromSnapshot, stateKey, setState, initialState, createSnapshot, toast]);

  // Enhanced state update with error handling
  const updateState = useCallback((
    updater: T | ((prevState: T) => T),
    description?: string,
    isOptimistic: boolean = false
  ) => {
    if (operationInProgress) {
      console.warn('State update skipped: operation in progress');
      return;
    }

    try {
      const newState = typeof updater === 'function' ? updater(stateRef.current) : updater;
      
      // Validate new state
      const validation = validateState(newState);
      if (!validation.isValid) {
        throw new Error(`Invalid state update: ${validation.errors.join(', ')}`);
      }

      if (isOptimistic) {
        // Handle optimistic update
        const originalState = stateRef.current;
        const updateId = optimisticUpdates.createOptimisticUpdate(
          'state-update',
          { description, newState },
          () => setState(newState),
          () => setState(originalState)
        );
        
        // Add to sync queue for eventual consistency
        dataSync.addToSyncQueue({ 
          type: 'state_update', 
          stateKey, 
          data: newState,
          updateId
        }, 'update');
      } else {
        setState(newState);
        
        // Create snapshot for significant changes
        if (description) {
          createSnapshot(description);
        }
        
        // Update session activity
        sessionManager.updateActivity();
        sessionManager.setUnsavedChanges(true);
      }

      // Reset error count on successful update
      errorCountRef.current = 0;
      setLastError(null);

    } catch (error) {
      console.error('State update failed:', error);
      setLastError(error instanceof Error ? error : new Error('Unknown error'));
      errorCountRef.current += 1;

      // Attempt recovery if too many errors
      if (options.enableErrorRecovery && errorCountRef.current >= 3) {
        console.warn('Multiple state errors detected, attempting recovery...');
        attemptRecovery();
      }

      toast({
        title: "Update Failed",
        description: error instanceof Error ? error.message : 'Failed to update state',
        variant: "destructive"
      });
    }
  }, [
    operationInProgress,
    validateState,
    optimisticUpdates,
    dataSync,
    stateKey,
    setState,
    createSnapshot,
    sessionManager,
    options.enableErrorRecovery,
    attemptRecovery,
    toast
  ]);

  // Auto-save mechanism
  useEffect(() => {
    if (options.autoSaveInterval > 0) {
      autoSaveTimerRef.current = setInterval(() => {
        if (!operationInProgress && !isRecovering) {
          try {
            sessionStorage.setItem(stateKey, JSON.stringify(stateRef.current));
            console.log(`Auto-saved state for ${stateKey}`);
          } catch (error) {
            console.warn('Auto-save failed:', error);
          }
        }
      }, options.autoSaveInterval);

      return () => {
        if (autoSaveTimerRef.current) {
          clearInterval(autoSaveTimerRef.current);
        }
      };
    }
  }, [stateKey, options.autoSaveInterval, operationInProgress, isRecovering]);

  // Load snapshots on mount
  useEffect(() => {
    try {
      const savedSnapshots = sessionStorage.getItem(`${stateKey}-snapshots`);
      if (savedSnapshots) {
        setSnapshots(JSON.parse(savedSnapshots));
      }
    } catch (error) {
      console.warn('Failed to load snapshots:', error);
    }
  }, [stateKey]);

  // Force save
  const forceSave = useCallback(() => {
    createSnapshot('Manual save');
    sessionManager.forceSave();
  }, [createSnapshot, sessionManager]);

  return {
    state,
    updateState,
    snapshots,
    createSnapshot,
    restoreFromSnapshot,
    attemptRecovery,
    forceSave,
    isRecovering,
    operationInProgress,
    lastError,
    hasUnsavedChanges: sessionManager.sessionData.unsavedChanges,
    validateState,
    
    // Optimistic updates
    optimisticUpdates: {
      hasPending: optimisticUpdates.hasPendingUpdates,
      pendingCount: optimisticUpdates.pendingCount,
      rollback: optimisticUpdates.rollbackWithConfirmation
    },
    
    // Sync status
    sync: {
      isOnline: dataSync.isOnline,
      pendingSync: dataSync.pendingSync,
      forceSync: dataSync.forceSync
    }
  };
};
