
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ViewMode } from "@/types";
import { GitBranch, MessageSquare, CheckSquare, Activity } from "lucide-react";

interface ViewModeSelectorProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  notificationCounts: {
    workflow: number;
    communication: number;
    tasks: number;
    messages: number;
  };
}

export const ViewModeSelector = ({ 
  viewMode, 
  onViewModeChange, 
  notificationCounts 
}: ViewModeSelectorProps) => {
  const viewModeConfig = {
    workflow: { 
      icon: GitBranch, 
      label: "Workflow",
      description: "Monitor agent activities and processes",
      notifications: notificationCounts.workflow
    },
    communication: { 
      icon: MessageSquare, 
      label: "Communication",
      description: "View agent interactions and messages", 
      notifications: notificationCounts.communication
    },
    tasks: { 
      icon: CheckSquare, 
      label: "Tasks",
      description: "Manage and track task progress",
      notifications: notificationCounts.tasks
    },
    messages: { 
      icon: Activity, 
      label: "Messages",
      description: "Inspect detailed message logs",
      notifications: notificationCounts.messages
    }
  };

  return (
    <div className="flex items-center space-x-1 bg-muted/50 rounded-xl p-1 border border-border/50">
      {Object.entries(viewModeConfig).map(([mode, config]) => {
        const Icon = config.icon;
        const isActive = viewMode === mode;
        const hasNotifications = config.notifications > 0;
        
        return (
          <div key={mode} className="relative">
            <Button
              variant={isActive ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange(mode as ViewMode)}
              className={`
                h-9 px-4 relative transition-all duration-200 group
                ${isActive 
                  ? "bg-background shadow-sm border border-border/50 text-foreground" 
                  : "hover:bg-background/50 text-muted-foreground hover:text-foreground"
                }
              `}
              title={config.description}
            >
              <Icon className="w-4 h-4 mr-2" />
              <span className="font-medium">{config.label}</span>
              
              {/* Notification Badge */}
              {hasNotifications && (
                <Badge 
                  variant="destructive" 
                  className="ml-2 px-1.5 py-0.5 text-xs min-w-5 h-5 flex items-center justify-center"
                >
                  {config.notifications > 99 ? "99+" : config.notifications}
                </Badge>
              )}
            </Button>
            
            {/* Active Tab Indicator */}
            {isActive && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />
            )}
          </div>
        );
      })}
    </div>
  );
};
