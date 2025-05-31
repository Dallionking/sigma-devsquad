
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
      description: 'Agent collaboration flow'
    },
    {
      key: 'communication' as ViewMode,
      label: 'Communication',
      icon: MessageSquare,
      count: notificationCounts.communication,
      description: 'Team chat & updates'
    },
    {
      key: 'tasks' as ViewMode,
      label: 'Tasks',
      icon: CheckSquare,
      count: notificationCounts.tasks,
      description: 'Active assignments'
    },
    {
      key: 'messages' as ViewMode,
      label: 'Messages',
      icon: Mail,
      count: notificationCounts.messages,
      description: 'Direct communications'
    }
  ];

  return (
    <div className="border-b bg-background/60 backdrop-blur-sm">
      {/* Vibe accent line */}
      <div className="h-0.5 bg-gradient-to-r from-primary/30 via-blue-500/30 to-purple-500/30" />
      
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold vibe-gradient-text">
            Squad Dashboard
          </h2>
        </div>
        
        <div className="flex space-x-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = viewMode === tab.key;
            
            return (
              <Button
                key={tab.key}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewModeChange(tab.key)}
                className={cn(
                  "relative h-10 px-4 transition-all duration-200 group",
                  isActive 
                    ? "vibe-btn-primary shadow-lg" 
                    : "hover:bg-primary/10 hover:text-primary"
                )}
              >
                <Icon className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline font-medium">{tab.label}</span>
                
                {tab.count > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="ml-2 h-5 w-5 p-0 text-xs animate-pulse"
                  >
                    {tab.count}
                  </Badge>
                )}
                
                {/* Hover tooltip */}
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-background/95 backdrop-blur-sm border rounded-lg px-3 py-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 whitespace-nowrap shadow-lg">
                  {tab.description}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-background border-l border-t rotate-45" />
                </div>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
