
import React from 'react';
import { Users, Bot, MapPin, Sparkles } from 'lucide-react';
import { useOnboarding, type OnboardingStep } from '@/contexts/OnboardingContext';
import { ProgressSidebarHeader } from './progress/ProgressSidebarHeader';
import { ProgressStepItem } from './progress/ProgressStepItem';
import { ProgressSidebarFooter } from './progress/ProgressSidebarFooter';

const stepConfig = {
  welcome: {
    title: 'Welcome',
    description: 'Getting started',
    icon: Sparkles,
    color: 'text-purple-600',
    estimatedTime: 2
  },
  'profile-setup': {
    title: 'Profile Setup',
    description: 'Your information',
    icon: Users,
    color: 'text-blue-600',
    estimatedTime: 5
  },
  'team-creation': {
    title: 'Create Team',
    description: 'Build your team',
    icon: Users,
    color: 'text-green-600',
    estimatedTime: 3
  },
  'first-agent': {
    title: 'First Agent',
    description: 'Configure AI agent',
    icon: Bot,
    color: 'text-orange-600',
    estimatedTime: 4
  },
  'planning-tour': {
    title: 'Planning Tour',
    description: 'Explore planning',
    icon: MapPin,
    color: 'text-indigo-600',
    estimatedTime: 6
  }
};

export const OnboardingProgressSidebar = () => {
  const { progress, goToStep, canNavigateToStep, getStepProgress, getStepData } = useOnboarding();
  const { percentage } = getStepProgress();

  const handleStepClick = (step: OnboardingStep) => {
    if (canNavigateToStep(step)) {
      goToStep(step);
    }
  };

  const getStepStatus = (step: OnboardingStep) => {
    if (progress.completedSteps.includes(step)) {
      return 'completed';
    }
    if (progress.currentStep === step) {
      return 'current';
    }
    if (canNavigateToStep(step)) {
      return 'available';
    }
    return 'locked';
  };

  const getRemainingTime = () => {
    const stepOrder = Object.keys(stepConfig) as OnboardingStep[];
    const currentStepIndex = stepOrder.findIndex(s => s === progress.currentStep);
    if (currentStepIndex === -1) return 0;
    
    return stepOrder
      .slice(currentStepIndex)
      .filter(step => !progress.completedSteps.includes(step))
      .reduce((total, step) => total + stepConfig[step].estimatedTime, 0);
  };

  // Steps that have detailed progress tracking
  const progressSteps = ['profile-setup', 'team-creation', 'first-agent', 'planning-tour'];

  return (
    <div className="w-80 bg-gradient-to-b from-muted/30 to-background border-r border-border/50 flex flex-col">
      {/* Enhanced Header */}
      <ProgressSidebarHeader
        percentage={percentage}
        completedSteps={progress.completedSteps.length}
        totalSteps={Object.keys(stepConfig).length}
        remainingTime={getRemainingTime()}
      />

      {/* Steps list */}
      <div className="flex-1 p-4 space-y-2">
        {Object.entries(stepConfig).map(([step, config]) => {
          const stepKey = step as OnboardingStep;
          const status = getStepStatus(stepKey);
          const hasDetailedProgress = progressSteps.includes(stepKey);

          return (
            <ProgressStepItem
              key={step}
              step={stepKey}
              config={config}
              status={status}
              stepData={getStepData(stepKey)}
              hasDetailedProgress={hasDetailedProgress}
              onStepClick={handleStepClick}
            />
          );
        })}
      </div>

      {/* Enhanced Footer with roadmap tips */}
      <ProgressSidebarFooter />
    </div>
  );
};
