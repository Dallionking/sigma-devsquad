
import { useEffect, useState } from 'react';
import { useIsMobile } from './use-mobile';

interface SpacingScale {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

interface ResponsiveSpacing {
  mobile: SpacingScale;
  tablet: SpacingScale;
  desktop: SpacingScale;
}

export const useSpacingAudit = () => {
  const isMobile = useIsMobile();
  
  // Standardized spacing scale based on 4px base unit
  const baseSpacing: SpacingScale = {
    xs: '0.25rem',  // 4px
    sm: '0.5rem',   // 8px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '2rem',     // 32px
    '2xl': '3rem'   // 48px
  };

  const responsiveSpacing: ResponsiveSpacing = {
    mobile: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '0.75rem',
      lg: '1rem',
      xl: '1.5rem',
      '2xl': '2rem'
    },
    tablet: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.25rem',
      xl: '1.75rem',
      '2xl': '2.5rem'
    },
    desktop: baseSpacing
  };

  const getCurrentSpacing = () => {
    if (isMobile) return responsiveSpacing.mobile;
    return responsiveSpacing.desktop;
  };

  const getConsistentSpacing = (size: keyof SpacingScale) => {
    return getCurrentSpacing()[size];
  };

  const getContainerSpacing = () => ({
    padding: isMobile ? responsiveSpacing.mobile.md : responsiveSpacing.desktop.lg,
    margin: isMobile ? responsiveSpacing.mobile.sm : responsiveSpacing.desktop.md,
    gap: isMobile ? responsiveSpacing.mobile.md : responsiveSpacing.desktop.lg
  });

  const getSidebarSpacing = () => ({
    width: isMobile ? '100%' : '16rem', // 256px
    collapsedWidth: '4rem', // 64px
    padding: getConsistentSpacing('md'),
    itemGap: getConsistentSpacing('sm'),
    sectionGap: getConsistentSpacing('lg')
  });

  const getContentSpacing = (sidebarCollapsed: boolean = false) => {
    const sidebarWidth = sidebarCollapsed ? '4rem' : '16rem';
    return {
      marginLeft: isMobile ? '0' : sidebarWidth,
      padding: getContainerSpacing().padding,
      minHeight: '100vh'
    };
  };

  return {
    baseSpacing,
    responsiveSpacing,
    getConsistentSpacing,
    getContainerSpacing,
    getSidebarSpacing,
    getContentSpacing,
    isMobile
  };
};
