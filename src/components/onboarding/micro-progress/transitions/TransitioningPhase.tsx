
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface TransitioningPhaseProps {
  fromStepTitle: string;
  toStepTitle: string;
}

export const TransitioningPhase = ({ fromStepTitle, toStepTitle }: TransitioningPhaseProps) => {
  return (
    <div className="text-center space-y-4 animate-in slide-in-from-left-4 duration-500">
      <div className="flex items-center justify-center space-x-3">
        <div className="text-sm font-medium text-muted-foreground">
          {fromStepTitle}
        </div>
        <ArrowRight className="w-5 h-5 text-primary animate-pulse" />
        <div className="text-sm font-medium text-primary">
          {toStepTitle}
        </div>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: '60%' }} />
      </div>
      <p className="text-sm text-muted-foreground">
        Preparing next step...
      </p>
    </div>
  );
};
