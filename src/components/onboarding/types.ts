import { OnboardingError, UserData } from '@/stores/onboardingStore';

// Common interface for all onboarding step components
export interface OnboardingStepProps {
  userData: UserData;
  onDataUpdate: (data: Partial<UserData>) => void;
  errors: OnboardingError[];
  isLoading: boolean;
  className?: string;
}

// Re-export types from store for convenience
export type { OnboardingError, UserData } from '@/stores/onboardingStore';
