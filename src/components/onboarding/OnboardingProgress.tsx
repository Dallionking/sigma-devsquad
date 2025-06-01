
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, Play, RotateCcw } from 'lucide-react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { cn } from '@/lib/utils';

const stepLabels = {
  welcome: 'Welcome Tour',
  'profile-setup': 'Profile Setup',
  'team-creation': 'Team Creation',
  'first-agent': 'First Agent',
  'planning-tour': 'Planning Tour',
  completion: 'Complete'
};

export const OnboardingProgress = () => {
  const { progress, startOnboarding, resetOnboarding } = useOnboarding();

  if (progress.isOnboardingComplete) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span>Setup Complete!</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            You've successfully completed the onboarding process. You're ready to start building with your AI team!
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={resetOnboarding}
            className="flex items-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Restart Tour</span>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const completedCount = progress.completedSteps.length;
  const totalSteps = Object.keys(stepLabels).length - 1; // Exclude completion
  const progressPercentage = (completedCount / totalSteps) * 100;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Getting Started</CardTitle>
          <Badge variant="secondary">
            {completedCount}/{totalSteps} complete
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div className="space-y-3">
          {Object.entries(stepLabels).slice(0, -1).map(([step, label]) => {
            const isCompleted = progress.completedSteps.includes(step as any);
            const isCurrent = progress.currentStep === step;
            
            return (
              <div
                key={step}
                className={cn(
                  "flex items-center space-x-3 p-2 rounded-lg transition-colors",
                  isCurrent && "bg-accent/50"
                )}
              >
                {isCompleted ? (
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                ) : (
                  <Circle className={cn(
                    "w-4 h-4 flex-shrink-0",
                    isCurrent ? "text-primary" : "text-muted-foreground"
                  )} />
                )}
                <span className={cn(
                  "text-sm flex-1",
                  isCompleted && "text-muted-foreground line-through",
                  isCurrent && "font-medium text-foreground"
                )}>
                  {label}
                </span>
                {isCurrent && (
                  <Badge variant="default" className="text-xs">
                    Current
                  </Badge>
                )}
              </div>
            );
          })}
        </div>

        <Button
          onClick={startOnboarding}
          className="w-full flex items-center space-x-2"
          variant={completedCount > 0 ? "outline" : "default"}
        >
          <Play className="w-4 h-4" />
          <span>{completedCount > 0 ? 'Continue Setup' : 'Start Setup'}</span>
        </Button>
      </CardContent>
    </Card>
  );
};
