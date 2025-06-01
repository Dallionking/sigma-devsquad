
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin,
  Users,
  Bot,
  Sparkles
} from 'lucide-react';
import { useOnboarding, OnboardingStep } from '@/contexts/OnboardingContext';
import { useOnboardingRoadmap } from '@/hooks/useOnboardingRoadmap';
import { RoadmapHeader } from './RoadmapHeader';
import { RoadmapCategory } from './RoadmapCategory';
import { cn } from '@/lib/utils';

interface StepConfig {
  id: OnboardingStep;
  title: string;
  description: string;
  estimatedTime: number; // in minutes
  icon: React.ComponentType<{ className?: string }>;
  category: 'setup' | 'configuration' | 'exploration';
}

const stepConfigs: StepConfig[] = [
  {
    id: 'welcome',
    title: 'Welcome',
    description: 'Introduction to Vibe DevSquad',
    estimatedTime: 2,
    icon: Sparkles,
    category: 'setup'
  },
  {
    id: 'profile-setup',
    title: 'Profile Setup',
    description: 'Complete your personal information',
    estimatedTime: 5,
    icon: Users,
    category: 'setup'
  },
  {
    id: 'team-creation',
    title: 'Create Team',
    description: 'Set up your development team',
    estimatedTime: 3,
    icon: Users,
    category: 'configuration'
  },
  {
    id: 'first-agent',
    title: 'First Agent',
    description: 'Configure your AI assistant',
    estimatedTime: 4,
    icon: Bot,
    category: 'configuration'
  },
  {
    id: 'planning-tour',
    title: 'Planning Tour',
    description: 'Explore planning features',
    estimatedTime: 6,
    icon: MapPin,
    category: 'exploration'
  }
];

interface OnboardingRoadmapProps {
  className?: string;
}

export const OnboardingRoadmap = ({ className }: OnboardingRoadmapProps) => {
  const { preferences, toggleCollapsed, toggleCategory, updatePreferences } = useOnboardingRoadmap();
  const { progress, goToStep, canNavigateToStep, getStepProgress, getStepData } = useOnboarding();
  const { percentage } = getStepProgress();

  const getStepStatus = (step: OnboardingStep) => {
    if (progress.completedSteps.includes(step)) return 'completed';
    if (progress.currentStep === step) return 'current';
    if (canNavigateToStep(step)) return 'available';
    return 'locked';
  };

  const handleStepClick = (step: OnboardingStep) => {
    if (canNavigateToStep(step)) {
      goToStep(step);
    }
  };

  const getRemainingTime = () => {
    const currentStepIndex = stepConfigs.findIndex(s => s.id === progress.currentStep);
    if (currentStepIndex === -1) return 0;
    
    return stepConfigs
      .slice(currentStepIndex)
      .filter(step => !progress.completedSteps.includes(step.id))
      .reduce((total, step) => total + step.estimatedTime, 0);
  };

  const groupedSteps = stepConfigs.reduce((acc, step) => {
    if (!acc[step.category]) acc[step.category] = [];
    acc[step.category].push(step);
    return acc;
  }, {} as Record<string, StepConfig[]>);

  if (preferences.isCollapsed) {
    return (
      <Card className={cn("w-16 flex-shrink-0 border-r", className)}>
        <CardContent className="p-2 flex flex-col items-center space-y-4">
          <RoadmapHeader
            percentage={percentage}
            completedSteps={progress.completedSteps.length}
            totalSteps={stepConfigs.length}
            remainingTime={getRemainingTime()}
            isCollapsed={true}
            showEstimatedTimes={preferences.showEstimatedTimes}
            showCompletionPercentage={preferences.showCompletionPercentage}
            onToggleCollapsed={toggleCollapsed}
            onToggleSettings={() => updatePreferences({ 
              showEstimatedTimes: !preferences.showEstimatedTimes 
            })}
          />
          
          <Badge variant="secondary" className="text-xs px-1 py-0.5">
            {Math.round(percentage)}%
          </Badge>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("w-80 flex-shrink-0 border-r", className)}>
      <div className="p-6">
        <RoadmapHeader
          percentage={percentage}
          completedSteps={progress.completedSteps.length}
          totalSteps={stepConfigs.length}
          remainingTime={getRemainingTime()}
          isCollapsed={false}
          showEstimatedTimes={preferences.showEstimatedTimes}
          showCompletionPercentage={preferences.showCompletionPercentage}
          onToggleCollapsed={toggleCollapsed}
          onToggleSettings={() => updatePreferences({ 
            showEstimatedTimes: !preferences.showEstimatedTimes 
          })}
        />
      </div>

      <CardContent className="p-0">
        <div className="max-h-96 overflow-y-auto">
          {Object.entries(groupedSteps).map(([category, steps]) => {
            const isExpanded = preferences.expandedCategories.includes(category);
            const completedInCategory = steps.filter(step => progress.completedSteps.includes(step.id)).length;
            
            return (
              <RoadmapCategory
                key={category}
                category={category}
                steps={steps}
                isExpanded={isExpanded}
                completedInCategory={completedInCategory}
                showEstimatedTimes={preferences.showEstimatedTimes}
                getStepStatus={getStepStatus}
                getStepData={getStepData}
                onToggleCategory={toggleCategory}
                onStepClick={handleStepClick}
              />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
