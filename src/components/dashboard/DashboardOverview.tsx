
import { DashboardHeader } from "./DashboardHeader";
import { DashboardGrids } from "./DashboardGrids";
import { Agent } from "@/types";

interface DashboardOverviewProps {
  agents: Agent[];
  onAgentSelect: (agent: Agent | null) => void;
}

export const DashboardOverview = ({ agents, onAgentSelect }: DashboardOverviewProps) => {
  return (
    <div className="p-responsive border-b border-border bg-card/50 backdrop-blur-sm">
      <DashboardHeader />
      <DashboardGrids agents={agents} onAgentSelect={onAgentSelect} />
    </div>
  );
};
