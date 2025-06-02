
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon: React.ComponentType<any>;
  level: 'primary' | 'secondary' | 'tertiary';
  parent?: string;
  category?: string;
  requiredRoles?: string[];
}

interface RecentlyVisitedItem {
  path: string;
  label: string;
  timestamp: number;
  icon?: React.ComponentType<any>;
}

interface FavoriteItem {
  id: string;
  path: string;
  label: string;
  icon?: React.ComponentType<any>;
  category?: string;
}

interface NavigationPreset {
  id: string;
  name: string;
  description: string;
  role: string;
  primaryItems: string[];
  pinnedItems: string[];
  defaultRoute: string;
}

interface ContextualNavigationContextType {
  // Context awareness
  currentContext: string | null;
  setCurrentContext: (context: string | null) => void;
  getContextualSecondaryItems: (primaryPath: string) => NavigationItem[];
  
  // Recently visited
  recentlyVisited: RecentlyVisitedItem[];
  addToRecentlyVisited: (item: RecentlyVisitedItem) => void;
  clearRecentlyVisited: () => void;
  
  // Favorites
  favorites: FavoriteItem[];
  addToFavorites: (item: FavoriteItem) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (path: string) => boolean;
  
  // Role-based presets
  currentPreset: NavigationPreset | null;
  availablePresets: NavigationPreset[];
  applyPreset: (presetId: string) => void;
  createCustomPreset: (preset: Omit<NavigationPreset, 'id'>) => void;
  
  // Navigation helpers
  getFilteredNavigationItems: () => NavigationItem[];
  getUserRole: () => string;
}

const ContextualNavigationContext = createContext<ContextualNavigationContextType | undefined>(undefined);

export const useContextualNavigation = () => {
  const context = useContext(ContextualNavigationContext);
  if (!context) {
    throw new Error('useContextualNavigation must be used within a ContextualNavigationProvider');
  }
  return context;
};

interface ContextualNavigationProviderProps {
  children: ReactNode;
}

