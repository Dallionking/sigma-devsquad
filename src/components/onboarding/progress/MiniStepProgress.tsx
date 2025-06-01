
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { OnboardingStep } from '@/contexts/OnboardingContext';
import { cn } from '@/lib/utils';

interface MiniStepProgressProps {
  currentStep: OnboardingStep;
  stepData?: any;
  showLabel?: boolean;
  className?: string;
}

const getStepProgress = (step: OnboardingStep, stepData?: any) => {
  switch (step) {
    case 'profile-setup':
      const hasBasicInfo = !!(stepData?.name && stepData?.email);
      const hasSkills = !!(stepData?.skills && stepData.skills.length > 0);
      const hasExperience = !!stepData?.experience;
      const requiredComplete = hasBasicInfo && hasSkills && hasExperience;
      const optionalComplete = !!stepData?.avatar;
      
      return {
        completed: requiredComplete ? (optionalComplete ? 4 : 3) : (hasBasicInfo ? 1 : 0),
        total: 4,
        required: 3,
        isComplete: requiredComplete,
        status: requiredComplete ? 'complete' : hasBasicInfo || hasSkills || hasExperience ? 'progress' : 'pending'
      };

    case 'team-creation':
      const hasTeamInfo = !!(stepData?.teamName && stepData?.description);
      const hasVisibility = stepData?.isPublic !== undefined;
      const teamRequiredComplete = hasTeamInfo && hasVisibility;
      const hasTeamAvatar = !!stepData?.teamAvatar;
      
      return {
        completed: teamRequiredComplete ? (hasTeamAvatar ? 3 : 2) : (hasTeamInfo ? 1 : 0),
        total: 3,
        required: 2,
        isComplete: teamRequiredComplete,
        status: teamRequiredComplete ? 'complete' : hasTeamInfo || hasVisibility ? 'progress' : 'pending'
      };

    case 'first-agent':
      const hasTemplate = !!(stepData?.templateId || stepData?.role);
      const hasConfig = !!(stepData?.specialization && stepData?.capabilities);
      const hasName = !!stepData?.name;
      const agentComplete = hasTemplate && hasConfig && hasName;
      
      return {
        completed: agentComplete ? 3 : (hasTemplate ? 1 : 0) + (hasConfig ? 1 : 0) + (hasName ? 1 : 0),
        total: 3,
        required: 3,
        isComplete: agentComplete,
        status: agentComplete ? 'complete' : hasTemplate || hasConfig || hasName ? 'progress' : 'pending'
      };

    case 'planning-tour':
      const hasExplored = !!stepData?.hasExplored;
      const hasTried = !!stepData?.hasTried;
      
      return {
        completed: hasExplored ? (hasTried ? 2 : 1) : 0,
        total: 2,
        required: 1,
        isComplete: hasExplored,
        status: hasExplored ? 'complete' : 'pending'
      };

    default:
      return {
        completed: 1,
        total: 1,
        required: 1,
        isComplete: true,
        status: 'complete' as const
      };
  }
};

export const MiniStepProgress = ({ 
  currentStep, 
  stepData, 
  showLabel = true, 
  className 
}: MiniStepProgressProps) => {
  const progress = getStepProgress(currentStep, stepData);
  
  const getStatusIcon = () => {
    switch (progress.status) {
      case 'complete':
        return <CheckCircle className="w-3 h-3 text-green-600" />;
      case 'progress':
        return <Clock className="w-3 h-3 text-blue-600" />;
      default:
        return <AlertTriangle className="w-3 h-3 text-orange-500" />;
    }
  };

  const getStatusColor = () => {
    switch (progress.status) {
      case 'complete':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
    }
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      {getStatusIcon()}
      <Badge variant="secondary" className={cn("text-xs", getStatusColor())}>
        {progress.completed}/{progress.total}
        {showLabel && (
          <span className="ml-1">
            {progress.status === 'complete' ? 'Complete' : 
             progress.status === 'progress' ? 'In Progress' : 'Pending'}
          </span>
        )}
      </Badge>
      {progress.completed < progress.required && (
        <span className="text-xs text-muted-foreground">
          ({progress.required - progress.completed} required)
        </span>
      )}
    </div>
  );
};
