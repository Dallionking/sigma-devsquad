
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ArrivingPhaseProps {
  stepTitle: string;
}

export const ArrivingPhase = ({ stepTitle }: ArrivingPhaseProps) => {
  return (
    <div className="text-center space-y-4 animate-in slide-in-from-right-4 duration-500">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
        <ArrowRight className="w-8 h-8 text-primary animate-in zoom-in-0 duration-300" />
      </div>
      <div>
        <h3 className="text-lg font-semibold">
          Welcome to {stepTitle}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Let's continue your onboarding journey.
        </p>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div className="bg-primary h-2 rounded-full transition-all duration-1000" style={{ width: '100%' }} />
      </div>
    </div>
  );
};
