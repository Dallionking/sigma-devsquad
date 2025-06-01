
import { OnboardingStep, OnboardingProgress } from './types';

export const STORAGE_KEY = 'vibe-onboarding-progress';

export const stepOrder: OnboardingStep[] = [
  'welcome', 
  'profile-setup', 
  'team-creation', 
  'first-agent', 
  'planning-tour', 
  'completion'
];

export const initialProgress: OnboardingProgress = {
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
