
import React from 'react';
import { cn } from '@/lib/utils';
import { OnboardingStep } from '@/contexts/OnboardingContext';

interface OnboardingStepIndicatorsProps {
  stepOrder: OnboardingStep[];
  currentStep: OnboardingStep;
}

export const OnboardingStepIndicators = ({
  stepOrder,
  currentStep
}: OnboardingStepIndicatorsProps) => {
  return (
    <div className="sm:hidden flex justify-center space-x-2">
      {stepOrder.slice(0, -1).map((step, index) => (
        <div
          key={step}
          className={cn(
            "w-2 h-2 rounded-full transition-colors",
            index <= stepOrder.indexOf(currentStep) ? "bg-primary" : "bg-muted",
            index === stepOrder.indexOf(currentStep) && "ring-2 ring-primary ring-offset-2"
          )}
        />
      ))}
    </div>
  );
};
