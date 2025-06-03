
import { useEffect, useState } from 'react';
import { useSpacingAudit } from './useSpacingAudit';

interface LayoutConstraints {
  sidebarWidth: string;
  contentOffset: string;
  headerHeight: string;
  footerHeight: string;
  minContentHeight: string;
}

export const useLayoutConsistency = (sidebarCollapsed: boolean = false) => {
  const { getSidebarSpacing, getContentSpacing, isMobile } = useSpacingAudit();
  const [layoutConstraints, setLayoutConstraints] = useState<LayoutConstraints>({
    sidebarWidth: '16rem',
    contentOffset: '16rem',
    headerHeight: '4rem',
    footerHeight: '0',
    minContentHeight: 'calc(100vh - 4rem)'
  });

  useEffect(() => {
    const sidebarSpacing = getSidebarSpacing();
    const contentSpacing = getContentSpacing(sidebarCollapsed);

    setLayoutConstraints({
      sidebarWidth: sidebarCollapsed ? sidebarSpacing.collapsedWidth : sidebarSpacing.width,
      contentOffset: isMobile ? '0' : (sidebarCollapsed ? sidebarSpacing.collapsedWidth : sidebarSpacing.width),
      headerHeight: '4rem',
      footerHeight: '0',
      minContentHeight: 'calc(100vh - 4rem)'
    });
  }, [sidebarCollapsed, isMobile, getSidebarSpacing, getContentSpacing]);

  const getLayoutClasses = () => ({
    sidebar: `fixed top-0 left-0 h-full transition-all duration-300 ease-in-out z-40 ${
      sidebarCollapsed ? 'w-16' : 'w-64'
    }`,
    mainContent: `transition-all duration-300 ease-in-out ${
      isMobile ? 'ml-0 w-full' : sidebarCollapsed ? 'ml-16 w-[calc(100%-4rem)]' : 'ml-64 w-[calc(100%-16rem)]'
    }`,
    container: 'min-h-screen bg-background',
    contentArea: `min-h-screen pt-16 ${isMobile ? 'px-4' : 'px-6 lg:px-8'}`
  });

  const preventOverlap = {
    ensureZIndex: (level: 'sidebar' | 'modal' | 'dropdown' | 'tooltip') => {
      const zIndexMap = {
        sidebar: 'z-40',
        modal: 'z-50',
        dropdown: 'z-50',
        tooltip: 'z-60'
      };
      return zIndexMap[level];
    },
    ensureSpacing: (element: 'button' | 'card' | 'input' | 'section') => {
      const spacingMap = {
        button: 'min-h-10 px-4 py-2',
        card: 'p-4 sm:p-6',
        input: 'h-10 px-3 py-2',
        section: 'py-6 sm:py-8 lg:py-12'
      };
      return spacingMap[element];
    }
  };

  return {
    layoutConstraints,
    getLayoutClasses,
    preventOverlap,
    isMobile,
    sidebarCollapsed
  };
};
