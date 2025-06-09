
import React from 'react';
import { UserPresencePanel } from '../UserPresencePanel';
import { ViewMode } from '@/types';

interface MainLayoutFooterProps {
  showTeamView: boolean;
  viewMode: ViewMode;
}

export const MainLayoutFooter = ({ showTeamView, viewMode }: MainLayoutFooterProps) => {
  if (showTeamView) return null;

  return (
    <div className="border-t border-border/30 bg-background/80 backdrop-blur-sm">
      <UserPresencePanel 
        viewMode={viewMode}
        componentId={`${viewMode}-view`}
        projectId="current-project"
        showPerformance={true}
        className="animate-in slide-in-from-bottom duration-300"
      />
    </div>
  );
};
