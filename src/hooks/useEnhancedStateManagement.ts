
import { useCallback } from 'react';
import { useComponentStateSlice } from './useComponentStateSlice';
import { useStateNormalization } from './performance/useStateNormalization';
import { useAdvancedMemoization } from './performance/useMemoization';
import { useBatchedUpdates } from './performance/useBatchedUpdates';
import { useStateCompression } from './performance/useStateCompression';
import { usePerformanceMonitoring } from './performance/usePerformanceMonitoring';

interface EnhancedStateConfig<T> {
  sliceId: string;
  initialState: T;
  normalizationKey?: string;
  enableCompression?: boolean;
  enableBatching?: boolean;
  enablePerformanceMonitoring?: boolean;
}

export const useEnhancedStateManagement = <T extends Record<string, any>>(
  config: EnhancedStateConfig<T>
) => {
  const {
    sliceId,
    initialState,
    normalizationKey,
    enableCompression = false,
    enableBatching = true,
    enablePerformanceMonitoring = true
  } = config;

  // Core state slice
  const stateSlice = useComponentStateSlice({
    sliceId,
    initialState,
    persistToSession: true,
    syncAcrossComponents: true,
    debugMode: enablePerformanceMonitoring
  });

  // Performance optimizations
  const { batchUpdate } = useBatchedUpdates({
    maxBatchSize: 10,
    batchDelay: 16,
    priority: 'normal',
    enableDeduplication: true
  });

  const { compress, decompress } = useStateCompression({
    algorithm: 'json',
    threshold: 1024,
    enableMetrics: enablePerformanceMonitoring
  });

  const { measureStateUpdate } = usePerformanceMonitoring();

  // State normalization (if array data is provided)
  const normalizationResult = useStateNormalization(
    Array.isArray(stateSlice.state[normalizationKey || 'items']) 
      ? stateSlice.state[normalizationKey || 'items'] 
      : [],
    {
      idKey: 'id',
      enableDeepNormalization: false,
      trackChanges: enablePerformanceMonitoring
    }
  );

  // Memoized state selectors
  const memoizedSelectors = useAdvancedMemoization(
    () => ({
      getAllItems: () => normalizationResult.denormalizedData,
      getItemById: (id: string) => normalizationResult.getEntityById(id),
      getItemsByIds: (ids: string[]) => normalizationResult.getEntitiesByIds(ids),
      getFilteredItems: (predicate: (item: any) => boolean) => 
        normalizationResult.denormalizedData.filter(predicate)
    }),
    [normalizationResult],
    {
      maxCacheSize: 50,
      ttl: 30000,
      enablePerformanceTracking: enablePerformanceMonitoring
    }
  );

  // Enhanced update function with performance optimizations
  const updateState = useCallback((updates: Partial<T>, source?: string) => {
    const updateFn = () => {
      let processedUpdates = updates;

      // Apply compression if enabled and data is large
      if (enableCompression && JSON.stringify(updates).length > 1024) {
        const compressionResult = compress(updates);
        console.log(`State compressed: ${compressionResult.compressionRatio.toFixed(2)}x reduction`);
        // In a real implementation, you might store the compressed data differently
      }

      stateSlice.updateState(processedUpdates, source);
    };

    if (enableBatching) {
      batchUpdate(updateFn, updates, 'normal');
    } else if (enablePerformanceMonitoring) {
      measureStateUpdate(updateFn, sliceId);
    } else {
      updateFn();
    }
  }, [
    stateSlice.updateState,
    enableCompression,
    enableBatching,
    enablePerformanceMonitoring,
    compress,
    batchUpdate,
    measureStateUpdate,
    sliceId
  ]);

  // Batch update function for multiple changes
  const batchUpdateState = useCallback((updateFn: (currentState: T) => Partial<T>, source?: string) => {
    const wrappedUpdateFn = () => {
      stateSlice.batchUpdate(updateFn, source);
    };

    if (enablePerformanceMonitoring) {
      measureStateUpdate(wrappedUpdateFn, `${sliceId}-batch`);
    } else {
      wrappedUpdateFn();
    }
  }, [stateSlice.batchUpdate, enablePerformanceMonitoring, measureStateUpdate, sliceId]);

  // Reset state with performance tracking
  const resetState = useCallback((source?: string) => {
    if (enablePerformanceMonitoring) {
      measureStateUpdate(() => stateSlice.resetState(source), `${sliceId}-reset`);
    } else {
      stateSlice.resetState(source);
    }
  }, [stateSlice.resetState, enablePerformanceMonitoring, measureStateUpdate, sliceId]);

  return {
    // State access
    state: stateSlice.state,
    
    // State updates
    updateState,
    batchUpdateState,
    resetState,
    
    // Normalized data access (if applicable)
    normalizedData: normalizationResult,
    
    // Memoized selectors
    selectors: memoizedSelectors,
    
    // Performance utilities
    createSelector: stateSlice.createSelector,
    
    // Meta information
    sliceId: stateSlice.sliceId
  };
};
