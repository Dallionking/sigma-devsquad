
import React from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-4xl',
  xl: 'max-w-6xl',
  '2xl': 'max-w-7xl',
  full: 'max-w-full'
};

const paddingClasses = {
  none: '',
  sm: 'px-4 py-2',
  md: 'px-4 sm:px-6 lg:px-8 py-4',
  lg: 'px-4 sm:px-6 lg:px-8 xl:px-12 py-6'
};

export const ResponsiveContainer = ({ 
  children, 
  className, 
  maxWidth = '2xl',
  padding = 'md'
}: ResponsiveContainerProps) => {
  return (
    <div className={cn(
      'mx-auto w-full',
      maxWidthClasses[maxWidth],
      paddingClasses[padding],
      className
    )}>
      {children}
    </div>
  );
};

// Responsive grid component for various layouts
export const ResponsiveGrid = ({ 
  children, 
  className,
  cols = { base: 1, sm: 2, lg: 3, xl: 4 },
  gap = 'md'
}: {
  children: React.ReactNode;
  className?: string;
  cols?: { base?: number; sm?: number; md?: number; lg?: number; xl?: number; '2xl'?: number };
  gap?: 'sm' | 'md' | 'lg';
}) => {
  const gapClasses = {
    sm: 'gap-3',
    md: 'gap-4 sm:gap-6',
    lg: 'gap-6 sm:gap-8'
  };

  const getGridCols = () => {
    const classes = [];
    if (cols.base) classes.push(`grid-cols-${cols.base}`);
    if (cols.sm) classes.push(`sm:grid-cols-${cols.sm}`);
    if (cols.md) classes.push(`md:grid-cols-${cols.md}`);
    if (cols.lg) classes.push(`lg:grid-cols-${cols.lg}`);
    if (cols.xl) classes.push(`xl:grid-cols-${cols.xl}`);
    if (cols['2xl']) classes.push(`2xl:grid-cols-${cols['2xl']}`);
    return classes.join(' ');
  };

  return (
    <div className={cn(
      'grid',
      getGridCols(),
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  );
};
