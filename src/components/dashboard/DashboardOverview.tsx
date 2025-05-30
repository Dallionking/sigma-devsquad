
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
    <div className="p-responsive border-b border-border bg-card/50 backdrop-blur-sm">
      {/* Enhanced header section with better typography and spacing */}
      <header className="mb-responsive text-center lg:text-left">
        <h1 className="heading-primary mb-4">
          AI Development Workforce Dashboard
        </h1>
        <p className="text-muted-enhanced max-w-3xl mx-auto lg:mx-0">
          Monitor and manage your AI agent ecosystem in real-time with comprehensive insights and controls
        </p>
      </header>
      
      {/* Enhanced grid layout with better responsive design */}
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
              agents={agents}
              onAgentSelect={onAgentSelect}
            />
          </div>
        </div>
        
        {/* Third Row - Summary Metrics */}
        <div className="card-enhanced hover:shadow-lg transition-all duration-300">
          <SummaryMetrics />
        </div>
      </div>
    </div>
  );
};