export const ContextualNavigationProvider = ({ children }: ContextualNavigationProviderProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [currentContext, setCurrentContext] = useState<string | null>(null);
  const [recentlyVisited, setRecentlyVisited] = useState<RecentlyVisitedItem[]>([]);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [currentPreset, setCurrentPreset] = useState<NavigationPreset | null>(null);

  // Load persisted data on mount
  useEffect(() => {
    const savedRecents = localStorage.getItem('navigation-recently-visited');
    if (savedRecents) {
      setRecentlyVisited(JSON.parse(savedRecents));
    }

    const savedFavorites = localStorage.getItem('navigation-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    const savedPreset = localStorage.getItem('navigation-current-preset');
    if (savedPreset) {
      const preset = JSON.parse(savedPreset);
      setCurrentPreset(preset);
    }
  }, []);

  // Update context based on current route
  useEffect(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    if (pathSegments.length > 0) {
      setCurrentContext(pathSegments[0]);
    }
  }, [location.pathname]);

  // Contextual secondary navigation mapping
  const contextualSecondaryMapping: Record<string, NavigationItem[]> = {
    dashboard: [
      { id: 'overview', label: 'Overview', path: '/dashboard', icon: () => null, level: 'secondary' },
      { id: 'analytics', label: 'Analytics', path: '/dashboard/analytics', icon: () => null, level: 'secondary' },
      { id: 'metrics', label: 'Metrics', path: '/dashboard/metrics', icon: () => null, level: 'secondary' },
    ],
    'planning-agent': [
      { id: 'chat', label: 'Chat Interface', path: '/planning-agent', icon: () => null, level: 'secondary' },
      { id: 'canvas', label: 'Planning Canvas', path: '/planning-agent/canvas', icon: () => null, level: 'secondary' },
      { id: 'templates', label: 'Templates', path: '/planning-agent/templates', icon: () => null, level: 'secondary' },
    ],
    projects: [
      { id: 'all-projects', label: 'All Projects', path: '/projects', icon: () => null, level: 'secondary' },
      { id: 'recent-projects', label: 'Recent', path: '/projects/recent', icon: () => null, level: 'secondary' },
      { id: 'templates', label: 'Templates', path: '/projects/templates', icon: () => null, level: 'secondary' },
    ],
    'agent-configuration': [
      { id: 'roles', label: 'Role Definition', path: '/agent-configuration/roles', icon: () => null, level: 'secondary' },
      { id: 'rules', label: 'Rules & Logic', path: '/agent-configuration/rules', icon: () => null, level: 'secondary' },
      { id: 'performance', label: 'Performance', path: '/agent-configuration/performance', icon: () => null, level: 'secondary' },
    ],
  };

  // Role-based navigation presets
  const defaultPresets: NavigationPreset[] = [
    {
      id: 'admin',
      name: 'Administrator',
      description: 'Full system access with configuration and management tools',
      role: 'admin',
      primaryItems: ['dashboard', 'planning-agent', 'projects', 'agent-configuration', 'mcp-management', 'llm-integration'],
      pinnedItems: ['dashboard', 'settings', 'teams'],
      defaultRoute: '/dashboard'
    },
    {
      id: 'developer',
      name: 'Developer',
      description: 'Development-focused navigation with planning and configuration tools',
      role: 'developer',
      primaryItems: ['dashboard', 'planning-agent', 'projects', 'agent-configuration', 'ide-integration'],
      pinnedItems: ['planning-agent', 'projects', 'ide-integration'],
      defaultRoute: '/planning-agent'
    },
    {
      id: 'user',
      name: 'Standard User',
      description: 'Essential features for everyday use',
      role: 'user',
      primaryItems: ['dashboard', 'planning-agent', 'projects'],
      pinnedItems: ['dashboard', 'planning-agent'],
      defaultRoute: '/dashboard'
    },
  ];

  const getUserRole = (): string => {
    // Mock role detection - replace with actual role logic
    return user?.user_metadata?.role || 'user';
  };

  const getContextualSecondaryItems = (primaryPath: string): NavigationItem[] => {
    const context = primaryPath.replace('/', '');
    return contextualSecondaryMapping[context] || [];
  };

  const addToRecentlyVisited = (item: RecentlyVisitedItem) => {
    setRecentlyVisited(prev => {
      const filtered = prev.filter(recent => recent.path !== item.path);
      const updated = [item, ...filtered].slice(0, 10); // Keep last 10 items
      localStorage.setItem('navigation-recently-visited', JSON.stringify(updated));
      return updated;
    });
  };

  const clearRecentlyVisited = () => {
    setRecentlyVisited([]);
    localStorage.removeItem('navigation-recently-visited');
  };

  const addToFavorites = (item: FavoriteItem) => {
    setFavorites(prev => {
      if (prev.some(fav => fav.path === item.path)) return prev;
      const updated = [...prev, item];
      localStorage.setItem('navigation-favorites', JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromFavorites = (id: string) => {
    setFavorites(prev => {
      const updated = prev.filter(fav => fav.id !== id);
      localStorage.setItem('navigation-favorites', JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (path: string): boolean => {
    return favorites.some(fav => fav.path === path);
  };

  const applyPreset = (presetId: string) => {
    const preset = defaultPresets.find(p => p.id === presetId);
    if (preset) {
      setCurrentPreset(preset);
      localStorage.setItem('navigation-current-preset', JSON.stringify(preset));
      navigate(preset.defaultRoute);
    }
  };

  const createCustomPreset = (preset: Omit<NavigationPreset, 'id'>) => {
    const newPreset: NavigationPreset = {
      ...preset,
      id: `custom-${Date.now()}`
    };
    setCurrentPreset(newPreset);
    localStorage.setItem('navigation-current-preset', JSON.stringify(newPreset));
  };

  const getFilteredNavigationItems = (): NavigationItem[] => {
    const userRole = getUserRole();
    const preset = currentPreset || defaultPresets.find(p => p.role === userRole);
    
    if (!preset) return [];
    
    // Return filtered items based on current preset
    return preset.primaryItems.map(itemId => ({
      id: itemId,
      label: itemId.charAt(0).toUpperCase() + itemId.slice(1).replace('-', ' '),
      path: `/${itemId}`,
      icon: () => null,
      level: 'primary' as const
    }));
  };

  // Auto-track page visits
  useEffect(() => {
    const pathName = location.pathname;
    if (pathName && pathName !== '/') {
      const pathSegments = pathName.split('/').filter(Boolean);
      const label = pathSegments[pathSegments.length - 1]
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      addToRecentlyVisited({
        path: pathName,
        label,
        timestamp: Date.now()
      });
    }
  }, [location.pathname]);

  return (
    <ContextualNavigationContext.Provider
      value={{
        currentContext,
        setCurrentContext,
        getContextualSecondaryItems,
        recentlyVisited,
        addToRecentlyVisited,
        clearRecentlyVisited,
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        currentPreset,
        availablePresets: defaultPresets,
        applyPreset,
        createCustomPreset,
        getFilteredNavigationItems,
        getUserRole
      }}
    >
      {children}
    </ContextualNavigationContext.Provider>
  );
};
