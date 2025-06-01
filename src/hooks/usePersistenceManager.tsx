
import { useState, useEffect, useCallback } from 'react';

interface PersistenceConfig {
  key: string;
  storage?: 'localStorage' | 'sessionStorage';
  debounceMs?: number;
}

export const usePersistenceManager = <T,>(
  initialData: T,
  config: PersistenceConfig
) => {
  const { key, storage = 'sessionStorage', debounceMs = 300 } = config;
  const storageObject = storage === 'localStorage' ? localStorage : sessionStorage;

  // Initialize state with data from storage or initial data
  const [data, setData] = useState<T>(() => {
    try {
      const stored = storageObject.getItem(key);
      if (stored) {
        console.info(`Data loaded from ${storage} with key: ${key}`);
        return JSON.parse(stored);
      }
    } catch (error) {
      console.warn(`Failed to load data from ${storage}:`, error);
    }
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
          } catch (error) {
            console.warn(`Failed to save data to ${storage}:`, error);
          }
        }, debounceMs);
      };
    })(),
    [key, storage, debounceMs, storageObject]
  );

  // Update data function that also persists
  const updateData = useCallback((newData: T | ((prev: T) => T)) => {
    setData(prev => {
      const updated = typeof newData === 'function' ? (newData as (prev: T) => T)(prev) : newData;
      saveData(updated);
      return updated;
    });
  }, [saveData]);

  // Save to storage when data changes (but not on initial load)
  useEffect(() => {
    // Only save if data has actually changed from initial state
    const isInitialLoad = JSON.stringify(data) === JSON.stringify(initialData);
    if (!isInitialLoad) {
      saveData(data);
    }
  }, [data, saveData, initialData]);

  return {
    data,
    updateData,
    clearData: useCallback(() => {
      storageObject.removeItem(key);
      setData(initialData);
    }, [key, storageObject, initialData])
  };
};
