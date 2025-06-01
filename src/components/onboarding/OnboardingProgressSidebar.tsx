
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, Lock, Users, Bot, MapPin, Sparkles, Play, Clock } from 'lucide-react';
import { useOnboarding, type OnboardingStep } from '@/contexts/OnboardingContext';
import { MiniStepProgress } from './progress/MiniStepProgress';
import { useOnboardingProgress } from '@/hooks/useOnboardingProgress';
import { cn } from '@/lib/utils';

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
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Onboarding Roadmap</h2>
            <p className="text-sm text-muted-foreground">
              {Math.round(percentage)}% complete
            </p>
          </div>
        </div>
        
        {/* Overall progress bar */}
        <div className="w-full bg-muted rounded-full h-2 mb-3">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Progress stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{getRemainingTime()} min remaining</span>
          </div>
          <span>{progress.completedSteps.length}/{Object.keys(stepConfig).length} steps</span>
        </div>
      </div>

      {/* Steps list */}
      <div className="flex-1 p-4 space-y-2">
        {Object.entries(stepConfig).map(([step, config]) => {
          const stepKey = step as OnboardingStep;
          const status = getStepStatus(stepKey);
          const Icon = config.icon;
          const isClickable = status !== 'locked';
          const hasDetailedProgress = progressSteps.includes(stepKey);

          return (
            <Button
              key={step}
              variant="ghost"
              className={cn(
                "w-full justify-start p-3 h-auto transition-all",
                status === 'current' && "bg-accent border border-primary/20",
                status === 'completed' && "bg-green-50 dark:bg-green-950/20",
                !isClickable && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => handleStepClick(stepKey)}
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
                        currentStep={stepKey}
                        stepData={getStepData(stepKey)}
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
        })}
      </div>

      {/* Enhanced Footer with roadmap tips */}
      <div className="p-4 border-t border-border/50 bg-muted/30">
        <div className="text-xs text-muted-foreground space-y-1">
          <p>🗺️ <strong>Roadmap Navigation:</strong></p>
          <p>• Click any available step to jump to it</p>
          <p>• Progress is automatically saved</p>
          <p>• Time estimates help plan your session</p>
          <p>• Complete all required fields to progress</p>
        </div>
      </div>
    </div>
  );
};
