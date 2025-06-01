
import { OnboardingStep } from './types';

export interface StepCompletionRequirement {
  id: string;
  label: string;
  description: string;
  isRequired: boolean;
  validator: (data: any) => boolean;
  helpText?: string;
}

export interface StepCompletionCriteria {
  step: OnboardingStep;
  requirements: StepCompletionRequirement[];
  minimumRequired: number;
  progressThreshold: number; // Percentage for "almost there" messaging
}

// Define completion criteria for each step
export const STEP_COMPLETION_CRITERIA: Record<OnboardingStep, StepCompletionCriteria> = {
  'welcome': {
    step: 'welcome',
    requirements: [
      {
        id: 'acknowledge-welcome',
        label: 'Acknowledge Welcome',
        description: 'Review the welcome information',
        isRequired: true,
        validator: () => true, // Auto-completed when step is viewed
      }
    ],
    minimumRequired: 1,
    progressThreshold: 100
  },

  'profile-setup': {
    step: 'profile-setup',
    requirements: [
      {
        id: 'name',
        label: 'Full Name',
        description: 'Enter your full name',
        isRequired: true,
        validator: (data: any) => Boolean(data?.name?.trim()),
        helpText: 'We use this to personalize your experience'
      },
      {
        id: 'email',
        label: 'Email Address',
        description: 'Provide a valid email address',
        isRequired: true,
        validator: (data: any) => Boolean(data?.email?.trim() && data.email.includes('@')),
        helpText: 'Used for notifications and team collaboration'
      },
      {
        id: 'job-title',
        label: 'Job Title/Role',
        description: 'Your current role or position',
        isRequired: true,
        validator: (data: any) => Boolean(data?.jobTitle?.trim()),
        helpText: 'Helps us tailor agent recommendations'
      },
      {
        id: 'experience',
        label: 'Experience Level',
        description: 'Select your experience level',
        isRequired: true,
        validator: (data: any) => Boolean(data?.experience),
        helpText: 'Determines the complexity of suggestions'
      },
      {
        id: 'languages',
        label: 'Programming Languages',
        description: 'Select at least 2 languages you work with',
        isRequired: true,
        validator: (data: any) => Array.isArray(data?.preferredLanguages) && data.preferredLanguages.length >= 2,
        helpText: 'Minimum 2 languages required for personalized assistance'
      },
      {
        id: 'interests',
        label: 'Areas of Interest',
        description: 'Choose at least 3 areas you\'re interested in',
        isRequired: true,
        validator: (data: any) => Array.isArray(data?.interests) && data.interests.length >= 3,
        helpText: 'Minimum 3 interests help us recommend relevant tools'
      },
      {
        id: 'profile-image',
        label: 'Profile Photo',
        description: 'Upload a profile picture',
        isRequired: false,
        validator: (data: any) => Boolean(data?.profileImage),
        helpText: 'Optional - makes your profile more personal'
      },
      {
        id: 'bio',
        label: 'Bio/Description',
        description: 'Tell us about yourself',
        isRequired: false,
        validator: (data: any) => Boolean(data?.bio?.trim()),
        helpText: 'Optional - helps team members get to know you'
      }
    ],
    minimumRequired: 6,
    progressThreshold: 75
  },

  'team-creation': {
    step: 'team-creation',
    requirements: [
      {
        id: 'team-name',
        label: 'Team Name',
        description: 'Give your team a name',
        isRequired: true,
        validator: (data: any) => Boolean(data?.teamName?.trim()),
        helpText: 'Choose a name that represents your team or project'
      },
      {
        id: 'team-description',
        label: 'Team Description',
        description: 'Describe your team\'s purpose',
        isRequired: true,
        validator: (data: any) => Boolean(data?.description?.trim() && data.description.length >= 20),
        helpText: 'Minimum 20 characters - helps others understand your team'
      },
      {
        id: 'team-category',
        label: 'Team Category',
        description: 'Select your team\'s focus area',
        isRequired: true,
        validator: (data: any) => Boolean(data?.category),
        helpText: 'Helps us suggest relevant templates and tools'
      },
      {
        id: 'team-objectives',
        label: 'Team Objectives',
        description: 'Define at least 2 main objectives',
        isRequired: true,
        validator: (data: any) => Array.isArray(data?.objectives) && data.objectives.length >= 2,
        helpText: 'Minimum 2 objectives help focus your team\'s work'
      },
      {
        id: 'team-logo',
        label: 'Team Logo/Avatar',
        description: 'Upload a team logo or image',
        isRequired: false,
        validator: (data: any) => Boolean(data?.teamLogo),
        helpText: 'Optional - makes your team more recognizable'
      },
      {
        id: 'member-invitations',
        label: 'Team Member Invitations',
        description: 'Invite team members',
        isRequired: false,
        validator: (data: any) => Array.isArray(data?.invitedMembers) && data.invitedMembers.length > 0,
        helpText: 'Optional - you can add members later'
      }
    ],
    minimumRequired: 4,
    progressThreshold: 70
  },

  'first-agent': {
    step: 'first-agent',
    requirements: [
      {
        id: 'agent-selection',
        label: 'Agent Type Selection',
        description: 'Choose a template or create custom agent',
        isRequired: true,
        validator: (data: any) => Boolean(data?.templateId || data?.role),
        helpText: 'Select from templates or build your own'
      },
      {
        id: 'agent-name',
        label: 'Agent Name',
        description: 'Give your agent a unique name',
        isRequired: true,
        validator: (data: any) => Boolean(data?.name?.trim()),
        helpText: 'Choose a memorable name for your AI assistant'
      },
      {
        id: 'agent-specialization',
        label: 'Agent Specialization',
        description: 'Define the agent\'s area of expertise',
        isRequired: true,
        validator: (data: any) => Boolean(data?.specialization?.trim() && data.specialization.length >= 20),
        helpText: 'Minimum 20 characters - be specific about what this agent does'
      },
      {
        id: 'agent-capabilities',
        label: 'Agent Capabilities',
        description: 'Select at least 3 capabilities',
        isRequired: true,
        validator: (data: any) => Array.isArray(data?.capabilities) && data.capabilities.length >= 3,
        helpText: 'Minimum 3 capabilities ensure your agent is versatile'
      },
      {
        id: 'agent-description',
        label: 'Agent Description',
        description: 'Provide a detailed description',
        isRequired: false,
        validator: (data: any) => Boolean(data?.description?.trim()),
        helpText: 'Optional - helps you and others understand the agent\'s purpose'
      }
    ],
    minimumRequired: 4,
    progressThreshold: 80
  },

  'planning-tour': {
    step: 'planning-tour',
    requirements: [
      {
        id: 'interface-exploration',
        label: 'Interface Exploration',
        description: 'Explore the main planning interface',
        isRequired: true,
        validator: (data: any) => Boolean(data?.hasExploredInterface),
        helpText: 'Navigate through the key planning features'
      },
      {
        id: 'feature-understanding',
        label: 'Feature Understanding',
        description: 'Understand core planning features',
        isRequired: true,
        validator: (data: any) => Boolean(data?.hasUnderstoodFeatures),
        helpText: 'Learn about project management capabilities'
      },
      {
        id: 'sample-project',
        label: 'Create Sample Project',
        description: 'Try creating a sample project plan',
        isRequired: false,
        validator: (data: any) => Boolean(data?.hasTried),
        helpText: 'Optional - hands-on practice with the tools'
      }
    ],
    minimumRequired: 2,
    progressThreshold: 100
  },

  'completion': {
    step: 'completion',
    requirements: [
      {
        id: 'review-complete',
        label: 'Setup Review Complete',
        description: 'Review your setup completion',
        isRequired: true,
        validator: () => true,
      }
    ],
    minimumRequired: 1,
    progressThreshold: 100
  }
};

