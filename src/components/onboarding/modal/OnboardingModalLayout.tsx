
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { OnboardingProgressSidebar } from '../OnboardingProgressSidebar';
import { OnboardingModalHeader } from './OnboardingModalHeader';
import { OnboardingModalContent } from './OnboardingModalContent';
import { OnboardingModalActions } from './OnboardingModalActions';
import { OnboardingStepIndicators } from './OnboardingStepIndicators';
import { OnboardingHelpPanel } from '../help/OnboardingHelpPanel';
import { OnboardingVisualCues } from '../visual-cues/OnboardingVisualCues';
import { useOnboardingHelp } from '../help/useOnboardingHelp';
import { useOnboardingVisualCues } from '../visual-cues/useOnboardingVisualCues';
import { stepContent, stepOrder } from './stepContentConfig';

interface OnboardingModalLayoutProps {
  showOnboarding: boolean;
  setShowOnboarding: (show: boolean) => void;
  onProfileSetupComplete: (data: any) => void;
  onProfileSetupSkip: () => void;
  onTeamCreationComplete: (data: any) => void;
  onTeamCreationSkip: () => void;
  onFirstAgentComplete: (data: any) => void;
  onFirstAgentSkip: () => void;
  onPlanningTourComplete: () => void;
  onPlanningTourSkip: () => void;
  onNext: () => void;
  onSkip: () => void;
  getStepData: (step: any) => any;
}

export const OnboardingModalLayout = ({
  showOnboarding,
  setShowOnboarding,
  onProfileSetupComplete,
  onProfileSetupSkip,
  onTeamCreationComplete,
  onTeamCreationSkip,
  onFirstAgentComplete,
  onFirstAgentSkip,
  onPlanningTourComplete,
  onPlanningTourSkip,
  onNext,
  onSkip,
  getStepData
}: OnboardingModalLayoutProps) => {
  const { progress, getStepProgress, skipOnboarding } = useOnboarding();
  const [showProgressSidebar, setShowProgressSidebar] = useState(true);
  
  const { isHelpCollapsed, toggleHelpPanel } = useOnboardingHelp(progress.currentStep);
  
  // Get current form state for visual cues
  const currentStepData = getStepData(progress.currentStep);
  const { activeCues } = useOnboardingVisualCues(
    progress.currentStep, 
    currentStepData
  );

  if (!showOnboarding) return null;

  const { percentage } = getStepProgress();
  const currentContent = stepContent[progress.currentStep];
  const Icon = currentContent.icon;

  const showProfileSetup = progress.currentStep === 'profile-setup';
  const showTeamCreation = progress.currentStep === 'team-creation';
  const showFirstAgent = progress.currentStep === 'first-agent';
  const showPlanningTour = progress.currentStep === 'planning-tour';

  // Don't show actions for form steps
  const showActions = !showProfileSetup && !showTeamCreation && !showFirstAgent && !showPlanningTour;

  return (
    <>
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
                onProfileSetupComplete={onProfileSetupComplete}
                onProfileSetupSkip={onProfileSetupSkip}
                onTeamCreationComplete={onTeamCreationComplete}
                onTeamCreationSkip={onTeamCreationSkip}
                onFirstAgentComplete={onFirstAgentComplete}
                onFirstAgentSkip={onFirstAgentSkip}
                onPlanningTourComplete={onPlanningTourComplete}
                onPlanningTourSkip={onPlanningTourSkip}
                getStepData={getStepData}
              />

              <OnboardingModalActions
                currentStep={progress.currentStep}
                showActions={showActions}
                onNext={onNext}
                onSkip={onSkip}
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
