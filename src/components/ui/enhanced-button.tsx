
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EnhancedButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'enhanced-primary' | 'enhanced-secondary';
}

export const EnhancedButton = ({ 
  className, 
  variant = 'default', 
  children, 
  ...props 
}: EnhancedButtonProps) => {
  const enhancedVariants = {
    'enhanced-primary': 'bg-gradient-to-r from-vibe-primary to-vibe-secondary text-white hover:from-vibe-primary/90 hover:to-vibe-secondary/90 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300',
    'enhanced-secondary': 'bg-gradient-to-r from-vibe-accent/10 to-vibe-flow/10 text-vibe-primary border border-vibe-primary/20 hover:bg-gradient-to-r hover:from-vibe-accent/20 hover:to-vibe-flow/20 transform hover:scale-[1.02] transition-all duration-300'
  };

  if (variant === 'enhanced-primary' || variant === 'enhanced-secondary') {
    return (
      <Button
        className={cn(
          'btn-enhanced relative overflow-hidden',
          enhancedVariants[variant],
          className
        )}
        {...props}
      >
        {children}
      </Button>
    );
  }

  return (
    <Button
      variant={variant as ButtonProps['variant']}
      className={className}
      {...props}
    >
      {children}
    </Button>
  );
};
