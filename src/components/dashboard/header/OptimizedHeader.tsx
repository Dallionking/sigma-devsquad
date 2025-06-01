
import React from 'react';
import { HeaderLogo } from './HeaderLogo';
import { ViewModeSelector } from './ViewModeSelector';
import { NavigationButtons } from './NavigationButtons';
import { OptimizedActionButtons } from './OptimizedActionButtons';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { ViewMode, Agent } from '@/types';
import { MobileNavigation } from '@/components/layout/MobileNavigation';

interface OptimizedHeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  agents: Agent[];
  sidebarCollapsed?: boolean;
  onSidebarToggle?: () => void;
  showTeamView?: boolean;
}

export const OptimizedHeader = ({
  viewMode,
  onViewModeChange,
  agents,
  sidebarCollapsed = false,
  onSidebarToggle,
  showTeamView = false
}: OptimizedHeaderProps) => {
  const activeAgents = agents.filter(agent => agent.status === 'active').length;

  // Mock notification counts for ViewModeSelector
  const notificationCounts = {
    workflow: 0,
    communication: 0,
    tasks: 0,
    messages: 0
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left Section - Logo and Mobile Navigation */}
          <div className="flex items-center space-x-4">
            <MobileNavigation 
              activeAgents={activeAgents}
              totalAgents={agents.length}
            />
            <HeaderLogo 
              isDashboardPage={true}
              sidebarCollapsed={sidebarCollapsed}
              onSidebarToggle={onSidebarToggle}
              activeAgents={activeAgents}
              totalAgents={agents.length}
            />
          </div>

          {/* Center Section - Navigation Buttons (Desktop) */}
          <div className="hidden lg:flex flex-1 justify-center">
            <NavigationButtons 
              showTeamView={showTeamView}
            />
          </div>

          {/* Right Section - Actions and Theme Toggle */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Action Buttons */}
            <OptimizedActionButtons />
          </div>
        </div>

        {/* Mobile Navigation Buttons */}
        <div className="lg:hidden pb-3">
          <NavigationButtons 
            showTeamView={showTeamView}
          />
        </div>

        {/* View Mode Selector (for workflow tabs) */}
        <div className="pb-3 border-t border-border/50 mt-2">
          <ViewModeSelector
            viewMode={viewMode}
            onViewModeChange={onViewModeChange}
            notificationCounts={notificationCounts}
          />
        </div>
      </div>
    </header>
  );
};
