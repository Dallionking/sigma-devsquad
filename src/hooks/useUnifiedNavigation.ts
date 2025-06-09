
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavigationItem {
  path: string;
  label: string;
  icon: React.ComponentType<any>;
  description?: string;
  isActive?: boolean;
  shortcut?: string;
  onClick?: () => void;
  showOnMobile?: boolean;
  showOnDesktop?: boolean;
}

interface UseUnifiedNavigationProps {
  items: NavigationItem[];
  onItemClick?: (item: NavigationItem) => void;
  enableKeyboardShortcuts?: boolean;
}

export const useUnifiedNavigation = ({
  items,
  onItemClick,
  enableKeyboardShortcuts = true
}: UseUnifiedNavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isNavigating, setIsNavigating] = useState(false);

  // Process items with active states and platform filtering
  const processedItems = items.map(item => ({
    ...item,
    isActive: item.path === location.pathname || location.pathname.includes(item.path),
    showOnMobile: item.showOnMobile ?? true,
    showOnDesktop: item.showOnDesktop ?? true
  })).filter(item => isMobile ? item.showOnMobile : item.showOnDesktop);

  // Unified navigation handler
  const handleNavigation = useCallback((item: NavigationItem) => {
    setIsNavigating(true);
    
    if (item.onClick) {
      item.onClick();
    } else {
      navigate(item.path);
    }
    
    onItemClick?.(item);
    
    // Reset navigation state after a delay
    setTimeout(() => setIsNavigating(false), 300);
  }, [navigate, onItemClick]);

  // Keyboard shortcuts handler
  useEffect(() => {
    if (!enableKeyboardShortcuts) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Ctrl/Cmd + key combinations
      if (event.ctrlKey || event.metaKey) {
        const item = processedItems.find(item => 
          item.shortcut && item.shortcut.toLowerCase() === event.key.toLowerCase()
        );
        
        if (item) {
          event.preventDefault();
          handleNavigation(item);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [processedItems, handleNavigation, enableKeyboardShortcuts]);

  return {
    items: processedItems,
    handleNavigation,
    isNavigating,
    isMobile,
    currentPath: location.pathname
  };
};
