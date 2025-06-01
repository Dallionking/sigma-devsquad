
import React from 'react';
import { cn } from '@/lib/utils';

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const FloatingElement = ({ 
  children, 
  className, 
  delay = 0 
}: FloatingElementProps) => {
  return (
    <div
      className={cn(
        'animate-[float_6s_ease-in-out_infinite]',
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export const PulsingDot = ({ 
  className, 
  color = 'bg-vibe-primary' 
}: { 
  className?: string; 
  color?: string; 
}) => (
  <div className={cn('relative', className)}>
    <div className={cn('w-3 h-3 rounded-full', color)} />
    <div className={cn(
      'absolute inset-0 w-3 h-3 rounded-full animate-ping',
      color,
      'opacity-30'
    )} />
  </div>
);
