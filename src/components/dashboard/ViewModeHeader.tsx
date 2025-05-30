
import { ViewMode, Agent, Task, Message } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, CheckSquare, MessageSquare, GitBranch } from "lucide-react";
import { ResponsiveText } from "@/components/layout/ResponsiveText";
import { useIsMobile } from "@/hooks/use-mobile";

interface ViewModeHeaderProps {
  viewMode: ViewMode;
  agents: Agent[];
  tasks: Task[];
  messages: Message[];
}

export const ViewModeHeader = ({ viewMode, agents, tasks, messages }: ViewModeHeaderProps) => {
  const isMobile = useIsMobile();

  const getViewModeHeader = () => {
    const headerConfig = {
      workflow: {
        icon: GitBranch,
        title: "Workflow Management",
        subtitle: "Monitor and orchestrate your AI development workflow",
        stats: {
          active: agents.filter(a => a.status === "working").length,
          total: agents.length,
          label: "Active Agents"
        }
      },
      communication: {
        icon: MessageSquare,
        title: "Agent Communication Hub",
        subtitle: "Advanced visualization and analysis of agent interactions",
        stats: {
          active: messages.filter(m => {
            const messageTime = new Date(m.timestamp).getTime();
            const oneHourAgo = Date.now() - (60 * 60 * 1000);
            return messageTime > oneHourAgo;
          }).length,
          total: messages.length,
          label: "Recent Messages"
        }
      },
      tasks: {
        icon: CheckSquare,
        title: "Task Management Center",
        subtitle: "Comprehensive task tracking and management system",
        stats: {
          active: tasks.filter(t => t.status === "in-progress").length,
          total: tasks.length,
          label: "Active Tasks"
        }
      },
      messages: {
        icon: Activity,
        title: "Message Inspector",
        subtitle: "Detailed analysis and inspection of agent messages",
        stats: {
          active: messages.filter(m => m.type === "request").length,
          total: messages.length,
          label: "Request Messages"
        }
      }
    };

    const config = headerConfig[viewMode];
    const Icon = config.icon;

    return (
      <div className="border-b border-border/50">
        <div className={`flex flex-col gap-3 ${isMobile ? 'pb-2' : 'pb-3'}`}>
          {/* Compact header content */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-start gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="flex-shrink-0 p-1.5 sm:p-2 bg-primary/10 rounded-lg border border-primary/20">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <ResponsiveText
                  variant="subheading"
                  weight="bold"
                  className="text-foreground"
                  truncate={isMobile ? 1 : false}
                >
                  {config.title}
                </ResponsiveText>
                <ResponsiveText
                  variant="caption"
                  className="text-muted-foreground mt-0.5"
                  truncate={isMobile ? 2 : false}
                >
                  {config.subtitle}
                </ResponsiveText>
              </div>
            </div>
            
            {/* Compact stats and live indicator */}
            <div className="flex flex-row items-center gap-2 sm:gap-3 flex-shrink-0">
              <Card className={`px-2 py-1.5 sm:px-3 sm:py-2 bg-card/50 border-border/50 ${isMobile ? 'flex-1' : ''}`}>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="text-base sm:text-lg font-bold text-primary leading-none">
                    {config.stats.active}
                  </div>
                  <div className="text-xs text-muted-foreground min-w-0">
                    <div className="leading-tight">of {config.stats.total}</div>
                    <div className="leading-tight truncate text-xs">{config.stats.label}</div>
                  </div>
                </div>
              </Card>
              
              <Badge 
                variant="secondary" 
                className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 whitespace-nowrap flex-shrink-0 text-xs px-2 py-1"
              >
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse" />
                Live
              </Badge>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return getViewModeHeader();
};
