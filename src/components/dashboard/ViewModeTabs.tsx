
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GitBranch, 
  MessageSquare, 
  CheckSquare,
  Activity
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
      colors: {
        bg: 'bg-[#3B82F6]/10',
        activeBg: 'bg-gradient-to-r from-[#3B82F6] to-[#3B82F6]/80',
        text: 'text-[#3B82F6]',
        activeText: 'text-white',
        border: 'border-[#3B82F6]/30',
        activeBorder: 'border-[#3B82F6]'
      }
    },
    {
      key: 'communication' as ViewMode,
      label: 'Communication',
      icon: MessageSquare,
      count: notificationCounts.communication + notificationCounts.messages, // Combined count
      description: 'Unified messaging & team chat',
      colors: {
        bg: 'bg-[#10B981]/10',
        activeBg: 'bg-gradient-to-r from-[#10B981] to-[#10B981]/80',
        text: 'text-[#10B981]',
        activeText: 'text-white',
        border: 'border-[#10B981]/30',
        activeBorder: 'border-[#10B981]'
      }
    },
    {
      key: 'tasks' as ViewMode,
      label: 'Tasks',
      icon: CheckSquare,
      count: notificationCounts.tasks,
      description: 'Active assignments',
      colors: {
        bg: 'bg-[#8B5CF6]/10',
        activeBg: 'bg-gradient-to-r from-[#8B5CF6] to-[#8B5CF6]/80',
        text: 'text-[#8B5CF6]',
        activeText: 'text-white',
        border: 'border-[#8B5CF6]/30',
        activeBorder: 'border-[#8B5CF6]'
      }
    }
  ];

  const handleTabClick = (tabKey: ViewMode) => {
    // Both communication and messages now go to the unified communication view
    if (tabKey === 'messages') {
      onViewModeChange('communication');
    } else {
      onViewModeChange(tabKey);
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#0A0E1A]/95 via-background/95 to-background/95 backdrop-blur-sm border-b border-border/30">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-gradient-to-br from-[#3B82F6] via-[#8B5CF6] to-[#3B82F6] rounded-lg flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
                Vibe DevSquad Dashboard
              </h2>
              <p className="text-xs text-muted-foreground">AI Collaboration Hub</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm rounded-2xl p-2 border border-border/30">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = viewMode === tab.key || (viewMode === 'messages' && tab.key === 'communication');
              
              return (
                <Button
                  key={tab.key}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleTabClick(tab.key)}
                  className={cn(
                    "relative h-10 px-4 py-2 rounded-xl transition-all duration-300 border-2",
                    "hover:shadow-lg hover:scale-105 transform",
                    isActive 
                      ? `${tab.colors.activeBg} ${tab.colors.activeText} ${tab.colors.activeBorder} shadow-lg` 
                      : `${tab.colors.bg} ${tab.colors.text} ${tab.colors.border} hover:${tab.colors.activeBg}/20`
                  )}
                  title={tab.description}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  <span className="font-medium text-sm">{tab.label}</span>
                  
                  {tab.count > 0 && (
                    <Badge 
                      variant="secondary" 
                      className={cn(
                        "ml-2 h-5 w-5 p-0 text-xs flex items-center justify-center rounded-full",
                        isActive 
                          ? "bg-white/20 text-white border-white/30" 
                          : "bg-primary/80 text-primary-foreground"
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
