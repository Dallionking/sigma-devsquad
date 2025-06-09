
import { useState, useCallback, useEffect } from 'react';

interface UseCollapsibleSidebarProps {
  defaultCollapsed?: boolean;
  keyboardShortcut?: string;
  storageKey?: string;
}

export const useCollapsibleSidebar = ({
  defaultCollapsed = false,
  keyboardShortcut,
  storageKey
}: UseCollapsibleSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (storageKey && typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : defaultCollapsed;
    }
    return defaultCollapsed;
  });

  const toggleSidebar = useCallback(() => {
    setIsCollapsed((prev: boolean) => {
      const newValue = !prev;
      if (storageKey && typeof window !== 'undefined') {
        localStorage.setItem(storageKey, JSON.stringify(newValue));
      }
      return newValue;
    });
  }, [storageKey]);

  useEffect(() => {
    if (!keyboardShortcut) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === keyboardShortcut.toLowerCase()) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keyboardShortcut, toggleSidebar]);

  return {
    isCollapsed,
    toggleSidebar
  };
};
