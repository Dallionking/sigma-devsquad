
import React from 'react';
import { Button } from '@/components/ui/button';
import { AnimatedActionButton } from '../visual-cues/AnimatedActionButton';
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
          <AnimatedActionButton 
            onClick={onNext} 
            isPrimary={true}
            showPulse={true}
            className="flex items-center space-x-2"
          >
            <span>{currentStep === 'planning-tour' ? 'Finish' : 'Continue'}</span>
            <ArrowRight className="w-4 h-4" />
          </AnimatedActionButton>
        </>
      ) : (
        <div className="w-full flex justify-center">
          <AnimatedActionButton 
            onClick={onFinish} 
            size="lg"
            isPrimary={true}
            showPulse={true}
            pulseColor="success"
          >
            Start Building! 🚀
          </AnimatedActionButton>
        </div>
      )}
    </div>
  );
};
