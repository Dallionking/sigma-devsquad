
import { useMemo } from 'react';
import { OnboardingStep } from '@/contexts/OnboardingContext';
import { getStepCompletionStatus, STEP_COMPLETION_CRITERIA } from '@/contexts/onboarding/completion';

export interface SubStep {
  id: string;
  title: string;
  description: string;
  isRequired: boolean;
  isCompleted: boolean;
  isInProgress: boolean;
  helpText?: string;
}

export interface StepProgressData {
  completed: number;
  total: number;
  required: number;
  isComplete: boolean;
  status: 'complete' | 'progress' | 'pending';
  percentage: number;
  subSteps: SubStep[];
}

export const useOnboardingProgress = (step: OnboardingStep, stepData?: any): StepProgressData => {
  return useMemo(() => {
    const criteria = STEP_COMPLETION_CRITERIA[step];
    if (!criteria) {
      return {
        completed: 0,
        total: 0,
        required: 0,
        isComplete: false,
        status: 'pending',
        percentage: 0,
        subSteps: []
      };
    }

    const completionStatus = getStepCompletionStatus(step, stepData);
    
    // Convert requirements to SubStep format for backward compatibility
    const subSteps: SubStep[] = completionStatus.requirements.map(req => ({
      id: req.id,
      title: req.label,
      description: req.description,
      isRequired: req.isRequired,
      isCompleted: req.isCompleted,
      isInProgress: !req.isCompleted && req.isRequired,
      helpText: req.helpText
    }));

    let status: 'complete' | 'progress' | 'pending' = 'pending';
    if (completionStatus.isComplete) {
      status = 'complete';
    } else if (completionStatus.completedCount > 0) {
      status = 'progress';
    }

    return {
      completed: completionStatus.completedCount,
      total: completionStatus.totalCount,
      required: completionStatus.requiredCount,
      isComplete: completionStatus.isComplete,
      status,
      percentage: completionStatus.progress,
      subSteps
    };
  }, [step, stepData]);
};
