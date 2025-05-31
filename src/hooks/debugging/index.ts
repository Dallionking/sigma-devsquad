
import { useState, useCallback } from 'react';
import { DebuggerConfig, PerformanceMetrics, ValidationError } from './types';
import { useDebugEntry } from './useDebugEntry';
import { useDebugEventSubscriptions } from './useDebugEventSubscriptions';
import { useDebugStats } from './useDebugStats';

export * from './types';
export { useComponentLifecycleDebugger } from './useComponentLifecycleDebugger';

export const useStateDebugger = (config: DebuggerConfig = {
  maxEntries: 1000,
  captureStackTrace: false,
  autoCapture: true
}) => {
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics>({
    renderTime: 0,
    updateCount: 0,
    memoryUsage: 0,
    stateUpdateTime: 0
  });
  
  const [stateValidationErrors, setStateValidationErrors] = useState<ValidationError[]>([]);

  const {
    debugEntries,
    isCapturing,
    setIsCapturing,
    filters,
    setFilters,
    addDebugEntry,
    clearDebugEntries,
    log
  } = useDebugEntry(config);

  const {
    exportDebugData,
    getDebugStats,
    getFilteredEntries
  } = useDebugStats(debugEntries, config);

  useDebugEventSubscriptions(isCapturing, addDebugEntry);

  const subscribeToDebugEvents = useCallback(() => {
    // Mock implementation for subscribing to debug events
    console.log('Subscribing to debug events for slice:', config.sliceId);
  }, [config.sliceId]);

  const clearDebugHistory = useCallback(() => {
    clearDebugEntries();
    setStateValidationErrors([]);
  }, [clearDebugEntries]);

  return {
    // Use debugEntries as debugHistory for compatibility
    debugHistory: debugEntries,
    debugEntries,
    performanceMetrics,
    stateValidationErrors,
    isCapturing,
    setIsCapturing,
    filters,
    setFilters,
    log,
    subscribeToDebugEvents,
    exportDebugData,
    clearDebugHistory,
    clearDebugEntries,
    getDebugStats,
    getFilteredEntries,
    addDebugEntry
  };
};
