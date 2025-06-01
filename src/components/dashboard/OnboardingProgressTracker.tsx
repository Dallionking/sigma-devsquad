
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, Users, Bot, MapPin, ArrowRight, Clock } from 'lucide-react';
import { useOnboarding, type OnboardingStep } from '@/contexts/OnboardingContext';
import { MiniStepProgress } from '../onboarding/progress/MiniStepProgress';
import { cn } from '@/lib/utils';

export const OnboardingProgressTracker = () => {
  const { progress, startOnboarding, setShowOnboarding, getStepProgress, goToStep, getStepData } = useOnboarding();
  
  if (progress.isOnboardingComplete) {
    return null;
  }
  
  const { current, total, percentage } = getStepProgress();
  
  const stepOrder: OnboardingStep[] = [
    'welcome', 
    'profile-setup', 
    'team-creation', 
    'first-agent', 
    'planning-tour'
  ];

  const remainingSteps = stepOrder.filter(step => !progress.completedSteps.includes(step));
  const completedCount = progress.completedSteps.length;
  const currentStepIndex = stepOrder.indexOf(progress.currentStep);
  const nextIncompleteStep = remainingSteps[0];
  
  const handleContinue = () => {
    setShowOnboarding(true);
    if (remainingSteps.length > 0) {
      goToStep(remainingSteps[0]);
    } else {
      goToStep('completion');
    }
  };

  const getStepIcon = (step: OnboardingStep) => {
    switch (step) {
      case 'profile-setup': return Users;
      case 'team-creation': return Users;
      case 'first-agent': return Bot;
      case 'planning-tour': return MapPin;
      default: return Circle;
    }
  };

  const hasDetailedProgress = ['profile-setup', 'team-creation', 'first-agent', 'planning-tour'].includes(progress.currentStep);
  
  return (
    <Card className="border border-primary/20 shadow-sm">
      <CardHeader className="pb-3 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Setup Progress</CardTitle>
          <Badge variant="outline" className="font-normal">
            {completedCount}/{total} Steps
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4 space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="font-medium">{Math.round(percentage)}% Complete</span>
          </div>
          <Progress value={percentage} className="h-2" />
        </div>

        {/* Current step detailed progress */}
        {hasDetailedProgress && currentStepIndex >= 0 && (
          <div className="bg-accent/30 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Current Step Progress</span>
              <Badge variant="secondary" className="text-xs">
                {progress.currentStep.replace('-', ' ')}
              </Badge>
            </div>
            <MiniStepProgress
              currentStep={progress.currentStep}
              stepData={getStepData(progress.currentStep)}
            />
          </div>
        )}
        
        <div className="space-y-2">
          {stepOrder.slice(0, 3).map((step, index) => {
            const isCompleted = progress.completedSteps.includes(step);
            const isCurrent = progress.currentStep === step;
            const StepIcon = getStepIcon(step);
            let title = '';
            
            switch(step) {
              case 'welcome': title = 'Introduction'; break;
              case 'profile-setup': title = 'Profile Setup'; break;
              case 'team-creation': title = 'Team Creation'; break;
              case 'first-agent': title = 'Agent Configuration'; break;
              case 'planning-tour': title = 'Planning Tour'; break;
              default: title = step;
            }
            
            return (
              <div 
                key={step}
                className={cn(
                  "flex items-center space-x-3 p-2 rounded-lg",
                  isCompleted && "bg-green-50 dark:bg-green-900/10",
                  isCurrent && !isCompleted && "bg-primary/10"
                )}
              >
                {isCompleted ? (
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-500" />
                ) : isCurrent ? (
                  <Clock className="w-4 h-4 text-primary" />
                ) : (
                  <Circle className="w-4 h-4 text-muted-foreground" />
                )}
                
                <StepIcon className="w-4 h-4 text-muted-foreground" />
                
                <span className={cn(
                  "text-sm flex-1",
                  isCompleted && "text-muted-foreground",
                  isCurrent && "font-medium"
                )}>
                  {title}
                </span>
                
                {isCurrent && (
                  <Badge variant="default" className="text-xs">Current</Badge>
                )}
              </div>
            );
          })}

          {stepOrder.length > 3 && (
            <div className="text-center py-2">
              <span className="text-xs text-muted-foreground">
                +{stepOrder.length - 3} more steps
              </span>
            </div>
          )}
        </div>
        
        <Button 
          onClick={handleContinue}
          className="w-full mt-2 flex items-center justify-center gap-2"
        >
          {completedCount === 0 ? (
            <>Start Setup</>
          ) : completedCount < total ? (
            <>Continue Setup<ArrowRight className="w-4 h-4" /></>
          ) : (
            <>Complete Setup<CheckCircle className="w-4 h-4" /></>
          )}
        </Button>

        {nextIncompleteStep && completedCount > 0 && (
          <p className="text-xs text-center text-muted-foreground">
            Next: {nextIncompleteStep.replace('-', ' ')}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
