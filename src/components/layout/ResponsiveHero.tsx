
import React from 'react';
import { cn } from '@/lib/utils';
import { useResponsiveDesign } from '@/hooks/useResponsiveDesign';

interface ResponsiveHeroProps {
  children: React.ReactNode;
  className?: string;
  layout?: 'centered' | 'split' | 'offset';
  alignment?: 'left' | 'center' | 'right';
}

export const ResponsiveHero = ({
  children,
  className,
  layout = 'split',
  alignment = 'left'
}: ResponsiveHeroProps) => {
  const { screenSize, getGridCols } = useResponsiveDesign();

  const layoutVariants = {
    centered: 'text-center max-w-4xl mx-auto',
    split: cn(
      'grid items-center',
      getGridCols(1, 1, 2),
      'gap-8 lg:gap-12'
    ),
    offset: cn(
      'grid items-center',
      getGridCols(1, 1, 12),
      'gap-8 lg:gap-12'
    )
  };

  const alignmentVariants = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return (
    <div 
      className={cn(
        'w-full',
        layoutVariants[layout],
        layout === 'centered' && alignmentVariants[alignment],
        className
      )}
    >
      {children}
    </div>
  );
};
