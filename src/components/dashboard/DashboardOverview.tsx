
import { SystemHealthIndicators } from "./SystemHealthIndicators";
import { NotificationCenter } from "./NotificationCenter";
import { QuickAccessNav } from "./QuickAccessNav";
import { SummaryMetrics } from "./SummaryMetrics";
import { EnhancedAgentOverview } from "./EnhancedAgentOverview";
import { Agent } from "@/types";

interface DashboardOverviewProps {
  agents: Agent[];
  onAgentSelect: (agent: Agent | null) => void;
}

export const DashboardOverview = ({ agents, onAgentSelect }: DashboardOverviewProps) => {
  return (
    <div className="p-6 border-b border-border bg-card/50">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          AI Development Workforce Dashboard
        </h1>
        <p className="text-muted-foreground">
          Monitor and manage your AI agent ecosystem in real-time
        </p>
      </div>
      
      {/* Top Row - System Health and Quick Access */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <SystemHealthIndicators />
        <QuickAccessNav />
      </div>
      
      {/* Second Row - Notifications and Agent Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <NotificationCenter />
        <EnhancedAgentOverview 
          agents={agents}
          onAgentSelect={onAgentSelect}
        />
      </div>
      
      {/* Third Row - Summary Metrics */}
      <SummaryMetrics />
    </div>
  );
};
