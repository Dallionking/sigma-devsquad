
import { useEffect, useCallback, useRef } from 'react';
import { useIsMobile } from './use-mobile';

interface PerformanceOptions {
  enableVirtualization?: boolean;
  debounceDelay?: number;
  throttleDelay?: number;
  enableIntersectionObserver?: boolean;
}

export const usePerformanceOptimization = (options: PerformanceOptions = {}) => {
  const {
    enableVirtualization = true,
    debounceDelay = 300,
    throttleDelay = 100,
    enableIntersectionObserver = true
  } = options;

  const isMobile = useIsMobile();
  const rafRef = useRef<number>();

  // Debounce function for expensive operations
  const debounce = useCallback((func: Function, delay: number = debounceDelay) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  }, [debounceDelay]);

  // Throttle function for frequent events
  const throttle = useCallback((func: Function, delay: number = throttleDelay) => {
    let inThrottle: boolean;
    return (...args: any[]) => {
      if (!inThrottle) {
        func.apply(null, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, delay);
      }
    };
  }, [throttleDelay]);

  // RAF-based smooth operations
  const requestFrame = useCallback((callback: () => void) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(callback);
  }, []);

  // Intersection Observer for lazy loading
  const createIntersectionObserver = useCallback((
    callback: (entries: IntersectionObserverEntry[]) => void,
    options: IntersectionObserverInit = {}
  ) => {
    if (!enableIntersectionObserver || !('IntersectionObserver' in window)) {
      return null;
    }

    return new IntersectionObserver(callback, {
      rootMargin: '50px',
      threshold: 0.1,
      ...options
    });
  }, [enableIntersectionObserver]);

  // Preload critical resources
  const preloadResource = useCallback((url: string, type: 'script' | 'style' | 'image' = 'script') => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = type;
    document.head.appendChild(link);
  }, []);

  // Memory cleanup
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Mobile-specific optimizations
  const mobileOptimizations = {
    disableHover: isMobile,
    reduceAnimations: isMobile,
    enableTouch: isMobile,
    optimizeScrolling: isMobile
  };

  return {
    debounce,
    throttle,
    requestFrame,
    createIntersectionObserver,
    preloadResource,
    mobileOptimizations,
    isMobile
  };
};
