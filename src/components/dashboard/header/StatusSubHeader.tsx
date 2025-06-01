
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Agent } from '@/types';
import { Activity, Clock, AlertCircle } from 'lucide-react';

interface StatusSubHeaderProps {
  agents: Agent[];
  showTeamView: boolean;
}

export const StatusSubHeader = ({ agents, showTeamView }: StatusSubHeaderProps) => {
  const workingAgents = agents.filter(a => a.status === 'working').length;
  const idleAgents = agents.filter(a => a.status === 'idle').length;
  const errorAgents = agents.filter(a => a.status === 'error').length;

  return (
    <div className="px-4 py-2 bg-muted/30 border-t border-border/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-green-500" />
            <span className="text-sm">
              {workingAgents} working
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-yellow-500" />
            <span className="text-sm">
              {idleAgents} idle
            </span>
          </div>
          
          {errorAgents > 0 && (
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <span className="text-sm">
                {errorAgents} errors
              </span>
            </div>
          )}
        </div>
        
        <Badge variant="outline" className="text-xs">
          System Online
        </Badge>
      </div>
    </div>
  );
};
