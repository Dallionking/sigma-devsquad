
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AnimatedActionButtonProps extends ButtonProps {
  isPrimary?: boolean;
  showPulse?: boolean;
  pulseColor?: string;
  children: React.ReactNode;
}

export const AnimatedActionButton = ({
  isPrimary = false,
  showPulse = false,
  pulseColor = 'primary',
  className,
  children,
  ...props
}: AnimatedActionButtonProps) => {
  return (
    <div className="relative">
      {showPulse && (
        <div className={cn(
          "absolute inset-0 rounded-md animate-pulse-ring",
          pulseColor === 'primary' && "bg-primary/20 border-2 border-primary/40",
          pulseColor === 'success' && "bg-green-500/20 border-2 border-green-500/40",
          pulseColor === 'warning' && "bg-orange-500/20 border-2 border-orange-500/40"
        )} />
      )}
      <Button
        className={cn(
          "relative transition-all duration-300",
          isPrimary && "limitless-cta-primary shadow-lg hover:shadow-xl",
          showPulse && "animate-bounce-gentle",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    </div>
  );
};
