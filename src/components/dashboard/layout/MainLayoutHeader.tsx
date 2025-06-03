
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
  return (
    <div className="h-12 bg-background/95 backdrop-blur-sm">
      {/* View Mode Tabs - Only for Individual View, simplified layout */}
      {!showTeamView && (
        <ViewModeTabs
          viewMode={viewMode}
          onViewModeChange={onViewModeChange}
          notificationCounts={notificationCounts}
        />
      )}
      
      {/* Team View Header - Simplified */}
      {showTeamView && (
        <div className="px-6 py-3 bg-background border-b border-border/30">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium text-foreground">Team Collaboration View</span>
          </div>
        </div>
      )}
    </div>
  );
};
