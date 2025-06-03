
import React from 'react';
import { ViewMode } from '@/types';
import { useViewSpecificOnboarding } from '@/hooks/useViewSpecificOnboarding';
import { ViewSpecificGuidedTour } from './ViewSpecificGuidedTour';
import { ViewSpecificTooltips } from './ViewSpecificTooltips';
import { GettingStartedCard } from './GettingStartedCard';
import { getTourSteps } from './ViewSpecificTourConfig';

interface ViewSpecificOnboardingManagerProps {
  showTeamView: boolean;
  viewMode: ViewMode;
}

export const ViewSpecificOnboardingManager = ({
  showTeamView,
  viewMode
}: ViewSpecificOnboardingManagerProps) => {
  const {
    state,
    startGuidedTour,
    nextTourStep,
    previousTourStep,
    completeTour,
    dismissTooltip,
    dismissGettingStarted,
    isTooltipVisible,
    isTourCompleted
  } = useViewSpecificOnboarding(showTeamView, viewMode);

  const tourSteps = getTourSteps(showTeamView, viewMode);

  const handleCloseTour = () => {
    completeTour();
  };

  const handlePreviousStep = () => {
    if (state.currentTourStep > 0) {
      previousTourStep();
    }
  };

  return (
    <>
      {/* Getting Started Card with consistent spacing */}
      {state.showGettingStarted && (
        <div className="container-spacing-tight section-spacing-tight">
          <GettingStartedCard
            showTeamView={showTeamView}
            viewMode={viewMode}
            onStartTour={startGuidedTour}
            onDismiss={dismissGettingStarted}
            isTourCompleted={isTourCompleted()}
          />
        </div>
      )}

      {/* Contextual Tooltips */}
      <ViewSpecificTooltips
        showTeamView={showTeamView}
        viewMode={viewMode}
        isTooltipVisible={isTooltipVisible}
        onDismissTooltip={dismissTooltip}
      />

      {/* Guided Tour */}
      <ViewSpecificGuidedTour
        steps={tourSteps}
        currentStep={state.currentTourStep}
        isActive={state.showGuidedTour}
        onNext={nextTourStep}
        onPrevious={handlePreviousStep}
        onComplete={completeTour}
        onClose={handleCloseTour}
      />
    </>
  );
};
