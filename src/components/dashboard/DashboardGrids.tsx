
import { SystemHealthIndicators } from "./SystemHealthIndicators";
import { NotificationCenter } from "./NotificationCenter";
import { QuickAccessNav } from "./QuickAccessNav";
import { SummaryMetrics } from "./SummaryMetrics";
import { EnhancedAgentOverview } from "./EnhancedAgentOverview";
import { Agent } from "@/types";
import { ResponsiveLayoutGrid } from "@/components/layout/ResponsiveLayoutGrid";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardGridsProps {
  agents: Agent[];
  onAgentSelect: (agent: Agent | null) => void;
}

export const DashboardGrids = ({ agents, onAgentSelect }: DashboardGridsProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="space-y-4">
        <div className="card-enhanced">
          <SystemHealthIndicators />
        </div>
        <div className="card-enhanced">
          <QuickAccessNav />
        </div>
        <div className="card-enhanced">
          <NotificationCenter />
        </div>
        <div className="card-enhanced">
          <EnhancedAgentOverview onAgentSelect={onAgentSelect} />
        </div>
        <div className="card-enhanced">
          <SummaryMetrics />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Compact top section - 3 columns */}
      <ResponsiveLayoutGrid variant="dashboard" gap="md" className="grid-cols-1 md:grid-cols-3">
        <div className="card-enhanced hover:shadow-lg transition-all duration-300">
          <SystemHealthIndicators />
        </div>
        <div className="card-enhanced hover:shadow-lg transition-all duration-300">
          <QuickAccessNav />
        </div>
        <div className="card-enhanced hover:shadow-lg transition-all duration-300">
          <NotificationCenter />
        </div>
      </ResponsiveLayoutGrid>
      
      {/* Bottom section - 2 columns for better space utilization */}
      <ResponsiveLayoutGrid variant="content" gap="md">
        <div className="card-enhanced hover:shadow-lg transition-all duration-300">
          <EnhancedAgentOverview onAgentSelect={onAgentSelect} />
        </div>
        <div className="card-enhanced hover:shadow-lg transition-all duration-300">
          <SummaryMetrics />
        </div>
      </ResponsiveLayoutGrid>
    </div>
  );
};
