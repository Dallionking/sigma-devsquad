
import { useState, useEffect } from 'react';
import { ViewMode } from '@/types';

export type ViewSpecificStep = 
  | 'team-overview'
  | 'team-collaboration'
  | 'team-members'
  | 'team-projects'
  | 'individual-agents'
  | 'individual-tasks'
  | 'individual-workflow'
  | 'individual-communication';

interface ViewOnboardingState {
  showTooltips: boolean;
  showGuidedTour: boolean;
  showGettingStarted: boolean;
  currentTourStep: number;
  dismissedTooltips: string[];
  completedTours: string[];
}

const initialState: ViewOnboardingState = {
  showTooltips: true,
  showGuidedTour: false,
  showGettingStarted: true,
  currentTourStep: 0,
  dismissedTooltips: [],
  completedTours: []
};

export const useViewSpecificOnboarding = (showTeamView: boolean, viewMode: ViewMode) => {
  const [state, setState] = useState<ViewOnboardingState>(initialState);
  const viewKey = showTeamView ? 'team' : 'individual';
  const storageKey = `onboarding-${viewKey}-${viewMode}`;

  // Load state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsedState = JSON.parse(saved);
        setState(prev => ({ ...prev, ...parsedState }));
      } catch (error) {
        console.warn('Failed to parse onboarding state:', error);
      }
    }
  }, [storageKey]);

  // Save state to localStorage
  const saveState = (newState: Partial<ViewOnboardingState>) => {
    const updatedState = { ...state, ...newState };
    setState(updatedState);
    localStorage.setItem(storageKey, JSON.stringify(updatedState));
  };

  const startGuidedTour = () => {
    saveState({
      showGuidedTour: true,
      currentTourStep: 0
    });
  };

  const nextTourStep = () => {
    const nextStep = state.currentTourStep + 1;
    saveState({ currentTourStep: nextStep });
  };

  const completeTour = () => {
    const tourId = `${viewKey}-${viewMode}`;
    saveState({
      showGuidedTour: false,
      currentTourStep: 0,
      completedTours: [...state.completedTours, tourId]
    });
  };

  const dismissTooltip = (tooltipId: string) => {
    saveState({
      dismissedTooltips: [...state.dismissedTooltips, tooltipId]
    });
  };

  const dismissGettingStarted = () => {
    saveState({ showGettingStarted: false });
  };

  const resetOnboarding = () => {
    localStorage.removeItem(storageKey);
    setState(initialState);
  };

  const isTooltipVisible = (tooltipId: string) => {
    return state.showTooltips && !state.dismissedTooltips.includes(tooltipId);
  };

  const isTourCompleted = () => {
    const tourId = `${viewKey}-${viewMode}`;
    return state.completedTours.includes(tourId);
  };

  return {
    state,
    startGuidedTour,
    nextTourStep,
    completeTour,
    dismissTooltip,
    dismissGettingStarted,
    resetOnboarding,
    isTooltipVisible,
    isTourCompleted
  };
};
