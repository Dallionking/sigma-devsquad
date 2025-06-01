
import React from 'react';
import { cn } from '@/lib/utils';
import { useResponsiveDesign } from '@/hooks/useResponsiveDesign';

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'cards' | 'features' | 'stats' | 'testimonials';
}

export const ResponsiveGrid = ({
  children,
  className,
  cols = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 'lg',
  variant = 'cards'
}: ResponsiveGridProps) => {
  const { getGridCols } = useResponsiveDesign();

  const gapVariants = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12'
  };

  const variantStyles = {
    cards: 'auto-rows-fr',
    features: 'auto-rows-max',
    stats: 'auto-rows-min',
    testimonials: 'auto-rows-fr'
  };

  const gridCols = getGridCols(
    cols.mobile || 1,
    cols.tablet || 2,
    cols.desktop || 3
  );

  return (
    <div 
      className={cn(
        'grid',
        gridCols,
        gapVariants[gap],
        variantStyles[variant],
        'w-full',
        className
      )}
    >
      {children}
    </div>
  );
};
