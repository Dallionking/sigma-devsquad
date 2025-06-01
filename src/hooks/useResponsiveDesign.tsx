
import { useState, useEffect } from 'react';
import { useIsMobile } from './use-mobile';

interface ResponsiveConfig {
  mobile: any;
  tablet: any;
  desktop: any;
}

export const useResponsiveDesign = () => {
  const isMobile = useIsMobile();
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize('mobile');
      } else if (width < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const getResponsiveValue = <T,>(config: ResponsiveConfig) => {
    return config[screenSize] as T;
  };

  const getResponsiveClasses = (baseClasses: string, responsiveClasses?: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
  }) => {
    const classes = [baseClasses];
    
    if (responsiveClasses) {
      if (responsiveClasses.mobile && screenSize === 'mobile') {
        classes.push(responsiveClasses.mobile);
      }
      if (responsiveClasses.tablet && screenSize === 'tablet') {
        classes.push(responsiveClasses.tablet);
      }
      if (responsiveClasses.desktop && screenSize === 'desktop') {
        classes.push(responsiveClasses.desktop);
      }
    }
    
    return classes.join(' ');
  };

  const getGridCols = (mobile: number, tablet: number, desktop: number) => {
    switch (screenSize) {
      case 'mobile':
        return `grid-cols-${mobile}`;
      case 'tablet':
        return `grid-cols-${tablet}`;
      case 'desktop':
        return `grid-cols-${desktop}`;
      default:
        return `grid-cols-${desktop}`;
    }
  };

  return {
    screenSize,
    isMobile,
    getResponsiveValue,
    getResponsiveClasses,
    getGridCols
  };
};
