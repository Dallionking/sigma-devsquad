
import { useMemo, useRef, useCallback } from 'react';
import { useEventBus } from '../useEventBus';

interface MemoizationConfig {
  maxCacheSize?: number;
  ttl?: number; // Time to live in milliseconds
  enablePerformanceTracking?: boolean;
}

interface CacheEntry<T> {
  value: T;
  timestamp: number;
  hitCount: number;
}

// Advanced memoization hook with cache management
export const useAdvancedMemoization = <T>(
  computeFn: () => T,
  dependencies: any[],
  config: MemoizationConfig = {}
): T => {
  const { maxCacheSize = 100, ttl = 5 * 60 * 1000, enablePerformanceTracking = false } = config;
  const { emit } = useEventBus();
  const cacheRef = useRef(new Map<string, CacheEntry<T>>());
  const metricsRef = useRef({ hits: 0, misses: 0, computeTime: 0 });

  return useMemo(() => {
    const startTime = performance.now();
    const cacheKey = JSON.stringify(dependencies);
    const cache = cacheRef.current;
    const now = Date.now();

    // Check if cached value exists and is still valid
    const cached = cache.get(cacheKey);
    if (cached && (!ttl || (now - cached.timestamp) < ttl)) {
      cached.hitCount++;
      metricsRef.current.hits++;
      
      if (enablePerformanceTracking) {
        emit('memoization-hit', {
          cacheKey,
          hitCount: cached.hitCount,
          age: now - cached.timestamp
        });
      }
      
      return cached.value;
    }

    // Compute new value
    const value = computeFn();
    const computeTime = performance.now() - startTime;
    
    // Cache management - remove oldest entries if cache is full
    if (cache.size >= maxCacheSize) {
      const oldestKey = cache.keys().next().value;
      cache.delete(oldestKey);
    }

    // Store in cache
    cache.set(cacheKey, {
      value,
      timestamp: now,
      hitCount: 0
    });

    // Update metrics
    metricsRef.current.misses++;
    metricsRef.current.computeTime += computeTime;

    if (enablePerformanceTracking) {
      emit('memoization-miss', {
        cacheKey,
        computeTime,
        cacheSize: cache.size
      });
    }

    return value;
  }, dependencies);
};

// Selector memoization with normalization support
export const useMemoizedSelector = <TState, TResult>(
  state: TState,
  selector: (state: TState) => TResult,
  equalityFn?: (prev: TResult, next: TResult) => boolean
): TResult => {
  const defaultEqualityFn = useCallback((prev: TResult, next: TResult) => {
    // Deep comparison for objects and arrays
    return JSON.stringify(prev) === JSON.stringify(next);
  }, []);

  const equalityCheck = equalityFn || defaultEqualityFn;
  const previousResult = useRef<TResult>();

  return useMemo(() => {
    const result = selector(state);
    
    if (previousResult.current === undefined || !equalityCheck(previousResult.current, result)) {
      previousResult.current = result;
    }
    
    return previousResult.current;
  }, [state, selector, equalityCheck]);
};

// Batch computation memoization
export const useBatchMemoization = <T, R>(
  items: T[],
  computeFn: (item: T) => R,
  batchSize: number = 10
): R[] => {
  return useMemo(() => {
    const results: R[] = [];
    
    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      const batchResults = batch.map(computeFn);
      results.push(...batchResults);
    }
    
    return results;
  }, [items, computeFn, batchSize]);
};

// Cache statistics hook
export const useMemoizationStats = () => {
  const { subscribe } = useEventBus();
  const statsRef = useRef({
    totalHits: 0,
    totalMisses: 0,
    averageComputeTime: 0,
    cacheEfficiency: 0
  });

  subscribe('memoization-hit', (data: any) => {
    statsRef.current.totalHits++;
    updateEfficiency();
  });

  subscribe('memoization-miss', (data: any) => {
    statsRef.current.totalMisses++;
    statsRef.current.averageComputeTime = 
      (statsRef.current.averageComputeTime + data.computeTime) / 2;
    updateEfficiency();
  });

  const updateEfficiency = () => {
    const total = statsRef.current.totalHits + statsRef.current.totalMisses;
    statsRef.current.cacheEfficiency = total > 0 ? 
      (statsRef.current.totalHits / total) * 100 : 0;
  };

  return statsRef.current;
};
