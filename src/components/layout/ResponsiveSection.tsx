
import React from 'react';
import { cn } from '@/lib/utils';
import { useResponsiveDesign } from '@/hooks/useResponsiveDesign';

interface ResponsiveSectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'hero' | 'feature' | 'content' | 'footer';
  background?: 'default' | 'muted' | 'gradient' | 'accent';
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  id?: string;
}

export const ResponsiveSection = ({
  children,
  className,
  variant = 'default',
  background = 'default',
  spacing = 'lg',
  id
}: ResponsiveSectionProps) => {
  const { screenSize } = useResponsiveDesign();

  const sectionVariants = {
    default: 'py-8 md:py-12 lg:py-16',
    hero: 'py-12 md:py-20 lg:py-28 xl:py-32',
    feature: 'py-10 md:py-16 lg:py-20',
    content: 'py-8 md:py-12 lg:py-16',
    footer: 'py-8 md:py-12'
  };

  const backgroundVariants = {
    default: 'bg-background',
    muted: 'bg-muted/30',
    gradient: 'bg-gradient-to-br from-background via-background to-vibe-primary/5',
    accent: 'bg-vibe-primary/5'
  };

  const spacingVariants = {
    sm: 'py-4 md:py-6 lg:py-8',
    md: 'py-6 md:py-10 lg:py-12',
    lg: 'py-8 md:py-12 lg:py-16',
    xl: 'py-12 md:py-20 lg:py-24'
  };

  return (
    <section 
      id={id}
      className={cn(
        'relative w-full',
        sectionVariants[variant],
        backgroundVariants[background],
        spacingVariants[spacing],
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {children}
      </div>
    </section>
  );
};