// Utility functions for completion checking
export const getStepCompletionStatus = (step: OnboardingStep, stepData: any) => {
  const criteria = STEP_COMPLETION_CRITERIA[step];
  if (!criteria) return { isComplete: false, progress: 0, requirements: [] };

  const requirementStatuses = criteria.requirements.map(req => ({
    ...req,
    isCompleted: req.validator(stepData),
    isMissing: req.isRequired && !req.validator(stepData)
  }));

  const completedCount = requirementStatuses.filter(req => req.isCompleted).length;
  const requiredCount = criteria.minimumRequired;
  const completedRequiredCount = requirementStatuses.filter(req => req.isRequired && req.isCompleted).length;
  
  const progress = (completedCount / criteria.requirements.length) * 100;
  const isComplete = completedRequiredCount >= requiredCount;
  const isAlmostComplete = progress >= criteria.progressThreshold && !isComplete;

  return {
    isComplete,
    isAlmostComplete,
    progress,
    completedCount,
    totalCount: criteria.requirements.length,
    requiredCount,
    completedRequiredCount,
    missingRequired: requirementStatuses.filter(req => req.isMissing),
    requirements: requirementStatuses
  };
};

export const getCompletionMessage = (step: OnboardingStep, stepData: any) => {
  const status = getStepCompletionStatus(step, stepData);
  
  if (status.isComplete) {
    return {
      type: 'success' as const,
      message: 'Step completed! Ready to proceed.',
      icon: 'check-circle'
    };
  }
  
  if (status.isAlmostComplete) {
    const missing = status.missingRequired.length;
    return {
      type: 'warning' as const,
      message: `Almost there! Just ${missing} more required ${missing === 1 ? 'field' : 'fields'} to complete.`,
      icon: 'clock'
    };
  }
  
  const missing = status.missingRequired.length;
  return {
    type: 'info' as const,
    message: `${missing} required ${missing === 1 ? 'field' : 'fields'} remaining to complete this step.`,
    icon: 'info'
  };
};
