
import { useState, useEffect } from 'react';

interface RoadmapPreferences {
  isCollapsed: boolean;
  expandedCategories: string[];
  showEstimatedTimes: boolean;
  showCompletionPercentage: boolean;
}

const defaultPreferences: RoadmapPreferences = {
  isCollapsed: false,
  expandedCategories: ['setup', 'configuration', 'exploration'],
  showEstimatedTimes: true,
  showCompletionPercentage: true
};

export const useOnboardingRoadmap = () => {
  const [preferences, setPreferences] = useState<RoadmapPreferences>(() => {
    if (typeof window === 'undefined') return defaultPreferences;
    
    const stored = localStorage.getItem('onboarding-roadmap-preferences');
    if (stored) {
      try {
        return { ...defaultPreferences, ...JSON.parse(stored) };
      } catch {
        return defaultPreferences;
      }
    }
    return defaultPreferences;
  });

  useEffect(() => {
    localStorage.setItem('onboarding-roadmap-preferences', JSON.stringify(preferences));
  }, [preferences]);

  const updatePreferences = (updates: Partial<RoadmapPreferences>) => {
    setPreferences(prev => ({ ...prev, ...updates }));
  };

  const toggleCollapsed = () => {
    updatePreferences({ isCollapsed: !preferences.isCollapsed });
  };

  const toggleCategory = (category: string) => {
    const expandedCategories = preferences.expandedCategories.includes(category)
      ? preferences.expandedCategories.filter(c => c !== category)
      : [...preferences.expandedCategories, category];
    
    updatePreferences({ expandedCategories });
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
  };

  return {
    preferences,
    updatePreferences,
    toggleCollapsed,
    toggleCategory,
    resetPreferences
  };
};
