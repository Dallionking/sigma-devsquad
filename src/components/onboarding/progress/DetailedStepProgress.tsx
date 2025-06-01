
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Circle, Clock, AlertCircle } from 'lucide-react';
import { OnboardingStep } from '@/contexts/OnboardingContext';
import { useOnboardingProgress } from '@/hooks/useOnboardingProgress';
import { cn } from '@/lib/utils';

interface DetailedStepProgressProps {
  currentStep: OnboardingStep;
  stepData?: any;
  className?: string;
}

export const DetailedStepProgress = ({ currentStep, stepData, className }: DetailedStepProgressProps) => {
  const progress = useOnboardingProgress(currentStep, stepData);
  
  if (progress.subSteps.length === 0) {
    return null;
  }

  const inProgressCount = progress.subSteps.filter(step => step.isInProgress).length;
  const requiredProgress = progress.required > 0 ? (progress.subSteps.filter(step => step.isRequired && step.isCompleted).length / progress.required) * 100 : 100;

  return (
    <Card className={cn("border-l-4 border-l-primary/50", className)}>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-sm">Step Progress</h4>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              {progress.completed}/{progress.total} complete
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
            <span>{Math.round(progress.percentage)}%</span>
          </div>
          <Progress value={progress.percentage} className="h-2" />
          
          {progress.required > 0 && requiredProgress < 100 && (
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
          {progress.subSteps.map((subStep) => (
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
