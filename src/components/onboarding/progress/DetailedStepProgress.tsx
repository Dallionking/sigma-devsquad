
import React from 'react';
import { OnboardingStep } from '@/contexts/OnboardingContext';
import { StepCompletionStatus } from '../completion/StepCompletionStatus';
import { RequirementsList } from '../completion/RequirementsList';
import { getStepCompletionStatus } from '@/contexts/onboarding/completion';
import { cn } from '@/lib/utils';

interface DetailedStepProgressProps {
  currentStep: OnboardingStep;
  stepData?: any;
  className?: string;
  showRequirements?: boolean;
}

export const DetailedStepProgress = ({ 
  currentStep, 
  stepData, 
  className,
  showRequirements = true 
}: DetailedStepProgressProps) => {
  const completionStatus = getStepCompletionStatus(currentStep, stepData);
  
  if (completionStatus.requirements.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-4", className)}>
      <StepCompletionStatus
        step={currentStep}
        stepData={stepData}
        showDetails={true}
      />
      
      {showRequirements && (
        <RequirementsList
          requirements={completionStatus.requirements}
        />
      )}
    </div>
  );
};
