
import React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface OptimizedGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: 'xs' | 'sm' | 'md' | 'lg';
  autoFit?: boolean;
  minItemWidth?: string;
}

const gapClasses = {
  xs: 'gap-1 sm:gap-2',
  sm: 'gap-2 sm:gap-3', 
  md: 'gap-3 sm:gap-4',
  lg: 'gap-4 sm:gap-6'
};

export const OptimizedGrid = ({
  children,
  className,
  cols = { xs: 1, sm: 2, md: 3, lg: 4 },
  gap = 'sm',
  autoFit = false,
  minItemWidth = '250px'
}: OptimizedGridProps) => {
  const isMobile = useIsMobile();

  const getGridClasses = () => {
    if (autoFit) {
      return `grid-cols-[repeat(auto-fit,minmax(${minItemWidth},1fr))]`;
    }

    const classes = [];
    if (cols.xs) classes.push(`grid-cols-${cols.xs}`);
    if (cols.sm) classes.push(`sm:grid-cols-${cols.sm}`);
    if (cols.md) classes.push(`md:grid-cols-${cols.md}`);
    if (cols.lg) classes.push(`lg:grid-cols-${cols.lg}`);
    if (cols.xl) classes.push(`xl:grid-cols-${cols.xl}`);
    
    return classes.join(' ');
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

// Specialized grid components for common layouts
export const DashboardOptimizedGrid = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <OptimizedGrid
    cols={{ xs: 1, sm: 2, lg: 3, xl: 4 }}
    gap="sm"
    className={className}
  >
    {children}
  </OptimizedGrid>
);

export const ContentOptimizedGrid = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <OptimizedGrid
    cols={{ xs: 1, md: 2 }}
    gap="md"
    className={className}
  >
    {children}
  </OptimizedGrid>
);

export const CompactGrid = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <OptimizedGrid
    cols={{ xs: 2, sm: 3, md: 4, lg: 6 }}
    gap="xs"
    className={className}
  >
    {children}
  </OptimizedGrid>
);
