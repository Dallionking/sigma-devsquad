
import React from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveTextProps {
  children: React.ReactNode;
  variant?: 'heading' | 'subheading' | 'body' | 'caption' | 'title';
  className?: string;
  truncate?: boolean | number;
  responsive?: boolean;
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
}

const variantClasses = {
  title: 'text-xl sm:text-2xl lg:text-3xl xl:text-4xl',
  heading: 'text-lg sm:text-xl lg:text-2xl',
  subheading: 'text-base sm:text-lg lg:text-xl',
  body: 'text-sm sm:text-base',
  caption: 'text-xs sm:text-sm'
};

const weightClasses = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold'
};

export const ResponsiveText = ({
  children,
  variant = 'body',
  className,
  truncate = false,
  responsive = true,
  weight = 'normal'
}: ResponsiveTextProps) => {
  const getTruncateClasses = () => {
    if (truncate === true) return 'truncate';
    if (typeof truncate === 'number') return `line-clamp-${truncate}`;
    return '';
  };

  return (
    <div className={cn(
      responsive && variantClasses[variant],
      !responsive && variant === 'body' && 'text-sm',
      !responsive && variant === 'heading' && 'text-lg',
      !responsive && variant === 'title' && 'text-xl',
      weightClasses[weight],
      getTruncateClasses(),
      className
    )}>
      {children}
    </div>
  );
};

// Specialized text components
export const ResponsiveHeading = ({ children, className, level = 1 }: { 
  children: React.ReactNode; 
  className?: string; 
  level?: 1 | 2 | 3 | 4;
}) => {
  const variants = {
    1: 'title',
    2: 'heading',
    3: 'subheading',
    4: 'body'
  } as const;

  return (
    <ResponsiveText
      variant={variants[level]}
      weight="semibold"
      className={className}
    >
      {children}
    </ResponsiveText>
  );
};

export const TruncatedText = ({ 
  children, 
  lines = 1, 
  className 
}: { 
  children: React.ReactNode; 
  lines?: number; 
  className?: string;
}) => (
  <ResponsiveText
    variant="body"
    truncate={lines}
    className={className}
  >
    {children}
  </ResponsiveText>
);
