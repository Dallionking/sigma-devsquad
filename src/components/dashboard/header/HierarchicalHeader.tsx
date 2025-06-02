
import React from 'react';
import { OptimizedConsolidatedNavigation } from './OptimizedConsolidatedNavigation';
import { ViewMode } from '@/types';
import { BackButton } from '@/components/navigation/BackButton';
import { cn } from '@/lib/utils';

interface HierarchicalHeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  notificationCounts: {
    workflow: number;
    communication: number;
    tasks: number;
    messages: number;
  };
  showBackButton?: boolean;
  level?: 'primary' | 'secondary' | 'tertiary';
  title?: string;
  subtitle?: string;
}

export const HierarchicalHeader = ({
  viewMode,
  onViewModeChange,
  notificationCounts,
  showBackButton = false,
  level = 'primary',
  title,
  subtitle
}: HierarchicalHeaderProps) => {
  
  const getHeaderStyles = () => {
    switch (level) {
      case 'primary':
        return "bg-background/95 backdrop-blur-sm border-b border-border/60 shadow-sm";
      case 'secondary':
        return "bg-muted/20 backdrop-blur-sm border-b border-border/40";
      case 'tertiary':
        return "bg-muted/10 backdrop-blur-sm border-b border-border/20";
      default:
        return "bg-background/95 backdrop-blur-sm border-b border-border/60";
    }
  };

  const getTitleStyles = () => {
    switch (level) {
      case 'primary':
        return "text-xl font-bold text-primary";
      case 'secondary':
        return "text-lg font-semibold text-foreground";
      case 'tertiary':
        return "text-base font-medium text-foreground";
      default:
        return "text-xl font-bold text-primary";
    }
  };

  return (
    <header className={cn("sticky top-0 z-50", getHeaderStyles())}>
      <div className="px-4 py-3">
        {/* Top row with back button and title (if provided) */}
        {(showBackButton || title) && (
          <div className="flex items-center gap-4 mb-3">
            {showBackButton && <BackButton />}
            {title && (
              <div>
                <h1 className={getTitleStyles()}>{title}</h1>
                {subtitle && (
                  <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Primary navigation - only show on primary level */}
        {level === 'primary' && (
          <OptimizedConsolidatedNavigation
            viewMode={viewMode}
            onViewModeChange={onViewModeChange}
            notificationCounts={notificationCounts}
          />
        )}
      </div>
    </header>
  );
};
