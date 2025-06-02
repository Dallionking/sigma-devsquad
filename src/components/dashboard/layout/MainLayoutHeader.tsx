
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
      {/* Simplified View Indicator - No breadcrumb navigation */}
      <div className="px-6 py-2 border-b border-border/30">
        <h1 className="text-lg font-semibold text-foreground">
          {showTeamView ? "Team Dashboard" : "Dashboard"}
        </h1>
      </div>
      
      {/* View Mode Tabs - Only for Individual View, no unnecessary tabs */}
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
