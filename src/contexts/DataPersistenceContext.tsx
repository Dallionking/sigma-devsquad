
import React, { createContext, useContext, ReactNode } from 'react';
import { useSessionManager } from '@/hooks/useSessionManager';
import { useDataSync } from '@/hooks/useDataSync';
import { useBackupManager } from '@/hooks/useBackupManager';
import { useViewContextManager } from '@/hooks/useViewContextManager';
import { useEventBus } from '@/hooks/useEventBus';
import { useStateMiddleware } from '@/hooks/useStateMiddleware';
import { useStateDebugger } from '@/hooks/useStateDebugger';

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
  const sessionManager = useSessionManager();
  const dataSync = useDataSync({
    syncInterval: 30000,
    retryAttempts: 3,
    offlineMode: false
  });
  const backupManager = useBackupManager();
  const viewContextManager = useViewContextManager();
  
  // New communication system hooks
  const eventBus = useEventBus();
  const middleware = useStateMiddleware();
  const stateDebugger = useStateDebugger({
    maxEntries: 1000,
    captureStackTrace: false,
    autoCapture: true
  });

  const value: DataPersistenceContextType = {
    // Session management
    sessionData: sessionManager.sessionData,
    updateActivity: sessionManager.updateActivity,
    updatePreferences: sessionManager.updatePreferences,
    setUnsavedChanges: sessionManager.setUnsavedChanges,
    
    // Data synchronization
    isOnline: dataSync.isOnline,
    pendingSync: dataSync.pendingSync,
    forceSync: dataSync.forceSync,
    
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
    }
  };

  return (
    <DataPersistenceContext.Provider value={value}>
      {children}
    </DataPersistenceContext.Provider>
  );
};
