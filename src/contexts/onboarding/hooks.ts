
import { useState, useEffect } from 'react';
import { OnboardingStep, OnboardingProgress } from './types';
import { initialProgress } from './constants';
import { loadProgressFromStorage, saveProgressToStorage, shouldShowOnboarding } from './storage';
import { 
  canNavigateToStep as utilCanNavigateToStep, 
  getStepProgress as utilGetStepProgress,
  getNextStep,
  isOnboardingComplete
} from './utils';

export const useOnboardingState = (userId?: string) => {
  const [progress, setProgress] = useState<OnboardingProgress>(initialProgress);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    if (userId) {
      const storedProgress = loadProgressFromStorage(userId);
      setProgress(storedProgress);
      
      // Show onboarding if not complete and it's a first visit
      if (shouldShowOnboarding(storedProgress)) {
        setShowOnboarding(true);
      }
    }
  }, [userId]);

  // Save progress to localStorage
  useEffect(() => {
    if (userId) {
      saveProgressToStorage(userId, progress);
    }
  }, [progress, userId]);

  const startOnboarding = () => {
    setShowOnboarding(true);
    setProgress({
      ...initialProgress,
      isFirstVisit: false
    });
  };

  const completeStep = (step: OnboardingStep) => {
    setProgress(prev => {
      const completedSteps = [...prev.completedSteps];
      if (!completedSteps.includes(step)) {
        completedSteps.push(step);
      }

      // Determine next step
      const nextStep = getNextStep(step);
      const isComplete = isOnboardingComplete(step, completedSteps);

      return {
        ...prev,
        currentStep: isComplete ? 'completion' : nextStep,
        completedSteps,
        isOnboardingComplete: isComplete,
        isFirstVisit: false,
        hasCreatedAgent: prev.hasCreatedAgent || step === 'first-agent',
        hasCreatedTeam: prev.hasCreatedTeam || step === 'team-creation',
        hasUsedPlanning: prev.hasUsedPlanning || step === 'planning-tour'
      };
    });

    if (step === 'completion') {
      setShowOnboarding(false);
    }
  };

  const goToStep = (step: OnboardingStep) => {
    if (utilCanNavigateToStep(step, progress)) {
      setProgress(prev => ({
        ...prev,
        currentStep: step
      }));
    }
  };

  const canNavigateToStep = (step: OnboardingStep): boolean => {
    return utilCanNavigateToStep(step, progress);
  };

  const getStepProgress = () => {
    return utilGetStepProgress(progress);
  };

  const saveStepData = (step: OnboardingStep, data: any) => {
    setProgress(prev => ({
      ...prev,
      stepData: {
        ...prev.stepData,
        [step]: data
      }
    }));
  };

  const getStepData = (step: OnboardingStep) => {
    return progress.stepData[step] || null;
  };

  const skipOnboarding = () => {
    setProgress(prev => ({
      ...prev,
      isOnboardingComplete: true,
      isFirstVisit: false
    }));
    setShowOnboarding(false);
  };

  const resetOnboarding = () => {
    setProgress(initialProgress);
    setShowOnboarding(true);
  };

  return {
    progress,
    showOnboarding,
    setShowOnboarding,
    startOnboarding,
    completeStep,
    goToStep,
    canNavigateToStep,
    getStepProgress,
    saveStepData,
    getStepData,
    skipOnboarding,
    resetOnboarding
  };
};
