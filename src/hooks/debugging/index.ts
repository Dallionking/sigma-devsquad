
import { DebuggerConfig } from './types';
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

  return {
    debugEntries,
    isCapturing,
    setIsCapturing,
    filters,
    setFilters,
    log,
    clearDebugEntries,
    exportDebugData,
    getDebugStats,
    getFilteredEntries,
    addDebugEntry
  };
};
