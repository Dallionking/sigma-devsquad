
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { OnboardingProgressSidebar } from './OnboardingProgressSidebar';
import { OnboardingModalHeader } from './modal/OnboardingModalHeader';
import { OnboardingModalContent } from './modal/OnboardingModalContent';
import { OnboardingModalActions } from './modal/OnboardingModalActions';
import { OnboardingStepIndicators } from './modal/OnboardingStepIndicators';
import { OnboardingHelpPanel } from './help/OnboardingHelpPanel';
import { OnboardingVisualCues } from './visual-cues/OnboardingVisualCues';
import { StepTransitionAnimations } from './micro-progress/StepTransitionAnimations';
import { useOnboardingHelp } from './help/useOnboardingHelp';
import { useOnboardingVisualCues } from './visual-cues/useOnboardingVisualCues';
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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionData, setTransitionData] = useState<{
    fromStep: string;
    toStep: string;
  } | null>(null);
  
  const { isHelpCollapsed, toggleHelpPanel } = useOnboardingHelp(progress.currentStep);
  
  // Get current form state for visual cues
  const currentStepData = getStepData(progress.currentStep);
  const { activeCues, updateCueProgress, removeCue } = useOnboardingVisualCues(
    progress.currentStep, 
    currentStepData
  );
  
  if (!showOnboarding) return null;

  const { percentage } = getStepProgress();
  const currentContent = stepContent[progress.currentStep];
  const Icon = currentContent.icon;

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
    <>
      {/* Step Transition Animations */}
      {isTransitioning && transitionData && (
        <StepTransitionAnimations
          fromStep={transitionData.fromStep as any}
          toStep={transitionData.toStep as any}
          isTransitioning={isTransitioning}
          onTransitionComplete={handleTransitionComplete}
        />
      )}

      <Dialog open={showOnboarding} onOpenChange={setShowOnboarding}>
        <DialogContent className={`max-w-6xl max-h-[90vh] p-0 overflow-hidden flex flex-col sm:flex-row ${isHelpCollapsed ? '' : 'mr-96'}`}>
          <VisuallyHidden>
            <DialogTitle>{currentContent.title}</DialogTitle>
            <DialogDescription>{currentContent.description}</DialogDescription>
          </VisuallyHidden>
          
          {/* Progress Sidebar (collapsible on mobile) */}
          {showProgressSidebar && (
            <div className="hidden sm:block">
              <OnboardingProgressSidebar />
            </div>
          )}
          
          {/* Main content */}
          <div className="flex-1 h-[90vh] overflow-y-auto relative">
            {/* Render visual cues */}
            {activeCues.map((cue) => (
              <OnboardingVisualCues
                key={cue.id}
                targetId={cue.targetId}
                type={cue.type}
                direction={cue.direction}
                message={cue.message}
                isComplete={cue.isComplete}
                progress={cue.progress}
                className={cue.targetId ? `absolute z-10` : ''}
              />
            ))}
            
            <div className="p-6 space-y-6">
              <OnboardingModalHeader
                currentStep={progress.currentStep}
                title={currentContent.title}
                description={currentContent.description}
                icon={Icon}
                showProgressSidebar={showProgressSidebar}
                percentage={percentage}
                stepOrder={stepOrder}
                onToggleProgressSidebar={() => setShowProgressSidebar(prev => !prev)}
                onSkip={() => skipOnboarding()}
                showSkipButton={progress.currentStep !== 'completion'}
                onToggleHelp={toggleHelpPanel}
                isHelpCollapsed={isHelpCollapsed}
              />

              <OnboardingModalContent
                currentStep={progress.currentStep}
                stepContent={currentContent.content}
                onProfileSetupComplete={(data) => {
                  saveStepData('profile-setup', data);
                  completeStep('profile-setup');
                }}
                onProfileSetupSkip={() => completeStep('profile-setup')}
                onTeamCreationComplete={(data) => {
                  saveStepData('team-creation', data);
                  completeStep('team-creation');
                }}
                onTeamCreationSkip={() => completeStep('team-creation')}
                onFirstAgentComplete={(data) => {
                  saveStepData('first-agent', data);
                  completeStep('first-agent');
                }}
                onFirstAgentSkip={() => completeStep('first-agent')}
                onPlanningTourComplete={() => completeStep('planning-tour')}
                onPlanningTourSkip={() => completeStep('planning-tour')}
                getStepData={getStepData}
              />

              <OnboardingModalActions
                currentStep={progress.currentStep}
                showActions={showActions}
                onNext={handleNext}
                onSkip={() => skipOnboarding()}
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

      {/* Help Panel - Outside dialog to avoid z-index issues */}
      {showOnboarding && (
        <OnboardingHelpPanel
          currentStep={progress.currentStep}
          isCollapsed={isHelpCollapsed}
          onToggleCollapse={toggleHelpPanel}
        />
      )}
    </>
  );
};
