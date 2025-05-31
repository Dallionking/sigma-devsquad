
import { AgentGrid } from "./agent-grid/AgentGrid";
import { MetricsGrid } from "./metrics-grid/MetricsGrid";
import { ActivityFeed } from "./activity-feed/ActivityFeed";
import { Agent } from "@/types";

interface DashboardGridsProps {
  agents: Agent[];
  onAgentSelect: (agent: Agent | null) => void;
}

export const DashboardGrids = ({ agents, onAgentSelect }: DashboardGridsProps) => {
  return (
    <div className="space-y-8">
      {/* Metrics Overview */}
      <MetricsGrid agents={agents} />
      
      {/* Agent Grid */}
      <AgentGrid agents={agents} onAgentSelect={onAgentSelect} />
      
      {/* Activity Feed */}
      <ActivityFeed agents={agents} />
    </div>
  );
};
