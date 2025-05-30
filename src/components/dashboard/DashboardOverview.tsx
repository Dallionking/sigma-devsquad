
import { DashboardHeader } from "./DashboardHeader";
import { DashboardGrids } from "./DashboardGrids";
import { Agent } from "@/types";
import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardOverviewProps {
  agents: Agent[];
  onAgentSelect: (agent: Agent | null) => void;
}

export const DashboardOverview = ({ agents, onAgentSelect }: DashboardOverviewProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="border-b border-border bg-card/50 backdrop-blur-sm">
      <ResponsiveContainer padding={isMobile ? "sm" : "lg"}>
        <DashboardHeader />
        <DashboardGrids agents={agents} onAgentSelect={onAgentSelect} />
      </ResponsiveContainer>
    </div>
  );
};
