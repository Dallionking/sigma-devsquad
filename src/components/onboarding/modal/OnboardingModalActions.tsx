
import React from 'react';
import { Button } from '@/components/ui/button';
import { AnimatedActionButton } from '../visual-cues/AnimatedActionButton';
import { ArrowRight, SkipForward } from 'lucide-react';
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
    <div className="flex justify-between items-center gap-4 pt-6 border-t border-border/20">
      {currentStep !== 'completion' ? (
        <>
          {/* Secondary Action - Skip */}
          <Button
            variant="ghost"
            onClick={onSkip}
            className="h-9 px-4 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
          >
            <SkipForward className="w-4 h-4 mr-2" />
            Skip Tour
          </Button>
          
          {/* Primary Action - Continue */}
          <AnimatedActionButton 
            onClick={onNext} 
            isPrimary={true}
            showPulse={true}
            className="flex items-center gap-2 min-w-[120px]"
          >
            <span>{currentStep === 'planning-tour' ? 'Finish' : 'Continue'}</span>
            <ArrowRight className="w-4 h-4" />
          </AnimatedActionButton>
        </>
      ) : (
        /* Completion Action */
        <div className="w-full flex justify-center">
          <AnimatedActionButton 
            onClick={onFinish} 
            size="lg"
            isPrimary={true}
            showPulse={true}
            pulseColor="success"
            className="h-12 px-8 text-lg min-w-[180px]"
          >
            Start Building! 🚀
          </AnimatedActionButton>
        </div>
      )}
    </div>
  );
};
