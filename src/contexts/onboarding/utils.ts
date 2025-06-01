
import { OnboardingStep, OnboardingProgress } from './types';
import { stepOrder } from './constants';

export const canNavigateToStep = (step: OnboardingStep, progress: OnboardingProgress): boolean => {
  const stepIndex = stepOrder.indexOf(step);
  const currentIndex = stepOrder.indexOf(progress.currentStep);
  
  // Can always go to completed steps
  if (progress.completedSteps.includes(step)) {
    return true;
  }
  
  // Can go to current step or one step ahead
  return stepIndex <= currentIndex + 1;
};

export const getStepProgress = (progress: OnboardingProgress) => {
  const currentIndex = stepOrder.indexOf(progress.currentStep);
  const totalSteps = stepOrder.length - 1; // Exclude completion
  const completedCount = progress.completedSteps.length;
  
  return {
    current: Math.max(currentIndex, completedCount),
    total: totalSteps,
    percentage: Math.min((completedCount / totalSteps) * 100, 100)
  };
};

export const getNextStep = (currentStep: OnboardingStep): OnboardingStep => {
  const currentIndex = stepOrder.indexOf(currentStep);
  return currentIndex < stepOrder.length - 1 ? stepOrder[currentIndex + 1] : 'completion';
};

export const isOnboardingComplete = (step: OnboardingStep, completedSteps: OnboardingStep[]): boolean => {
  return step === 'completion' || completedSteps.length >= stepOrder.length - 1;
};
