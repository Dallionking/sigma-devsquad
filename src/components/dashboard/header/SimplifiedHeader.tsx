
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Activity, TrendingUp } from "lucide-react";
import { ViewMode, Agent } from "@/types";
import { useLocation } from "react-router-dom";
import { useUnifiedNavigation } from '@/contexts/UnifiedNavigationContext';

interface SimplifiedHeaderProps {
  viewMode?: ViewMode;
  agents?: Agent[];
  showTeamView?: boolean;
}

export const SimplifiedHeader = ({ 
  viewMode, 
  agents = [],
  showTeamView = false
}: SimplifiedHeaderProps) => {
  const location = useLocation();
  const { breadcrumbs } = useUnifiedNavigation();
  
  // Calculate agent status counts
  const activeAgents = agents.filter(agent => agent.status === "working").length;
  const totalAgents = agents.length;

  // Get current page context from breadcrumbs
  const currentPage = breadcrumbs[breadcrumbs.length - 1]?.label || 'Dashboard';

  return (
    <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 border-b">
      {/* Simple Status Bar */}
      <div className="flex h-12 items-center justify-between px-6 gap-4">
        {/* Left: Current Context */}
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-foreground">
            {currentPage}
          </h1>
          {showTeamView && (
            <Badge variant="outline" className="text-xs">
              Team View
            </Badge>
          )}
        </div>
        
        {/* Right: System Status */}
        <div className="flex items-center gap-4">
          {/* Agent Status (only on dashboard) */}
          {location.pathname === '/dashboard' && totalAgents > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                <span className="text-muted-foreground">
                  {activeAgents}/{totalAgents} agents active
                </span>
              </div>
            </div>
          )}
          
          {/* System Status */}
          <Badge 
            variant="secondary" 
            className="bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
          >
            <Activity className="w-3 h-3 mr-1" />
            System Optimal
          </Badge>
        </div>
      </div>
    </div>
  );
};
