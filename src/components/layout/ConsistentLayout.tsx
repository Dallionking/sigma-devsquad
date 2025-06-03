
import React from 'react';
import { cn } from '@/lib/utils';
import { useLayoutConsistency } from '@/hooks/useLayoutConsistency';
import { useSpacingAudit } from '@/hooks/useSpacingAudit';

interface ConsistentLayoutProps {
  children: React.ReactNode;
  sidebarCollapsed?: boolean;
  hasSidebar?: boolean;
  className?: string;
}

export const ConsistentLayout = ({
  children,
  sidebarCollapsed = false,
  hasSidebar = true,
  className
}: ConsistentLayoutProps) => {
  const { getLayoutClasses, preventOverlap } = useLayoutConsistency(sidebarCollapsed);
  const { getContainerSpacing } = useSpacingAudit();

  const layoutClasses = getLayoutClasses();
  const containerSpacing = getContainerSpacing();

  return (
    <div className={cn(
      layoutClasses.container,
      className
    )}>
      <main 
        className={cn(
          layoutClasses.mainContent,
          layoutClasses.contentArea,
          preventOverlap.ensureSpacing('section')
        )}
        style={{
          paddingLeft: containerSpacing.padding,
          paddingRight: containerSpacing.padding
        }}
      >
        {children}
      </main>
    </div>
  );
};

export const ConsistentSection = ({
  children,
  className,
  spacing = 'md'
}: {
  children: React.ReactNode;
  className?: string;
  spacing?: 'sm' | 'md' | 'lg';
}) => {
  const { getConsistentSpacing } = useSpacingAudit();

  const spacingMap = {
    sm: getConsistentSpacing('md'),
    md: getConsistentSpacing('lg'),
    lg: getConsistentSpacing('xl')
  };

  return (
    <section 
      className={cn('w-full', className)}
      style={{
        paddingTop: spacingMap[spacing],
        paddingBottom: spacingMap[spacing]
      }}
    >
      {children}
    </section>
  );
};

export const ConsistentCard = ({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { preventOverlap } = useLayoutConsistency();
  const { getConsistentSpacing } = useSpacingAudit();

  return (
    <div className={cn(
      'bg-card border border-border rounded-lg shadow-sm',
      preventOverlap.ensureSpacing('card'),
      className
    )}
    style={{
      padding: getConsistentSpacing('lg')
    }}>
      {children}
    </div>
  );
};
