
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, Lock, Users, Bot, MapPin, Sparkles, Play } from 'lucide-react';
import { useOnboarding, type OnboardingStep } from '@/contexts/OnboardingContext';
import { MiniStepProgress } from './progress/MiniStepProgress';
import { useOnboardingProgress } from '@/hooks/useOnboardingProgress';
import { cn } from '@/lib/utils';

const stepConfig = {
  welcome: {
    title: 'Welcome',
    description: 'Getting started',
    icon: Sparkles,
    color: 'text-purple-600'
  },
  'profile-setup': {
    title: 'Profile Setup',
    description: 'Your information',
    icon: Users,
    color: 'text-blue-600'
  },
  'team-creation': {
    title: 'Create Team',
    description: 'Build your team',
    icon: Users,
    color: 'text-green-600'
  },
  'first-agent': {
    title: 'First Agent',
    description: 'Configure AI agent',
    icon: Bot,
    color: 'text-orange-600'
  },
  'planning-tour': {
    title: 'Planning Tour',
    description: 'Explore planning',
    icon: MapPin,
    color: 'text-indigo-600'
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

  // Steps that have detailed progress tracking
  const progressSteps = ['profile-setup', 'team-creation', 'first-agent', 'planning-tour'];

  return (
    <div className="w-80 bg-gradient-to-b from-muted/30 to-background border-r border-border/50 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Setup Progress</h2>
            <p className="text-sm text-muted-foreground">
              {Math.round(percentage)}% complete
            </p>
          </div>
        </div>
        
        {/* Overall progress bar */}
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
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
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon className={cn("w-4 h-4", config.color)} />
                    <span className={cn(
                      "font-medium text-sm",
                      status === 'completed' && "text-green-700 dark:text-green-400",
                      status === 'current' && "text-primary",
                      status === 'locked' && "text-muted-foreground"
                    )}>
                      {config.title}
                    </span>
                    {status === 'current' && (
                      <Badge variant="default" className="text-xs px-2 py-0">
                        Current
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-2">
                    {config.description}
                  </p>

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

                {/* Completion indicator */}
                {status === 'completed' && (
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                )}
              </div>
            </Button>
          );
        })}
      </div>

      {/* Footer with tips */}
      <div className="p-4 border-t border-border/50 bg-muted/30">
        <div className="text-xs text-muted-foreground space-y-1">
          <p>💡 Click completed steps to revisit them</p>
          <p>🔒 Future steps unlock as you progress</p>
          <p>📊 Sub-step progress shown for current step</p>
          <p>💾 Your progress is automatically saved</p>
        </div>
      </div>
    </div>
  );
};
