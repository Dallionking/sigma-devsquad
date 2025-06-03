
import React, { createContext, useContext, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon: React.ComponentType<any>;
  children?: NavigationItem[];
  category?: 'main' | 'configuration' | 'account';
  showInMobile?: boolean;
  showInHeader?: boolean;
}

interface BreadcrumbItem {
  label: string;
  path?: string;
  icon?: React.ComponentType<any>;
  current?: boolean;
}

interface UnifiedNavigationContextType {
  navigationItems: NavigationItem[];
  currentPath: string;
  breadcrumbs: BreadcrumbItem[];
  isNavigating: boolean;
  navigate: (path: string) => void;
  setBreadcrumbs: (breadcrumbs: BreadcrumbItem[]) => void;
  generateBreadcrumbs: (customItems?: BreadcrumbItem[]) => BreadcrumbItem[];
}

const UnifiedNavigationContext = createContext<UnifiedNavigationContextType | undefined>(undefined);

export const useUnifiedNavigation = () => {
  const context = useContext(UnifiedNavigationContext);
  if (!context) {
    throw new Error('useUnifiedNavigation must be used within UnifiedNavigationProvider');
  }
  return context;
};

interface UnifiedNavigationProviderProps {
  children: React.ReactNode;
  navigationItems: NavigationItem[];
}

export const UnifiedNavigationProvider = ({ 
  children, 
  navigationItems 
}: UnifiedNavigationProviderProps) => {
  const location = useLocation();
  const navigateRouter = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);
  const [customBreadcrumbs, setCustomBreadcrumbs] = useState<BreadcrumbItem[]>([]);

  const navigate = useCallback((path: string) => {
    setIsNavigating(true);
    navigateRouter(path);
    setTimeout(() => setIsNavigating(false), 300);
  }, [navigateRouter]);

  const generateBreadcrumbs = useCallback((customItems?: BreadcrumbItem[]): BreadcrumbItem[] => {
    if (customItems && customItems.length > 0) {
      return customItems;
    }

    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];

    // Always start with home
    breadcrumbs.push({
      label: 'Dashboard',
      path: '/dashboard',
      icon: undefined
    });

    // Build breadcrumbs from path segments
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Find navigation item for this path
      const navItem = navigationItems.find(item => item.path === currentPath);
      
      if (navItem) {
        breadcrumbs.push({
          label: navItem.label,
          path: currentPath,
          icon: navItem.icon,
          current: index === pathSegments.length - 1
        });
      } else {
        // Generate human-readable label from segment
        const label = segment
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        breadcrumbs.push({
          label,
          path: currentPath,
          current: index === pathSegments.length - 1
        });
      }
    });

    return breadcrumbs;
  }, [location.pathname, navigationItems]);

  const breadcrumbs = generateBreadcrumbs(customBreadcrumbs);

  return (
    <UnifiedNavigationContext.Provider
      value={{
        navigationItems,
        currentPath: location.pathname,
        breadcrumbs,
        isNavigating,
        navigate,
        setBreadcrumbs: setCustomBreadcrumbs,
        generateBreadcrumbs
      }}
    >
      {children}
    </UnifiedNavigationContext.Provider>
  );
};
