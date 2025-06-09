
import React from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveSpacingProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  margin?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  direction?: 'vertical' | 'horizontal' | 'both';
}

const paddingClasses = {
  none: '',
  xs: 'p-2 sm:p-3',
  sm: 'p-3 sm:p-4',
  md: 'p-4 sm:p-6',
  lg: 'p-6 sm:p-8',
  xl: 'p-8 sm:p-12'
};

const marginClasses = {
  none: '',
  xs: 'm-2 sm:m-3',
  sm: 'm-3 sm:m-4',
  md: 'm-4 sm:m-6',
  lg: 'm-6 sm:m-8',
  xl: 'm-8 sm:m-12'
};

const gapClasses = {
  none: '',
  xs: 'gap-2 sm:gap-3',
  sm: 'gap-3 sm:gap-4',
  md: 'gap-4 sm:gap-6',
  lg: 'gap-6 sm:gap-8',
  xl: 'gap-8 sm:gap-12'
};

export const ResponsiveSpacing = ({
  children,
  className,
  padding = 'none',
  margin = 'none',
  gap = 'none',
  direction = 'both'
}: ResponsiveSpacingProps) => {
  const getDirectionClasses = () => {
    if (direction === 'vertical' && gap !== 'none') {
      return `flex flex-col ${gapClasses[gap]}`;
    }
    if (direction === 'horizontal' && gap !== 'none') {
      return `flex flex-row ${gapClasses[gap]}`;
    }
    return '';
  };

  return (
    <div className={cn(
      paddingClasses[padding],
      marginClasses[margin],
      getDirectionClasses(),
      className
    )}>
      {children}
    </div>
  );
};

// Simplified spacing components
export const Section = ({ 
  children, 
  className,
  size = 'md'
}: { 
  children: React.ReactNode; 
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}) => (
  <div className={cn(
    size === 'sm' && 'p-3 sm:p-4',
    size === 'md' && 'p-4 sm:p-6',
    size === 'lg' && 'p-6 sm:p-8',
    className
  )}>
    {children}
  </div>
);

export const Stack = ({ 
  children, 
  className,
  gap = 'md'
}: { 
  children: React.ReactNode; 
  className?: string;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}) => (
  <div className={cn(
    'flex flex-col',
    gap === 'xs' && 'gap-2',
    gap === 'sm' && 'gap-3',
    gap === 'md' && 'gap-4',
    gap === 'lg' && 'gap-6',
    gap === 'xl' && 'gap-8',
    className
  )}>
    {children}
  </div>
);
