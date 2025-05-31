
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

interface StatusBadgeProps {
  activeAgents: number;
  totalAgents: number;
}

export const StatusBadge = ({ activeAgents, totalAgents }: StatusBadgeProps) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-1">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-sm text-muted-foreground hidden sm:inline">System Healthy</span>
      </div>
      <Badge variant="secondary" className="bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
        <Users className="w-3 h-3 mr-1" />
        {activeAgents}/{totalAgents} Active
      </Badge>
    </div>
  );
};
