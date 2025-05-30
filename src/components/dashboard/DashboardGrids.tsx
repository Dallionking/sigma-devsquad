
import { SystemHealthIndicators } from "./SystemHealthIndicators";
import { NotificationCenter } from "./NotificationCenter";
import { QuickAccessNav } from "./QuickAccessNav";
import { SummaryMetrics } from "./SummaryMetrics";
import { EnhancedAgentOverview } from "./EnhancedAgentOverview";
import { Agent } from "@/types";
import { ResponsiveLayoutGrid, CardGrid } from "@/components/layout/ResponsiveLayoutGrid";
import { Stack } from "@/components/layout/ResponsiveSpacing";

interface DashboardGridsProps {
  agents: Agent[];
  onAgentSelect: (agent: Agent | null) => void;
}

export const DashboardGrids = ({ agents, onAgentSelect }: DashboardGridsProps) => {
  return (
    <Stack gap="lg" className="w-full">
      {/* Top Row - System Health and Quick Access */}
      <ResponsiveLayoutGrid variant="content" gap="md">
        <div className="card-enhanced hover:shadow-lg transition-all duration-300 h-fit">
          <SystemHealthIndicators />
        </div>
        <div className="card-enhanced hover:shadow-lg transition-all duration-300 h-fit">
          <QuickAccessNav />
        </div>
      </ResponsiveLayoutGrid>
      
      {/* Second Row - Notifications and Agent Overview */}
      <ResponsiveLayoutGrid variant="content" gap="md">
        <div className="card-enhanced hover:shadow-lg transition-all duration-300 h-fit">
          <NotificationCenter />
        </div>
        <div className="card-enhanced hover:shadow-lg transition-all duration-300 h-fit">
          <EnhancedAgentOverview 
            onAgentSelect={onAgentSelect}
          />
        </div>
      </ResponsiveLayoutGrid>
      
      {/* Third Row - Summary Metrics */}
      <div className="card-enhanced hover:shadow-lg transition-all duration-300">
        <SummaryMetrics />
      </div>
    </Stack>
  );
};
