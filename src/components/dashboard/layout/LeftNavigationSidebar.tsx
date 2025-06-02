
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PanelLeft, PanelLeftClose } from 'lucide-react';
import { Logo } from '@/components/branding/Logo';
import { cn } from '@/lib/utils';

interface LeftNavigationSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  activeAgents: number;
  totalAgents: number;
  errorAgents?: number;
  idleAgents?: number;
}

export const LeftNavigationSidebar = ({
  collapsed,
  onToggle,
  activeAgents,
  totalAgents,
  errorAgents = 0,
  idleAgents = 0
}: LeftNavigationSidebarProps) => {
  return (
    <div 
      className={cn(
        "flex flex-col bg-card/95 backdrop-blur-sm border-r border-border/60 transition-all duration-300 ease-in-out relative",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggle}
        className={cn(
          "absolute top-4 z-20 h-6 w-6 p-0 bg-background border border-border/50 hover:bg-accent/50",
          collapsed ? "right-2" : "right-4"
        )}
      >
        {collapsed ? (
          <PanelLeft className="w-3 h-3" />
        ) : (
          <PanelLeftClose className="w-3 h-3" />
        )}
      </Button>

      {/* Logo Container */}
      <div className={cn(
        "flex items-center p-4 pt-6",
        collapsed ? "justify-center" : "justify-start"
      )}>
        <Logo 
          size="sm" 
          variant={collapsed ? "icon" : "full"} 
          className={collapsed ? "scale-90" : ""}
        />
      </div>

      {/* Team Status Container */}
      <div className={cn(
        "px-4 pb-4",
        collapsed && "hidden"
      )}>
        <div className="space-y-2">
          <div>
            <h3 className="font-semibold text-sm text-foreground">DevSquad</h3>
            <p className="text-xs text-muted-foreground">AI Collaboration Hub</p>
          </div>
          
          {/* Status Indicators */}
          <div className="space-y-1">
            {activeAgents > 0 && (
              <div className="flex items-center text-xs">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-muted-foreground">{activeAgents} working</span>
              </div>
            )}
            
            {idleAgents > 0 && (
              <div className="flex items-center text-xs">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                <span className="text-muted-foreground">{idleAgents} idle</span>
              </div>
            )}
            
            {errorAgents > 0 && (
              <div className="flex items-center text-xs">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                <span className="text-muted-foreground">{errorAgents} errors</span>
              </div>
            )}
          </div>
          
          {/* Summary Badge */}
          <Badge variant="outline" className="text-xs w-fit">
            {activeAgents}/{totalAgents} active
          </Badge>
        </div>
      </div>

      {/* Collapsed Status Indicators */}
      {collapsed && (
        <div className="flex flex-col items-center space-y-2 px-2">
          {activeAgents > 0 && (
            <div className="group relative">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-popover text-popover-foreground px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-30 pointer-events-none">
                {activeAgents} working
              </div>
            </div>
          )}
          
          {idleAgents > 0 && (
            <div className="group relative">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-popover text-popover-foreground px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-30 pointer-events-none">
                {idleAgents} idle
              </div>
            </div>
          )}
          
          {errorAgents > 0 && (
            <div className="group relative">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-popover text-popover-foreground px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-30 pointer-events-none">
                {errorAgents} errors
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
