
import { OnboardingProgress } from './types';
import { initialProgress, STORAGE_KEY } from './constants';

export const loadProgressFromStorage = (userId: string): OnboardingProgress => {
  const stored = localStorage.getItem(`${STORAGE_KEY}-${userId}`);
  if (stored) {
    try {
      const parsedProgress = JSON.parse(stored);
      return {
        ...initialProgress,
        ...parsedProgress,
        stepData: parsedProgress.stepData || initialProgress.stepData
      };
    } catch (error) {
      console.error('Failed to parse onboarding progress:', error);
    }
  }
  return initialProgress;
};

export const saveProgressToStorage = (userId: string, progress: OnboardingProgress): void => {
  localStorage.setItem(`${STORAGE_KEY}-${userId}`, JSON.stringify(progress));
};

export const shouldShowOnboarding = (progress: OnboardingProgress): boolean => {
  return !progress.isOnboardingComplete && progress.isFirstVisit;
};
