
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavigationHistoryItem {
  path: string;
  timestamp: number;
  title?: string;
}

interface UseNavigationHistoryOptions {
  maxHistorySize?: number;
  enableKeyboardShortcuts?: boolean;
  storageKey?: string;
}

export const useNavigationHistory = ({
  maxHistorySize = 50,
  enableKeyboardShortcuts = true,
  storageKey = 'navigation-history'
}: UseNavigationHistoryOptions = {}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [history, setHistory] = useState<NavigationHistoryItem[]>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  
  const [currentIndex, setCurrentIndex] = useState(0);

  // Save history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(history));
    } catch {
      // Silently fail if localStorage is not available
    }
  }, [history, storageKey]);

  // Add current location to history
  useEffect(() => {
    const currentPath = location.pathname;
    const lastItem = history[history.length - 1];
    
    // Don't add duplicate consecutive entries
    if (lastItem?.path === currentPath) return;
    
    const newItem: NavigationHistoryItem = {
      path: currentPath,
      timestamp: Date.now(),
      title: document.title
    };

    setHistory(prev => {
      const newHistory = [...prev, newItem];
      // Limit history size
      if (newHistory.length > maxHistorySize) {
        return newHistory.slice(-maxHistorySize);
      }
      return newHistory;
    });
    
    setCurrentIndex(history.length);
  }, [location.pathname, history.length, maxHistorySize]);

  // Navigation functions
  const goBack = useCallback(() => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      const targetItem = history[newIndex];
      if (targetItem) {
        setCurrentIndex(newIndex);
        navigate(targetItem.path);
      }
    }
  }, [currentIndex, history, navigate]);

  const goForward = useCallback(() => {
    if (currentIndex < history.length - 1) {
      const newIndex = currentIndex + 1;
      const targetItem = history[newIndex];
      if (targetItem) {
        setCurrentIndex(newIndex);
        navigate(targetItem.path);
      }
    }
  }, [currentIndex, history, navigate]);

  const goToHistoryItem = useCallback((index: number) => {
    if (index >= 0 && index < history.length) {
      const targetItem = history[index];
      if (targetItem) {
        setCurrentIndex(index);
        navigate(targetItem.path);
      }
    }
  }, [history, navigate]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    setCurrentIndex(0);
  }, []);

  // Keyboard shortcuts for back/forward
  useEffect(() => {
    if (!enableKeyboardShortcuts) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Alt + Left Arrow = Back
      if (event.altKey && event.key === 'ArrowLeft') {
        event.preventDefault();
        goBack();
      }
      
      // Alt + Right Arrow = Forward
      if (event.altKey && event.key === 'ArrowRight') {
        event.preventDefault();
        goForward();
      }
      
      // Ctrl/Cmd + [ = Back (common browser shortcut)
      if ((event.ctrlKey || event.metaKey) && event.key === '[') {
        event.preventDefault();
        goBack();
      }
      
      // Ctrl/Cmd + ] = Forward (common browser shortcut)
      if ((event.ctrlKey || event.metaKey) && event.key === ']') {
        event.preventDefault();
        goForward();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [goBack, goForward, enableKeyboardShortcuts]);

  return {
    history,
    currentIndex,
    canGoBack: currentIndex > 0,
    canGoForward: currentIndex < history.length - 1,
    goBack,
    goForward,
    goToHistoryItem,
    clearHistory,
    currentItem: history[currentIndex] || null
  };
};
