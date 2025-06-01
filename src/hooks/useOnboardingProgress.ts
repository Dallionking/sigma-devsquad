
import { useMemo } from 'react';
import { OnboardingStep } from '@/contexts/OnboardingContext';

export interface SubStep {
  id: string;
  title: string;
  description: string;
  isRequired: boolean;
  isCompleted: boolean;
  isInProgress: boolean;
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
    const getSubSteps = (currentStep: OnboardingStep, data?: any): SubStep[] => {
      switch (currentStep) {
        case 'welcome':
          return [
            {
              id: 'watch-intro',
              title: 'Watch Introduction',
              description: 'Learn about Vibe DevSquad',
              isRequired: false,
              isCompleted: data?.watchedVideo || false,
              isInProgress: false
            },
            {
              id: 'understand-process',
              title: 'Understand Setup Process',
              description: 'Review the 5-step setup',
              isRequired: true,
              isCompleted: true,
              isInProgress: false
            }
          ];

        case 'profile-setup':
          return [
            {
              id: 'basic-info',
              title: 'Basic Information',
              description: 'Name, email, and role',
              isRequired: true,
              isCompleted: !!(data?.name && data?.email),
              isInProgress: !!(data?.name || data?.email) && !(data?.name && data?.email)
            },
            {
              id: 'upload-avatar',
              title: 'Profile Photo',
              description: 'Upload your avatar',
              isRequired: false,
              isCompleted: !!data?.avatar,
              isInProgress: false
            },
            {
              id: 'select-skills',
              title: 'Skills & Interests',
              description: 'Choose your areas of expertise',
              isRequired: true,
              isCompleted: !!(data?.skills && data.skills.length > 0),
              isInProgress: false
            },
            {
              id: 'experience-level',
              title: 'Experience Level',
              description: 'Set your experience level',
              isRequired: true,
              isCompleted: !!data?.experience,
              isInProgress: false
            }
          ];

        case 'team-creation':
          return [
            {
              id: 'team-info',
              title: 'Team Information',
              description: 'Name and description',
              isRequired: true,
              isCompleted: !!(data?.teamName && data?.description),
              isInProgress: !!(data?.teamName || data?.description) && !(data?.teamName && data?.description)
            },
            {
              id: 'team-avatar',
              title: 'Team Avatar',
              description: 'Upload team logo/image',
              isRequired: false,
              isCompleted: !!data?.teamAvatar,
              isInProgress: false
            },
            {
              id: 'visibility-settings',
              title: 'Privacy Settings',
              description: 'Set team visibility',
              isRequired: true,
              isCompleted: data?.isPublic !== undefined,
              isInProgress: false
            }
          ];

        case 'first-agent':
          return [
            {
              id: 'select-template',
              title: 'Choose Template',
              description: 'Select or customize agent type',
              isRequired: true,
              isCompleted: !!data?.templateId || !!data?.role,
              isInProgress: false
            },
            {
              id: 'configure-agent',
              title: 'Configure Agent',
              description: 'Set specialization and capabilities',
              isRequired: true,
              isCompleted: !!(data?.specialization && data?.capabilities),
              isInProgress: !!data?.specialization || !!data?.capabilities
            },
            {
              id: 'name-agent',
              title: 'Name & Personalize',
              description: 'Give your agent a name',
              isRequired: true,
              isCompleted: !!data?.name,
              isInProgress: false
            }
          ];

        case 'planning-tour':
          return [
            {
              id: 'explore-interface',
              title: 'Explore Interface',
              description: 'Tour the planning tools',
              isRequired: true,
              isCompleted: !!data?.hasExplored,
              isInProgress: false
            },
            {
              id: 'create-sample-project',
              title: 'Try Planning',
              description: 'Create a sample project plan',
              isRequired: false,
              isCompleted: !!data?.hasTried,
              isInProgress: false
            }
          ];

        default:
          return [];
      }
    };

    const subSteps = getSubSteps(step, stepData);
    const completedCount = subSteps.filter(subStep => subStep.isCompleted).length;
    const requiredCount = subSteps.filter(subStep => subStep.isRequired).length;
    const completedRequiredCount = subSteps.filter(subStep => subStep.isRequired && subStep.isCompleted).length;
    const inProgressCount = subSteps.filter(subStep => subStep.isInProgress).length;
    
    const isComplete = requiredCount > 0 ? completedRequiredCount >= requiredCount : true;
    const percentage = subSteps.length > 0 ? (completedCount / subSteps.length) * 100 : 100;
    
    let status: 'complete' | 'progress' | 'pending' = 'pending';
    if (isComplete) {
      status = 'complete';
    } else if (inProgressCount > 0 || completedCount > 0) {
      status = 'progress';
    }

    return {
      completed: completedCount,
      total: subSteps.length,
      required: requiredCount,
      isComplete,
      status,
      percentage,
      subSteps
    };
  }, [step, stepData]);
};
