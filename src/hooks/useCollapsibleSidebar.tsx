
import { useState, useEffect, useCallback } from 'react';
import { useResponsiveNavigation } from './useResponsiveNavigation';

export interface UseCollapsibleSidebarOptions {
  defaultCollapsed?: boolean;
  keyboardShortcut?: string;
  storageKey?: string;
  autoCollapseOnMobile?: boolean;
}

interface UseCollapsibleSidebarReturn {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  collapseSidebar: () => void;
  expandSidebar: () => void;
  currentBreakpoint: string;
  isMobileView: boolean;
}

export const useCollapsibleSidebar = ({
  defaultCollapsed = false,
  keyboardShortcut = 'b',
  storageKey = 'sidebar-collapsed',
  autoCollapseOnMobile = true
}: UseCollapsibleSidebarOptions = {}): UseCollapsibleSidebarReturn => {
  const { currentBreakpoint, isMobile, showHamburger } = useResponsiveNavigation();
  
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window === 'undefined') return defaultCollapsed;
    
    // Check if we should auto-collapse on mobile
    if (autoCollapseOnMobile && isMobile) return true;
    
    // Check localStorage for saved state
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : defaultCollapsed;
  });

  // Auto-collapse on mobile devices when option is enabled
  useEffect(() => {
    if (autoCollapseOnMobile && isMobile && !isCollapsed) {
      setIsCollapsed(true);
    }
  }, [isMobile, autoCollapseOnMobile, isCollapsed]);

  // Save collapsed state to localStorage
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(isCollapsed));
  }, [isCollapsed, storageKey]);

  const toggleSidebar = useCallback(() => {
    setIsCollapsed(prev => !prev);
  }, []);

  const collapseSidebar = useCallback(() => {
    setIsCollapsed(true);
  }, []);

  const expandSidebar = useCallback(() => {
    setIsCollapsed(false);
  }, []);

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === keyboardShortcut) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keyboardShortcut, toggleSidebar]);

  return {
    isCollapsed,
    toggleSidebar,
    collapseSidebar,
    expandSidebar,
    currentBreakpoint,
    isMobileView: showHamburger
  };
};
