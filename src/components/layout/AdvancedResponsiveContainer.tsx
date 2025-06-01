
import React from 'react';
import { cn } from '@/lib/utils';

interface AdvancedResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'hero' | 'content' | 'wide' | 'narrow';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'fluid';
  allowOverflow?: boolean;
}

const variantClasses = {
  default: 'max-w-7xl mx-auto',
  hero: 'max-w-6xl mx-auto',
  content: 'max-w-4xl mx-auto',
  wide: 'max-w-8xl mx-auto',
  narrow: 'max-w-2xl mx-auto'
};

const paddingClasses = {
  none: '',
  sm: 'px-4 py-2',
  md: 'px-4 sm:px-6 lg:px-8 py-4 lg:py-6',
  lg: 'px-4 sm:px-6 lg:px-8 xl:px-12 py-6 lg:py-8',
  xl: 'px-4 sm:px-6 lg:px-8 xl:px-16 py-8 lg:py-12',
  fluid: 'p-fluid-md'
};

export const AdvancedResponsiveContainer = ({
  children,
  className,
  variant = 'default',
  padding = 'md',
  allowOverflow = false
}: AdvancedResponsiveContainerProps) => {
  return (
    <div className={cn(
      'w-full',
      variantClasses[variant],
      paddingClasses[padding],
      !allowOverflow && 'overflow-hidden',
      className
    )}>
      {children}
    </div>
  );
};

// Specialized responsive components
export const HeroContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <AdvancedResponsiveContainer variant="hero" padding="fluid" className={cn('grid-hero-layout', className)}>
    {children}
  </AdvancedResponsiveContainer>
);

export const ContentContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <AdvancedResponsiveContainer variant="content" padding="lg" className={className}>
    {children}
  </AdvancedResponsiveContainer>
);

export const SectionContainer = ({ 
  children, 
  className,
  spacing = 'lg'
}: { 
  children: React.ReactNode; 
  className?: string;
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
}) => {
  const spacingClasses = {
    sm: 'space-fluid-sm',
    md: 'space-fluid-md',
    lg: 'space-fluid-lg',
    xl: 'space-fluid-xl'
  };

  return (
    <AdvancedResponsiveContainer 
      variant="default" 
      padding="fluid" 
      className={cn(spacingClasses[spacing], className)}
    >
      {children}
    </AdvancedResponsiveContainer>
  );
};
