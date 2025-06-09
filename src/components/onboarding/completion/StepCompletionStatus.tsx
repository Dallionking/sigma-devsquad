
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { OnboardingStep } from '@/contexts/OnboardingContext';
import { getStepCompletionStatus, getCompletionMessage } from '@/contexts/onboarding/completion';
import { cn } from '@/lib/utils';

interface StepCompletionStatusProps {
  step: OnboardingStep;
  stepData: any;
  showDetails?: boolean;
  className?: string;
}

export const StepCompletionStatus = ({
  step,
  stepData,
  showDetails = true,
  className
}: StepCompletionStatusProps) => {
  const status = getStepCompletionStatus(step, stepData);
  const message = getCompletionMessage(step, stepData);
  
  const getStatusIcon = () => {
    switch (message.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <Clock className="w-5 h-5 text-orange-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStatusColor = () => {
    switch (message.type) {
      case 'success':
        return 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20';
      case 'warning':
        return 'border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20';
      default:
        return 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20';
    }
  };

  return (
    <Card className={cn("border-l-4", getStatusColor(), className)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            {getStatusIcon()}
            <div>
              <p className={cn(
                "font-medium text-sm",
                message.type === 'success' && "text-green-700 dark:text-green-400",
                message.type === 'warning' && "text-orange-700 dark:text-orange-400",
                message.type === 'info' && "text-blue-700 dark:text-blue-400"
              )}>
                {message.message}
              </p>
              {showDetails && (
                <p className="text-xs text-muted-foreground mt-1">
                  {status.completedCount} of {status.totalCount} items completed
                  {status.requiredCount > 0 && (
                    <span> • {status.completedRequiredCount} of {status.requiredCount} required</span>
                  )}
                </p>
              )}
            </div>
          </div>
          
          <Badge variant={
            message.type === 'success' ? 'default' : 
            message.type === 'warning' ? 'secondary' : 'outline'
          } className="text-xs">
            {Math.round(status.progress)}%
          </Badge>
        </div>

        {showDetails && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Overall Progress</span>
              <span>{Math.round(status.progress)}%</span>
            </div>
            <Progress value={status.progress} className="h-2" />
            
            {status.requiredCount > 0 && (
              <>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Required Items</span>
                  <span>{status.completedRequiredCount}/{status.requiredCount}</span>
                </div>
                <Progress 
                  value={(status.completedRequiredCount / status.requiredCount) * 100} 
                  className="h-1"
                />
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
