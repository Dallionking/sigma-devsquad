
import React, { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';
import { OnboardingContextType } from './onboarding/types';
import { useOnboardingState } from './onboarding/hooks';

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const onboardingState = useOnboardingState(user?.id);

  return (
    <OnboardingContext.Provider value={onboardingState}>
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

// Re-export types for backward compatibility
export type { OnboardingStep } from './onboarding/types';
