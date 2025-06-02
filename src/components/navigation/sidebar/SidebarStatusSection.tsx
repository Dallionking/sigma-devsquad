
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Activity } from 'lucide-react';

interface SidebarStatusSectionProps {
  collapsed: boolean;
  activeAgents: number;
  totalAgents: number;
}

export const SidebarStatusSection = ({
  collapsed,
  activeAgents,
  totalAgents
}: SidebarStatusSectionProps) => {
  if (collapsed) {
    return (
      <div className="sidebar-section status-section px-3 py-2 mt-auto">
        <div className="flex justify-center" title="System Status: Online">
          <div className="w-8 h-8 bg-sidebar-accent/30 rounded-lg flex items-center justify-center">
            <Activity className="w-4 h-4 text-green-500" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sidebar-section status-section px-3 py-2 mt-auto">
      <div className="bg-sidebar-accent/30 rounded-lg p-3">
        <div className="text-xs font-medium text-sidebar-foreground mb-2 flex items-center gap-2">
          <Activity className="w-3 h-3" />
          System Status
        </div>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-sidebar-foreground/70">Active Agents</span>
            <Badge variant="secondary" className="text-xs px-1">
              {activeAgents}/{totalAgents}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-sidebar-foreground/70">Status</span>
            <span className="text-green-500 flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Online
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
