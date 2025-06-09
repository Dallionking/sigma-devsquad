
import React from 'react';
import { DynamicText, DynamicHeading, TruncatedText } from '@/components/ui/dynamic-text';
import { cn } from '@/lib/utils';

interface ResponsiveTextProps {
  children: React.ReactNode;
  variant?: 'heading' | 'subheading' | 'body' | 'caption' | 'title';
  className?: string;
  truncate?: boolean | number;
  responsive?: boolean;
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
}

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
  const variantMap = {
    title: 'xl' as const,
    heading: 'lg' as const,
    subheading: 'base' as const,
    body: 'body' as const,
    caption: 'caption' as const
  };

  if (truncate) {
    const lines = typeof truncate === 'number' ? (truncate as 1 | 2 | 3) : 1;
    return (
      <TruncatedText
        lines={lines}
        className={cn(weightClasses[weight], className)}
      >
        {children}
      </TruncatedText>
    );
  }

  return (
    <DynamicText
      variant={variantMap[variant]}
      className={cn(weightClasses[weight], className)}
      accessible={responsive}
      highContrast={variant === 'heading' || variant === 'title'}
    >
      {children}
    </DynamicText>
  );
};

// Specialized text components
export const ResponsiveHeading = ({ children, className, level = 1 }: { 
  children: React.ReactNode; 
  className?: string; 
  level?: 1 | 2 | 3 | 4;
}) => (
  <DynamicHeading
    level={level}
    className={className}
  >
    {children}
  </DynamicHeading>
);

export const ResponsiveTruncatedText = ({ 
  children, 
  lines = 1, 
  className 
}: { 
  children: React.ReactNode; 
  lines?: 1 | 2 | 3; 
  className?: string;
}) => (
  <TruncatedText
    lines={lines}
    className={className}
  >
    {children}
  </TruncatedText>
);
