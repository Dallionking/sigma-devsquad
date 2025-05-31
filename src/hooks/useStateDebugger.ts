
import { useState, useEffect, useCallback, useRef } from 'react';
import { useEventBus } from './useEventBus';

interface StateDebugEntry {
  id: string;
  timestamp: number;
  type: 'state-update' | 'event' | 'selector-update' | 'component-mount' | 'component-unmount';
  source: string;
  data: any;
  stackTrace?: string;
}

interface DebuggerConfig {
  maxEntries: number;
  captureStackTrace: boolean;
  filterTypes?: string[];
  autoCapture: boolean;
}

export const useStateDebugger = (config: DebuggerConfig = {
  maxEntries: 1000,
  captureStackTrace: false,
  autoCapture: true
}) => {
  const [debugEntries, setDebugEntries] = useState<StateDebugEntry[]>([]);
  const [isCapturing, setIsCapturing] = useState(config.autoCapture);
  const [filters, setFilters] = useState<string[]>(config.filterTypes || []);
  const entryIdRef = useRef(0);

  const { subscribe, getEventHistory, getActiveListeners } = useEventBus();

  // Add debug entry
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

  // Subscribe to various events for debugging
  useEffect(() => {
    if (!isCapturing) return;

    const unsubscribers: Array<() => void> = [];

    // Subscribe to state slice updates
    unsubscribers.push(
      subscribe('state-slice-update', (data) => {
        addDebugEntry('state-update', `slice:${data.sliceId}`, data);
      })
    );

    // Subscribe to state selector updates
    unsubscribers.push(
      subscribe('state-selector-update', (data) => {
        addDebugEntry('selector-update', `selector:${data.label}`, data);
      })
    );

    // Subscribe to generic events
    unsubscribers.push(
      subscribe('debug-event', (data) => {
        addDebugEntry('event', data.source || 'unknown', data);
      })
    );

    return () => {
      unsubscribers.forEach(unsub => unsub());
    };
  }, [isCapturing, subscribe, addDebugEntry]);

  // Manual debug logging
  const log = useCallback((source: string, data: any, type: StateDebugEntry['type'] = 'event') => {
    addDebugEntry(type, source, data);
  }, [addDebugEntry]);

  // Clear debug entries
  const clearDebugEntries = useCallback(() => {
    setDebugEntries([]);
  }, []);

  // Export debug data
  const exportDebugData = useCallback(() => {
    const debugData = {
      entries: debugEntries,
      eventHistory: getEventHistory(),
      activeListeners: Object.fromEntries(getActiveListeners()),
      timestamp: Date.now(),
      config
    };

    const blob = new Blob([JSON.stringify(debugData, null, 2)], {
      type: 'application/json'
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `state-debug-${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [debugEntries, getEventHistory, getActiveListeners, config]);

  // Get debug statistics
  const getDebugStats = useCallback(() => {
    const stats = {
      totalEntries: debugEntries.length,
      byType: {} as Record<string, number>,
      bySource: {} as Record<string, number>,
      timeRange: {
        earliest: debugEntries.length > 0 ? debugEntries[0].timestamp : null,
        latest: debugEntries.length > 0 ? debugEntries[debugEntries.length - 1].timestamp : null
      }
    };

    debugEntries.forEach(entry => {
      stats.byType[entry.type] = (stats.byType[entry.type] || 0) + 1;
      stats.bySource[entry.source] = (stats.bySource[entry.source] || 0) + 1;
    });

    return stats;
  }, [debugEntries]);

  // Filter entries
  const getFilteredEntries = useCallback((
    typeFilter?: string[],
    sourceFilter?: string[],
    timeRange?: { start: number; end: number }
  ) => {
    return debugEntries.filter(entry => {
      if (typeFilter && !typeFilter.includes(entry.type)) return false;
      if (sourceFilter && !sourceFilter.some(source => entry.source.includes(source))) return false;
      if (timeRange && (entry.timestamp < timeRange.start || entry.timestamp > timeRange.end)) return false;
      return true;
    });
  }, [debugEntries]);

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

// Component lifecycle debugging hook
export const useComponentLifecycleDebugger = (componentName: string) => {
  const { log } = useStateDebugger();

  useEffect(() => {
    log(componentName, { action: 'mount' }, 'component-mount');

    return () => {
      log(componentName, { action: 'unmount' }, 'component-unmount');
    };
  }, [componentName, log]);

  const logUpdate = useCallback((updateData: any) => {
    log(componentName, { action: 'update', data: updateData }, 'state-update');
  }, [componentName, log]);

  return { logUpdate };
};
