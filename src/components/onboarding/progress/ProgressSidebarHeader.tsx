
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Clock, Sparkles } from 'lucide-react';

interface ProgressSidebarHeaderProps {
  percentage: number;
  completedSteps: number;
  totalSteps: number;
  remainingTime: number;
}

export const ProgressSidebarHeader = ({
  percentage,
  completedSteps,
  totalSteps,
  remainingTime
}: ProgressSidebarHeaderProps) => {
  return (
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
          <span>{remainingTime} min remaining</span>
        </div>
        <span>{completedSteps}/{totalSteps} steps</span>
      </div>
    </div>
  );
};
