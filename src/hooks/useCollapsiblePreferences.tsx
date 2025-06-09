
import { useState, useEffect } from 'react';

interface CollapsiblePreferences {
  [sectionId: string]: boolean;
}

export const useCollapsiblePreferences = (storageKey: string = 'collapsible-preferences') => {
  const [preferences, setPreferences] = useState<CollapsiblePreferences>({});

  // Load preferences from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          setPreferences(JSON.parse(stored));
        }
      } catch (error) {
        console.warn('Failed to load collapsible preferences:', error);
      }
    }
  }, [storageKey]);

  // Save preferences to localStorage
  const savePreferences = (newPreferences: CollapsiblePreferences) => {
    setPreferences(newPreferences);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(storageKey, JSON.stringify(newPreferences));
      } catch (error) {
        console.warn('Failed to save collapsible preferences:', error);
      }
    }
  };

  // Toggle a specific section
  const toggleSection = (sectionId: string, isOpen?: boolean) => {
    const newState = isOpen !== undefined ? isOpen : !preferences[sectionId];
    const newPreferences = {
      ...preferences,
      [sectionId]: newState
    };
    savePreferences(newPreferences);
    return newState;
  };

  // Get the state of a specific section
  const getSectionState = (sectionId: string, defaultState: boolean = true) => {
    return preferences[sectionId] !== undefined ? preferences[sectionId] : defaultState;
  };

  // Reset all preferences
  const resetPreferences = () => {
    setPreferences({});
    if (typeof window !== 'undefined') {
      localStorage.removeItem(storageKey);
    }
  };

  // Bulk update preferences
  const updatePreferences = (updates: Partial<CollapsiblePreferences>) => {
    const newPreferences = {
      ...preferences,
      ...updates
    };
    savePreferences(newPreferences);
  };

  return {
    preferences,
    toggleSection,
    getSectionState,
    resetPreferences,
    updatePreferences
  };
};
