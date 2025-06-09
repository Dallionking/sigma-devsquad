
import { ViewMode, Agent, Task, Message } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, CheckSquare, MessageSquare, GitBranch, TrendingUp, Zap } from "lucide-react";
import { ResponsiveText } from "@/components/layout/ResponsiveText";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

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
        title: "Workflow Orchestration",
        subtitle: "Monitor and coordinate AI development processes with intelligent automation",
        stats: {
          active: agents.filter(a => a.status === "working").length,
          total: agents.length,
          label: "Active Agents",
          trend: "+12%"
        },
        color: "blue"
      },
      communication: {
        icon: MessageSquare,
        title: "Agent Communication Hub",
        subtitle: "Advanced visualization and analysis of inter-agent communication patterns",
        stats: {
          active: messages.filter(m => {
            const messageTime = new Date(m.timestamp).getTime();
            const oneHourAgo = Date.now() - (60 * 60 * 1000);
            return messageTime > oneHourAgo;
          }).length,
          total: messages.length,
          label: "Recent Messages",
          trend: "+8%"
        },
        color: "emerald"
      },
      tasks: {
        icon: CheckSquare,
        title: "Task Management Center",
        subtitle: "Comprehensive task orchestration with dependency tracking and performance analytics",
        stats: {
          active: tasks.filter(t => t.status === "in-progress").length,
          total: tasks.length,
          label: "Active Tasks",
          trend: "+15%"
        },
        color: "purple"
      },
      messages: {
        icon: Activity,
        title: "Message Intelligence",
        subtitle: "Deep analysis and inspection of communication flows with pattern recognition",
        stats: {
          active: messages.filter(m => m.type === "request").length,
          total: messages.length,
          label: "Request Messages",
          trend: "+5%"
        },
        color: "orange"
      }
    };

    const config = headerConfig[viewMode];
    const Icon = config.icon;

    return (
      <div className="border-b border-border/30 bg-gradient-to-r from-card/60 via-card/40 to-background/60 backdrop-blur-sm">
        <div className={cn(
          "flex flex-col gap-4",
          isMobile ? "pb-3" : "pb-4"
        )}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-start gap-3 lg:gap-4 min-w-0 flex-1">
              {/* Enhanced icon container */}
              <div className={cn(
                "flex-shrink-0 rounded-2xl border-2 shadow-lg relative overflow-hidden",
                isMobile ? "p-2.5" : "p-3.5",
                config.color === "blue" && "bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800",
                config.color === "emerald" && "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800",
                config.color === "purple" && "bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800",
                config.color === "orange" && "bg-orange-50 dark:bg-orange-950/50 border-orange-200 dark:border-orange-800"
              )}>
                <Icon className={cn(
                  isMobile ? "w-5 h-5" : "w-6 h-6",
                  config.color === "blue" && "text-blue-600 dark:text-blue-400",
                  config.color === "emerald" && "text-emerald-600 dark:text-emerald-400",
                  config.color === "purple" && "text-purple-600 dark:text-purple-400",
                  config.color === "orange" && "text-orange-600 dark:text-orange-400"
                )} />
                
                {/* Subtle glow effect */}
                <div className={cn(
                  "absolute inset-0 opacity-20 blur-xl",
                  config.color === "blue" && "bg-blue-400",
                  config.color === "emerald" && "bg-emerald-400",
                  config.color === "purple" && "bg-purple-400",
                  config.color === "orange" && "bg-orange-400"
                )} />
              </div>
              
              <div className="min-w-0 flex-1 space-y-2">
                <ResponsiveText
                  variant={isMobile ? "heading" : "subheading"}
                  weight="bold"
                  className="text-foreground leading-tight"
                  truncate={isMobile ? 1 : false}
                >
                  {config.title}
                </ResponsiveText>
                <ResponsiveText
                  variant="caption"
                  className="text-muted-foreground/80 leading-relaxed"
                  truncate={isMobile ? 2 : false}
                >
                  {config.subtitle}
                </ResponsiveText>
              </div>
            </div>
            
            {/* Enhanced stats card */}
            <div className="flex flex-row items-center gap-3 flex-shrink-0">
              <Card className={cn(
                "border-border/50 shadow-lg bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm",
                isMobile ? "px-3 py-2.5 flex-1" : "px-4 py-3"
              )}>
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <div className={cn(
                      "font-bold leading-none mb-1",
                      isMobile ? "text-lg" : "text-xl lg:text-2xl",
                      config.color === "blue" && "text-blue-600 dark:text-blue-400",
                      config.color === "emerald" && "text-emerald-600 dark:text-emerald-400",
                      config.color === "purple" && "text-purple-600 dark:text-purple-400",
                      config.color === "orange" && "text-orange-600 dark:text-orange-400"
                    )}>
                      {config.stats.active}
                    </div>
                    <div className="text-xs text-muted-foreground/70 leading-tight">
                      of {config.stats.total}
                    </div>
                  </div>
                  
                  <div className="w-px h-8 bg-border/40" />
                  
                  <div className="text-center">
                    <div className="text-xs font-medium text-muted-foreground mb-1">
                      {config.stats.label}
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-emerald-500" />
                      <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        {config.stats.trend}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
              
              {/* Live status badge */}
              <Badge 
                variant="secondary" 
                className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 whitespace-nowrap flex-shrink-0 px-3 py-1.5 font-medium"
              >
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse" />
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
