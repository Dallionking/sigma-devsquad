
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { OnboardingStep } from '@/contexts/OnboardingContext';
import { useOnboardingProgress } from '@/hooks/useOnboardingProgress';
import { cn } from '@/lib/utils';

interface MiniStepProgressProps {
  currentStep: OnboardingStep;
  stepData?: any;
  showLabel?: boolean;
  className?: string;
}

export const MiniStepProgress = ({ 
  currentStep, 
  stepData, 
  showLabel = true, 
  className 
}: MiniStepProgressProps) => {
  const progress = useOnboardingProgress(currentStep, stepData);
  
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
