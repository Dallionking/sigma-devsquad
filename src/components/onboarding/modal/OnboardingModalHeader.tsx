
import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Users, X, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { OnboardingStep } from '@/contexts/OnboardingContext';

interface OnboardingModalHeaderProps {
  currentStep: OnboardingStep;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  showProgressSidebar: boolean;
  percentage: number;
  stepOrder: OnboardingStep[];
  onToggleProgressSidebar: () => void;
  onSkip: () => void;
  showSkipButton?: boolean;
  onToggleHelp?: () => void;
  isHelpCollapsed?: boolean;
}

export const OnboardingModalHeader = ({
  currentStep,
  title,
  description,
  icon: Icon,
  showProgressSidebar,
  percentage,
  stepOrder,
  onToggleProgressSidebar,
  onSkip,
  showSkipButton = true,
  onToggleHelp,
  isHelpCollapsed = false
}: OnboardingModalHeaderProps) => {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            size="icon" 
            className="block sm:hidden"
            onClick={onToggleProgressSidebar}
          >
            <Users className="h-4 w-4" />
          </Button>
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Help Toggle Button */}
          {onToggleHelp && (
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleHelp}
              className={cn(
                "text-muted-foreground hover:text-foreground",
                !isHelpCollapsed && "bg-primary/10 text-primary border-primary/20"
              )}
              title={isHelpCollapsed ? "Show help panel" : "Hide help panel"}
            >
              <HelpCircle className="w-4 h-4" />
            </Button>
          )}

          {showSkipButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onSkip}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Progress - show in main content on mobile */}
      {currentStep !== 'completion' && (
        <div className="sm:hidden space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              Step {stepOrder.indexOf(currentStep) + 1} of {stepOrder.length - 1}
            </span>
            <span className="text-muted-foreground">
              {Math.round(percentage)}% complete
            </span>
          </div>
          <Progress value={percentage} className="h-2" />
        </div>
      )}
    </>
  );
};
