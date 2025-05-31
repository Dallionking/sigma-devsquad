
import { AnalyticsDashboard } from "@/components/analytics/AnalyticsDashboard";
import { Agent } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";
import { SpaceOptimizedContainer } from "@/components/layout/SpaceOptimizedContainer";
import { cn } from "@/lib/utils";

interface DashboardOverviewProps {
  agents: Agent[];
  onAgentSelect: (agent: Agent | null) => void;
}

export const DashboardOverview = ({ agents, onAgentSelect }: DashboardOverviewProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="border-b border-border/30 bg-gradient-to-br from-card/80 via-card/60 to-background/80 backdrop-blur-lg relative overflow-hidden">
      {/* Enhanced background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
      
      <SpaceOptimizedContainer 
        variant={isMobile ? "compact" : "default"}
        className="relative w-full"
      >
        <div className="animate-in fade-in-0 duration-500">
          <AnalyticsDashboard agents={agents} onAgentSelect={onAgentSelect} />
        </div>
      </SpaceOptimizedContainer>
    </div>
  );
};
