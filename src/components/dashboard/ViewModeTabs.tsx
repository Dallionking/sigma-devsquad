
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
  notificationCounts?: {
    workflow: number;
    communication: number;
    tasks: number;
    messages: number;
  };
}

export const ViewModeTabs = ({ 
  viewMode, 
  onViewModeChange, 
  notificationCounts = { workflow: 0, communication: 0, tasks: 0, messages: 0 }
}: ViewModeTabsProps) => {
  const viewModeConfig = {
    workflow: { 
      icon: GitBranch, 
      label: "Workflow",
      notifications: notificationCounts.workflow
    },
    communication: { 
      icon: MessageSquare, 
      label: "Communication",
      notifications: notificationCounts.communication
    },
    tasks: { 
      icon: CheckSquare, 
      label: "Tasks",
      notifications: notificationCounts.tasks
    },
    messages: { 
      icon: Activity, 
      label: "Messages",
      notifications: notificationCounts.messages
    }
  };

  return (
    <div className="border-b bg-background/95 backdrop-blur-sm">
      <div className="flex items-center px-6 py-3">
        <div className="flex items-center space-x-1">
          {Object.entries(viewModeConfig).map(([mode, config]) => {
            const Icon = config.icon;
            const isActive = viewMode === mode;
            const hasNotifications = config.notifications > 0;
            
            return (
              <Button
                key={mode}
                variant="ghost"
                size="sm"
                onClick={() => onViewModeChange(mode as ViewMode)}
                className={cn(
                  "h-10 px-4 relative transition-all duration-200 border-b-2 rounded-none",
                  isActive 
                    ? "bg-background/50 text-foreground border-b-primary shadow-sm" 
                    : "hover:bg-background/30 text-muted-foreground border-b-transparent hover:text-foreground"
                )}
              >
                <Icon className="w-4 h-4 mr-2" />
                <span className="font-medium">{config.label}</span>
                
                {hasNotifications && (
                  <Badge 
                    variant="destructive" 
                    className="ml-2 px-1.5 py-0 text-xs h-5 min-w-5 flex items-center justify-center"
                  >
                    {config.notifications > 9 ? "9+" : config.notifications}
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
