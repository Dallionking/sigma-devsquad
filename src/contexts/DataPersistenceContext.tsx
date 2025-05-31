import React, { createContext, useContext, ReactNode, useMemo, useState, useRef, useCallback } from 'react';
import { useSessionManager } from '@/hooks/useSessionManager';
import { useDataSync } from '@/hooks/useDataSync';
import { useBackupManager } from '@/hooks/useBackupManager';
import { useViewContextManager } from '@/hooks/useViewContextManager';
import { useEventBus } from '@/hooks/useEventBus';
import { useStateMiddleware } from '@/hooks/useStateMiddleware';
import { useStateDebugger } from '@/hooks/useStateDebugger';
import { usePerformanceMonitoring } from '@/hooks/performance/usePerformanceMonitoring';
import { useBatchedUpdates } from '@/hooks/performance/useBatchedUpdates';

interface DataPersistenceContextType {
  // Session management
  sessionData: any;
  updateActivity: () => void;
  updatePreferences: (key: string, value: any) => void;
  setUnsavedChanges: (hasChanges: boolean) => void;
  
  // Data synchronization
  isOnline: boolean;
  pendingSync: number;
  forceSync: () => void;
  clearSyncQueue: () => void;
  
  // Backup management
  backups: any[];
  createBackup: (name: string, data: Record<string, any>) => Promise<any>;
  restoreFromBackup: (backupId: string) => Promise<Record<string, any> | null>;
  
  // View context management
  saveViewContext: (view: string, context: any) => void;
  loadViewContext: (view: string) => any;
  currentView: string;
  
  // Cross-component communication
  eventBus: {
    subscribe: <T>(eventType: string, handler: (data: T) => void) => () => void;
    emit: <T>(eventType: string, data: T, source?: string) => void;
    getEventHistory: () => any[];
    getActiveListeners: () => Map<string, number>;
  };
  
  // State debugging
  debugger: {
    isCapturing: boolean;
    setIsCapturing: (capturing: boolean) => void;
    debugEntries: any[];
    clearDebugEntries: () => void;
    exportDebugData: () => void;
    getDebugStats: () => any;
  };
  
  // Middleware management
  middleware: {
    addMiddleware: (middleware: any, config: any) => void;
    removeMiddleware: (id: string) => void;
    enableMiddleware: (id: string, enabled: boolean) => void;
    getMiddlewareList: () => any[];
  };
  
  // Performance optimization
  performance: {
    monitoring: {
      startRenderMeasurement: (componentName: string) => void;
      endRenderMeasurement: (componentName: string) => void;
      measureMemoryUsage: () => void;
      measureStateUpdate: (updateFn: () => void, stateName: string) => void;
      getPerformanceSnapshot: () => any;
      metrics: any;
    };
    batching: {
      batchUpdate: <T>(updateFn: () => void, data?: T, priority?: 'low' | 'normal' | 'high') => string;
      flushBatch: () => void;
      getQueueStats: () => any;
      clearQueues: () => void;
    };
  };
  
  // Real-time collaboration
  collaboration: {
    presenceUsers: any[];
    sendPresence: (presence: any) => void;
    onConflictDetected: (callback: (conflict: any) => void) => () => void;
    resolveConflict: (conflictId: string, resolution: string, content?: string) => void;
    isTyping: (componentId: string, isTyping: boolean) => isTyping;
    getTypingUsers: (componentId: string) => any[];
  };

  // Enhanced persistent state management
  persistentState: {
    registerState: (stateKey: string, initialState: any, config?: any) => void;
    updateState: (stateKey: string, updates: any, source?: string) => void;
    getState: (stateKey: string) => any;
    clearError: (stateKey: string) => void;
    states: Map<string, any>;
    errors: Map<string, string>;
  };
}

const DataPersistenceContext = createContext<DataPersistenceContextType | undefined>(undefined);

export const useDataPersistence = () => {
  const context = useContext(DataPersistenceContext);
  if (context === undefined) {
    throw new Error('useDataPersistence must be used within a DataPersistenceProvider');
  }
  return context;
};

