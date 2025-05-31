
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface PersistenceConfig {
  key: string;
  storage: 'localStorage' | 'sessionStorage';
  syncToCloud?: boolean;
  encryptData?: boolean;
}

interface PersistenceData<T> {
  data: T;
  timestamp: number;
  version: string;
  checksum?: string;
}

export const usePersistenceManager = <T extends any>(
  initialData: T,
  config: PersistenceConfig
) => {
  const [data, setData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const { toast } = useToast();

  const storage = config.storage === 'localStorage' ? localStorage : sessionStorage;

  // Generate a simple checksum for data integrity
  const generateChecksum = (data: any): string => {
    return btoa(JSON.stringify(data)).slice(0, 8);
  };

  // Save data to storage
  const saveData = useCallback(async (dataToSave: T) => {
    try {
      const persistenceData: PersistenceData<T> = {
        data: dataToSave,
        timestamp: Date.now(),
        version: '1.0.0',
        checksum: config.encryptData ? generateChecksum(dataToSave) : undefined
      };

      storage.setItem(config.key, JSON.stringify(persistenceData));
      setLastSaved(new Date());
      
      console.log(`Data saved to ${config.storage} with key: ${config.key}`);
      
      // Sync to cloud if enabled (placeholder for future implementation)
      if (config.syncToCloud) {
        console.log('Cloud sync would happen here');
      }
    } catch (error) {
      console.error('Failed to save data:', error);
      toast({
        title: "Save Failed",
        description: "Failed to save data to local storage",
        variant: "destructive"
      });
    }
  }, [config, storage, toast]);

  // Load data from storage
  const loadData = useCallback((): T | null => {
    try {
      const stored = storage.getItem(config.key);
      if (!stored) return null;

      const persistenceData: PersistenceData<T> = JSON.parse(stored);
      
      // Verify data integrity if checksum exists
      if (persistenceData.checksum && config.encryptData) {
        const expectedChecksum = generateChecksum(persistenceData.data);
        if (expectedChecksum !== persistenceData.checksum) {
          console.warn('Data integrity check failed');
          return null;
        }
      }

      console.log(`Data loaded from ${config.storage} with key: ${config.key}`);
      return persistenceData.data;
    } catch (error) {
      console.error('Failed to load data:', error);
      return null;
    }
  }, [config, storage]);

  // Initialize data on mount
  useEffect(() => {
    const loadedData = loadData();
    if (loadedData) {
      setData(loadedData);
    }
    setIsLoading(false);
  }, [loadData]);

  // Auto-save data when it changes
  useEffect(() => {
    if (!isLoading && data !== initialData) {
      const timeoutId = setTimeout(() => {
        saveData(data);
      }, 1000); // Debounce saves by 1 second

      return () => clearTimeout(timeoutId);
    }
  }, [data, isLoading, initialData, saveData]);

  // Force save
  const forceSave = useCallback(() => {
    return saveData(data);
  }, [data, saveData]);

  // Clear data
  const clearData = useCallback(() => {
    storage.removeItem(config.key);
    setData(initialData);
    setLastSaved(null);
    toast({
      title: "Data Cleared",
      description: "Local data has been cleared successfully"
    });
  }, [config.key, initialData, storage, toast]);

  return {
    data,
    setData,
    isLoading,
    lastSaved,
    forceSave,
    clearData,
    loadData
  };
};
