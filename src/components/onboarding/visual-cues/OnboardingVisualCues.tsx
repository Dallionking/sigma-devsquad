
import React from 'react';
import { ArrowRight, ArrowDown, CheckCircle, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OnboardingVisualCuesProps {
  targetId?: string;
  direction?: 'right' | 'down' | 'up' | 'left';
  type?: 'pulse' | 'arrow' | 'ghost' | 'progress';
  message?: string;
  isComplete?: boolean;
  progress?: number;
  className?: string;
}

export const OnboardingVisualCues = ({
  targetId,
  direction = 'right',
  type = 'pulse',
  message,
  isComplete = false,
  progress = 0,
  className
}: OnboardingVisualCuesProps) => {
  const renderArrow = () => {
    const ArrowIcon = direction === 'down' ? ArrowDown : ArrowRight;
    
    return (
      <div className={cn(
        "absolute z-50 pointer-events-none",
        "animate-bounce text-primary",
        className
      )}>
        <ArrowIcon className="w-6 h-6 drop-shadow-lg" />
        {message && (
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs whitespace-nowrap">
            {message}
          </div>
        )}
      </div>
    );
  };

  const renderPulse = () => (
    <div className={cn(
      "absolute inset-0 rounded-md pointer-events-none",
      "animate-pulse-gentle bg-primary/20 border-2 border-primary/40",
      className
    )} />
  );

  const renderGhost = () => (
    <div className={cn(
      "absolute inset-0 rounded-md pointer-events-none",
      "animate-ghost-demo bg-accent/30 border border-dashed border-primary/50",
      className
    )}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-xs text-muted-foreground animate-fade-in-out">
          Click here
        </div>
      </div>
    </div>
  );

  const renderProgress = () => (
    <div className={cn(
      "flex items-center space-x-2 text-sm",
      className
    )}>
      {isComplete ? (
        <CheckCircle className="w-4 h-4 text-green-600 animate-scale-in" />
      ) : (
        <Circle className="w-4 h-4 text-muted-foreground animate-pulse" />
      )}
      <span className={cn(
        "transition-colors",
        isComplete ? "text-green-600" : "text-muted-foreground"
      )}>
        {message}
      </span>
      {progress > 0 && progress < 100 && (
        <div className="w-20 h-1 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );

  switch (type) {
    case 'arrow':
      return renderArrow();
    case 'pulse':
      return renderPulse();
    case 'ghost':
      return renderGhost();
    case 'progress':
      return renderProgress();
    default:
      return null;
  }
};
