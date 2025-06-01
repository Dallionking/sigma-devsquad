
import { useState, useEffect } from 'react';

interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  width: number;
  height: number;
  orientation: 'portrait' | 'landscape';
  devicePixelRatio: number;
  prefersReducedMotion: boolean;
  prefersHighContrast: boolean;
  touchCapable: boolean;
}

export const useAdvancedResponsive = () => {
  const [state, setState] = useState<ResponsiveState>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLargeDesktop: false,
    width: 0,
    height: 0,
    orientation: 'portrait',
    devicePixelRatio: 1,
    prefersReducedMotion: false,
    prefersHighContrast: false,
    touchCapable: false
  });

  useEffect(() => {
    const updateState = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setState({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024 && width < 1440,
        isLargeDesktop: width >= 1440,
        width,
        height,
        orientation: height > width ? 'portrait' : 'landscape',
        devicePixelRatio: window.devicePixelRatio || 1,
        prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        prefersHighContrast: window.matchMedia('(prefers-contrast: high)').matches,
        touchCapable: 'ontouchstart' in window || navigator.maxTouchPoints > 0
      });
    };

    updateState();

    const resizeObserver = new ResizeObserver(updateState);
    resizeObserver.observe(document.body);

    const mediaQueries = [
      window.matchMedia('(prefers-reduced-motion: reduce)'),
      window.matchMedia('(prefers-contrast: high)')
    ];

    mediaQueries.forEach(mq => mq.addEventListener('change', updateState));

    return () => {
      resizeObserver.disconnect();
      mediaQueries.forEach(mq => mq.removeEventListener('change', updateState));
    };
  }, []);

  const getResponsiveValue = <T,>(values: {
    mobile?: T;
    tablet?: T;
    desktop?: T;
    largeDesktop?: T;
    default: T;
  }): T => {
    if (state.isMobile && values.mobile !== undefined) return values.mobile;
    if (state.isTablet && values.tablet !== undefined) return values.tablet;
    if (state.isDesktop && values.desktop !== undefined) return values.desktop;
    if (state.isLargeDesktop && values.largeDesktop !== undefined) return values.largeDesktop;
    return values.default;
  };

  const getOptimalImageSize = (baseWidth: number) => {
    const scaleFactor = Math.min(state.devicePixelRatio, 2); // Cap at 2x for performance
    return Math.round(baseWidth * scaleFactor);
  };

  const shouldUseReducedMotion = () => {
    return state.prefersReducedMotion;
  };

  const getOptimalGridCols = (maxCols: number) => {
    if (state.isMobile) return Math.min(2, maxCols);
    if (state.isTablet) return Math.min(3, maxCols);
    if (state.isDesktop) return Math.min(4, maxCols);
    return maxCols;
  };

  return {
    ...state,
    getResponsiveValue,
    getOptimalImageSize,
    shouldUseReducedMotion,
    getOptimalGridCols
  };
};
