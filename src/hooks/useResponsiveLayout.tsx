
import { useEffect, useState } from 'react';
import { useIsMobile } from './use-mobile';
import { usePerformanceOptimization } from './usePerformanceOptimization';

export interface ResponsiveLayoutConfig {
  enableSwipeGestures?: boolean;
  enableTouchOptimizations?: boolean;
  enableAccessibilityEnhancements?: boolean;
  enablePerformanceOptimizations?: boolean;
  mobileBreakpoint?: number;
}

export const useResponsiveLayout = (config: ResponsiveLayoutConfig = {}) => {
  const {
    enableSwipeGestures = true,
    enableTouchOptimizations = true,
    enableAccessibilityEnhancements = true,
    enablePerformanceOptimizations = true,
    mobileBreakpoint = 768
  } = config;

  const isMobile = useIsMobile();
  const { mobileOptimizations, debounce, throttle } = usePerformanceOptimization();
  
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateScreenSize = throttle(() => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
      
      setOrientation(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
    }, 100);

    window.addEventListener('resize', updateScreenSize);
    window.addEventListener('orientationchange', updateScreenSize);

    // Initial call
    updateScreenSize();

    return () => {
      window.removeEventListener('resize', updateScreenSize);
      window.removeEventListener('orientationchange', updateScreenSize);
    };
  }, [throttle]);

  const getResponsiveClasses = (baseClasses: string = '') => {
    const classes = [baseClasses];
    
    if (enableTouchOptimizations && isMobile) {
      classes.push('touch-manipulation');
    }
    
    if (enablePerformanceOptimizations && mobileOptimizations.enableTouch) {
      classes.push('mobile-optimized');
    }
    
    return classes.filter(Boolean).join(' ');
  };

  const getContainerClasses = () => {
    return getResponsiveClasses(
      isMobile 
        ? 'mobile-safe-area px-4 py-4' 
        : 'px-6 py-6 lg:px-8 lg:py-8'
    );
  };

  const getGridColumns = (mobile = 1, tablet = 2, desktop = 3) => {
    if (isMobile) return mobile;
    if (screenSize.width < 1024) return tablet;
    return desktop;
  };

  const isTablet = screenSize.width >= 768 && screenSize.width < 1024;
  const isDesktop = screenSize.width >= 1024;

  return {
    isMobile,
    isTablet,
    isDesktop,
    screenSize,
    orientation,
    mobileOptimizations,
    getResponsiveClasses,
    getContainerClasses,
    getGridColumns,
    debounce,
    throttle,
    config: {
      enableSwipeGestures,
      enableTouchOptimizations,
      enableAccessibilityEnhancements,
      enablePerformanceOptimizations
    }
  };
};
