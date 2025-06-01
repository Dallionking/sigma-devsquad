
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  CheckCircle, 
  Circle, 
  Clock, 
  ChevronDown, 
  ChevronRight,
  MapPin,
  Users,
  Bot,
  Sparkles,
  PanelLeftClose,
  PanelLeft,
  Settings
} from 'lucide-react';
import { useOnboarding, OnboardingStep } from '@/contexts/OnboardingContext';
import { useOnboardingRoadmap } from '@/hooks/useOnboardingRoadmap';
import { MiniStepProgress } from '../progress/MiniStepProgress';
import { cn } from '@/lib/utils';

interface StepConfig {
  id: OnboardingStep;
  title: string;
  description: string;
  estimatedTime: number; // in minutes
  icon: React.ComponentType<{ className?: string }>;
  category: 'setup' | 'configuration' | 'exploration';
}

const stepConfigs: StepConfig[] = [
  {
    id: 'welcome',
    title: 'Welcome',
    description: 'Introduction to Vibe DevSquad',
    estimatedTime: 2,
    icon: Sparkles,
    category: 'setup'
  },
  {
    id: 'profile-setup',
    title: 'Profile Setup',
    description: 'Complete your personal information',
    estimatedTime: 5,
    icon: Users,
    category: 'setup'
  },
  {
    id: 'team-creation',
    title: 'Create Team',
    description: 'Set up your development team',
    estimatedTime: 3,
    icon: Users,
    category: 'configuration'
  },
  {
    id: 'first-agent',
    title: 'First Agent',
    description: 'Configure your AI assistant',
    estimatedTime: 4,
    icon: Bot,
    category: 'configuration'
  },
  {
    id: 'planning-tour',
    title: 'Planning Tour',
    description: 'Explore planning features',
    estimatedTime: 6,
    icon: MapPin,
    category: 'exploration'
  }
];

interface OnboardingRoadmapProps {
  className?: string;
}

export const OnboardingRoadmap = ({ className }: OnboardingRoadmapProps) => {
  const { preferences, toggleCollapsed, toggleCategory, updatePreferences } = useOnboardingRoadmap();
  const { progress, goToStep, canNavigateToStep, getStepProgress, getStepData } = useOnboarding();
  const { percentage } = getStepProgress();

  const getStepStatus = (step: OnboardingStep) => {
    if (progress.completedSteps.includes(step)) return 'completed';
    if (progress.currentStep === step) return 'current';
    if (canNavigateToStep(step)) return 'available';
    return 'locked';
  };

  const handleStepClick = (step: OnboardingStep) => {
    if (canNavigateToStep(step)) {
      goToStep(step);
    }
  };

  const getRemainingTime = () => {
    const currentStepIndex = stepConfigs.findIndex(s => s.id === progress.currentStep);
    if (currentStepIndex === -1) return 0;
    
    return stepConfigs
      .slice(currentStepIndex)
      .filter(step => !progress.completedSteps.includes(step.id))
      .reduce((total, step) => total + step.estimatedTime, 0);
  };

  const groupedSteps = stepConfigs.reduce((acc, step) => {
    if (!acc[step.category]) acc[step.category] = [];
    acc[step.category].push(step);
    return acc;
  }, {} as Record<string, StepConfig[]>);

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'setup': return 'Initial Setup';
      case 'configuration': return 'Configuration';
      case 'exploration': return 'Exploration';
      default: return category;
    }
  };

  if (preferences.isCollapsed) {
    return (
      <Card className={cn("w-16 flex-shrink-0 border-r", className)}>
        <CardContent className="p-2 flex flex-col items-center space-y-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleCollapsed}
            className="w-10 h-10 p-0"
            title="Expand roadmap"
          >
            <PanelLeft className="w-4 h-4" />
          </Button>
          
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <MapPin className="w-4 h-4 text-primary" />
          </div>
          
          <div className="w-2 bg-muted rounded-full h-20 relative">
            <div 
              className="w-2 bg-primary rounded-full transition-all duration-300"
              style={{ height: `${percentage}%` }}
            />
          </div>
          
          <Badge variant="secondary" className="text-xs px-1 py-0.5">
            {Math.round(percentage)}%
          </Badge>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("w-80 flex-shrink-0 border-r", className)}>
      <CardHeader className="pb-3 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Onboarding Roadmap</h3>
              <p className="text-sm text-muted-foreground">
                {Math.round(percentage)}% complete
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => updatePreferences({ 
                showEstimatedTimes: !preferences.showEstimatedTimes 
              })}
              className="w-8 h-8 p-0"
              title="Toggle settings"
            >
              <Settings className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleCollapsed}
              className="w-8 h-8 p-0"
              title="Collapse roadmap"
            >
              <PanelLeftClose className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Overall Progress</span>
            <span>{progress.completedSteps.length}/{stepConfigs.length} steps</span>
          </div>
          <Progress value={percentage} className="h-2" />
          
          {preferences.showEstimatedTimes && (
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{getRemainingTime()} min remaining</span>
              </span>
              {preferences.showCompletionPercentage && (
                <span>{progress.completedSteps.length} completed</span>
              )}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="max-h-96 overflow-y-auto">
          {Object.entries(groupedSteps).map(([category, steps]) => {
            const isExpanded = preferences.expandedCategories.includes(category);
            const completedInCategory = steps.filter(step => progress.completedSteps.includes(step.id)).length;
            
            return (
              <Collapsible key={category} open={isExpanded} onOpenChange={() => toggleCategory(category)}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-4 h-auto border-b border-border/50"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                        <span className="font-medium">{getCategoryTitle(category)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        {completedInCategory}/{steps.length}
                      </Badge>
                    </div>
                  </Button>
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <div className="space-y-1 p-2">
                    {steps.map((step) => {
                      const status = getStepStatus(step.id);
                      const Icon = step.icon;
                      const isClickable = status !== 'locked';
                      
                      return (
                        <Button
                          key={step.id}
                          variant="ghost"
                          className={cn(
                            "w-full justify-start p-3 h-auto text-left",
                            status === 'current' && "bg-accent border border-primary/20",
                            status === 'completed' && "bg-green-50 dark:bg-green-950/20",
                            !isClickable && "opacity-50 cursor-not-allowed"
                          )}
                          onClick={() => handleStepClick(step.id)}
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
                                {preferences.showEstimatedTimes && (
                                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                    <Clock className="w-3 h-3" />
                                    <span>{step.estimatedTime} min</span>
                                  </div>
                                )}
                                
                                {status === 'current' && (
                                  <MiniStepProgress
                                    currentStep={step.id}
                                    stepData={getStepData(step.id)}
                                    showLabel={false}
                                    className="text-xs"
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </Button>
                      );
                    })}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
