
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatedActionButton } from '../visual-cues/AnimatedActionButton';
import { cn } from '@/lib/utils';

interface TourNavigationControlsProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
}

export const TourNavigationControls = ({
  currentStep,
  totalSteps,
  onNext,
  onPrevious
}: TourNavigationControlsProps) => {
  const isLastStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;

  const handleNext = () => {
    console.log('Next button clicked, current step:', currentStep);
    onNext();
  };

  const handlePrevious = () => {
    console.log('Previous button clicked, current step:', currentStep);
    onPrevious();
  };

  return (
    <div className="flex items-center justify-between gap-4 mt-auto pt-6 border-t border-border/20">
      <Button
        variant="outline"
        size="sm"
        onClick={handlePrevious}
        disabled={isFirstStep}
        className={cn(
          "flex items-center gap-2 h-9 px-4 text-sm",
          isFirstStep && "opacity-50 cursor-not-allowed"
        )}
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Previous</span>
      </Button>
      
      <AnimatedActionButton
        onClick={handleNext}
        isPrimary={true}
        className="flex items-center gap-2 h-10 px-6"
      >
        <span className="text-sm font-medium">
          {isLastStep ? 'Finish Tour' : 'Next'}
        </span>
        {!isLastStep && <ChevronRight className="w-4 h-4" />}
      </AnimatedActionButton>
    </div>
  );
};
