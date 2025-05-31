
import React from 'react';
import { cn } from '@/lib/utils';

type SpacingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type HeadingLevel = 'primary' | 'secondary' | 'tertiary';
type BodySize = 'large' | 'regular' | 'small' | 'caption';

interface ConsistentSpacingProps {
  children: React.ReactNode;
  className?: string;
  padding?: SpacingSize;
  margin?: SpacingSize;
  gap?: SpacingSize;
}

interface ConsistentHeadingProps {
  children: React.ReactNode;
  level: HeadingLevel;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

interface ConsistentBodyProps {
  children: React.ReactNode;
  size?: BodySize;
  className?: string;
  contrast?: 'high' | 'medium' | 'low';
}

interface CriticalActionProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'destructive';
  disabled?: boolean;
}

const spacingClasses = {
  xs: 'spacing-xs',
  sm: 'spacing-sm', 
  md: 'spacing-md',
  lg: 'spacing-lg',
  xl: 'spacing-xl'
};

const paddingClasses = {
  xs: 'p-consistent-xs',
  sm: 'p-consistent-sm',
  md: 'p-consistent-md', 
  lg: 'p-consistent-lg',
  xl: 'p-consistent-xl'
};

const marginClasses = {
  xs: 'm-consistent-xs',
  sm: 'm-consistent-sm',
  md: 'm-consistent-md',
  lg: 'm-consistent-lg', 
  xl: 'm-consistent-xl'
};

const gapClasses = {
  xs: 'gap-consistent-xs',
  sm: 'gap-consistent-sm',
  md: 'gap-consistent-md',
  lg: 'gap-consistent-lg',
  xl: 'gap-consistent-xl'
};

const headingClasses = {
  primary: 'heading-primary',
  secondary: 'heading-secondary',
  tertiary: 'heading-tertiary'
};

const bodyClasses = {
  large: 'body-large',
  regular: 'body-regular',
  small: 'body-small',
  caption: 'caption'
};

const contrastClasses = {
  high: 'text-contrast-high',
  medium: 'text-contrast-medium',
  low: 'text-contrast-low'
};

export const ConsistentSpacing = ({
  children,
  className,
  padding,
  margin,
  gap
}: ConsistentSpacingProps) => {
  return (
    <div className={cn(
      padding && paddingClasses[padding],
      margin && marginClasses[margin],
      gap && `flex flex-col ${gapClasses[gap]}`,
      className
    )}>
      {children}
    </div>
  );
};

export const ConsistentHeading = ({
  children,
  level,
  className,
  as = 'h2'
}: ConsistentHeadingProps) => {
  const Component = as;
  
  return (
    <Component className={cn(
      headingClasses[level],
      'consistent-motion-safe',
      className
    )}>
      {children}
    </Component>
  );
};

export const ConsistentBody = ({
  children,
  size = 'regular',
  className,
  contrast = 'high'
}: ConsistentBodyProps) => {
  return (
    <div className={cn(
      bodyClasses[size],
      contrastClasses[contrast],
      className
    )}>
      {children}
    </div>
  );
};

export const CriticalAction = ({
  children,
  onClick,
  className,
  variant = 'primary',
  disabled = false
}: CriticalActionProps) => {
  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'critical-action',
        'consistent-motion-safe',
        'mobile-critical-action',
        variantClasses[variant],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {children}
    </button>
  );
};

// Container components with consistent spacing
export const ConsistentContainer = ({
  children,
  size = 'lg',
  className
}: {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}) => {
  const containerClasses = {
    xs: 'container-xs',
    sm: 'container-sm',
    md: 'container-md',
    lg: 'container-lg',
    xl: 'container-xl',
    '2xl': 'container-2xl'
  };

  return (
    <div className={cn(
      containerClasses[size],
      'container-responsive',
      className
    )}>
      {children}
    </div>
  );
};

export const ConsistentGrid = ({
  children,
  autoFit = 'md',
  className
}: {
  children: React.ReactNode;
  autoFit?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}) => {
  const gridClasses = {
    xs: 'grid-auto-fit-xs',
    sm: 'grid-auto-fit-sm', 
    md: 'grid-auto-fit-md',
    lg: 'grid-auto-fit-lg'
  };

  return (
    <div className={cn(
      'grid-consistent',
      gridClasses[autoFit],
      className
    )}>
      {children}
    </div>
  );
};

export const ConsistentFlex = ({
  children,
  direction = 'row',
  align = 'center',
  justify = 'start',
  className
}: {
  children: React.ReactNode;
  direction?: 'row' | 'col';
  align?: 'start' | 'center' | 'end';
  justify?: 'start' | 'center' | 'end' | 'between';
  className?: string;
}) => {
  const directionClasses = {
    row: 'flex-row',
    col: 'flex-col'
  };

  const alignClasses = {
    start: 'items-start',
    center: 'items-center', 
    end: 'items-end'
  };

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between'
  };

  return (
    <div className={cn(
      'flex-consistent',
      directionClasses[direction],
      alignClasses[align],
      justifyClasses[justify],
      className
    )}>
      {children}
    </div>
  );
};
