
import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  systemPreference: boolean;
  useSystemPreference: boolean;
  setUseSystemPreference: (value: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [systemPreference, setSystemPreference] = useState(false);
  const [useSystemPreference, setUseSystemPreference] = useState(true);

  // Detect system preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemPreference(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPreference(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Load theme preference from localStorage
  useEffect(() => {
    const savedUseSystemPreference = localStorage.getItem('useSystemPreference');
    const savedDarkMode = localStorage.getItem('darkMode');
    
    if (savedUseSystemPreference !== null) {
      const useSystem = savedUseSystemPreference === 'true';
      setUseSystemPreference(useSystem);
      
      if (useSystem) {
        setDarkMode(systemPreference);
      } else if (savedDarkMode !== null) {
        setDarkMode(savedDarkMode === 'true');
      }
    } else {
      // First time visit - use system preference
      setDarkMode(systemPreference);
    }
  }, [systemPreference]);

  // Apply theme to document
  useEffect(() => {
    const effectiveDarkMode = useSystemPreference ? systemPreference : darkMode;
    
    if (effectiveDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Add smooth transition for theme changes
    document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    
    // Clean up transition after animation
    const timeoutId = setTimeout(() => {
      document.documentElement.style.transition = '';
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [darkMode, systemPreference, useSystemPreference]);

  const toggleDarkMode = () => {
    if (useSystemPreference) {
      // If using system preference, switch to manual mode
      setUseSystemPreference(false);
      setDarkMode(!systemPreference);
      localStorage.setItem('useSystemPreference', 'false');
      localStorage.setItem('darkMode', (!systemPreference).toString());
    } else {
      // Toggle manual mode
      const newDarkMode = !darkMode;
      setDarkMode(newDarkMode);
      localStorage.setItem('darkMode', newDarkMode.toString());
    }
  };

  const handleSetUseSystemPreference = (value: boolean) => {
    setUseSystemPreference(value);
    localStorage.setItem('useSystemPreference', value.toString());
    
    if (value) {
      setDarkMode(systemPreference);
    }
  };

  return (
    <ThemeContext.Provider value={{ 
      darkMode: useSystemPreference ? systemPreference : darkMode, 
      toggleDarkMode,
      systemPreference,
      useSystemPreference,
      setUseSystemPreference: handleSetUseSystemPreference
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
