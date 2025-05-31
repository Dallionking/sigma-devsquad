
import React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface SpaceOptimizedContainerProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'compact' | 'minimal' | 'dense';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

const variantClasses = {
  default: 'px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-6',
  compact: 'px-2 py-2 sm:px-3 sm:py-3',
  minimal: 'px-1 py-1 sm:px-2 sm:py-2',
  dense: 'px-1 py-1'
};

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-2xl',
  lg: 'max-w-4xl',
  xl: 'max-w-6xl',
  '2xl': 'max-w-7xl',
  full: 'max-w-full'
};

export const SpaceOptimizedContainer = ({ 
  children, 
  className, 
  variant = 'default',
  maxWidth = '2xl'
}: SpaceOptimizedContainerProps) => {
  const isMobile = useIsMobile();

  return (
    <div className={cn(
      'mx-auto w-full',
      maxWidthClasses[maxWidth],
      isMobile ? variantClasses.compact : variantClasses[variant],
      className
    )}>
      {children}
    </div>
  );
};

// Optimized spacing utilities
export const OptimizedStack = ({ 
  children, 
  className,
  gap = 'sm'
}: { 
  children: React.ReactNode; 
  className?: string;
  gap?: 'xs' | 'sm' | 'md' | 'lg';
}) => {
  const gapClasses = {
    xs: 'space-y-1 sm:space-y-2',
    sm: 'space-y-2 sm:space-y-3',
    md: 'space-y-3 sm:space-y-4',
    lg: 'space-y-4 sm:space-y-6'
  };

  return (
    <div className={cn('flex flex-col', gapClasses[gap], className)}>
      {children}
    </div>
  );
};

export const OptimizedRow = ({ 
  children, 
  className,
  gap = 'sm',
  align = 'center'
}: { 
  children: React.ReactNode; 
  className?: string;
  gap?: 'xs' | 'sm' | 'md' | 'lg';
  align?: 'start' | 'center' | 'end';
}) => {
  const gapClasses = {
    xs: 'space-x-1 sm:space-x-2',
    sm: 'space-x-2 sm:space-x-3',
    md: 'space-x-3 sm:space-x-4',
    lg: 'space-x-4 sm:space-x-6'
  };

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end'
  };

  return (
    <div className={cn(
      'flex flex-row',
      alignClasses[align],
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  );
};
