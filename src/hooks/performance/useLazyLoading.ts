
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useEventBus } from '../useEventBus';

interface LazyLoadConfig<T> {
  pageSize: number;
  preloadPages?: number;
  loadThreshold?: number;
  enableVirtualization?: boolean;
  cachePages?: boolean;
}

interface LazyLoadState<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  hasMore: boolean;
  loadedPages: Set<number>;
}

// Lazy loading with pagination and virtualization
export const useLazyLoading = <T>(
  dataSource: T[] | (() => Promise<T[]>),
  config: LazyLoadConfig<T>
) => {
  const {
    pageSize,
    preloadPages = 1,
    loadThreshold = 0.8,
    enableVirtualization = false,
    cachePages = true
  } = config;
  
  const { emit } = useEventBus();
  const [state, setState] = useState<LazyLoadState<T>>({
    items: [],
    currentPage: 0,
    totalPages: 0,
    isLoading: false,
    hasMore: true,
    loadedPages: new Set()
  });

  const cache = useMemo(() => new Map<number, T[]>(), []);

  // Load data for a specific page
  const loadPage = useCallback(async (page: number) => {
    if (state.loadedPages.has(page) && cachePages) {
      return cache.get(page) || [];
    }

    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const startTime = performance.now();
      let allData: T[];

      if (typeof dataSource === 'function') {
        allData = await dataSource();
      } else {
        allData = dataSource;
      }

      const startIndex = page * pageSize;
      const endIndex = startIndex + pageSize;
      const pageData = allData.slice(startIndex, endIndex);
      
      if (cachePages) {
        cache.set(page, pageData);
      }

      const loadTime = performance.now() - startTime;
      
      emit('lazy-load-performance', {
        page,
        itemCount: pageData.length,
        loadTime,
        cacheHit: state.loadedPages.has(page),
        timestamp: Date.now()
      });

      setState(prev => ({
        ...prev,
        loadedPages: new Set([...prev.loadedPages, page]),
        isLoading: false,
        totalPages: Math.ceil(allData.length / pageSize)
      }));

      return pageData;
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, [dataSource, pageSize, cache, cachePages, state.loadedPages, emit]);

  // Load next page
  const loadNextPage = useCallback(async () => {
    const nextPage = state.currentPage + 1;
    const pageData = await loadPage(nextPage);
    
    setState(prev => ({
      ...prev,
      items: [...prev.items, ...pageData],
      currentPage: nextPage,
      hasMore: pageData.length === pageSize
    }));
  }, [state.currentPage, loadPage, pageSize]);

  // Preload pages ahead
  const preloadNextPages = useCallback(async () => {
    const pagesToPreload = [];
    for (let i = 1; i <= preloadPages; i++) {
      const pageToPreload = state.currentPage + i;
      if (!state.loadedPages.has(pageToPreload)) {
        pagesToPreload.push(pageToPreload);
      }
    }

    await Promise.all(pagesToPreload.map(loadPage));
  }, [state.currentPage, state.loadedPages, preloadPages, loadPage]);

  // Check if we should load more based on scroll position
  const shouldLoadMore = useCallback((scrollTop: number, clientHeight: number, scrollHeight: number) => {
    const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;
    return scrollPercentage >= loadThreshold && state.hasMore && !state.isLoading;
  }, [loadThreshold, state.hasMore, state.isLoading]);

  // Initialize loading
  useEffect(() => {
    if (state.items.length === 0 && !state.isLoading) {
      loadNextPage();
    }
  }, [loadNextPage, state.items.length, state.isLoading]);

  // Preload pages when current page changes
  useEffect(() => {
    if (state.currentPage > 0) {
      preloadNextPages();
    }
  }, [state.currentPage, preloadNextPages]);

  // Virtual items for virtualization
  const virtualItems = useMemo(() => {
    if (!enableVirtualization) return state.items;

    // Simple virtualization - only show items around current viewport
    const visibleStart = Math.max(0, state.currentPage * pageSize - pageSize);
    const visibleEnd = Math.min(state.items.length, visibleStart + pageSize * 3);
    
    return state.items.slice(visibleStart, visibleEnd);
  }, [state.items, state.currentPage, pageSize, enableVirtualization]);

  return {
    items: enableVirtualization ? virtualItems : state.items,
    allItems: state.items,
    isLoading: state.isLoading,
    hasMore: state.hasMore,
    currentPage: state.currentPage,
    totalPages: state.totalPages,
    loadNextPage,
    shouldLoadMore,
    loadPage,
    clearCache: () => cache.clear()
  };
};

// Lazy component loading
export const useLazyComponent = <T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  fallback?: React.ComponentType
) => {
  const [Component, setComponent] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadComponent = useCallback(async () => {
    if (Component || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const startTime = performance.now();
      const module = await importFn();
      const loadTime = performance.now() - startTime;
      
      setComponent(() => module.default);
      
      console.log(`Component loaded in ${loadTime.toFixed(2)}ms`);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [Component, isLoading, importFn]);

  return {
    Component: Component || fallback,
    isLoading,
    error,
    loadComponent
  };
};
