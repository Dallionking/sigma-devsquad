
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

export interface OnboardingContextType {
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
