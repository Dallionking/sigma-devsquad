
import React from 'react';
import { OnboardingStep } from '@/contexts/OnboardingContext';
import { ProfileSetupForm } from '../ProfileSetupForm';
import { TeamCreationForm } from '../TeamCreationForm';
import { FirstAgentForm } from '../first-agent/FirstAgentForm';
import { PlanningTourForm } from '../PlanningTourForm';
import { SimpleVideoTutorial } from '../video-tutorials/SimpleVideoTutorial';

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

  // Steps that should show video tutorials
  const videoEnabledSteps = ['welcome', 'profile-setup', 'team-creation', 'first-agent', 'planning-tour', 'completion'];
  const shouldShowVideoOption = videoEnabledSteps.includes(currentStep);

  return (
    <div className="py-6 space-y-6">
      {/* Video Tutorial Section */}
      {shouldShowVideoOption && (
        <SimpleVideoTutorial currentStep={currentStep} />
      )}

      {/* Main Content */}
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
