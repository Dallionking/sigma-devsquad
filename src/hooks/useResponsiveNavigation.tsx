
import { useState, useEffect } from 'react';

export type NavigationBreakpoint = 'mobile' | 'tablet' | 'small-desktop' | 'desktop';

interface ResponsiveNavigationState {
  currentBreakpoint: NavigationBreakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isSmallDesktop: boolean;
  isDesktop: boolean;
  showHamburger: boolean;
  showFullSidebar: boolean;
  showCollapsedSidebar: boolean;
}

const breakpoints = {
  mobile: 768,
  tablet: 992,
  smallDesktop: 1200,
  desktop: 1201
};

export const useResponsiveNavigation = (): ResponsiveNavigationState => {
  const [state, setState] = useState<ResponsiveNavigationState>(() => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1024;
    return getResponsiveState(width);
  });

  useEffect(() => {
    const updateState = () => {
      const width = window.innerWidth;
      setState(getResponsiveState(width));
    };

    const mediaQueries = [
      window.matchMedia(`(max-width: ${breakpoints.mobile - 1}px)`),
      window.matchMedia(`(min-width: ${breakpoints.mobile}px) and (max-width: ${breakpoints.tablet - 1}px)`),
      window.matchMedia(`(min-width: ${breakpoints.tablet}px) and (max-width: ${breakpoints.smallDesktop - 1}px)`),
      window.matchMedia(`(min-width: ${breakpoints.smallDesktop}px)`)
    ];

    mediaQueries.forEach(mq => mq.addEventListener('change', updateState));
    updateState();

    return () => {
      mediaQueries.forEach(mq => mq.removeEventListener('change', updateState));
    };
  }, []);

  return state;
};

function getResponsiveState(width: number): ResponsiveNavigationState {
  const isMobile = width < breakpoints.mobile;
  const isTablet = width >= breakpoints.mobile && width < breakpoints.tablet;
  const isSmallDesktop = width >= breakpoints.tablet && width < breakpoints.smallDesktop;
  const isDesktop = width >= breakpoints.smallDesktop;

  let currentBreakpoint: NavigationBreakpoint = 'mobile';
  if (isTablet) currentBreakpoint = 'tablet';
  else if (isSmallDesktop) currentBreakpoint = 'small-desktop';
  else if (isDesktop) currentBreakpoint = 'desktop';

  return {
    currentBreakpoint,
    isMobile,
    isTablet,
    isSmallDesktop,
    isDesktop,
    showHamburger: isMobile,
    showFullSidebar: isDesktop,
    showCollapsedSidebar: isTablet || isSmallDesktop
  };
}
