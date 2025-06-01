
import { useState, useEffect, useCallback } from 'react';

interface PersistenceConfig {
  key: string;
  storage?: 'localStorage' | 'sessionStorage';
  debounceMs?: number;
  syncToCloud?: boolean;
}

export const usePersistenceManager = <T,>(
  initialData: T,
  config: PersistenceConfig
) => {
  const { key, storage = 'sessionStorage', debounceMs = 300, syncToCloud = false } = config;
  const storageObject = storage === 'localStorage' ? localStorage : sessionStorage;
  const [isLoading, setIsLoading] = useState(true);

  // Initialize state with data from storage or initial data
  const [data, setData] = useState<T>(() => {
    try {
      const stored = storageObject.getItem(key);
      if (stored) {
        console.info(`Data loaded from ${storage} with key: ${key}`);
        setIsLoading(false);
        return JSON.parse(stored);
      }
    } catch (error) {
      console.warn(`Failed to load data from ${storage}:`, error);
    }
    setIsLoading(false);
    return initialData;
  });

  // Debounced save function
  const saveData = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (dataToSave: T) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          try {
            storageObject.setItem(key, JSON.stringify(dataToSave));
            console.info(`Data saved to ${storage} with key: ${key}`);
            
            if (syncToCloud) {
              // Simulate cloud sync
              console.info(`Syncing to cloud for key: ${key}`);
            }
          } catch (error) {
            console.warn(`Failed to save data to ${storage}:`, error);
          }
        }, debounceMs);
      };
    })(),
    [key, storage, debounceMs, storageObject, syncToCloud]
  );

  // Update data function that also persists
  const updateData = useCallback((newData: T | ((prev: T) => T)) => {
    setData(prev => {
      const updated = typeof newData === 'function' ? (newData as (prev: T) => T)(prev) : newData;
      saveData(updated);
      return updated;
    });
  }, [saveData]);

  // Force save function
  const forceSave = useCallback(() => {
    try {
      storageObject.setItem(key, JSON.stringify(data));
      console.info(`Data force saved to ${storage} with key: ${key}`);
      
      if (syncToCloud) {
        console.info(`Force syncing to cloud for key: ${key}`);
      }
    } catch (error) {
      console.warn(`Failed to force save data to ${storage}:`, error);
    }
  }, [key, storage, storageObject, data, syncToCloud]);

  // Save to storage when data changes (but not on initial load)
  useEffect(() => {
    if (!isLoading) {
      const isInitialLoad = JSON.stringify(data) === JSON.stringify(initialData);
      if (!isInitialLoad) {
        saveData(data);
      }
    }
  }, [data, saveData, initialData, isLoading]);

  return {
    data,
    setData,
    updateData,
    isLoading,
    forceSave,
    clearData: useCallback(() => {
      storageObject.removeItem(key);
      setData(initialData);
    }, [key, storageObject, initialData])
  };
};
