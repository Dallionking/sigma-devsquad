
import React, { createContext, useContext, ReactNode, useState } from 'react';
import { usePersistenceManager } from '@/hooks/usePersistenceManager';

interface AppSessionData {
  lastActiveView: string;
  userPreferences: {
    theme: string;
    sidebarCollapsed: boolean;
    viewMode: string;
  };
  projectData: any;
}

interface PerformanceData {
  monitoring: {
    metrics?: {
      averageRenderTime?: number;
      memoryUsage?: number;
    };
  };
}

interface BackupData {
  id: string;
  timestamp: number;
  data: any;
}

interface DataPersistenceContextType {
  sessionData: AppSessionData;
  updateSessionData: (data: AppSessionData | ((prev: AppSessionData) => AppSessionData)) => void;
  clearSessionData: () => void;
  isOnline: boolean;
  pendingSync: number;
  forceSync: () => void;
  clearSyncQueue: () => void;
  performance: PerformanceData;
  backups: BackupData[];
  restoreFromBackup: (backupId: string) => void;
}

const DataPersistenceContext = createContext<DataPersistenceContextType | undefined>(undefined);

const defaultSessionData: AppSessionData = {
  lastActiveView: 'workflow',
  userPreferences: {
    theme: 'system',
    sidebarCollapsed: false,
    viewMode: 'workflow'
  },
  projectData: null
};

const defaultPerformanceData: PerformanceData = {
  monitoring: {
    metrics: {
      averageRenderTime: 12,
      memoryUsage: 1024 * 1024 * 50 // 50MB
    }
  }
};

export const DataPersistenceProvider = ({ children }: { children: ReactNode }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingSync, setPendingSync] = useState(0);
  const [backups, setBackups] = useState<BackupData[]>([]);

  const {
    data: sessionData,
    updateData: updateSessionData,
    clearData: clearSessionData
  } = usePersistenceManager(defaultSessionData, {
    key: 'app-session',
    storage: 'sessionStorage',
    debounceMs: 500
  });

  // Simulate online/offline status
  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const forceSync = React.useCallback(() => {
    if (!isOnline) return;
    
    setPendingSync(3); // Simulate pending sync items
    
    // Simulate sync process
    const syncTimeout = setTimeout(() => {
      setPendingSync(0);
    }, 2000);

    return () => clearTimeout(syncTimeout);
  }, [isOnline]);

  const clearSyncQueue = React.useCallback(() => {
    setPendingSync(0);
  }, []);

  const restoreFromBackup = React.useCallback((backupId: string) => {
    const backup = backups.find(b => b.id === backupId);
    if (backup) {
      updateSessionData(backup.data);
    }
  }, [backups, updateSessionData]);

  return (
    <DataPersistenceContext.Provider value={{
      sessionData,
      updateSessionData,
      clearSessionData,
      isOnline,
      pendingSync,
      forceSync,
      clearSyncQueue,
      performance: defaultPerformanceData,
      backups,
      restoreFromBackup
    }}>
      {children}
    </DataPersistenceContext.Provider>
  );
};

export const useDataPersistence = () => {
  const context = useContext(DataPersistenceContext);
  if (context === undefined) {
    throw new Error('useDataPersistence must be used within a DataPersistenceProvider');
  }
  return context;
};
