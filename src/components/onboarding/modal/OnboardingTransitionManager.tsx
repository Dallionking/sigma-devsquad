
import React from 'react';
import { StepTransitionAnimations } from '../micro-progress/StepTransitionAnimations';

interface OnboardingTransitionManagerProps {
  isTransitioning: boolean;
  transitionData: {
    fromStep: string;
    toStep: string;
  } | null;
  onTransitionComplete: () => void;
}

export const OnboardingTransitionManager = ({
  isTransitioning,
  transitionData,
  onTransitionComplete
}: OnboardingTransitionManagerProps) => {
  if (!isTransitioning || !transitionData) return null;

  return (
    <StepTransitionAnimations
      fromStep={transitionData.fromStep as any}
      toStep={transitionData.toStep as any}
      isTransitioning={isTransitioning}
      onTransitionComplete={onTransitionComplete}
    />
  );
};
