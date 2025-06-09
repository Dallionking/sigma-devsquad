
import React from 'react';
import { ViewModeTabs } from '../ViewModeTabs';
import { ViewIndicator } from '../ViewIndicator';
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
  return (
    <div className="border-b border-border/50 bg-background/95 backdrop-blur-sm">
      {/* Persistent View Indicator */}
      <div className="px-6 py-3 border-b border-border/30">
        <ViewIndicator showTeamView={showTeamView} />
      </div>
      
      {/* View Mode Tabs - Only for Individual View */}
      {!showTeamView && (
        <ViewModeTabs
          viewMode={viewMode}
          onViewModeChange={onViewModeChange}
          notificationCounts={notificationCounts}
        />
      )}
    </div>
  );
};
