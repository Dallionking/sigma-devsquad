
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { OnboardingStep } from '@/contexts/OnboardingContext';

interface OnboardingModalActionsProps {
  currentStep: OnboardingStep;
  showActions: boolean;
  onNext: () => void;
  onSkip: () => void;
  onFinish: () => void;
}

export const OnboardingModalActions = ({
  currentStep,
  showActions,
  onNext,
  onSkip,
  onFinish
}: OnboardingModalActionsProps) => {
  if (!showActions) return null;

  return (
    <div className="flex justify-between">
      {currentStep !== 'completion' ? (
        <>
          <Button
            variant="outline"
            onClick={onSkip}
          >
            Skip Tour
          </Button>
          <Button onClick={onNext} className="flex items-center space-x-2">
            <span>{currentStep === 'planning-tour' ? 'Finish' : 'Continue'}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </>
      ) : (
        <div className="w-full flex justify-center">
          <Button onClick={onFinish} size="lg">
            Start Building! 🚀
          </Button>
        </div>
      )}
    </div>
  );
};
