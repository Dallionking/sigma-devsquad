
import React, { useState, useEffect } from 'react';
import { OnboardingStep } from '@/contexts/OnboardingContext';
import { CompletingPhase } from './transitions/CompletingPhase';
import { TransitioningPhase } from './transitions/TransitioningPhase';
import { ArrivingPhase } from './transitions/ArrivingPhase';

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

  const fromStepTitle = getStepTitle(fromStep);
  const toStepTitle = getStepTitle(toStep);

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card border rounded-lg p-8 max-w-md w-full mx-4 shadow-lg">
        {/* Completing Phase */}
        {phase === 'completing' && (
          <CompletingPhase stepTitle={fromStepTitle} />
        )}

        {/* Transitioning Phase */}
        {phase === 'transitioning' && (
          <TransitioningPhase 
            fromStepTitle={fromStepTitle}
            toStepTitle={toStepTitle}
          />
        )}

        {/* Arriving Phase */}
        {phase === 'arriving' && (
          <ArrivingPhase stepTitle={toStepTitle} />
        )}
      </div>
    </div>
  );
};
