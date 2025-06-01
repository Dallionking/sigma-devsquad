
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, Lock, Play, Clock } from 'lucide-react';
import { OnboardingStep } from '@/contexts/OnboardingContext';
import { MiniStepProgress } from './MiniStepProgress';
import { cn } from '@/lib/utils';

interface StepConfig {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  estimatedTime: number;
}

interface ProgressStepItemProps {
  step: OnboardingStep;
  config: StepConfig;
  status: 'completed' | 'current' | 'available' | 'locked';
  stepData: any;
  hasDetailedProgress: boolean;
  onStepClick: (step: OnboardingStep) => void;
}

export const ProgressStepItem = ({
  step,
  config,
  status,
  stepData,
  hasDetailedProgress,
  onStepClick
}: ProgressStepItemProps) => {
  const Icon = config.icon;
  const isClickable = status !== 'locked';

  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start p-3 h-auto transition-all",
        status === 'current' && "bg-accent border border-primary/20",
        status === 'completed' && "bg-green-50 dark:bg-green-950/20",
        !isClickable && "opacity-50 cursor-not-allowed"
      )}
      onClick={() => onStepClick(step)}
      disabled={!isClickable}
    >
      <div className="flex items-start space-x-3 w-full">
        {/* Status icon */}
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
          status === 'completed' && "bg-green-100 dark:bg-green-900/30",
          status === 'current' && "bg-primary/10",
          status === 'available' && "bg-muted",
          status === 'locked' && "bg-muted/50"
        )}>
          {status === 'completed' ? (
            <CheckCircle className="w-4 h-4 text-green-600" />
          ) : status === 'current' ? (
            <Play className="w-4 h-4 text-primary" />
          ) : status === 'locked' ? (
            <Lock className="w-4 h-4 text-muted-foreground" />
          ) : (
            <Circle className="w-4 h-4 text-muted-foreground" />
          )}
        </div>

        {/* Step info */}
        <div className="flex-1 text-left min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-2">
              <Icon className={cn("w-4 h-4", config.color)} />
              <span className={cn(
                "font-medium text-sm",
                status === 'completed' && "text-green-700 dark:text-green-400",
                status === 'current' && "text-primary",
                status === 'locked' && "text-muted-foreground"
              )}>
                {config.title}
              </span>
            </div>
            
            {status === 'current' && (
              <Badge variant="default" className="text-xs px-2 py-0">
                Current
              </Badge>
            )}
          </div>
          
          <p className="text-xs text-muted-foreground mb-2">
            {config.description}
          </p>

          {/* Time and progress indicators */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>{config.estimatedTime} min</span>
            </div>

            {/* Mini progress indicator for detailed steps */}
            {hasDetailedProgress && (status === 'current' || status === 'completed') && (
              <MiniStepProgress
                currentStep={step}
                stepData={stepData}
                showLabel={false}
                className="mt-1"
              />
            )}
          </div>
        </div>

        {/* Completion indicator */}
        {status === 'completed' && (
          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
        )}
      </div>
    </Button>
  );
};
