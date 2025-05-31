
import { useState, useEffect, useCallback } from 'react';

interface UseCollapsibleSidebarProps {
  defaultCollapsed?: boolean;
  keyboardShortcut?: string;
  storageKey?: string;
}

export const useCollapsibleSidebar = ({
  defaultCollapsed = false,
  keyboardShortcut = 'b',
  storageKey = 'sidebar-collapsed'
}: UseCollapsibleSidebarProps = {}) => {
  // Initialize from localStorage or default
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : defaultCollapsed;
    }
    return defaultCollapsed;
  });

  // Persist to localStorage
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
      if ((event.metaKey || event.ctrlKey) && event.key === keyboardShortcut) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [keyboardShortcut, toggleSidebar]);

  return {
    isCollapsed,
    toggleSidebar,
    collapseSidebar,
    expandSidebar,
    setIsCollapsed
  };
};
