
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EnhancedButtonProps extends Omit<React.ComponentProps<typeof Button>, 'variant'> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'enhanced-primary' | 'enhanced-secondary';
  children: React.ReactNode;
  rippleEffect?: boolean;
}

export const EnhancedButton = ({ 
  variant = 'default', 
  children, 
  className,
  rippleEffect = true,
  onClick,
  ...props 
}: EnhancedButtonProps) => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (rippleEffect) {
      const rect = e.currentTarget.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      const newRipple = {
        id: Date.now(),
        x,
        y
      };

      setRipples(prev => [...prev, newRipple]);

      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 600);
    }

    if (onClick) {
      onClick(e);
    }
  };

  const enhancedVariants = {
    'enhanced-primary': 'bg-gradient-to-r from-vibe-primary to-vibe-secondary hover:from-vibe-primary/90 hover:to-vibe-secondary/90 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300',
    'enhanced-secondary': 'bg-gradient-to-r from-vibe-accent to-vibe-flow hover:from-vibe-accent/90 hover:to-vibe-flow/90 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300'
  };

  // Map enhanced variants to base variants for the underlying Button component
  const getBaseVariant = (variant: string) => {
    if (variant.startsWith('enhanced-')) {
      return 'default' as const;
    }
    return variant as 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  };

  return (
    <Button
      variant={getBaseVariant(variant)}
      className={cn(
        'relative overflow-hidden transition-all duration-300 ease-out',
        variant.startsWith('enhanced-') && enhancedVariants[variant as keyof typeof enhancedVariants],
        'hover:shadow-lg active:scale-[0.98]',
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
      
      {rippleEffect && ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ping"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: '50px',
            height: '50px',
            animationDuration: '600ms'
          }}
        />
      ))}
    </Button>
  );
};
