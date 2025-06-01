
import React from 'react';
import { OnboardingStep } from '@/contexts/OnboardingContext';
import { ProfileSetupForm } from '../ProfileSetupForm';
import { TeamCreationForm } from '../TeamCreationForm';
import { FirstAgentForm } from '../first-agent/FirstAgentForm';
import { PlanningTourForm } from '../PlanningTourForm';
import { OnboardingVideoTutorial } from '../video-tutorials/OnboardingVideoTutorial';

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
  onVideoComplete?: () => void;
  onVideoSkip?: () => void;
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
  onVideoComplete,
  onVideoSkip,
  getStepData
}: OnboardingModalContentProps) => {
  const showProfileSetup = currentStep === 'profile-setup';
  const showTeamCreation = currentStep === 'team-creation';
  const showFirstAgent = currentStep === 'first-agent';
  const showPlanningTour = currentStep === 'planning-tour';
  
  // Show video tutorials for welcome and completion steps
  const showVideoTutorial = currentStep === 'welcome' || currentStep === 'completion';

  return (
    <div className="py-6 space-y-6">
      {/* Video Tutorial Section */}
      {showVideoTutorial && onVideoComplete && onVideoSkip && (
        <OnboardingVideoTutorial
          step={currentStep}
          onComplete={onVideoComplete}
          onSkip={onVideoSkip}
          autoPlay={currentStep === 'welcome'}
        />
      )}

      {/* Form Content */}
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
      ) : !showVideoTutorial ? (
        stepContent
      ) : null}
    </div>
  );
};
