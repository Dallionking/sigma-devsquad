
import React, { createContext, useContext, ReactNode, useState, useCallback } from 'react';
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

interface PerformanceMetrics {
  averageRenderTime?: number;
  memoryUsage?: number;
  renderTime?: number;
  stateUpdateTime?: number;
  networkRequestTime?: number;
}

interface BatchingStats {
  total: number;
  pending: number;
  completed: number;
}

interface PerformanceMonitoring {
  metrics?: PerformanceMetrics;
  getPerformanceSnapshot: () => PerformanceMetrics;
  measureMemoryUsage: () => void;
}

interface PerformanceBatching {
  getQueueStats: () => BatchingStats;
  flushBatch: () => void;
}

interface PerformanceData {
  monitoring: PerformanceMonitoring;
  batching: PerformanceBatching;
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

export const DataPersistenceProvider = ({ children }: { children: ReactNode }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingSync, setPendingSync] = useState(0);
  const [backups, setBackups] = useState<BackupData[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics>({
    averageRenderTime: 12,
    memoryUsage: 1024 * 1024 * 50, // 50MB
    renderTime: 12,
    stateUpdateTime: 3,
    networkRequestTime: 150
  });
  const [batchingStats, setBatchingStats] = useState<BatchingStats>({
    total: 0,
    pending: 0,
    completed: 0
  });

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

  // Performance monitoring methods
  const getPerformanceSnapshot = useCallback(() => {
    // Simulate performance measurement
    const newMetrics = {
      ...performanceMetrics,
      renderTime: Math.random() * 20 + 5,
      stateUpdateTime: Math.random() * 10 + 1,
      networkRequestTime: Math.random() * 300 + 50,
      memoryUsage: performanceMetrics.memoryUsage + (Math.random() - 0.5) * 1024 * 1024
    };
    setPerformanceMetrics(newMetrics);
    return newMetrics;
  }, [performanceMetrics]);

  const measureMemoryUsage = useCallback(() => {
    // Simulate memory measurement
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      const newMetrics = {
        ...performanceMetrics,
        memoryUsage: memory.usedJSHeapSize
      };
      setPerformanceMetrics(newMetrics);
    } else {
      // Fallback simulation
      const newMetrics = {
        ...performanceMetrics,
        memoryUsage: Math.random() * 100 * 1024 * 1024 // Random value up to 100MB
      };
      setPerformanceMetrics(newMetrics);
    }
  }, [performanceMetrics]);

  // Batching methods
  const getQueueStats = useCallback(() => {
    return batchingStats;
  }, [batchingStats]);

  const flushBatch = useCallback(() => {
    setBatchingStats(prev => ({
      ...prev,
      pending: 0,
      completed: prev.total
    }));
  }, []);

  // Create performance system
  const performanceSystem: PerformanceData = {
    monitoring: {
      metrics: performanceMetrics,
      getPerformanceSnapshot,
      measureMemoryUsage
    },
    batching: {
      getQueueStats,
      flushBatch
    }
  };

  return (
    <DataPersistenceContext.Provider value={{
      sessionData,
      updateSessionData,
      clearSessionData,
      isOnline,
      pendingSync,
      forceSync,
      clearSyncQueue,
      performance: performanceSystem,
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
