
import { useState, useCallback, useRef } from 'react';
import { StateDebugEntry, DebuggerConfig } from './types';

export const useDebugEntry = (config: DebuggerConfig) => {
  const [debugEntries, setDebugEntries] = useState<StateDebugEntry[]>([]);
  const [isCapturing, setIsCapturing] = useState(config.autoCapture);
  const [filters, setFilters] = useState<string[]>(config.filterTypes || []);
  const entryIdRef = useRef(0);

  const addDebugEntry = useCallback((
    type: StateDebugEntry['type'],
    source: string,
    data: any
  ) => {
    if (!isCapturing) return;

    if (filters.length > 0 && !filters.includes(type)) return;

    const entry: StateDebugEntry = {
      id: `debug_${++entryIdRef.current}`,
      timestamp: Date.now(),
      type,
      source,
      data: JSON.parse(JSON.stringify(data)), // Deep clone to prevent mutations
      stackTrace: config.captureStackTrace ? new Error().stack : undefined
    };

    setDebugEntries(prev => {
      const newEntries = [...prev, entry];
      return newEntries.slice(-config.maxEntries);
    });
  }, [isCapturing, filters, config.captureStackTrace, config.maxEntries]);

  const clearDebugEntries = useCallback(() => {
    setDebugEntries([]);
  }, []);

  const log = useCallback((source: string, data: any, type: StateDebugEntry['type'] = 'event') => {
    addDebugEntry(type, source, data);
  }, [addDebugEntry]);

  return {
    debugEntries,
    isCapturing,
    setIsCapturing,
    filters,
    setFilters,
    addDebugEntry,
    clearDebugEntries,
    log
  };
};
