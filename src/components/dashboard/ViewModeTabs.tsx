
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
      colors: {
        bg: 'bg-blue-500/10',
        activeBg: 'bg-blue-500',
        text: 'text-blue-700 dark:text-blue-300',
        activeText: 'text-white',
        border: 'border-blue-200 dark:border-blue-800',
        activeBorder: 'border-blue-500'
      }
    },
    {
      key: 'communication' as ViewMode,
      label: 'Communication',
      icon: MessageSquare,
      count: notificationCounts.communication,
      description: 'Team chat & updates',
      colors: {
        bg: 'bg-green-500/10',
        activeBg: 'bg-green-500',
        text: 'text-green-700 dark:text-green-300',
        activeText: 'text-white',
        border: 'border-green-200 dark:border-green-800',
        activeBorder: 'border-green-500'
      }
    },
    {
      key: 'tasks' as ViewMode,
      label: 'Tasks',
      icon: CheckSquare,
      count: notificationCounts.tasks,
      description: 'Active assignments',
      colors: {
        bg: 'bg-purple-500/10',
        activeBg: 'bg-purple-500',
        text: 'text-purple-700 dark:text-purple-300',
        activeText: 'text-white',
        border: 'border-purple-200 dark:border-purple-800',
        activeBorder: 'border-purple-500'
      }
    },
    {
      key: 'messages' as ViewMode,
      label: 'Messages',
      icon: Mail,
      count: notificationCounts.messages,
      description: 'Direct communications',
      colors: {
        bg: 'bg-orange-500/10',
        activeBg: 'bg-orange-500',
        text: 'text-orange-700 dark:text-orange-300',
        activeText: 'text-white',
        border: 'border-orange-200 dark:border-orange-800',
        activeBorder: 'border-orange-500'
      }
    }
  ];

  return (
    <div className="bg-background/95 backdrop-blur-sm border-b border-border/60">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">
              Squad Dashboard
            </h2>
          </div>
          
          <div className="flex items-center gap-2 bg-muted/30 rounded-2xl p-2 border border-border/50">
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
