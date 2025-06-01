
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, Clock } from 'lucide-react';
import { OnboardingStep } from '@/contexts/OnboardingContext';
import { MiniStepProgress } from '../progress/MiniStepProgress';
import { cn } from '@/lib/utils';

interface StepConfig {
  id: OnboardingStep;
  title: string;
  description: string;
  estimatedTime: number;
  icon: React.ComponentType<{ className?: string }>;
  category: 'setup' | 'configuration' | 'exploration';
}

interface RoadmapStepItemProps {
  step: StepConfig;
  status: 'completed' | 'current' | 'available' | 'locked';
  stepData: any;
  showEstimatedTimes: boolean;
  onStepClick: (stepId: OnboardingStep) => void;
}

export const RoadmapStepItem = ({
  step,
  status,
  stepData,
  showEstimatedTimes,
  onStepClick
}: RoadmapStepItemProps) => {
  const Icon = step.icon;
  const isClickable = status !== 'locked';

  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start p-3 h-auto text-left",
        status === 'current' && "bg-accent border border-primary/20",
        status === 'completed' && "bg-green-50 dark:bg-green-950/20",
        !isClickable && "opacity-50 cursor-not-allowed"
      )}
      onClick={() => onStepClick(step.id)}
      disabled={!isClickable}
    >
      <div className="flex items-start space-x-3 w-full">
        <div className={cn(
          "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
          status === 'completed' && "bg-green-100 dark:bg-green-900/30",
          status === 'current' && "bg-primary/10",
          status === 'available' && "bg-muted",
          status === 'locked' && "bg-muted/50"
        )}>
          {status === 'completed' ? (
            <CheckCircle className="w-3 h-3 text-green-600" />
          ) : (
            <Circle className="w-3 h-3 text-muted-foreground" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <Icon className="w-4 h-4 text-primary" />
            <span className={cn(
              "font-medium text-sm",
              status === 'completed' && "text-green-700 dark:text-green-400",
              status === 'current' && "text-primary"
            )}>
              {step.title}
            </span>
            {status === 'current' && (
              <Badge variant="default" className="text-xs px-1.5 py-0">
                Current
              </Badge>
            )}
          </div>
          
          <p className="text-xs text-muted-foreground mb-2">
            {step.description}
          </p>
          
          <div className="flex items-center justify-between">
            {showEstimatedTimes && (
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{step.estimatedTime} min</span>
              </div>
            )}
            
            {status === 'current' && (
              <MiniStepProgress
                currentStep={step.id}
                stepData={stepData}
                showLabel={false}
                className="text-xs"
              />
            )}
          </div>
        </div>
      </div>
    </Button>
  );
};
