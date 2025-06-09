
import React from 'react';
import { OptimizedHeader } from './header/OptimizedHeader';
import { ViewMode, Agent } from '@/types';

interface HeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  agents: Agent[];
  sidebarCollapsed?: boolean;
  onSidebarToggle?: () => void;
  showTeamView?: boolean;
}

export const Header = (props: HeaderProps) => {
  return <OptimizedHeader {...props} />;
};
