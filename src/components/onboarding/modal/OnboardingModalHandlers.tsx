
import { useState } from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { stepOrder } from './stepContentConfig';

export const useOnboardingModalHandlers = () => {
  const { 
    progress, 
    completeStep, 
    skipOnboarding, 
    setShowOnboarding,
    saveStepData
  } = useOnboarding();

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionData, setTransitionData] = useState<{
    fromStep: string;
    toStep: string;
  } | null>(null);

  const handleNext = () => {
    const currentStepIndex = stepOrder.findIndex(step => step === progress.currentStep);
    const nextStep = stepOrder[currentStepIndex + 1];
    
    if (nextStep) {
      setTransitionData({
        fromStep: progress.currentStep,
        toStep: nextStep
      });
      setIsTransitioning(true);
    } else {
      completeStep(progress.currentStep);
    }
  };

  const handleTransitionComplete = () => {
    setIsTransitioning(false);
    setTransitionData(null);
    completeStep(progress.currentStep);
  };

  const handleSkip = () => {
    skipOnboarding();
  };

  const handleProfileSetupComplete = (profileData: any) => {
    saveStepData('profile-setup', profileData);
    completeStep('profile-setup');
  };

  const handleProfileSetupSkip = () => {
    completeStep('profile-setup');
  };

  const handleTeamCreationComplete = (teamData: any) => {
    saveStepData('team-creation', teamData);
    completeStep('team-creation');
  };

  const handleTeamCreationSkip = () => {
    completeStep('team-creation');
  };

  const handleFirstAgentComplete = (agentData: any) => {
    saveStepData('first-agent', agentData);
    completeStep('first-agent');
  };

  const handleFirstAgentSkip = () => {
    completeStep('first-agent');
  };

  const handlePlanningTourComplete = () => {
    completeStep('planning-tour');
  };

  const handlePlanningTourSkip = () => {
    completeStep('planning-tour');
  };

  return {
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
  };
};
