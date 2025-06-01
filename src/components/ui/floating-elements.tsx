
import React from 'react';
import { cn } from '@/lib/utils';

interface FloatingElementProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const FloatingElement = ({ children, delay = 0, className }: FloatingElementProps) => {
  return (
    <div
      className={cn('animate-float', className)}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: '6s'
      }}
    >
      {children}
    </div>
  );
};

interface PulsingDotProps {
  className?: string;
  color?: string;
}

export const PulsingDot = ({ className, color = 'bg-green-500' }: PulsingDotProps) => {
  return (
    <div className={cn('relative', className)}>
      <div className={`w-2 h-2 ${color} rounded-full`} />
      <div className={`absolute inset-0 w-2 h-2 ${color} rounded-full animate-ping opacity-75`} />
    </div>
  );
};
