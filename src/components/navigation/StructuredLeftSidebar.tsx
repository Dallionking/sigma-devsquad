
import React, { useState, useRef, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import { useTeams } from '@/contexts/TeamContext';
import { cn } from '@/lib/utils';
import '@/styles/sidebar/index.css';

// Import the focused sidebar components
import { SidebarLogoSection } from './sidebar/SidebarLogoSection';
import { SidebarProjectSection } from './sidebar/SidebarProjectSection';
import { SidebarTeamSection } from './sidebar/SidebarTeamSection';
import { SidebarNavigationSection } from './sidebar/SidebarNavigationSection';
import { SidebarStatusSection } from './sidebar/SidebarStatusSection';
import { SidebarCollapseSection } from './sidebar/SidebarCollapseSection';
import { useSidebarState } from './sidebar/useSidebarState';

interface StructuredLeftSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  activeAgents: number;
  totalAgents: number;
}

export const StructuredLeftSidebar = ({
  collapsed,
  onToggle,
  activeAgents,
  totalAgents
}: StructuredLeftSidebarProps) => {
  const { teams } = useTeams();
  
  // Use custom hook for sidebar state management
  const {
    currentTeamId,
    setCurrentTeamId,
    showProjectDropdown,
    setShowProjectDropdown,
    showTeamDropdown,
    setShowTeamDropdown,
    projectDropdownRef,
    teamDropdownRef,
    toggleProjectDropdown,
    toggleTeamDropdown
  } = useSidebarState(collapsed);

  // Keyboard shortcut for sidebar toggle (Ctrl+B)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        onToggle();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onToggle]);

  // Initialize team ID
  useEffect(() => {
    if (teams.length > 0 && !currentTeamId) {
      setCurrentTeamId(teams[0].id);
    }
  }, [teams, currentTeamId, setCurrentTeamId]);

  return (
    <div className={cn(
      "left-sidebar-container bg-sidebar-background border-r border-sidebar-border transition-all duration-300 ease-in-out flex flex-col h-screen fixed top-0 left-0 z-50",
      collapsed ? "collapsed w-16" : "w-64"
    )}>
      {/* Logo Section */}
      <SidebarLogoSection collapsed={collapsed} />

      {/* Project Section */}
      <SidebarProjectSection
        collapsed={collapsed}
        showProjectDropdown={showProjectDropdown}
        onToggleProjectDropdown={toggleProjectDropdown}
        dropdownRef={projectDropdownRef}
      />

      {/* Team Section */}
      <SidebarTeamSection
        collapsed={collapsed}
        showTeamDropdown={showTeamDropdown}
        onToggleTeamDropdown={toggleTeamDropdown}
        dropdownRef={teamDropdownRef}
        currentTeamId={currentTeamId}
        onTeamChange={setCurrentTeamId}
      />

      {/* Main Navigation Section */}
      <SidebarNavigationSection collapsed={collapsed} />

      {/* Status Section */}
      <SidebarStatusSection
        collapsed={collapsed}
        activeAgents={activeAgents}
        totalAgents={totalAgents}
      />

      {/* Collapse Section */}
      <SidebarCollapseSection collapsed={collapsed} onToggle={onToggle} />
    </div>
  );
};
