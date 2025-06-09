
import React from 'react';
import { cn } from '@/lib/utils';

interface GridSystemProps {
  children: React.ReactNode;
  className?: string;
  container?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  layout?: 'content' | 'dashboard' | 'cards' | 'settings' | 'form' | 'auto-xs' | 'auto-sm' | 'auto-md' | 'auto-lg';
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  cols?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
}

const containerClasses = {
  sm: 'grid-container-sm',
  md: 'grid-container-md',
  lg: 'grid-container-lg',
  xl: 'grid-container-xl',
  full: 'grid-container'
};

const layoutClasses = {
  content: 'grid-content',
  dashboard: 'grid-dashboard',
  cards: 'grid-cards',
  settings: 'grid-settings',
  form: 'grid-form',
  'auto-xs': 'grid-auto-xs',
  'auto-sm': 'grid-auto-sm',
  'auto-md': 'grid-auto-md',
  'auto-lg': 'grid-auto-lg'
};

const gapClasses = {
  xs: 'gap-xs',
  sm: 'gap-sm',
  md: 'gap-md',
  lg: 'gap-lg',
  xl: 'gap-xl',
  '2xl': 'gap-2xl'
};

export const GridSystem = ({
  children,
  className,
  container = 'full',
  layout = 'content',
  gap = 'md',
  cols
}: GridSystemProps) => {
  const getCustomGridClasses = () => {
    if (!cols) return '';
    
    const classes = [];
    if (cols.xs) classes.push(`grid-cols-${cols.xs}`);
    if (cols.sm) classes.push(`sm:grid-cols-${cols.sm}`);
    if (cols.md) classes.push(`md:grid-cols-${cols.md}`);
    if (cols.lg) classes.push(`lg:grid-cols-${cols.lg}`);
    if (cols.xl) classes.push(`xl:grid-cols-${cols.xl}`);
    if (cols['2xl']) classes.push(`2xl:grid-cols-${cols['2xl']}`);
    
    return `grid ${classes.join(' ')}`;
  };

  return (
    <div className={cn(
      containerClasses[container],
      cols ? getCustomGridClasses() : layoutClasses[layout],
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  );
};

// Specialized Grid Components
export const ContentGrid = ({ children, className, ...props }: Omit<GridSystemProps, 'layout'>) => (
  <GridSystem layout="content" className={className} {...props}>
    {children}
  </GridSystem>
);

export const DashboardGrid = ({ children, className, ...props }: Omit<GridSystemProps, 'layout'>) => (
  <GridSystem layout="dashboard" className={className} {...props}>
    {children}
  </GridSystem>
);

export const CardsGrid = ({ children, className, ...props }: Omit<GridSystemProps, 'layout'>) => (
  <GridSystem layout="cards" className={className} {...props}>
    {children}
  </GridSystem>
);

export const SettingsGrid = ({ children, className, ...props }: Omit<GridSystemProps, 'layout'>) => (
  <GridSystem layout="settings" className={className} {...props}>
    {children}
  </GridSystem>
);

export const FormGrid = ({ children, className, ...props }: Omit<GridSystemProps, 'layout'>) => (
  <GridSystem layout="form" className={className} {...props}>
    {children}
  </GridSystem>
);

// Grid Item Component for consistent item styling
export const GridItem = ({ 
  children, 
  className,
  span,
  order
}: { 
  children: React.ReactNode; 
  className?: string;
  span?: 'full' | '2-md' | '3-lg';
  order?: number;
}) => {
  const spanClasses = {
    'full': 'col-span-full',
    '2-md': 'col-span-2-md',
    '3-lg': 'col-span-3-lg'
  };

  return (
    <div 
      className={cn(
        span && spanClasses[span],
        className
      )}
      style={order ? { order } : undefined}
    >
      {children}
    </div>
  );
};
