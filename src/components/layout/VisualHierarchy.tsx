
import React from 'react';
import { cn } from '@/lib/utils';

type ElevationLevel = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type RadiusSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface ElevatedCardProps {
  children: React.ReactNode;
  elevation?: ElevationLevel;
  radius?: RadiusSize;
  className?: string;
  padding?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

interface HierarchicalSectionProps {
  children: React.ReactNode;
  level: 1 | 2 | 3 | 4;
  title?: string;
  className?: string;
}

const elevationClasses = {
  xs: 'elevation-xs',
  sm: 'elevation-sm',
  md: 'elevation-md',
  lg: 'elevation-lg',
  xl: 'elevation-xl'
};

const radiusClasses = {
  xs: 'radius-xs',
  sm: 'radius-sm', 
  md: 'radius-md',
  lg: 'radius-lg',
  xl: 'radius-xl',
  '2xl': 'radius-2xl'
};

const paddingClasses = {
  xs: 'p-consistent-xs',
  sm: 'p-consistent-sm',
  md: 'p-consistent-md',
  lg: 'p-consistent-lg',
  xl: 'p-consistent-xl'
};

export const ElevatedCard = ({
  children,
  elevation = 'sm',
  radius = 'md',
  className,
  padding = 'md'
}: ElevatedCardProps) => {
  return (
    <div className={cn(
      'bg-card text-card-foreground',
      elevationClasses[elevation],
      radiusClasses[radius],
      paddingClasses[padding],
      'consistent-high-contrast',
      className
    )}>
      {children}
    </div>
  );
};

export const HierarchicalSection = ({
  children,
  level,
  title,
  className
}: HierarchicalSectionProps) => {
  const headingLevel = level === 1 ? 'primary' : level === 2 ? 'secondary' : 'tertiary';
  const headingTag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4';
  
  const sectionSpacing = {
    1: 'my-consistent-xl',
    2: 'my-consistent-lg', 
    3: 'my-consistent-md',
    4: 'my-consistent-sm'
  };

  return (
    <section className={cn(
      sectionSpacing[level],
      'container-responsive',
      className
    )}>
      {title && (
        <div className={cn(
          headingLevel === 'primary' ? 'heading-primary' : 
          headingLevel === 'secondary' ? 'heading-secondary' : 
          'heading-tertiary'
        )}>
          <h1 className="sr-only">{title}</h1>
          <span role="heading" aria-level={level}>{title}</span>
        </div>
      )}
      <div className="space-y-consistent">
        {children}
      </div>
    </section>
  );
};

// Specialized layout components
export const ContentArea = ({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <main className={cn(
    'container-responsive',
    'py-consistent-lg',
    'min-h-screen',
    className
  )}>
    {children}
  </main>
);

export const SidebarArea = ({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <aside className={cn(
    'p-consistent-md',
    'border-r border-border',
    'bg-muted/20',
    className
  )}>
    {children}
  </aside>
);

export const HeaderArea = ({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <header className={cn(
    'px-consistent-lg py-consistent-md',
    'border-b border-border',
    'bg-background/95 backdrop-blur',
    'sticky top-0 z-50',
    className
  )}>
    {children}
  </header>
);

export const FooterArea = ({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <footer className={cn(
    'px-consistent-lg py-consistent-xl',
    'border-t border-border',
    'bg-muted/50',
    'mt-auto',
    className
  )}>
    {children}
  </footer>
);
