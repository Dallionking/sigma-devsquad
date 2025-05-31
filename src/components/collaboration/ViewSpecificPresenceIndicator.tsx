
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Eye, Users, Activity } from 'lucide-react';
import { ViewMode } from '@/types';
import { useViewSpecificPresence } from '@/hooks/useViewSpecificPresence';
import { cn } from '@/lib/utils';

interface ViewSpecificPresenceIndicatorProps {
  viewMode: ViewMode;
  componentId: string;
  projectId?: string;
  className?: string;
  variant?: 'compact' | 'detailed';
}

export const ViewSpecificPresenceIndicator = ({
  viewMode,
  componentId,
  projectId = 'current-project',
  className,
  variant = 'compact'
}: ViewSpecificPresenceIndicatorProps) => {
  const presenceInfo = useViewSpecificPresence(viewMode, componentId, projectId);

  const getViewModeLabel = (mode: ViewMode) => {
    switch (mode) {
      case 'workflow': return 'Workflow';
      case 'communication': return 'Chat';
      case 'tasks': return 'Tasks';
      case 'messages': return 'Messages';
      default: return 'Dashboard';
    }
  };

  if (variant === 'compact') {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Tooltip>
          <TooltipTrigger>
            <Badge variant="outline" className="text-xs">
              <Eye className="w-2 h-2 mr-1" />
              {presenceInfo.currentViewUsers}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>{presenceInfo.currentViewUsers} users viewing this component</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Badge variant="outline" className="text-xs">
              <Activity className="w-2 h-2 mr-1" />
              {presenceInfo.viewModeUsers}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>{presenceInfo.viewModeUsers} users in {getViewModeLabel(viewMode)} mode</p>
          </TooltipContent>
        </Tooltip>
      </div>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="text-center p-2 bg-muted/50 rounded">
          <div className="font-medium text-[#10B981]">{presenceInfo.currentViewUsers}</div>
          <div className="text-muted-foreground">This View</div>
        </div>
        <div className="text-center p-2 bg-muted/50 rounded">
          <div className="font-medium text-[#8B5CF6]">{presenceInfo.viewModeUsers}</div>
          <div className="text-muted-foreground">{getViewModeLabel(viewMode)}</div>
        </div>
        <div className="text-center p-2 bg-muted/50 rounded">
          <div className="font-medium text-[#F59E0B]">{presenceInfo.totalUsers}</div>
          <div className="text-muted-foreground">Total</div>
        </div>
      </div>

      <div className="space-y-1">
        <h5 className="text-xs font-medium text-muted-foreground">Active Components</h5>
        {presenceInfo.activeComponents.map((component) => (
          <div key={component} className="flex items-center justify-between text-xs">
            <span className="capitalize">{component.replace('-', ' ')}</span>
            <Badge variant="secondary" className="text-xs">
              {presenceInfo.usersByComponent[component]}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
};
