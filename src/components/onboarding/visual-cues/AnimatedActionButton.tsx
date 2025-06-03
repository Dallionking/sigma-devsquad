
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AnimatedActionButtonProps extends ButtonProps {
  isPrimary?: boolean;
  isSecondary?: boolean;
  showPulse?: boolean;
  pulseColor?: string;
  children: React.ReactNode;
}

export const AnimatedActionButton = ({
  isPrimary = false,
  isSecondary = false,
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
          "relative transition-all duration-300 font-semibold",
          isPrimary && [
            "limitless-cta-primary shadow-lg hover:shadow-xl",
            "h-11 px-6 text-base",
            "bg-gradient-to-r from-primary via-primary to-primary/90",
            "hover:from-primary/90 hover:via-primary/95 hover:to-primary/80",
            "text-primary-foreground border-0"
          ],
          isSecondary && [
            "h-10 px-5 text-sm",
            "bg-secondary hover:bg-secondary/80 text-secondary-foreground",
            "border border-border/50 hover:border-border"
          ],
          !isPrimary && !isSecondary && [
            "h-9 px-4 text-sm",
            "text-muted-foreground hover:text-foreground"
          ],
          showPulse && "animate-bounce-gentle",
          className
        )}
        variant={
          isPrimary ? "default" : 
          isSecondary ? "secondary" : 
          "outline"
        }
        {...props}
      >
        {children}
      </Button>
    </div>
  );
};
