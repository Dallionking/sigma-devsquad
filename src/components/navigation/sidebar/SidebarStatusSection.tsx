
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
      <div className="sidebar-section status-section px-3 py-2 mt-auto border-t border-sidebar-border">
        <div className="flex justify-center" title="System Status: Online">
          <div className="w-8 h-8 bg-sidebar-accent/30 rounded-lg flex items-center justify-center">
            <Activity className="w-4 h-4 text-green-500" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sidebar-section status-section px-3 py-4 mt-auto border-t border-sidebar-border">
      <div className="space-y-3">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="w-4 h-4 text-green-500" />
          <span className="text-sm font-semibold text-sidebar-foreground">System Status</span>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-sidebar-foreground/70">Active Agents</span>
            <span className="font-medium text-sidebar-foreground">
              {activeAgents}/{totalAgents}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sidebar-foreground/70">Status</span>
            <span className="text-green-500 flex items-center gap-1 font-medium">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              Online
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
