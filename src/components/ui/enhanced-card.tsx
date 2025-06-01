
import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface EnhancedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: 'lift' | 'glow' | 'tilt' | 'scale' | 'none';
  glowColor?: string;
  children?: React.ReactNode;
}

export const EnhancedCard = ({ 
  className, 
  children, 
  hoverEffect = 'none',
  glowColor = 'primary',
  ...props 
}: EnhancedCardProps) => {
  const hoverEffects = {
    'lift': 'hover-lift transition-all duration-300 hover:shadow-xl hover:-translate-y-2',
    'glow': `transition-all duration-300 hover:shadow-lg hover:shadow-${glowColor}/20 hover:border-${glowColor}/40`,
    'tilt': 'transition-all duration-300 hover:rotate-1 hover:scale-105',
    'scale': 'transition-all duration-300 hover:scale-105',
    'none': ''
  };

  return (
    <Card
      className={cn(
        'card-enhanced relative overflow-hidden',
        hoverEffect !== 'none' && hoverEffects[hoverEffect],
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );
};
