
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavigationLevel {
  id: string;
  label: string;
  path: string;
  level: 'primary' | 'secondary' | 'tertiary';
  parent?: string;
}

interface NavigationHierarchyContextType {
  currentPath: string;
  navigationStack: NavigationLevel[];
  addNavigationLevel: (level: NavigationLevel) => void;
  removeNavigationLevel: (id: string) => void;
  clearNavigationStack: () => void;
  canGoBack: boolean;
  goBack: () => void;
}

const NavigationHierarchyContext = createContext<NavigationHierarchyContextType | undefined>(undefined);

export const useNavigationHierarchy = () => {
  const context = useContext(NavigationHierarchyContext);
  if (!context) {
    throw new Error('useNavigationHierarchy must be used within a NavigationHierarchyProvider');
  }
  return context;
};

interface NavigationHierarchyProviderProps {
  children: ReactNode;
}

export const NavigationHierarchyProvider = ({ children }: NavigationHierarchyProviderProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [navigationStack, setNavigationStack] = useState<NavigationLevel[]>([]);

  const addNavigationLevel = (level: NavigationLevel) => {
    setNavigationStack(prev => {
      // Remove any existing levels at the same level or deeper
      const filteredStack = prev.filter(existing => {
        if (level.level === 'primary') return false;
        if (level.level === 'secondary') return existing.level === 'primary';
        if (level.level === 'tertiary') return existing.level === 'primary' || existing.level === 'secondary';
        return true;
      });
      
      // Add the new level if it's not already present
      const exists = filteredStack.some(existing => existing.id === level.id);
      if (!exists) {
        return [...filteredStack, level];
      }
      return filteredStack;
    });
  };

  const removeNavigationLevel = (id: string) => {
    setNavigationStack(prev => prev.filter(level => level.id !== id));
  };

  const clearNavigationStack = () => {
    setNavigationStack([]);
  };

  const canGoBack = navigationStack.length > 1;

  const goBack = () => {
    if (canGoBack) {
      const previousLevel = navigationStack[navigationStack.length - 2];
      if (previousLevel) {
        navigate(previousLevel.path);
        setNavigationStack(prev => prev.slice(0, -1));
      }
    } else {
      navigate(-1);
    }
  };

  return (
    <NavigationHierarchyContext.Provider
      value={{
        currentPath: location.pathname,
        navigationStack,
        addNavigationLevel,
        removeNavigationLevel,
        clearNavigationStack,
        canGoBack,
        goBack,
      }}
    >
      {children}
    </NavigationHierarchyContext.Provider>
  );
};
