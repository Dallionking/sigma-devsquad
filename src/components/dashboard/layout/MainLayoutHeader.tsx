
import React from 'react';
import { ViewModeTabs } from '../ViewModeTabs';
import { ViewMode } from '@/types';

interface MainLayoutHeaderProps {
  showTeamView: boolean;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  notificationCounts: {
    workflow: number;
    communication: number;
    tasks: number;
    messages: number;
  };
}

export const MainLayoutHeader = ({
  showTeamView,
  viewMode,
  onViewModeChange,
  notificationCounts
}: MainLayoutHeaderProps) => {
  if (showTeamView) return null;

  return (
    <div className="border-b border-border/50 bg-background/95 backdrop-blur-sm">
      <ViewModeTabs
        viewMode={viewMode}
        onViewModeChange={onViewModeChange}
        notificationCounts={notificationCounts}
      />
    </div>
  );
};
