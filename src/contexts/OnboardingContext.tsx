
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export type OnboardingStep = 
  | 'welcome'
  | 'profile-setup'
  | 'team-creation'
  | 'first-agent'
  | 'planning-tour'
  | 'completion';

export interface OnboardingProgress {
  currentStep: OnboardingStep;
  completedSteps: OnboardingStep[];
  isOnboardingComplete: boolean;
  isFirstVisit: boolean;
  hasCreatedAgent: boolean;
  hasCreatedTeam: boolean;
  hasUsedPlanning: boolean;
}

interface OnboardingContextType {
  progress: OnboardingProgress;
  showOnboarding: boolean;
  startOnboarding: () => void;
  completeStep: (step: OnboardingStep) => void;
  skipOnboarding: () => void;
  resetOnboarding: () => void;
  setShowOnboarding: (show: boolean) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

const STORAGE_KEY = 'vibe-onboarding-progress';

const initialProgress: OnboardingProgress = {
  currentStep: 'welcome',
  completedSteps: [],
  isOnboardingComplete: false,
  isFirstVisit: true,
  hasCreatedAgent: false,
  hasCreatedTeam: false,
  hasUsedPlanning: false
};

export const OnboardingProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<OnboardingProgress>(initialProgress);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    if (user?.id) {
      const stored = localStorage.getItem(`${STORAGE_KEY}-${user.id}`);
      if (stored) {
        try {
          const parsedProgress = JSON.parse(stored);
          setProgress(parsedProgress);
          
          // Show onboarding if not complete and it's a first visit
          if (!parsedProgress.isOnboardingComplete && parsedProgress.isFirstVisit) {
            setShowOnboarding(true);
          }
        } catch (error) {
          console.error('Failed to parse onboarding progress:', error);
        }
      } else {
        // First time user - show onboarding
        setShowOnboarding(true);
        setProgress({ ...initialProgress, isFirstVisit: true });
      }
    }
  }, [user?.id]);

  // Save progress to localStorage
  useEffect(() => {
    if (user?.id) {
      localStorage.setItem(`${STORAGE_KEY}-${user.id}`, JSON.stringify(progress));
    }
  }, [progress, user?.id]);

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
      let nextStep: OnboardingStep;
      switch (step) {
        case 'welcome':
          nextStep = 'profile-setup';
          break;
        case 'profile-setup':
          nextStep = 'team-creation';
          break;
        case 'team-creation':
          nextStep = 'first-agent';
          break;
        case 'first-agent':
          nextStep = 'planning-tour';
          break;
        case 'planning-tour':
          nextStep = 'completion';
          break;
        default:
          nextStep = 'completion';
      }

      const isComplete = step === 'completion' || completedSteps.length >= 5;

      return {
        ...prev,
        currentStep: isComplete ? 'completion' : nextStep,
        completedSteps,
        isOnboardingComplete: isComplete,
        isFirstVisit: false
      };
    });

    if (step === 'completion') {
      setShowOnboarding(false);
    }
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

  return (
    <OnboardingContext.Provider value={{
      progress,
      showOnboarding,
      startOnboarding,
      completeStep,
      skipOnboarding,
      resetOnboarding,
      setShowOnboarding
    }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
