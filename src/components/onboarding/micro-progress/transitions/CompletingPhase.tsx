
import React from 'react';
import { CheckCircle, Star } from 'lucide-react';

interface CompletingPhaseProps {
  stepTitle: string;
}

export const CompletingPhase = ({ stepTitle }: CompletingPhaseProps) => {
  return (
    <div className="text-center space-y-4 animate-in fade-in-0 duration-500">
      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="w-8 h-8 text-green-600 animate-in zoom-in-0 duration-300" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-green-700 dark:text-green-400">
          {stepTitle} Complete!
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Great job! You've successfully completed this step.
        </p>
      </div>
      <div className="flex justify-center">
        <Star className="w-4 h-4 text-yellow-500 animate-pulse" />
      </div>
    </div>
  );
};
