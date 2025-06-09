import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface SyncConfig {
  endpoint?: string;
  syncInterval: number;
  retryAttempts: number;
  offlineMode: boolean;
}

interface SyncItem {
  id: string;
  data: any;
  timestamp: number;
  action: 'create' | 'update' | 'delete';
  synced: boolean;
}

export const useDataSync = (config: SyncConfig) => {
  const [syncQueue, setSyncQueue] = useState<SyncItem[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const { toast } = useToast();

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Load sync queue from localStorage
  useEffect(() => {
    const savedQueue = localStorage.getItem('sync-queue');
    if (savedQueue) {
      try {
        setSyncQueue(JSON.parse(savedQueue));
      } catch (error) {
        console.error('Failed to load sync queue:', error);
      }
    }
  }, []);

  // Save sync queue to localStorage
  useEffect(() => {
    localStorage.setItem('sync-queue', JSON.stringify(syncQueue));
  }, [syncQueue]);

  // Add item to sync queue
  const addToSyncQueue = useCallback((data: any, action: 'create' | 'update' | 'delete') => {
    const syncItem: SyncItem = {
      id: `${action}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      data,
      timestamp: Date.now(),
      action,
      synced: false
    };

    setSyncQueue(prev => [...prev, syncItem]);

    if (isOnline && !config.offlineMode) {
      syncData();
    }
  }, [isOnline, config.offlineMode]);

  // Sync data to server (placeholder implementation)
  const syncData = useCallback(async () => {
    if (isSyncing || syncQueue.length === 0) return;

    setIsSyncing(true);
    
    try {
      const unsyncedItems = syncQueue.filter(item => !item.synced);
      
      // Simulate API sync (replace with actual API calls)
      for (const item of unsyncedItems) {
        console.log(`Syncing ${item.action} operation:`, item.data);
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Mark as synced
        setSyncQueue(prev => 
          prev.map(queueItem => 
            queueItem.id === item.id 
              ? { ...queueItem, synced: true }
              : queueItem
          )
        );
      }

      setLastSync(new Date());
      
      // Clean up old synced items (keep last 50)
      setSyncQueue(prev => {
        const sorted = prev.sort((a, b) => b.timestamp - a.timestamp);
        return sorted.slice(0, 50);
      });

      if (unsyncedItems.length > 0) {
        toast({
          title: "Data Synchronized",
          description: `${unsyncedItems.length} items synced successfully`
        });
      }
    } catch (error) {
      console.error('Sync failed:', error);
      toast({
        title: "Sync Failed",
        description: "Failed to synchronize data. Will retry when online.",
        variant: "destructive"
      });
    } finally {
      setIsSyncing(false);
    }
  }, [isSyncing, syncQueue, toast]);

  // Auto-sync when online
  useEffect(() => {
    if (isOnline && syncQueue.some(item => !item.synced)) {
      syncData();
    }
  }, [isOnline, syncData, syncQueue]);

  // Periodic sync
  useEffect(() => {
    if (!config.offlineMode) {
      const interval = setInterval(() => {
        if (isOnline && syncQueue.some(item => !item.synced)) {
          syncData();
        }
      }, config.syncInterval);

      return () => clearInterval(interval);
    }
  }, [config.offlineMode, config.syncInterval, isOnline, syncData, syncQueue]);

  // Force sync
  const forceSync = useCallback(() => {
    if (isOnline) {
      return syncData();
    } else {
      toast({
        title: "Offline Mode",
        description: "Cannot sync while offline. Changes will sync when online.",
        variant: "destructive"
      });
    }
  }, [isOnline, syncData, toast]);

  // Clear sync queue
  const clearSyncQueue = useCallback(() => {
    setSyncQueue([]);
    localStorage.removeItem('sync-queue');
  }, []);

  return {
    syncQueue,
    isOnline,
    lastSync,
    isSyncing,
    addToSyncQueue,
    forceSync,
    clearSyncQueue,
    pendingSync: syncQueue.filter(item => !item.synced).length
  };
};
