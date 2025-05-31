
import React, { createContext, useContext, ReactNode } from 'react';
import { useSessionManager } from '@/hooks/useSessionManager';
import { useDataSync } from '@/hooks/useDataSync';
import { useBackupManager } from '@/hooks/useBackupManager';
import { useViewContextManager } from '@/hooks/useViewContextManager';

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
    currentView: viewContextManager.currentView
  };

  return (
    <DataPersistenceContext.Provider value={value}>
      {children}
    </DataPersistenceContext.Provider>
  );
};
