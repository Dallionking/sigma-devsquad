import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
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

      {/* Enhanced Modal with Proper Positioning and Backdrop */}
      <Dialog open={showOnboarding} onOpenChange={setShowOnboarding}>
        <DialogContent className="max-w-7xl w-[95vw] max-h-[95vh] h-[90vh] p-0 overflow-hidden flex flex-col sm:flex-row gap-0 border-0 bg-background/95 backdrop-blur-md shadow-2xl rounded-xl z-[100]">
          {/* Progress Sidebar */}
          {showProgressSidebar && (
            <div className="hidden lg:block w-80 border-r border-border/20 bg-card/50 backdrop-blur-sm">
              <OnboardingProgressSidebar />
            </div>
          )}
          
          {/* Main Content Container */}
          <div className="flex-1 h-full overflow-hidden relative">
            {/* Visual Cues */}
            {activeCues.map((cue) => (
              <OnboardingVisualCues
                key={cue.id}
                targetId={cue.targetId}
                type={cue.type}
                direction={cue.direction}
                message={cue.message}
                isComplete={cue.isComplete}
                progress={cue.progress}
                className="absolute z-20"
              />
            ))}
            
            {/* Scrollable Content */}
            <div className="h-full overflow-y-auto custom-scrollbar">
              <div className="p-6 lg:p-8 space-y-6">
                <OnboardingModalHeader
                  currentStep={progress.currentStep}
                  title={currentContent.title}
                  description={currentContent.description}
                  icon={Icon}
                  showProgressSidebar={showProgressSidebar}
                  percentage={percentage}
                  stepOrder={stepOrder}
                  onToggleProgressSidebar={toggleProgressSidebar}
                  onSkip={skipOnboarding}
                  showSkipButton={progress.currentStep !== 'completion'}
                  onToggleHelp={toggleHelpPanel}
                  isHelpCollapsed={isHelpCollapsed}
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
                  onSkip={skipOnboarding}
                  onFinish={() => setShowOnboarding(false)}
                />

                <OnboardingStepIndicators
                  stepOrder={stepOrder}
                  currentStep={progress.currentStep}
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Help Panel - Positioned outside modal */}
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
