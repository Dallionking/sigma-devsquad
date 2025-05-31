
import { useEffect, useCallback, useRef } from 'react';
import { useEventBus } from './useEventBus';

interface StateSyncConfig {
  stateKey: string;
  syncScope?: 'global' | 'component' | 'session';
  conflictResolution?: 'latest-wins' | 'merge' | 'prompt-user';
  enableOptimisticUpdates?: boolean;
}

interface StateUpdate<T> {
  stateKey: string;
  data: T;
  timestamp: number;
  source: string;
  version: number;
  checksum: string;
}

interface StateConflict<T> {
  id: string;
  localData: T;
  remoteData: T;
  timestamp: number;
  conflictType: 'concurrent-edit' | 'version-mismatch';
}

export const useStateSynchronization = <T>(
  currentState: T,
  onStateUpdate: (newState: T, source: string) => void,
  config: StateSyncConfig
) => {
  const { stateKey, syncScope = 'global', conflictResolution = 'latest-wins', enableOptimisticUpdates = true } = config;
  const { emit, subscribe } = useEventBus();
  
  const lastUpdateRef = useRef<number>(0);
  const versionRef = useRef<number>(0);
  const pendingUpdatesRef = useRef<Map<string, StateUpdate<T>>>(new Map());

  // Generate checksum for conflict detection
  const generateChecksum = useCallback((data: T): string => {
    return btoa(JSON.stringify(data)).slice(0, 12);
  }, []);

  // Broadcast state changes to other components
  const broadcastStateChange = useCallback((newState: T, source: string) => {
    const update: StateUpdate<T> = {
      stateKey,
      data: newState,
      timestamp: Date.now(),
      source,
      version: ++versionRef.current,
      checksum: generateChecksum(newState)
    };

    lastUpdateRef.current = update.timestamp;

    emit('state-sync-update', update);
    console.log(`Broadcasting state update for ${stateKey} from ${source}`);
  }, [stateKey, emit, generateChecksum]);

  // Handle incoming state updates
  const handleIncomingUpdate = useCallback((update: StateUpdate<T>) => {
    // Ignore our own updates
    if (update.source === 'local' || update.timestamp <= lastUpdateRef.current) {
      return;
    }

    // Check for conflicts
    const currentChecksum = generateChecksum(currentState);
    const hasLocalChanges = currentChecksum !== update.checksum;
    
    if (hasLocalChanges && conflictResolution === 'prompt-user') {
      const conflict: StateConflict<T> = {
        id: `conflict_${Date.now()}`,
        localData: currentState,
        remoteData: update.data,
        timestamp: update.timestamp,
        conflictType: 'concurrent-edit'
      };

      emit('state-sync-conflict', { stateKey, conflict });
      return;
    }

    // Handle conflict resolution
    let resolvedState: T;
    
    switch (conflictResolution) {
      case 'latest-wins':
        resolvedState = update.data;
        break;
      case 'merge':
        resolvedState = { ...currentState, ...update.data };
        break;
      default:
        resolvedState = update.data;
    }

    // Apply optimistic updates if enabled
    if (enableOptimisticUpdates) {
      pendingUpdatesRef.current.set(update.source, update);
      setTimeout(() => {
        pendingUpdatesRef.current.delete(update.source);
      }, 1000);
    }

    onStateUpdate(resolvedState, update.source);
    lastUpdateRef.current = update.timestamp;
    
    console.log(`Applied state update for ${stateKey} from ${update.source}`);
  }, [currentState, generateChecksum, conflictResolution, stateKey, emit, onStateUpdate, enableOptimisticUpdates]);

  // Subscribe to state updates
  useEffect(() => {
    const unsubscribe = subscribe<StateUpdate<T>>('state-sync-update', (update) => {
      if (update.stateKey === stateKey) {
        handleIncomingUpdate(update);
      }
    });

    return unsubscribe;
  }, [subscribe, stateKey, handleIncomingUpdate]);

  // Handle state conflicts
  const resolveConflict = useCallback((conflictId: string, resolution: 'local' | 'remote' | 'merge', mergedData?: T) => {
    emit('state-sync-conflict-resolved', {
      conflictId,
      resolution,
      mergedData,
      stateKey
    });
  }, [emit, stateKey]);

  // Get sync status
  const getSyncStatus = useCallback(() => {
    const pendingCount = pendingUpdatesRef.current.size;
    const lastSync = lastUpdateRef.current;
    
    return {
      isPending: pendingCount > 0,
      pendingCount,
      lastSync: lastSync ? new Date(lastSync) : null,
      currentVersion: versionRef.current
    };
  }, []);

  return {
    broadcastStateChange,
    resolveConflict,
    getSyncStatus,
    syncScope,
    stateKey
  };
};
