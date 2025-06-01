
import { Badge } from "@/components/ui/badge";
import { Activity, Users, Wifi, TrendingUp } from "lucide-react";
import { SafePresenceIndicator } from "@/components/collaboration/SafePresenceIndicator";
import { Agent } from "@/types";
import { cn } from "@/lib/utils";

interface StatusSubHeaderProps {
  agents: Agent[];
  showTeamView?: boolean;
  className?: string;
}

export const StatusSubHeader = ({ 
  agents, 
  showTeamView = false,
  className 
}: StatusSubHeaderProps) => {
  const activeAgents = agents.filter(agent => agent.status === "working").length;
  const totalAgents = agents.length;

  return (
    <div className={cn(
      "bg-card/30 border-b border-border/50 px-4 py-2",
      "flex items-center justify-between",
      className
    )}>
      {/* Left: System Status */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-foreground">System</span>
          </div>
          <Badge variant="secondary" className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs">
            Healthy
          </Badge>
        </div>

        <div className="w-px h-4 bg-border/50" />

        {/* Agent Status */}
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">
            {showTeamView ? "Teams" : "Agents"}:
          </span>
          <Badge variant="secondary" className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs">
            {activeAgents}/{totalAgents} Active
          </Badge>
        </div>

        <div className="w-px h-4 bg-border/50" />

        {/* Performance Indicator */}
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-emerald-500" />
          <span className="text-sm text-muted-foreground">Performance:</span>
          <Badge variant="secondary" className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs">
            High
          </Badge>
        </div>
      </div>

      {/* Right: Connection Status and Presence */}
      <div className="flex items-center space-x-4">
        {/* Connection Status */}
        <div className="flex items-center space-x-2">
          <Wifi className="w-4 h-4 text-green-500" />
          <span className="text-sm text-muted-foreground">Connection:</span>
          <Badge variant="secondary" className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs">
            Connected
          </Badge>
        </div>

        <div className="w-px h-4 bg-border/50" />

        {/* Real-time Presence */}
        <SafePresenceIndicator showCount={true} maxVisible={3} />
      </div>
    </div>
  );
};
