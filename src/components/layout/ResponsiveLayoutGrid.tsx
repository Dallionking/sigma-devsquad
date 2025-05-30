
import React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface ResponsiveLayoutGridProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'dashboard' | 'content' | 'cards' | 'list';
  minItemWidth?: string;
  maxCols?: number;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const gapClasses = {
  xs: 'gap-2',
  sm: 'gap-3',
  md: 'gap-4 sm:gap-6',
  lg: 'gap-6 sm:gap-8',
  xl: 'gap-8 sm:gap-10'
};

const variantClasses = {
  dashboard: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  content: 'grid-cols-1 lg:grid-cols-2',
  cards: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  list: 'grid-cols-1'
};

export const ResponsiveLayoutGrid = ({
  children,
  className,
  variant = 'dashboard',
  minItemWidth,
  maxCols,
  gap = 'md'
}: ResponsiveLayoutGridProps) => {
  const isMobile = useIsMobile();

  const getGridClasses = () => {
    if (minItemWidth) {
      return `grid-cols-[repeat(auto-fit,minmax(${minItemWidth},1fr))]`;
    }
    
    if (maxCols) {
      const baseClass = 'grid-cols-1';
      const responsiveClasses = [];
      
      if (maxCols >= 2) responsiveClasses.push('sm:grid-cols-2');
      if (maxCols >= 3) responsiveClasses.push('md:grid-cols-3');
      if (maxCols >= 4) responsiveClasses.push('lg:grid-cols-4');
      
      return `${baseClass} ${responsiveClasses.join(' ')}`;
    }
    
    return variantClasses[variant];
  };

  return (
    <div className={cn(
      'grid w-full',
      getGridClasses(),
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  );
};

// Simplified grid components
export const DashboardGrid = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <ResponsiveLayoutGrid
    variant="dashboard"
    gap="md"
    className={className}
  >
    {children}
  </ResponsiveLayoutGrid>
);

export const ContentGrid = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <ResponsiveLayoutGrid
    variant="content"
    gap="md"
    className={className}
  >
    {children}
  </ResponsiveLayoutGrid>
);

export const CardGrid = ({ children, className, maxCols }: { children: React.ReactNode; className?: string; maxCols?: number }) => (
  <ResponsiveLayoutGrid
    variant="cards"
    gap="md"
    maxCols={maxCols}
    className={className}
  >
    {children}
  </ResponsiveLayoutGrid>
);