export const DataPersistenceProvider = ({ children }: { children: ReactNode }) => {
  // Core hooks - always call in the same order
  const sessionManager = useSessionManager();
  const dataSync = useDataSync({
    syncInterval: 30000,
    retryAttempts: 3,
    offlineMode: false
  });
  const backupManager = useBackupManager();
  const viewContextManager = useViewContextManager();
  const eventBus = useEventBus();
  const middleware = useStateMiddleware();
  const stateDebugger = useStateDebugger({
    maxEntries: 1000,
    captureStackTrace: false,
    autoCapture: true
  });
  const performanceMonitoring = usePerformanceMonitoring({
    maxRenderTime: 16,
    maxMemoryUsage: 50 * 1024 * 1024,
    maxStateUpdateTime: 5
  });
  const batchedUpdates = useBatchedUpdates({
    maxBatchSize: 10,
    batchDelay: 16,
    priority: 'normal',
    enableDeduplication: true
  });

  // Add persistent state management
  const [persistentStates, setPersistentStates] = useState<Map<string, any>>(new Map());
  const [stateErrors, setStateErrors] = useState<Map<string, string>>(new Map());

  // Add collaboration state
  const [conflicts, setConflicts] = useState<Map<string, any>>(new Map());
  const [typingUsers, setTypingUsers] = useState<Map<string, any[]>>(new Map());
  const conflictCallbacksRef = useRef<Set<(conflict: any) => void>>(new Set());

  // Enhanced state management functions
  const registerPersistentState = useCallback((stateKey: string, initialState: any, config?: any) => {
    setPersistentStates(prev => new Map(prev.set(stateKey, { 
      data: initialState, 
      config, 
      lastUpdate: Date.now() 
    })));
    
    eventBus.emit('state-registered', {
      stateKey,
      timestamp: Date.now()
    });
  }, [eventBus]);

  const updatePersistentState = useCallback((stateKey: string, updates: any, source = 'user') => {
    setPersistentStates(prev => {
      const current = prev.get(stateKey);
      if (!current) return prev;

      const updated = {
        ...current,
        data: { ...current.data, ...updates },
        lastUpdate: Date.now()
      };

      const newMap = new Map(prev);
      newMap.set(stateKey, updated);

      // Emit state update event
      eventBus.emit('persistent-state-update', {
        stateKey,
        data: updated.data,
        source,
        timestamp: Date.now()
      });

      return newMap;
    });
  }, [eventBus]);

  const getPersistentState = useCallback((stateKey: string) => {
    return persistentStates.get(stateKey)?.data;
  }, [persistentStates]);

  const clearStateError = useCallback((stateKey: string) => {
    setStateErrors(prev => {
      const newMap = new Map(prev);
      newMap.delete(stateKey);
      return newMap;
    });
  }, []);

  // Existing collaboration functions
  const onConflictDetected = (callback: (conflict: any) => void) => {
    conflictCallbacksRef.current.add(callback);
    return () => {
      conflictCallbacksRef.current.delete(callback);
    };
  };

  const resolveConflict = (conflictId: string, resolution: string, content?: string) => {
    conflicts.delete(conflictId);
    setConflicts(new Map(conflicts));
    
    // Send resolution update through event bus
    eventBus.emit('conflict-resolved', {
      conflictId,
      resolution,
      content,
      timestamp: new Date().toISOString()
    });
  };

  const isTyping = (componentId: string, isTyping: boolean) => {
    // Send typing indicator through event bus
    eventBus.emit('typing-indicator', {
      componentId,
      isTyping,
      userId: 'current-user',
      timestamp: new Date().toISOString()
    });
  };

  const getTypingUsers = (componentId: string) => {
    return typingUsers.get(componentId) || [];
  };

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo((): DataPersistenceContextType => ({
    // Session management
    sessionData: sessionManager.sessionData,
    updateActivity: sessionManager.updateActivity,
    updatePreferences: sessionManager.updatePreferences,
    setUnsavedChanges: sessionManager.setUnsavedChanges,
    
    // Data synchronization
    isOnline: dataSync.isOnline,
    pendingSync: dataSync.pendingSync,
    forceSync: dataSync.forceSync,
    clearSyncQueue: dataSync.clearSyncQueue,
    
    // Backup management
    backups: backupManager.backups,
    createBackup: backupManager.createBackup,
    restoreFromBackup: backupManager.restoreFromBackup,
    
    // View context management
    saveViewContext: viewContextManager.saveViewContext,
    loadViewContext: viewContextManager.loadViewContext,
    currentView: viewContextManager.currentView,
    
    // Cross-component communication
    eventBus: {
      subscribe: eventBus.subscribe,
      emit: eventBus.emit,
      getEventHistory: eventBus.getEventHistory,
      getActiveListeners: eventBus.getActiveListeners
    },
    
    // State debugging
    debugger: {
      isCapturing: stateDebugger.isCapturing,
      setIsCapturing: stateDebugger.setIsCapturing,
      debugEntries: stateDebugger.debugEntries,
      clearDebugEntries: stateDebugger.clearDebugEntries,
      exportDebugData: stateDebugger.exportDebugData,
      getDebugStats: stateDebugger.getDebugStats
    },
    
    // Middleware management
    middleware: {
      addMiddleware: middleware.addMiddleware,
      removeMiddleware: middleware.removeMiddleware,
      enableMiddleware: middleware.enableMiddleware,
      getMiddlewareList: middleware.getMiddlewareList
    },
    
    // Performance optimization
    performance: {
      monitoring: {
        startRenderMeasurement: performanceMonitoring.startRenderMeasurement,
        endRenderMeasurement: performanceMonitoring.endRenderMeasurement,
        measureMemoryUsage: performanceMonitoring.measureMemoryUsage,
        measureStateUpdate: performanceMonitoring.measureStateUpdate,
        getPerformanceSnapshot: performanceMonitoring.getPerformanceSnapshot,
        metrics: performanceMonitoring.metrics
      },
      batching: {
        batchUpdate: batchedUpdates.batchUpdate,
        flushBatch: batchedUpdates.flushBatch,
        getQueueStats: batchedUpdates.getQueueStats,
        clearQueues: batchedUpdates.clearQueues
      }
    },
    
    // Real-time collaboration
    collaboration: {
      presenceUsers: [], // This would be populated from WebSocket context
      sendPresence: (presence: any) => {
        eventBus.emit('presence-update', {
          ...presence,
          timestamp: new Date().toISOString()
        });
      },
      onConflictDetected,
      resolveConflict,
      isTyping,
      getTypingUsers
    },

    // Enhanced persistent state management
    persistentState: {
      registerState: registerPersistentState,
      updateState: updatePersistentState,
      getState: getPersistentState,
      clearError: clearStateError,
      states: persistentStates,
      errors: stateErrors
    }
  }), [
    sessionManager,
    dataSync,
    backupManager,
    viewContextManager,
    eventBus,
    middleware,
    stateDebugger,
    performanceMonitoring,
    batchedUpdates,
    conflicts,
    typingUsers,
    registerPersistentState,
    updatePersistentState,
    getPersistentState,
    clearStateError,
    persistentStates,
    stateErrors
  ]);

  return (
    <DataPersistenceContext.Provider value={value}>
      {children}
    </DataPersistenceContext.Provider>
  );
};
