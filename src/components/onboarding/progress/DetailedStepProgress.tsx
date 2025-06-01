
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Circle, Clock, AlertCircle } from 'lucide-react';
import { OnboardingStep } from '@/contexts/OnboardingContext';
import { cn } from '@/lib/utils';

interface SubStep {
  id: string;
  title: string;
  description: string;
  isRequired: boolean;
  isCompleted: boolean;
  isInProgress: boolean;
}

interface DetailedStepProgressProps {
  currentStep: OnboardingStep;
  stepData?: any;
  className?: string;
}

const getSubSteps = (step: OnboardingStep, stepData?: any): SubStep[] => {
  switch (step) {
    case 'welcome':
      return [
        {
          id: 'watch-intro',
          title: 'Watch Introduction',
          description: 'Learn about Vibe DevSquad',
          isRequired: false,
          isCompleted: stepData?.watchedVideo || false,
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
          isCompleted: !!(stepData?.name && stepData?.email),
          isInProgress: !!(stepData?.name || stepData?.email) && !(stepData?.name && stepData?.email)
        },
        {
          id: 'upload-avatar',
          title: 'Profile Photo',
          description: 'Upload your avatar',
          isRequired: false,
          isCompleted: !!stepData?.avatar,
          isInProgress: false
        },
        {
          id: 'select-skills',
          title: 'Skills & Interests',
          description: 'Choose your areas of expertise',
          isRequired: true,
          isCompleted: !!(stepData?.skills && stepData.skills.length > 0),
          isInProgress: false
        },
        {
          id: 'experience-level',
          title: 'Experience Level',
          description: 'Set your experience level',
          isRequired: true,
          isCompleted: !!stepData?.experience,
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
          isCompleted: !!(stepData?.teamName && stepData?.description),
          isInProgress: !!(stepData?.teamName || stepData?.description) && !(stepData?.teamName && stepData?.description)
        },
        {
          id: 'team-avatar',
          title: 'Team Avatar',
          description: 'Upload team logo/image',
          isRequired: false,
          isCompleted: !!stepData?.teamAvatar,
          isInProgress: false
        },
        {
          id: 'visibility-settings',
          title: 'Privacy Settings',
          description: 'Set team visibility',
          isRequired: true,
          isCompleted: !!stepData?.isPublic !== undefined,
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
          isCompleted: !!stepData?.templateId || !!stepData?.role,
          isInProgress: false
        },
        {
          id: 'configure-agent',
          title: 'Configure Agent',
          description: 'Set specialization and capabilities',
          isRequired: true,
          isCompleted: !!(stepData?.specialization && stepData?.capabilities),
          isInProgress: !!stepData?.specialization || !!stepData?.capabilities
        },
        {
          id: 'name-agent',
          title: 'Name & Personalize',
          description: 'Give your agent a name',
          isRequired: true,
          isCompleted: !!stepData?.name,
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
          isCompleted: !!stepData?.hasExplored,
          isInProgress: false
        },
        {
          id: 'create-sample-project',
          title: 'Try Planning',
          description: 'Create a sample project plan',
          isRequired: false,
          isCompleted: !!stepData?.hasTried,
          isInProgress: false
        }
      ];

    default:
      return [];
  }
};

export const DetailedStepProgress = ({ currentStep, stepData, className }: DetailedStepProgressProps) => {
  const subSteps = getSubSteps(currentStep, stepData);
  
  if (subSteps.length === 0) {
    return null;
  }

  const completedCount = subSteps.filter(step => step.isCompleted).length;
  const requiredCount = subSteps.filter(step => step.isRequired).length;
  const completedRequiredCount = subSteps.filter(step => step.isRequired && step.isCompleted).length;
  const inProgressCount = subSteps.filter(step => step.isInProgress).length;
  
  const overallProgress = (completedCount / subSteps.length) * 100;
  const requiredProgress = requiredCount > 0 ? (completedRequiredCount / requiredCount) * 100 : 100;

  return (
    <Card className={cn("border-l-4 border-l-primary/50", className)}>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-sm">Step Progress</h4>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              {completedCount}/{subSteps.length} complete
            </Badge>
            {inProgressCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {inProgressCount} in progress
              </Badge>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Overall Progress</span>
            <span>{Math.round(overallProgress)}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
          
          {requiredCount > 0 && requiredProgress < 100 && (
            <>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Required Items</span>
                <span>{Math.round(requiredProgress)}%</span>
              </div>
              <Progress value={requiredProgress} className="h-1" />
            </>
          )}
        </div>

        <div className="space-y-2">
          {subSteps.map((subStep) => (
            <div
              key={subStep.id}
              className={cn(
                "flex items-start space-x-3 p-2 rounded-lg transition-colors",
                subStep.isCompleted && "bg-green-50 dark:bg-green-950/20",
                subStep.isInProgress && "bg-blue-50 dark:bg-blue-950/20"
              )}
            >
              <div className="mt-0.5">
                {subStep.isCompleted ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : subStep.isInProgress ? (
                  <Clock className="w-4 h-4 text-blue-600" />
                ) : subStep.isRequired ? (
                  <AlertCircle className="w-4 h-4 text-orange-500" />
                ) : (
                  <Circle className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className={cn(
                    "text-sm font-medium",
                    subStep.isCompleted && "text-green-700 dark:text-green-400",
                    subStep.isInProgress && "text-blue-700 dark:text-blue-400"
                  )}>
                    {subStep.title}
                  </span>
                  {subStep.isRequired && !subStep.isCompleted && (
                    <Badge variant="outline" className="text-xs px-1 py-0">
                      Required
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {subStep.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {requiredProgress < 100 && (
          <div className="flex items-center space-x-2 p-2 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
            <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0" />
            <p className="text-xs text-orange-700 dark:text-orange-400">
              Complete all required items to proceed to the next step
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
