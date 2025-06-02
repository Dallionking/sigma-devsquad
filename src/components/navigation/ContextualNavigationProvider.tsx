
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { NavItem } from './types';
import { navigationItems } from './navigationData';

interface NavigationPreset {
  id: string;
  name: string;
  description: string;
  items: string[]; // Array of item IDs
}

interface ContextualNavigationContextType {
  currentPreset: NavigationPreset | null;
  availablePresets: NavigationPreset[];
  setCurrentPreset: (preset: NavigationPreset | null) => void;
  getFilteredNavigationItems: () => NavItem[];
}

const ContextualNavigationContext = createContext<ContextualNavigationContextType | undefined>(undefined);

const defaultPresets: NavigationPreset[] = [
  {
    id: 'developer',
    name: 'Developer',
    description: 'Navigation focused on development tasks',
    items: ['dashboard', 'planning', 'projects', 'ide', 'llm']
  },
  {
    id: 'manager',
    name: 'Project Manager',
    description: 'Navigation focused on project management',
    items: ['dashboard', 'planning', 'projects', 'teams']
  },
  {
    id: 'admin',
    name: 'Administrator',
    description: 'Full access navigation',
    items: ['dashboard', 'planning', 'projects', 'agent-config', 'mcp', 'llm', 'ide', 'settings']
  }
];

interface ContextualNavigationProviderProps {
  children: ReactNode;
}

export const ContextualNavigationProvider = ({ children }: ContextualNavigationProviderProps) => {
  const [currentPreset, setCurrentPreset] = useState<NavigationPreset | null>(null);
  const [availablePresets] = useState<NavigationPreset[]>(defaultPresets);

  const getFilteredNavigationItems = (): NavItem[] => {
    if (!currentPreset) {
      return navigationItems;
    }

    return navigationItems.filter(item => 
      currentPreset.items.includes(item.id)
    );
  };

  const value: ContextualNavigationContextType = {
    currentPreset,
    availablePresets,
    setCurrentPreset,
    getFilteredNavigationItems
  };

  return (
    <ContextualNavigationContext.Provider value={value}>
      {children}
    </ContextualNavigationContext.Provider>
  );
};

export const useContextualNavigation = (): ContextualNavigationContextType => {
  const context = useContext(ContextualNavigationContext);
  if (!context) {
    throw new Error('useContextualNavigation must be used within a ContextualNavigationProvider');
  }
  return context;
};
