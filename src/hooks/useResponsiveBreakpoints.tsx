
import { useState, useEffect } from 'react';

export type Breakpoint = 'xs' | 'sm-mobile' | 'lg-mobile' | 'md' | 'lg-tablet' | 'lg' | 'xl' | 'xl-desktop' | '2xl';

interface BreakpointValues {
  xs: boolean;           // 320px
  'sm-mobile': boolean;  // 375px
  'lg-mobile': boolean;  // 428px
  md: boolean;           // 768px
  'lg-tablet': boolean;  // 834px
  lg: boolean;           // 1024px
  xl: boolean;           // 1280px
  'xl-desktop': boolean; // 1440px
  '2xl': boolean;        // 1920px
}

const breakpoints = {
  xs: 320,
  'sm-mobile': 375,
  'lg-mobile': 428,
  md: 768,
  'lg-tablet': 834,
  lg: 1024,
  xl: 1280,
  'xl-desktop': 1440,
  '2xl': 1920,
};

export const useResponsiveBreakpoints = () => {
  const [currentBreakpoints, setCurrentBreakpoints] = useState<BreakpointValues>({
    xs: false,
    'sm-mobile': false,
    'lg-mobile': false,
    md: false,
    'lg-tablet': false,
    lg: false,
    xl: false,
    'xl-desktop': false,
    '2xl': false,
  });

  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>('xs');

  useEffect(() => {
    const updateBreakpoints = () => {
      const width = window.innerWidth;
      
      const newBreakpoints: BreakpointValues = {
        xs: width >= breakpoints.xs,
        'sm-mobile': width >= breakpoints['sm-mobile'],
        'lg-mobile': width >= breakpoints['lg-mobile'],
        md: width >= breakpoints.md,
        'lg-tablet': width >= breakpoints['lg-tablet'],
        lg: width >= breakpoints.lg,
        xl: width >= breakpoints.xl,
        'xl-desktop': width >= breakpoints['xl-desktop'],
        '2xl': width >= breakpoints['2xl'],
      };

      setCurrentBreakpoints(newBreakpoints);

      // Determine current breakpoint
      let current: Breakpoint = 'xs';
      Object.entries(breakpoints)
        .sort(([, a], [, b]) => b - a)
        .forEach(([name, value]) => {
          if (width >= value) {
            current = name as Breakpoint;
            return;
          }
        });

      setCurrentBreakpoint(current);
    };

    updateBreakpoints();

    const mediaQueries = Object.entries(breakpoints).map(([name, width]) => {
      const mq = window.matchMedia(`(min-width: ${width}px)`);
      mq.addEventListener('change', updateBreakpoints);
      return { name, mq };
    });

    return () => {
      mediaQueries.forEach(({ mq }) => {
        mq.removeEventListener('change', updateBreakpoints);
      });
    };
  }, []);

  const isAtLeast = (breakpoint: Breakpoint): boolean => {
    return currentBreakpoints[breakpoint];
  };

  const isBelow = (breakpoint: Breakpoint): boolean => {
    return !currentBreakpoints[breakpoint];
  };

  const isBetween = (min: Breakpoint, max: Breakpoint): boolean => {
    return currentBreakpoints[min] && !currentBreakpoints[max];
  };

  const getCurrentDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
    if (isBelow('md')) return 'mobile';
    if (isBelow('xl')) return 'tablet';
    return 'desktop';
  };

  const getResponsiveValue = <T,>(values: Partial<Record<Breakpoint | 'base', T>>): T => {
    // Start with base value or first defined value
    let result = values.base || Object.values(values)[0];

    // Apply breakpoint-specific values in order
    Object.entries(breakpoints)
      .sort(([, a], [, b]) => a - b)
      .forEach(([breakpoint]) => {
        if (currentBreakpoints[breakpoint as Breakpoint] && values[breakpoint as Breakpoint] !== undefined) {
          result = values[breakpoint as Breakpoint];
        }
      });

    return result as T;
  };

  return {
    breakpoints: currentBreakpoints,
    current: currentBreakpoint,
    isAtLeast,
    isBelow,
    isBetween,
    deviceType: getCurrentDeviceType(),
    getResponsiveValue,
    
    // Convenience properties
    isMobile: getCurrentDeviceType() === 'mobile',
    isTablet: getCurrentDeviceType() === 'tablet',
    isDesktop: getCurrentDeviceType() === 'desktop',
    
    // Specific breakpoint checks
    isXs: currentBreakpoint === 'xs',
    isSmMobile: currentBreakpoint === 'sm-mobile',
    isLgMobile: currentBreakpoint === 'lg-mobile',
    isMd: currentBreakpoint === 'md',
    isLgTablet: currentBreakpoint === 'lg-tablet',
    isLg: currentBreakpoint === 'lg',
    isXl: currentBreakpoint === 'xl',
    isXlDesktop: currentBreakpoint === 'xl-desktop',
    is2xl: currentBreakpoint === '2xl',
  };
};

// Utility function for responsive class generation
export const generateResponsiveClasses = (
  baseClass: string,
  responsiveOverrides: Partial<Record<Breakpoint, string>>
): string => {
  const classes = [baseClass];
  
  Object.entries(responsiveOverrides).forEach(([breakpoint, className]) => {
    if (className) {
      const prefix = breakpoint === 'sm-mobile' ? 'sm-mobile:' :
                    breakpoint === 'lg-mobile' ? 'lg-mobile:' :
                    breakpoint === 'lg-tablet' ? 'lg-tablet:' :
                    breakpoint === 'xl-desktop' ? 'xl-desktop:' :
                    `${breakpoint}:`;
      classes.push(`${prefix}${className}`);
    }
  });

  return classes.join(' ');
};
