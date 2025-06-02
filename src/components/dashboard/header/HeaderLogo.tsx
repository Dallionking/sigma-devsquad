
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PanelLeft, PanelLeftClose, ChevronLeft, ChevronRight } from 'lucide-react';
import { Logo } from '@/components/branding/Logo';
import { cn } from '@/lib/utils';

interface HeaderLogoProps {
  isDashboardPage: boolean;
  sidebarCollapsed?: boolean;
  onSidebarToggle?: () => void;
  activeAgents: number;
  totalAgents: number;
}

export const HeaderLogo = ({
  isDashboardPage,
  sidebarCollapsed,
  onSidebarToggle,
  activeAgents,
  totalAgents
}: HeaderLogoProps) => {
  const [leftNavCollapsed, setLeftNavCollapsed] = useState(false);

  const handleLeftNavToggle = () => {
    setLeftNavCollapsed(!leftNavCollapsed);
  };

  const idleAgents = totalAgents - activeAgents;
  const errorAgents = 0; // Mock error count

  return (
    <div className={cn(
      "left-nav-container bg-sidebar-background border-r border-sidebar-border transition-all duration-300 ease-in-out relative",
      leftNavCollapsed ? "w-16" : "w-60"
    )}>
      {/* Collapse Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLeftNavToggle}
        className="nav-collapse-toggle absolute top-4 -right-3 w-6 h-6 p-0 bg-background border border-border rounded-full hover:bg-accent z-20"
        title={leftNavCollapsed ? "Expand navigation" : "Collapse navigation"}
      >
        {leftNavCollapsed ? (
          <ChevronRight className="w-3 h-3" />
        ) : (
          <ChevronLeft className="w-3 h-3" />
        )}
      </Button>

      <div className="p-3 space-y-4">
        {/* Logo Container */}
        <div className={cn(
          "logo-container flex items-center relative group",
          leftNavCollapsed && "justify-center"
        )}>
          <div className="logo-icon flex-shrink-0">
            <Logo size="sm" variant="icon" />
          </div>
          {!leftNavCollapsed && (
            <div className="logo-text ml-2 font-semibold text-foreground animate-in fade-in-50 duration-200">
              Vibe DevSquad
            </div>
          )}
          
          {/* Tooltip for collapsed mode */}
          {leftNavCollapsed && (
            <div className="tooltip absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded border opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30">
              Vibe DevSquad
            </div>
          )}
        </div>

        {/* Team Status Container */}
        <div className="team-status-container">
          {!leftNavCollapsed && (
            <div className="space-y-2 animate-in fade-in-50 duration-200">
              <div className="team-name text-sm font-semibold text-foreground">
                DevSquad
              </div>
              <div className="team-subtitle text-xs text-muted-foreground">
                AI Collaboration Hub
              </div>
            </div>
          )}
          
          {/* Status Indicators */}
          <div className={cn(
            "status-indicators mt-3 space-y-2",
            leftNavCollapsed ? "flex flex-col items-center space-y-1" : "space-y-2"
          )}>
            {/* Working Agents */}
            <div className="status-indicator flex items-center relative group">
              <div className="status-icon w-2 h-2 rounded-full bg-green-500 mr-2 flex-shrink-0" />
              {!leftNavCollapsed && (
                <span className="text-xs text-muted-foreground">
                  {activeAgents} working
                </span>
              )}
              {leftNavCollapsed && (
                <div className="tooltip absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded border opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30">
                  {activeAgents} working
                </div>
              )}
            </div>

            {/* Idle Agents */}
            {idleAgents > 0 && (
              <div className="status-indicator flex items-center relative group">
                <div className="status-icon w-2 h-2 rounded-full bg-yellow-500 mr-2 flex-shrink-0" />
                {!leftNavCollapsed && (
                  <span className="text-xs text-muted-foreground">
                    {idleAgents} idle
                  </span>
                )}
                {leftNavCollapsed && (
                  <div className="tooltip absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded border opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30">
                    {idleAgents} idle
                  </div>
                )}
              </div>
            )}

            {/* Error Agents */}
            {errorAgents > 0 && (
              <div className="status-indicator flex items-center relative group">
                <div className="status-icon w-2 h-2 rounded-full bg-red-500 mr-2 flex-shrink-0" />
                {!leftNavCollapsed && (
                  <span className="text-xs text-muted-foreground">
                    {errorAgents} errors
                  </span>
                )}
                {leftNavCollapsed && (
                  <div className="tooltip absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded border opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30">
                    {errorAgents} errors
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Toggle (if provided) */}
        {onSidebarToggle && !leftNavCollapsed && (
          <div className="border-t border-border pt-3 animate-in fade-in-50 duration-200">
            <Button
              variant="ghost"
              size="sm"
              onClick={onSidebarToggle}
              className="w-full justify-start h-8 px-2 text-xs"
              title={sidebarCollapsed ? "Expand sidebar (Ctrl+B)" : "Collapse sidebar (Ctrl+B)"}
            >
              {sidebarCollapsed ? (
                <PanelLeft className="w-3 h-3 mr-2" />
              ) : (
                <PanelLeftClose className="w-3 h-3 mr-2" />
              )}
              <span className="text-muted-foreground">
                {sidebarCollapsed ? "Expand" : "Collapse"} sidebar
              </span>
            </Button>
          </div>
        )}

        {/* System Status Footer */}
        {!leftNavCollapsed && (
          <div className="border-t border-border pt-3 animate-in fade-in-50 duration-200">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">System Status</span>
              <Badge variant="secondary" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-xs">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse" />
                Healthy
              </Badge>
            </div>
            <div className="mt-2 text-center">
              <kbd className="px-1.5 py-0.5 bg-muted rounded border text-xs">Ctrl+B</kbd>
              <span className="text-xs text-muted-foreground ml-1">to toggle</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
