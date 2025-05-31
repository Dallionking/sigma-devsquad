
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
      activeColor: 'from-indigo-500 to-purple-600',
      hoverColor: 'hover:from-indigo-400 hover:to-purple-500'
    },
    {
      key: 'communication' as ViewMode,
      label: 'Communication',
      icon: MessageSquare,
      count: notificationCounts.communication,
      description: 'Team chat & updates',
      activeColor: 'from-blue-500 to-cyan-600',
      hoverColor: 'hover:from-blue-400 hover:to-cyan-500'
    },
    {
      key: 'tasks' as ViewMode,
      label: 'Tasks',
      icon: CheckSquare,
      count: notificationCounts.tasks,
      description: 'Active assignments',
      activeColor: 'from-emerald-500 to-teal-600',
      hoverColor: 'hover:from-emerald-400 hover:to-teal-500'
    },
    {
      key: 'messages' as ViewMode,
      label: 'Messages',
      icon: Mail,
      count: notificationCounts.messages,
      description: 'Direct communications',
      activeColor: 'from-orange-500 to-red-600',
      hoverColor: 'hover:from-orange-400 hover:to-red-500'
    }
  ];

  return (
    <div className="border-b bg-background/95 backdrop-blur-sm">
      {/* Vibe accent line */}
      <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 via-blue-500 to-cyan-500 animate-pulse" />
      
      <div className="flex items-center justify-center px-6 py-4">
        <div className="flex items-center gap-2 mr-8">
          <Zap className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold vibe-gradient-text">
            Squad Dashboard
          </h2>
        </div>
        
        <div className="flex space-x-2 bg-muted/30 rounded-2xl p-2 border border-border/50">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = viewMode === tab.key;
            
            return (
              <Button
                key={tab.key}
                variant="ghost"
                size="lg"
                onClick={() => onViewModeChange(tab.key)}
                className={cn(
                  "relative h-12 px-6 rounded-xl transition-all duration-300 group",
                  "border border-transparent font-medium text-sm",
                  isActive 
                    ? `bg-gradient-to-r ${tab.activeColor} text-white shadow-lg scale-105 border-white/20` 
                    : `hover:bg-gradient-to-r ${tab.hoverColor} hover:text-white text-muted-foreground hover:scale-102`
                )}
                title={tab.description}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="font-semibold">{tab.label}</span>
                
                {tab.count > 0 && (
                  <Badge 
                    variant="secondary" 
                    className={cn(
                      "ml-3 h-6 w-6 p-0 text-xs flex items-center justify-center",
                      isActive 
                        ? "bg-white/20 text-white border-white/30" 
                        : "bg-primary/10 text-primary animate-pulse"
                    )}
                  >
                    {tab.count}
                  </Badge>
                )}
                
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white rounded-full shadow-lg" />
                )}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
