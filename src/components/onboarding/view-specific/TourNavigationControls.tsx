
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
    <div className="flex items-center justify-between gap-3 mt-auto pt-4 border-t border-border">
      <Button
        variant="outline"
        size="sm"
        onClick={handlePrevious}
        disabled={isFirstStep}
        className={cn(
          "flex items-center gap-2 min-w-[80px] h-9",
          isFirstStep && "opacity-50 cursor-not-allowed"
        )}
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="text-sm">Previous</span>
      </Button>
      
      <Button
        onClick={handleNext}
        size="sm"
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white min-w-[80px] h-9"
      >
        <span className="text-sm">{isLastStep ? 'Finish Tour' : 'Next'}</span>
        {!isLastStep && <ChevronRight className="w-4 h-4" />}
      </Button>
    </div>
  );
};
