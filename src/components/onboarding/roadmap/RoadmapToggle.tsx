
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { MapPin, X } from 'lucide-react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { cn } from '@/lib/utils';

interface RoadmapToggleProps {
  isRoadmapVisible: boolean;
  onToggle: () => void;
  className?: string;
}

export const RoadmapToggle = ({ isRoadmapVisible, onToggle, className }: RoadmapToggleProps) => {
  const { progress, getStepProgress } = useOnboarding();
  const { percentage } = getStepProgress();

  if (progress.isOnboardingComplete) {
    return null;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={onToggle}
            className={cn(
              "fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-50",
              "bg-primary hover:bg-primary/90 text-primary-foreground",
              isRoadmapVisible && "bg-secondary hover:bg-secondary/90 text-secondary-foreground",
              className
            )}
            size="icon"
          >
            {isRoadmapVisible ? (
              <X className="w-6 h-6" />
            ) : (
              <div className="relative">
                <MapPin className="w-6 h-6" />
                <div className={cn(
                  "absolute -top-1 -right-1 w-5 h-5 rounded-full bg-background text-foreground text-xs font-bold flex items-center justify-center border-2 border-current",
                  percentage === 100 && "bg-green-500 text-white border-green-500"
                )}>
                  {Math.round(percentage)}
                </div>
              </div>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" className="max-w-xs">
          <div className="text-center">
            <p className="font-medium">
              {isRoadmapVisible ? 'Hide Roadmap' : 'Show Onboarding Roadmap'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {percentage}% complete • {5 - progress.completedSteps.length} steps remaining
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
