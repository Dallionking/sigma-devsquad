
import { useIsMobile } from './use-mobile';

export const useGridSystem = () => {
  const isMobile = useIsMobile();

  const getGridClasses = (layout: 'content' | 'dashboard' | 'cards' | 'settings' | 'form') => {
    const layouts = {
      content: isMobile ? 'grid-cols-1' : 'grid-content',
      dashboard: isMobile ? 'grid-cols-1 sm:grid-cols-2' : 'grid-dashboard',
      cards: isMobile ? 'grid-cols-2' : 'grid-cards',
      settings: isMobile ? 'grid-cols-1' : 'grid-settings',
      form: isMobile ? 'grid-cols-1' : 'grid-form'
    };
    
    return `grid ${layouts[layout]} gap-md`;
  };

  const getContainerClasses = (size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'full') => {
    const containers = {
      sm: 'grid-container-sm',
      md: 'grid-container-md',
      lg: 'grid-container-lg',
      xl: 'grid-container-xl',
      full: 'grid-container'
    };
    
    return containers[size];
  };

  const getSpacing = (size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl') => {
    const spacing = {
      xs: 'gap-xs',
      sm: 'gap-sm',
      md: 'gap-md',
      lg: 'gap-lg',
      xl: 'gap-xl',
      '2xl': 'gap-2xl'
    };
    
    return spacing[size];
  };

  return {
    getGridClasses,
    getContainerClasses,
    getSpacing,
    isMobile
  };
};
