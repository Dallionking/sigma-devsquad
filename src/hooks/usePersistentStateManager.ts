
import { useState, useEffect, useCallback, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

interface StateSnapshot<T> {
  id: string;
  timestamp: number;
  data: T;
  version: string;
  checksum: string;
  metadata: {
    source: string;
    description?: string;
    tags?: string[];
  };
}

interface PersistentStateConfig<T> {
  key: string;
  initialState: T;
  maxVersions?: number;
  autoSaveInterval?: number;
  enableCompression?: boolean;
  enableEncryption?: boolean;
  validationSchema?: (data: any) => boolean;
  errorRecoveryStrategy?: 'rollback' | 'merge' | 'ignore';
}

interface StateRecoveryInfo {
  hasCorruptedData: boolean;
  lastValidVersion?: StateSnapshot<any>;
  corruptionDetails?: string;
  suggestedAction: 'restore' | 'reset' | 'merge';
}

export const usePersistentStateManager = <T extends Record<string, any>>(
  config: PersistentStateConfig<T>
) => {
  const {
    key,
    initialState,
    maxVersions = 10,
    autoSaveInterval = 5000,
    enableCompression = false,
    enableEncryption = false,
    validationSchema,
    errorRecoveryStrategy = 'rollback'
  } = config;

  const [state, setState] = useState<T>(initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [recoveryInfo, setRecoveryInfo] = useState<StateRecoveryInfo | null>(null);
  const [versionHistory, setVersionHistory] = useState<StateSnapshot<T>[]>([]);
  
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout>();
  const saveQueueRef = useRef<Set<string>>(new Set());
  const { toast } = useToast();

  // Generate checksum for data integrity
  const generateChecksum = useCallback((data: any): string => {
    return btoa(JSON.stringify(data)).slice(0, 16);
  }, []);

  // Validate state data
  const validateState = useCallback((data: any): boolean => {
    if (validationSchema) {
      return validationSchema(data);
    }
    return typeof data === 'object' && data !== null;
  }, [validationSchema]);

  // Create state snapshot
  const createSnapshot = useCallback((data: T, metadata: StateSnapshot<T>['metadata']): StateSnapshot<T> => {
    return {
      id: `snapshot_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      data: JSON.parse(JSON.stringify(data)), // Deep clone
      version: '1.0.0',
      checksum: generateChecksum(data),
      metadata
    };
  }, [generateChecksum]);

  // Save state to storage with version history
  const saveState = useCallback(async (dataToSave: T, metadata?: Partial<StateSnapshot<T>['metadata']>) => {
    setIsSaving(true);
    
    try {
      const snapshot = createSnapshot(dataToSave, {
        source: metadata?.source || 'auto-save',
        description: metadata?.description,
        tags: metadata?.tags
      });

      // Validate data before saving
      if (!validateState(dataToSave)) {
        throw new Error('State validation failed');
      }

      // Save current state
      localStorage.setItem(`state_${key}`, JSON.stringify(snapshot));

      // Update version history
      const updatedHistory = [snapshot, ...versionHistory].slice(0, maxVersions);
      setVersionHistory(updatedHistory);
      localStorage.setItem(`state_history_${key}`, JSON.stringify(updatedHistory));

      setLastSaved(new Date());
      setRecoveryInfo(null);

      console.log(`State saved for key: ${key}, snapshot ID: ${snapshot.id}`);
    } catch (error) {
      console.error('Failed to save state:', error);
      toast({
        title: "Save Failed",
        description: `Failed to save state: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsSaving(false);
    }
  }, [key, createSnapshot, validateState, versionHistory, maxVersions, toast]);

  // Load state with error recovery
  const loadState = useCallback((): T => {
    try {
      // Load current state
      const stored = localStorage.getItem(`state_${key}`);
      if (!stored) {
        console.log(`No stored state found for key: ${key}`);
        return initialState;
      }

      const snapshot: StateSnapshot<T> = JSON.parse(stored);
      
      // Validate checksum
      const expectedChecksum = generateChecksum(snapshot.data);
      if (snapshot.checksum !== expectedChecksum) {
        throw new Error('Data integrity check failed - corrupted state detected');
      }

      // Validate state structure
      if (!validateState(snapshot.data)) {
        throw new Error('State validation failed - invalid state structure');
      }

      console.log(`State loaded for key: ${key}, snapshot ID: ${snapshot.id}`);
      return snapshot.data;
    } catch (error) {
      console.error('Failed to load state:', error);
      return handleStateRecovery(error instanceof Error ? error.message : 'Unknown error');
    }
  }, [key, initialState, generateChecksum, validateState]);

  // Handle state recovery
  const handleStateRecovery = useCallback((errorDetails: string): T => {
    try {
      // Try to load version history
      const historyData = localStorage.getItem(`state_history_${key}`);
      if (historyData) {
        const history: StateSnapshot<T>[] = JSON.parse(historyData);
        const lastValidSnapshot = history.find(snapshot => {
          try {
            const checksum = generateChecksum(snapshot.data);
            return snapshot.checksum === checksum && validateState(snapshot.data);
          } catch {
            return false;
          }
        });

        if (lastValidSnapshot) {
          setRecoveryInfo({
            hasCorruptedData: true,
            lastValidVersion: lastValidSnapshot,
            corruptionDetails: errorDetails,
            suggestedAction: 'restore'
          });

          if (errorRecoveryStrategy === 'rollback') {
            toast({
              title: "Data Recovered",
              description: `Restored from backup version: ${new Date(lastValidSnapshot.timestamp).toLocaleString()}`,
            });
            return lastValidSnapshot.data;
          }
        }
      }

      // Fallback to initial state
      setRecoveryInfo({
        hasCorruptedData: true,
        corruptionDetails: errorDetails,
        suggestedAction: 'reset'
      });

      toast({
        title: "Data Recovery",
        description: "State corrupted, restored to default configuration",
        variant: "destructive"
      });

      return initialState;
    } catch (recoveryError) {
      console.error('Recovery failed:', recoveryError);
      return initialState;
    }
  }, [key, generateChecksum, validateState, errorRecoveryStrategy, initialState, toast]);

  // Load version history
  const loadVersionHistory = useCallback(() => {
    try {
      const historyData = localStorage.getItem(`state_history_${key}`);
      if (historyData) {
        const history: StateSnapshot<T>[] = JSON.parse(historyData);
        setVersionHistory(history);
      }
    } catch (error) {
      console.error('Failed to load version history:', error);
      setVersionHistory([]);
    }
  }, [key]);

  // Auto-save functionality
  const scheduleAutoSave = useCallback(() => {
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    autoSaveTimeoutRef.current = setTimeout(() => {
      if (!isSaving && saveQueueRef.current.has('auto-save')) {
        saveState(state, { source: 'auto-save' });
        saveQueueRef.current.delete('auto-save');
      }
    }, autoSaveInterval);
  }, [autoSaveInterval, isSaving, saveState, state]);

  // Update state with automatic saving
  const updateState = useCallback((updates: Partial<T> | ((prev: T) => T), source?: string) => {
    setState(prevState => {
      const newState = typeof updates === 'function' 
        ? updates(prevState)
        : { ...prevState, ...updates };
      
      // Queue auto-save
      saveQueueRef.current.add('auto-save');
      scheduleAutoSave();
      
      return newState;
    });
  }, [scheduleAutoSave]);

  // Force save
  const forceSave = useCallback((description?: string) => {
    return saveState(state, { 
      source: 'manual', 
      description: description || 'Manual save'
    });
  }, [saveState, state]);

  // Restore from version
  const restoreFromVersion = useCallback((snapshotId: string) => {
    const snapshot = versionHistory.find(s => s.id === snapshotId);
    if (!snapshot) {
      throw new Error('Snapshot not found');
    }

    setState(snapshot.data);
    toast({
      title: "Version Restored",
      description: `Restored to version from ${new Date(snapshot.timestamp).toLocaleString()}`
    });
  }, [versionHistory, toast]);

  // Clear recovery info
  const clearRecoveryInfo = useCallback(() => {
    setRecoveryInfo(null);
  }, []);

  // Initialize on mount
  useEffect(() => {
    const loadedState = loadState();
    setState(loadedState);
    loadVersionHistory();
    setIsLoading(false);
  }, [loadState, loadVersionHistory]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, []);

  return {
    // State management
    state,
    updateState,
    isLoading,
    isSaving,
    lastSaved,

    // Manual operations
    forceSave,
    loadState,

    // Version management
    versionHistory,
    restoreFromVersion,

    // Error recovery
    recoveryInfo,
    clearRecoveryInfo,

    // Utilities
    createSnapshot,
    validateState
  };
};
