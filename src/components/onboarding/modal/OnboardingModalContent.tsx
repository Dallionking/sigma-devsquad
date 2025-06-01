
import React, { useState } from 'react';
import { OnboardingStep } from '@/contexts/OnboardingContext';
import { ProfileSetupForm } from '../ProfileSetupForm';
import { TeamCreationForm } from '../TeamCreationForm';
import { FirstAgentForm } from '../first-agent/FirstAgentForm';
import { PlanningTourForm } from '../PlanningTourForm';
import { OnboardingVideoTutorial } from '../video-tutorials/OnboardingVideoTutorial';
import { DetailedStepProgress } from '../progress/DetailedStepProgress';

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
  const [showVideo, setShowVideo] = useState(false);
  const [hasWatchedVideo, setHasWatchedVideo] = useState(false);

  const showProfileSetup = currentStep === 'profile-setup';
  const showTeamCreation = currentStep === 'team-creation';
  const showFirstAgent = currentStep === 'first-agent';
  const showPlanningTour = currentStep === 'planning-tour';
  const showCompletion = currentStep === 'completion';

  // Steps that should show video tutorials
  const videoEnabledSteps = ['welcome', 'profile-setup', 'team-creation', 'first-agent', 'planning-tour', 'completion'];
  const shouldShowVideoOption = videoEnabledSteps.includes(currentStep);

  // Steps that should show detailed progress
  const progressEnabledSteps = ['profile-setup', 'team-creation', 'first-agent', 'planning-tour'];
  const shouldShowProgress = progressEnabledSteps.includes(currentStep);

  const handleContinueAfterVideo = () => {
    setShowVideo(false);
    // For steps with forms, don't auto-proceed
    if (showProfileSetup || showTeamCreation || showFirstAgent || showPlanningTour) {
      return;
    }
  };

  const handleVideoComplete = () => {
    setHasWatchedVideo(true);
  };

  const handleSkipVideo = () => {
    setShowVideo(false);
  };

  const toggleVideo = () => {
    setShowVideo(!showVideo);
  };

  return (
    <div className="py-6 space-y-6">
      {/* Video Tutorial Section */}
      {shouldShowVideoOption && (
        <OnboardingVideoTutorial
          currentStep={currentStep}
          onVideoComplete={handleVideoComplete}
          onSkipVideo={handleSkipVideo}
          onContinue={handleContinueAfterVideo}
          showVideo={showVideo}
          onToggleVideo={toggleVideo}
        />
      )}

      {/* Detailed Progress Indicator - only show if not watching video */}
      {!showVideo && shouldShowProgress && (
        <DetailedStepProgress
          currentStep={currentStep}
          stepData={getStepData(currentStep)}
        />
      )}

      {/* Main Content - only show if not watching video */}
      {!showVideo && (
        <>
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
        </>
      )}
    </div>
  );
};
