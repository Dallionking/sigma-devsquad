
import { OptimizedConsolidatedNavigation } from "./OptimizedConsolidatedNavigation";
import { HeaderLogo } from "./HeaderLogo";
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
      {/* Main Header - Further reduced height */}
      <div className="flex h-8 items-center justify-between px-2 lg:px-3 gap-2">
        {/* Left Section: Logo and Sidebar Toggle - More compact */}
        <div className="flex items-center gap-1 flex-shrink-0 min-w-0">
          <HeaderLogo 
            isDashboardPage={isDashboardPage}
            sidebarCollapsed={sidebarCollapsed}
            onSidebarToggle={onSidebarToggle}
            activeAgents={activeAgents}
            totalAgents={totalAgents}
          />
          
          {/* Mobile Project Switcher - Smaller */}
          <div className="lg:hidden max-w-24">
            <MobileProjectSwitcher />
          </div>
        </div>
        
        {/* Center Section: Optimized Navigation - Better flex management */}
        <div className="flex-1 flex justify-center min-w-0 max-w-2xl mx-auto">
          <OptimizedConsolidatedNavigation 
            viewMode={viewMode}
            onViewModeChange={onViewModeChange}
            notificationCounts={notificationCounts}
          />
        </div>
        
        {/* Right Section: Optimized Actions - More compact */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <OptimizedActionButtons />
        </div>
      </div>
      
      {/* Status Sub-Header - More compact */}
      <StatusSubHeader 
        agents={agents}
        showTeamView={showTeamView}
      />
    </div>
  );
};
