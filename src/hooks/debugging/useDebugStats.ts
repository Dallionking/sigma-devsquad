
import { useCallback } from 'react';
import { useEventBus } from '../useEventBus';
import { StateDebugEntry, DebugStats, DebuggerConfig } from './types';

export const useDebugStats = (
  debugEntries: StateDebugEntry[],
  config: DebuggerConfig
) => {
  const { getEventHistory, getActiveListeners } = useEventBus();

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

  const getDebugStats = useCallback((): DebugStats => {
    const stats: DebugStats = {
      totalEntries: debugEntries.length,
      byType: {},
      bySource: {},
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
    exportDebugData,
    getDebugStats,
    getFilteredEntries
  };
};
