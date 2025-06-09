
import { useEffect, useState } from 'react';
import { useIsMobile } from './use-mobile';

interface LayoutConfig {
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  padding: {
    container: string;
    section: string;
    card: string;
  };
  gap: {
    grid: string;
    flex: string;
    stack: string;
  };
  typography: {
    scale: number;
    lineHeight: number;
  };
  accessibility: {
    minTouchTarget: string;
    focusRing: string;
  };
}

export const useConsistentLayout = () => {
  const isMobile = useIsMobile();
  const [layoutConfig, setLayoutConfig] = useState<LayoutConfig>({
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem'
    },
    padding: {
      container: isMobile ? 'clamp(1rem, 4vw, 1.5rem)' : 'clamp(1.5rem, 3vw, 2rem)',
      section: isMobile ? 'clamp(0.75rem, 3vw, 1rem)' : 'clamp(1rem, 2vw, 1.5rem)',
      card: isMobile ? 'clamp(0.5rem, 2vw, 0.75rem)' : 'clamp(0.75rem, 1.5vw, 1rem)'
    },
    gap: {
      grid: isMobile ? 'clamp(0.75rem, 3vw, 1rem)' : 'clamp(1rem, 2vw, 1.5rem)',
      flex: isMobile ? 'clamp(0.5rem, 2vw, 0.75rem)' : 'clamp(0.75rem, 1.5vw, 1rem)',
      stack: isMobile ? 'clamp(0.5rem, 2vw, 0.75rem)' : 'clamp(0.75rem, 1.5vw, 1rem)'
    },
    typography: {
      scale: isMobile ? 0.9 : 1,
      lineHeight: isMobile ? 1.4 : 1.5
    },
    accessibility: {
      minTouchTarget: isMobile ? '3rem' : '2.75rem',
      focusRing: '0.125rem'
    }
  });

  // Update layout config when device type changes
  useEffect(() => {
    setLayoutConfig(prev => ({
      ...prev,
      padding: {
        container: isMobile ? 'clamp(1rem, 4vw, 1.5rem)' : 'clamp(1.5rem, 3vw, 2rem)',
        section: isMobile ? 'clamp(0.75rem, 3vw, 1rem)' : 'clamp(1rem, 2vw, 1.5rem)',
        card: isMobile ? 'clamp(0.5rem, 2vw, 0.75rem)' : 'clamp(0.75rem, 1.5vw, 1rem)'
      },
      gap: {
        grid: isMobile ? 'clamp(0.75rem, 3vw, 1rem)' : 'clamp(1rem, 2vw, 1.5rem)',
        flex: isMobile ? 'clamp(0.5rem, 2vw, 0.75rem)' : 'clamp(0.75rem, 1.5vw, 1rem)',
        stack: isMobile ? 'clamp(0.5rem, 2vw, 0.75rem)' : 'clamp(0.75rem, 1.5vw, 1rem)'
      },
      typography: {
        scale: isMobile ? 0.9 : 1,
        lineHeight: isMobile ? 1.4 : 1.5
      },
      accessibility: {
        minTouchTarget: isMobile ? '3rem' : '2.75rem',
        focusRing: '0.125rem'
      }
    }));
  }, [isMobile]);

  const getSpacingValue = (size: keyof LayoutConfig['spacing']) => {
    return layoutConfig.spacing[size];
  };

  const getPaddingValue = (type: keyof LayoutConfig['padding']) => {
    return layoutConfig.padding[type];
  };

  const getGapValue = (type: keyof LayoutConfig['gap']) => {
    return layoutConfig.gap[type];
  };

  const getResponsiveSpacing = (baseSize: string) => {
    return isMobile 
      ? `clamp(${baseSize}, 3vw, calc(${baseSize} * 1.25))`
      : `clamp(calc(${baseSize} * 1.25), 2vw, calc(${baseSize} * 1.5))`;
  };

  const getFluidSpacing = (minSize: string, maxSize: string, viewport = '3vw') => {
    return `clamp(${minSize}, ${viewport}, ${maxSize})`;
  };

  const generateConsistentClasses = (baseClass: string) => {
    return {
      mobile: `${baseClass} mobile-spacing-override`,
      tablet: `${baseClass} tablet-spacing-override`,
      desktop: `${baseClass} desktop-spacing-override`,
      consistent: `${baseClass} consistent-motion-safe`
    };
  };

  const getCriticalActionStyles = () => ({
    minHeight: layoutConfig.accessibility.minTouchTarget,
    minWidth: layoutConfig.accessibility.minTouchTarget,
    padding: layoutConfig.padding.card,
    fontSize: isMobile ? '1rem' : '0.875rem',
    borderRadius: layoutConfig.spacing.sm,
    outline: `${layoutConfig.accessibility.focusRing} solid transparent`,
    outlineOffset: layoutConfig.accessibility.focusRing
  });

  const getContainerStyles = () => ({
    maxWidth: isMobile ? '100%' : '80rem',
    margin: '0 auto',
    padding: layoutConfig.padding.container
  });

  return {
    layoutConfig,
    isMobile,
    getSpacingValue,
    getPaddingValue,
    getGapValue,
    getResponsiveSpacing,
    getFluidSpacing,
    generateConsistentClasses,
    getCriticalActionStyles,
    getContainerStyles
  };
};

export default useConsistentLayout;
