
import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { OnboardingProgressSidebar } from './OnboardingProgressSidebar';
import { OnboardingModalHeader } from './modal/OnboardingModalHeader';
import { OnboardingModalContent } from './modal/OnboardingModalContent';
import { OnboardingModalActions } from './modal/OnboardingModalActions';
import { OnboardingStepIndicators } from './modal/OnboardingStepIndicators';
import { stepContent, stepOrder } from './modal/stepContentConfig';

export const OnboardingModal = () => {
  const { 
    progress, 
    showOnboarding, 
    completeStep, 
    skipOnboarding, 
    setShowOnboarding,
    getStepProgress,
    saveStepData,
    getStepData
  } = useOnboarding();

  const [showProgressSidebar, setShowProgressSidebar] = useState(true);
  
  if (!showOnboarding) return null;

  const { percentage } = getStepProgress();
  const currentContent = stepContent[progress.currentStep];
  const Icon = currentContent.icon;

  const handleNext = () => {
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

  const toggleProgressSidebar = () => {
    setShowProgressSidebar(prev => !prev);
  };

  const showProfileSetup = progress.currentStep === 'profile-setup';
  const showTeamCreation = progress.currentStep === 'team-creation';
  const showFirstAgent = progress.currentStep === 'first-agent';
  const showPlanningTour = progress.currentStep === 'planning-tour';

  // Don't show actions for form steps
  const showActions = !showProfileSetup && !showTeamCreation && !showFirstAgent && !showPlanningTour;

  return (
    <Dialog open={showOnboarding} onOpenChange={setShowOnboarding}>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0 overflow-hidden flex flex-col sm:flex-row">
        {/* Progress Sidebar (collapsible on mobile) */}
        {showProgressSidebar && (
          <div className="hidden sm:block">
            <OnboardingProgressSidebar />
          </div>
        )}
        
        {/* Main content */}
        <div className="flex-1 h-[90vh] overflow-y-auto">
          <div className="p-6 space-y-6">
            <OnboardingModalHeader
              currentStep={progress.currentStep}
              title={currentContent.title}
              description={currentContent.description}
              icon={Icon}
              showProgressSidebar={showProgressSidebar}
              percentage={percentage}
              stepOrder={stepOrder}
              onToggleProgressSidebar={toggleProgressSidebar}
              onSkip={handleSkip}
              showSkipButton={progress.currentStep !== 'completion'}
            />

            <OnboardingModalContent
              currentStep={progress.currentStep}
              stepContent={currentContent.content}
              onProfileSetupComplete={handleProfileSetupComplete}
              onProfileSetupSkip={handleProfileSetupSkip}
              onTeamCreationComplete={handleTeamCreationComplete}
              onTeamCreationSkip={handleTeamCreationSkip}
              onFirstAgentComplete={handleFirstAgentComplete}
              onFirstAgentSkip={handleFirstAgentSkip}
              onPlanningTourComplete={handlePlanningTourComplete}
              onPlanningTourSkip={handlePlanningTourSkip}
              getStepData={getStepData}
            />

            <OnboardingModalActions
              currentStep={progress.currentStep}
              showActions={showActions}
              onNext={handleNext}
              onSkip={handleSkip}
              onFinish={() => setShowOnboarding(false)}
            />

            <OnboardingStepIndicators
              stepOrder={stepOrder}
              currentStep={progress.currentStep}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
