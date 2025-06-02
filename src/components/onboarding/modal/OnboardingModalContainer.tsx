
import React from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { OnboardingModalLayout } from './OnboardingModalLayout';
import { OnboardingTransitionManager } from './OnboardingTransitionManager';
import { useOnboardingModalHandlers } from './OnboardingModalHandlers';

export const OnboardingModalContainer = () => {
  const { showOnboarding, setShowOnboarding, getStepData } = useOnboarding();
  
  const {
    isTransitioning,
    transitionData,
    handleNext,
    handleTransitionComplete,
    handleSkip,
    handleProfileSetupComplete,
    handleProfileSetupSkip,
    handleTeamCreationComplete,
    handleTeamCreationSkip,
    handleFirstAgentComplete,
    handleFirstAgentSkip,
    handlePlanningTourComplete,
    handlePlanningTourSkip
  } = useOnboardingModalHandlers();

  return (
    <>
      {/* Step Transition Animations */}
      <OnboardingTransitionManager
        isTransitioning={isTransitioning}
        transitionData={transitionData}
        onTransitionComplete={handleTransitionComplete}
      />

      <OnboardingModalLayout
        showOnboarding={showOnboarding}
        setShowOnboarding={setShowOnboarding}
        onProfileSetupComplete={handleProfileSetupComplete}
        onProfileSetupSkip={handleProfileSetupSkip}
        onTeamCreationComplete={handleTeamCreationComplete}
        onTeamCreationSkip={handleTeamCreationSkip}
        onFirstAgentComplete={handleFirstAgentComplete}
        onFirstAgentSkip={handleFirstAgentSkip}
        onPlanningTourComplete={handlePlanningTourComplete}
        onPlanningTourSkip={handlePlanningTourSkip}
        onNext={handleNext}
        onSkip={handleSkip}
        getStepData={getStepData}
      />
    </>
  );
};
