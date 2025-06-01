
import React from 'react';
import { OnboardingStep } from '@/contexts/OnboardingContext';
import { ProfileSetupForm } from '../ProfileSetupForm';
import { TeamCreationForm } from '../TeamCreationForm';
import { FirstAgentForm } from '../first-agent/FirstAgentForm';
import { PlanningTourForm } from '../PlanningTourForm';

interface OnboardingModalContentProps {
  currentStep: OnboardingStep;
  stepContent: React.ReactNode;
  onProfileSetupComplete: (data: any) => void;
  onProfileSetupSkip: () => void;
  onTeamCreationComplete: (data: any) => void;
  onTeamCreationSkip: () => void;
  onFirstAgentComplete: (data: any) => void;
  onFirstAgentSkip: () => void;
  onPlanningTourComplete: () => void;
  onPlanningTourSkip: () => void;
  getStepData: (step: OnboardingStep) => any;
}

export const OnboardingModalContent = ({
  currentStep,
  stepContent,
  onProfileSetupComplete,
  onProfileSetupSkip,
  onTeamCreationComplete,
  onTeamCreationSkip,
  onFirstAgentComplete,
  onFirstAgentSkip,
  onPlanningTourComplete,
  onPlanningTourSkip,
  getStepData
}: OnboardingModalContentProps) => {
  const showProfileSetup = currentStep === 'profile-setup';
  const showTeamCreation = currentStep === 'team-creation';
  const showFirstAgent = currentStep === 'first-agent';
  const showPlanningTour = currentStep === 'planning-tour';

  return (
    <div className="py-6">
      {showProfileSetup ? (
        <ProfileSetupForm 
          onComplete={onProfileSetupComplete}
          onSkip={onProfileSetupSkip}
          initialData={getStepData('profile-setup')}
        />
      ) : showTeamCreation ? (
        <TeamCreationForm 
          onComplete={onTeamCreationComplete}
          onSkip={onTeamCreationSkip}
        />
      ) : showFirstAgent ? (
        <FirstAgentForm
          onComplete={onFirstAgentComplete}
          onSkip={onFirstAgentSkip}
        />
      ) : showPlanningTour ? (
        <PlanningTourForm
          onComplete={onPlanningTourComplete}
          onSkip={onPlanningTourSkip}
        />
      ) : (
        stepContent
      )}
    </div>
  );
};
