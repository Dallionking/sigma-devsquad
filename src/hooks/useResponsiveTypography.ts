
import { useState, useEffect } from 'react';

interface TypographyBreakpoints {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

interface ResponsiveTypographyConfig {
  minFontSize: number;
  maxFontSize: number;
  minViewport: number;
  maxViewport: number;
  lineHeightRatio: number;
  accessibilityMinSize: number;
}

const DEFAULT_BREAKPOINTS: TypographyBreakpoints = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280
};

const DEFAULT_CONFIG: ResponsiveTypographyConfig = {
  minFontSize: 14,
  maxFontSize: 18,
  minViewport: 320,
  maxViewport: 1280,
  lineHeightRatio: 1.5,
  accessibilityMinSize: 16
};

export const useResponsiveTypography = (config: Partial<ResponsiveTypographyConfig> = {}) => {
  const [viewportWidth, setViewportWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );
  const [currentBreakpoint, setCurrentBreakpoint] = useState<keyof TypographyBreakpoints>('md');

  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setViewportWidth(width);

      // Determine current breakpoint
      if (width < DEFAULT_BREAKPOINTS.sm) {
        setCurrentBreakpoint('xs');
      } else if (width < DEFAULT_BREAKPOINTS.md) {
        setCurrentBreakpoint('sm');
      } else if (width < DEFAULT_BREAKPOINTS.lg) {
        setCurrentBreakpoint('md');
      } else if (width < DEFAULT_BREAKPOINTS.xl) {
        setCurrentBreakpoint('lg');
      } else {
        setCurrentBreakpoint('xl');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const calculateFluidFontSize = (
    minSize: number,
    maxSize: number,
    minVw = finalConfig.minViewport,
    maxVw = finalConfig.maxViewport
  ) => {
    const slope = (maxSize - minSize) / (maxVw - minVw);
    const yIntercept = minSize - slope * minVw;
    const preferredValue = `${slope * 100}vw + ${yIntercept}px`;
    
    return `clamp(${Math.max(minSize, finalConfig.accessibilityMinSize)}px, ${preferredValue}, ${maxSize}px)`;
  };

  const getResponsiveFontSize = (baseSize: number, scale = 1) => {
    const minSize = Math.max(baseSize * 0.8, finalConfig.accessibilityMinSize);
    const maxSize = baseSize * scale;
    return calculateFluidFontSize(minSize, maxSize);
  };

  const getResponsiveLineHeight = (fontSize: number) => {
    const baseLineHeight = finalConfig.lineHeightRatio;
    const adjustedRatio = Math.max(baseLineHeight - (fontSize - 16) * 0.01, 1.2);
    return adjustedRatio;
  };

  const getTypographyScale = () => {
    const baseSize = viewportWidth < DEFAULT_BREAKPOINTS.sm ? 14 : 16;
    
    return {
      xs: {
        fontSize: getResponsiveFontSize(12),
        lineHeight: getResponsiveLineHeight(12)
      },
      sm: {
        fontSize: getResponsiveFontSize(14),
        lineHeight: getResponsiveLineHeight(14)
      },
      base: {
        fontSize: getResponsiveFontSize(baseSize),
        lineHeight: getResponsiveLineHeight(baseSize)
      },
      lg: {
        fontSize: getResponsiveFontSize(18, 1.1),
        lineHeight: getResponsiveLineHeight(18)
      },
      xl: {
        fontSize: getResponsiveFontSize(20, 1.2),
        lineHeight: getResponsiveLineHeight(20)
      },
      '2xl': {
        fontSize: getResponsiveFontSize(24, 1.3),
        lineHeight: getResponsiveLineHeight(24)
      },
      '3xl': {
        fontSize: getResponsiveFontSize(30, 1.4),
        lineHeight: getResponsiveLineHeight(30)
      }
    };
  };

  const getAccessibleFontSize = (targetSize: number) => {
    return Math.max(targetSize, finalConfig.accessibilityMinSize);
  };

  const isTextSizeAccessible = (fontSize: number) => {
    return fontSize >= finalConfig.accessibilityMinSize;
  };

  const getOptimalContainerWidth = () => {
    // Optimal reading width: 45-75 characters per line
    const charWidth = viewportWidth < DEFAULT_BREAKPOINTS.md ? 8 : 10;
    const optimalChars = 65;
    return Math.min(optimalChars * charWidth, viewportWidth * 0.9);
  };

  return {
    viewportWidth,
    currentBreakpoint,
    calculateFluidFontSize,
    getResponsiveFontSize,
    getResponsiveLineHeight,
    getTypographyScale,
    getAccessibleFontSize,
    isTextSizeAccessible,
    getOptimalContainerWidth,
    config: finalConfig,
    breakpoints: DEFAULT_BREAKPOINTS
  };
};

export default useResponsiveTypography;
