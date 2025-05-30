
import { DashboardHeader } from "./DashboardHeader";
import { DashboardGrids } from "./DashboardGrids";
import { Agent } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardOverviewProps {
  agents: Agent[];
  onAgentSelect: (agent: Agent | null) => void;
}

export const DashboardOverview = ({ agents, onAgentSelect }: DashboardOverviewProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className={cn(
        "w-full mx-auto",
        isMobile ? "px-4 py-3" : "px-4 sm:px-6 lg:px-8 py-4"
      )}>
        <div className="space-y-4">
          <DashboardHeader />
          <DashboardGrids agents={agents} onAgentSelect={onAgentSelect} />
        </div>
      </div>
    </div>
  );
};
