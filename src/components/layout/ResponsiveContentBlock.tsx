
import React from 'react';
import { cn } from '@/lib/utils';
import { useResponsiveDesign } from '@/hooks/useResponsiveDesign';

interface ResponsiveContentBlockProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  alignment?: 'left' | 'center' | 'right';
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
}

export const ResponsiveContentBlock = ({
  children,
  className,
  maxWidth = 'lg',
  alignment = 'center',
  spacing = 'md'
}: ResponsiveContentBlockProps) => {
  const { screenSize } = useResponsiveDesign();

  const maxWidthVariants = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-3xl',
    xl: 'max-w-4xl',
    '2xl': 'max-w-6xl',
    full: 'max-w-full'
  };

  const alignmentVariants = {
    left: 'mr-auto',
    center: 'mx-auto',
    right: 'ml-auto'
  };

  const spacingVariants = {
    sm: 'space-y-4',
    md: 'space-y-6',
    lg: 'space-y-8',
    xl: 'space-y-12'
  };

  return (
    <div 
      className={cn(
        'w-full',
        maxWidthVariants[maxWidth],
        alignmentVariants[alignment],
        spacingVariants[spacing],
        className
      )}
    >
      {children}
    </div>
  );
};
