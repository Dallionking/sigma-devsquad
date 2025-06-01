
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
  stepData: Record<OnboardingStep, any>;
}

interface OnboardingContextType {
  progress: OnboardingProgress;
  showOnboarding: boolean;
  startOnboarding: () => void;
  completeStep: (step: OnboardingStep) => void;
  skipOnboarding: () => void;
  resetOnboarding: () => void;
  setShowOnboarding: (show: boolean) => void;
  goToStep: (step: OnboardingStep) => void;
  canNavigateToStep: (step: OnboardingStep) => boolean;
  getStepProgress: () => { current: number; total: number; percentage: number };
  saveStepData: (step: OnboardingStep, data: any) => void;
  getStepData: (step: OnboardingStep) => any;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

const STORAGE_KEY = 'vibe-onboarding-progress';

const stepOrder: OnboardingStep[] = ['welcome', 'profile-setup', 'team-creation', 'first-agent', 'planning-tour', 'completion'];

const initialProgress: OnboardingProgress = {
  currentStep: 'welcome',
  completedSteps: [],
  isOnboardingComplete: false,
  isFirstVisit: true,
  hasCreatedAgent: false,
  hasCreatedTeam: false,
  hasUsedPlanning: false,
  stepData: {
    welcome: null,
    'profile-setup': null,
    'team-creation': null,
    'first-agent': null,
    'planning-tour': null,
    completion: null
  }
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
          setProgress({
            ...initialProgress,
            ...parsedProgress,
            stepData: parsedProgress.stepData || initialProgress.stepData
          });
          
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
      const currentIndex = stepOrder.indexOf(step);
      const nextStep = currentIndex < stepOrder.length - 1 ? stepOrder[currentIndex + 1] : 'completion';

      const isComplete = step === 'completion' || completedSteps.length >= stepOrder.length - 1;

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
    if (canNavigateToStep(step)) {
      setProgress(prev => ({
        ...prev,
        currentStep: step
      }));
    }
  };

  const canNavigateToStep = (step: OnboardingStep): boolean => {
    const stepIndex = stepOrder.indexOf(step);
    const currentIndex = stepOrder.indexOf(progress.currentStep);
    
    // Can always go to completed steps
    if (progress.completedSteps.includes(step)) {
      return true;
    }
    
    // Can go to current step or one step ahead
    return stepIndex <= currentIndex + 1;
  };

  const getStepProgress = () => {
    const currentIndex = stepOrder.indexOf(progress.currentStep);
    const totalSteps = stepOrder.length - 1; // Exclude completion
    const completedCount = progress.completedSteps.length;
    
    return {
      current: Math.max(currentIndex, completedCount),
      total: totalSteps,
      percentage: Math.min((completedCount / totalSteps) * 100, 100)
    };
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

  return (
    <OnboardingContext.Provider value={{
      progress,
      showOnboarding,
      startOnboarding,
      completeStep,
      skipOnboarding,
      resetOnboarding,
      setShowOnboarding,
      goToStep,
      canNavigateToStep,
      getStepProgress,
      saveStepData,
      getStepData
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
