
import { SystemHealthIndicators } from "./SystemHealthIndicators";
import { NotificationCenter } from "./NotificationCenter";
import { QuickAccessNav } from "./QuickAccessNav";
import { SummaryMetrics } from "./SummaryMetrics";
import { EnhancedAgentOverview } from "./EnhancedAgentOverview";
import { Agent } from "@/types";

interface DashboardGridsProps {
  agents: Agent[];
  onAgentSelect: (agent: Agent | null) => void;
}

export const DashboardGrids = ({ agents, onAgentSelect }: DashboardGridsProps) => {
  return (
    <div className="space-y-responsive">
      {/* Top Row - System Health and Quick Access */}
      <div className="grid-responsive-2">
        <div className="card-enhanced hover:shadow-lg transition-all duration-300">
          <SystemHealthIndicators />
        </div>
        <div className="card-enhanced hover:shadow-lg transition-all duration-300">
          <QuickAccessNav />
        </div>
      </div>
      
      {/* Second Row - Notifications and Agent Overview */}
      <div className="grid-responsive-2">
        <div className="card-enhanced hover:shadow-lg transition-all duration-300">
          <NotificationCenter />
        </div>
        <div className="card-enhanced hover:shadow-lg transition-all duration-300">
          <EnhancedAgentOverview 
            onAgentSelect={onAgentSelect}
          />
        </div>
      </div>
      
      {/* Third Row - Summary Metrics */}
      <div className="card-enhanced hover:shadow-lg transition-all duration-300">
        <SummaryMetrics />
      </div>
    </div>
  );
};
