
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';

export const ThemeToggle = () => {
  const { darkMode, toggleDarkMode, useSystemPreference } = useTheme();
  
  const effectiveDarkMode = useSystemPreference ? 
    window.matchMedia('(prefers-color-scheme: dark)').matches : 
    darkMode;

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleDarkMode}
      className="h-9 w-9 p-0"
      aria-label={effectiveDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {effectiveDarkMode ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
};
