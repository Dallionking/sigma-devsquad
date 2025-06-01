
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, Users, Bot, MapPin, ArrowRight } from 'lucide-react';
import { useOnboarding, type OnboardingStep } from '@/contexts/OnboardingContext';
import { cn } from '@/lib/utils';

export const OnboardingProgressTracker = () => {
  const { progress, startOnboarding, setShowOnboarding, getStepProgress, goToStep } = useOnboarding();
  
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
  
  const handleContinue = () => {
    setShowOnboarding(true);
    if (remainingSteps.length > 0) {
      goToStep(remainingSteps[0]);
    } else {
      goToStep('completion');
    }
  };
  
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
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{Math.round(percentage)}% Complete</span>
          </div>
          <Progress value={percentage} className="h-2" />
        </div>
        
        <div className="space-y-2">
          {stepOrder.map((step) => {
            const isCompleted = progress.completedSteps.includes(step);
            const isCurrent = progress.currentStep === step;
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
                ) : (
                  <Circle className={cn(
                    "w-4 h-4",
                    isCurrent ? "text-primary" : "text-muted-foreground"
                  )} />
                )}
                <span className={cn(
                  "text-sm flex-1",
                  isCompleted && "text-muted-foreground"
                )}>
                  {title}
                </span>
                {isCurrent && (
                  <Badge variant="default" className="text-xs">Current</Badge>
                )}
              </div>
            );
          })}
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
      </CardContent>
    </Card>
  );
};
