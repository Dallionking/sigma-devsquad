
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GitBranch, 
  MessageSquare, 
  CheckSquare, 
  Mail,
  Zap
} from "lucide-react";
import { ViewMode } from "@/types";
import { cn } from "@/lib/utils";

interface ViewModeTabsProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  notificationCounts: {
    workflow: number;
    communication: number;
    tasks: number;
    messages: number;
  };
}

export const ViewModeTabs = ({ 
  viewMode, 
  onViewModeChange, 
  notificationCounts 
}: ViewModeTabsProps) => {
  const tabs = [
    {
      key: 'workflow' as ViewMode,
      label: 'Workflow',
      icon: GitBranch,
      count: notificationCounts.workflow,
      description: 'Agent collaboration flow',
    },
    {
      key: 'communication' as ViewMode,
      label: 'Communication',
      icon: MessageSquare,
      count: notificationCounts.communication,
      description: 'Team chat & updates',
    },
    {
      key: 'tasks' as ViewMode,
      label: 'Tasks',
      icon: CheckSquare,
      count: notificationCounts.tasks,
      description: 'Active assignments',
    },
    {
      key: 'messages' as ViewMode,
      label: 'Messages',
      icon: Mail,
      count: notificationCounts.messages,
      description: 'Direct communications',
    }
  ];

  return (
    <div className="bg-background/95 backdrop-blur-sm border-b border-border/60">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">
              Squad Dashboard
            </h2>
          </div>
          
          <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1 border">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = viewMode === tab.key;
              
              return (
                <Button
                  key={tab.key}
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewModeChange(tab.key)}
                  className={cn(
                    "relative h-8 px-3 rounded-md transition-all duration-200",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-sm" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
                  )}
                  title={tab.description}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  <span className="font-medium text-sm">{tab.label}</span>
                  
                  {tab.count > 0 && (
                    <Badge 
                      variant="secondary" 
                      className={cn(
                        "ml-2 h-4 w-4 p-0 text-xs flex items-center justify-center",
                        isActive 
                          ? "bg-primary-foreground/20 text-primary-foreground" 
                          : "bg-primary/20 text-primary"
                      )}
                    >
                      {tab.count}
                    </Badge>
                  )}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
