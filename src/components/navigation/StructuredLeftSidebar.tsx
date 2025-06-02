
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
  const [currentTeamId, setCurrentTeamId] = useState<string>(teams[0]?.id || "");
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);
  const [showTeamDropdown, setShowTeamDropdown] = useState(false);
  
  const projectDropdownRef = useRef<HTMLDivElement>(null);
  const teamDropdownRef = useRef<HTMLDivElement>(null);

  const toggleProjectDropdown = () => {
    if (collapsed) return; // Don't open dropdowns when collapsed
    setShowProjectDropdown(!showProjectDropdown);
    setShowTeamDropdown(false);
  };

  const toggleTeamDropdown = () => {
    if (collapsed) return; // Don't open dropdowns when collapsed
    setShowTeamDropdown(!showTeamDropdown);
    setShowProjectDropdown(false);
  };

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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (projectDropdownRef.current && !projectDropdownRef.current.contains(event.target as Node)) {
        setShowProjectDropdown(false);
      }
      if (teamDropdownRef.current && !teamDropdownRef.current.contains(event.target as Node)) {
        setShowTeamDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdowns when sidebar collapses
  useEffect(() => {
    if (collapsed) {
      setShowProjectDropdown(false);
      setShowTeamDropdown(false);
    }
  }, [collapsed]);

  return (
    <div className={cn(
      "left-sidebar-container bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out flex flex-col h-screen fixed top-0 left-0 z-50",
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

      <Separator className="mx-3" />

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
