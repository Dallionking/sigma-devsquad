
import React, { useState } from 'react';
import { TourStep } from './ViewSpecificTourConfig';
import { useTooltipPositioner } from './TooltipPositioner';
import { useTargetHighlighter } from './TargetHighlighter';
import { TourTooltipContent } from './TourTooltipContent';

interface ViewSpecificGuidedTourProps {
  steps: TourStep[];
  currentStep: number;
  isActive: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onComplete: () => void;
  onClose: () => void;
}

export const ViewSpecificGuidedTour = ({
  steps,
  currentStep,
  isActive,
  onNext,
  onPrevious,
  onComplete,
  onClose
}: ViewSpecificGuidedTourProps) => {
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  // Use the tooltip positioner hook
  useTooltipPositioner({
    currentStepData,
    isActive,
    onPositionCalculated: setTooltipPosition,
    onTargetFound: setTargetElement
  });

  // Use the target highlighter hook
  const { cleanup } = useTargetHighlighter({ targetElement, isActive });

  const handleNext = () => {
    if (isLastStep) {
      cleanup();
      onComplete();
    } else {
      onNext();
    }
  };

  const handleClose = () => {
    cleanup();
    onClose();
  };

  if (!isActive || !currentStepData) {
    return null;
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-[999] pointer-events-none" />
      
      {/* Tooltip */}
      <TourTooltipContent
        currentStepData={currentStepData}
        currentStep={currentStep}
        totalSteps={steps.length}
        tooltipPosition={tooltipPosition}
        onNext={handleNext}
        onPrevious={onPrevious}
        onClose={handleClose}
      />
    </>
  );
};
