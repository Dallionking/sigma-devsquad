
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
      {/* Main Header */}
      <div className="flex h-14 items-center justify-between px-4 lg:px-6">
        {/* Left Section: Logo and Sidebar Toggle */}
        <div className="flex items-center space-x-4">
          <HeaderLogo 
            isDashboardPage={isDashboardPage}
            sidebarCollapsed={sidebarCollapsed}
            onSidebarToggle={onSidebarToggle}
            activeAgents={activeAgents}
            totalAgents={totalAgents}
          />
          
          {/* Mobile Project Switcher */}
          <div className="lg:hidden w-48">
            <MobileProjectSwitcher />
          </div>
        </div>
        
        {/* Center Section: Optimized Navigation */}
        <div className="flex-1 flex justify-center">
          <OptimizedConsolidatedNavigation 
            viewMode={viewMode}
            onViewModeChange={onViewModeChange}
            notificationCounts={notificationCounts}
          />
        </div>
        
        {/* Right Section: Optimized Actions */}
        <div className="flex items-center space-x-2">
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
