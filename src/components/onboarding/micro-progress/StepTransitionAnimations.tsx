
import React, { useState, useEffect } from 'react';
import { OnboardingStep } from '@/contexts/OnboardingContext';
import { CheckCircle, ArrowRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepTransitionAnimationsProps {
  fromStep: OnboardingStep;
  toStep: OnboardingStep;
  isTransitioning: boolean;
  onTransitionComplete?: () => void;
}

export const StepTransitionAnimations = ({
  fromStep,
  toStep,
  isTransitioning,
  onTransitionComplete
}: StepTransitionAnimationsProps) => {
  const [phase, setPhase] = useState<'completing' | 'transitioning' | 'arriving'>('completing');

  useEffect(() => {
    if (isTransitioning) {
      // Phase 1: Show completion of current step
      setPhase('completing');
      
      const timer1 = setTimeout(() => {
        setPhase('transitioning');
      }, 800);

      // Phase 2: Show transition
      const timer2 = setTimeout(() => {
        setPhase('arriving');
      }, 1500);

      // Phase 3: Complete transition
      const timer3 = setTimeout(() => {
        onTransitionComplete?.();
      }, 2200);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [isTransitioning, onTransitionComplete]);

  if (!isTransitioning) return null;

  const getStepTitle = (step: OnboardingStep) => {
    const titles = {
      'welcome': 'Welcome',
      'profile-setup': 'Profile Setup',
      'team-creation': 'Team Creation',
      'first-agent': 'First Agent',
      'planning-tour': 'Planning Tour'
    };
    return titles[step] || step;
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card border rounded-lg p-8 max-w-md w-full mx-4 shadow-lg">
        {/* Completing Phase */}
        {phase === 'completing' && (
          <div className="text-center space-y-4 animate-in fade-in-0 duration-500">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600 animate-in zoom-in-0 duration-300" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-700 dark:text-green-400">
                {getStepTitle(fromStep)} Complete!
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Great job! You've successfully completed this step.
              </p>
            </div>
            <div className="flex justify-center">
              <Star className="w-4 h-4 text-yellow-500 animate-pulse" />
            </div>
          </div>
        )}

        {/* Transitioning Phase */}
        {phase === 'transitioning' && (
          <div className="text-center space-y-4 animate-in slide-in-from-left-4 duration-500">
            <div className="flex items-center justify-center space-x-3">
              <div className="text-sm font-medium text-muted-foreground">
                {getStepTitle(fromStep)}
              </div>
              <ArrowRight className="w-5 h-5 text-primary animate-pulse" />
              <div className="text-sm font-medium text-primary">
                {getStepTitle(toStep)}
              </div>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: '60%' }} />
            </div>
            <p className="text-sm text-muted-foreground">
              Preparing next step...
            </p>
          </div>
        )}

        {/* Arriving Phase */}
        {phase === 'arriving' && (
          <div className="text-center space-y-4 animate-in slide-in-from-right-4 duration-500">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <ArrowRight className="w-8 h-8 text-primary animate-in zoom-in-0 duration-300" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                Welcome to {getStepTitle(toStep)}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Let's continue your onboarding journey.
              </p>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full transition-all duration-1000" style={{ width: '100%' }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
