
import { Progress } from "@/components/ui/progress";
import { Agent } from "@/types";

interface AgentCardContentProps {
  agent: Agent;
  compact?: boolean;
}

export const AgentCardContent = ({ agent, compact = false }: AgentCardContentProps) => {
  return (
    <div className="space-y-4">
      {/* Current Task */}
      <div>
        <p className="text-xs font-medium text-muted-foreground mb-1">Current Task</p>
        <p className="text-sm line-clamp-2">{agent.currentTask}</p>
      </div>

      {/* Progress */}
      {agent.status === "working" && (
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{agent.progress}%</span>
          </div>
          <Progress value={agent.progress} className="h-2" />
        </div>
      )}

      <div className="text-xs text-muted-foreground">
        Last active: {new Date(agent.lastActive).toLocaleTimeString()}
      </div>
    </div>
  );
};
