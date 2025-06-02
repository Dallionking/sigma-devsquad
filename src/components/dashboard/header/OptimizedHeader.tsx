
import { OptimizedConsolidatedNavigation } from "./OptimizedConsolidatedNavigation";
import { OptimizedActionButtons } from "./OptimizedActionButtons";
import { StatusSubHeader } from "./StatusSubHeader";
import { MobileProjectSwitcher } from "@/components/projects/MobileProjectSwitcher";
import { ViewMode, Agent } from "@/types";
import { useLocation } from "react-router-dom";

interface OptimizedHeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  agents: Agent[];
  sidebarCollapsed?: boolean;
  onSidebarToggle?: () => void;
  showTeamView?: boolean;
}

export const OptimizedHeader = ({ 
  viewMode, 
  onViewModeChange, 
  agents,
  sidebarCollapsed,
  onSidebarToggle,
  showTeamView = false
}: OptimizedHeaderProps) => {
  const location = useLocation();
  const isDashboardPage = location.pathname === "/dashboard";
  
  // Calculate agent status counts
  const activeAgents = agents.filter(agent => agent.status === "working").length;
  const totalAgents = agents.length;
  
  // Mock notification counts
  const notificationCounts = {
    workflow: 0,
    communication: 0,
    tasks: 0,
    messages: 0
  };

  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      {/* Main Header - Simplified structure without logo overlap */}
      <div className="flex h-9 items-center justify-between px-2 lg:px-4 gap-2 max-w-full overflow-hidden">
        {/* Left Section: Mobile Project Switcher only */}
        <div className="flex items-center gap-2 flex-shrink-0 min-w-0 max-w-32 lg:hidden">
          <MobileProjectSwitcher />
        </div>
        
        {/* Center Section: Main Navigation */}
        <div className="flex-1 flex justify-center min-w-0 max-w-full mx-2">
          <OptimizedConsolidatedNavigation 
            viewMode={viewMode}
            onViewModeChange={onViewModeChange}
            notificationCounts={notificationCounts}
          />
        </div>
        
        {/* Right Section: Action Buttons */}
        <div className="flex items-center gap-1 flex-shrink-0 max-w-24">
          <OptimizedActionButtons />
        </div>
      </div>
      
      {/* Status Sub-Header */}
      <StatusSubHeader 
        agents={agents}
        showTeamView={showTeamView}
      />
    </div>
  );
};
