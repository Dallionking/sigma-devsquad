
import { useIsMobile } from './use-mobile';

export const useSpaceOptimization = () => {
  const isMobile = useIsMobile();

  const getSpacing = (size: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => {
    const spacingMap = {
      xs: isMobile ? 'p-1' : 'p-2',
      sm: isMobile ? 'p-2' : 'p-3',
      md: isMobile ? 'p-3' : 'p-4',
      lg: isMobile ? 'p-4' : 'p-6',
      xl: isMobile ? 'p-6' : 'p-8'
    };
    return spacingMap[size];
  };

  const getGap = (size: 'xs' | 'sm' | 'md' | 'lg') => {
    const gapMap = {
      xs: isMobile ? 'gap-1' : 'gap-2',
      sm: isMobile ? 'gap-2' : 'gap-3',
      md: isMobile ? 'gap-3' : 'gap-4',
      lg: isMobile ? 'gap-4' : 'gap-6'
    };
    return gapMap[size];
  };

  const getMargin = (size: 'xs' | 'sm' | 'md' | 'lg') => {
    const marginMap = {
      xs: isMobile ? 'm-1' : 'm-2',
      sm: isMobile ? 'm-2' : 'm-3',
      md: isMobile ? 'm-3' : 'm-4',
      lg: isMobile ? 'm-4' : 'm-6'
    };
    return marginMap[size];
  };

  const getContainerPadding = () => {
    return isMobile ? 'px-3 py-3' : 'px-4 py-4 sm:px-6 sm:py-6';
  };

  const getSectionSpacing = () => {
    return isMobile ? 'space-y-3' : 'space-y-4 sm:space-y-6';
  };

  const getCardPadding = () => {
    return isMobile ? 'p-3' : 'p-4 sm:p-6';
  };

  return {
    getSpacing,
    getGap,
    getMargin,
    getContainerPadding,
    getSectionSpacing,
    getCardPadding,
    isMobile
  };
};
