
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
    <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="flex h-full">
        {/* Left Navigation Section - Fixed Width */}
        <HeaderLogo 
          isDashboardPage={isDashboardPage}
          sidebarCollapsed={sidebarCollapsed}
          onSidebarToggle={onSidebarToggle}
          activeAgents={activeAgents}
          totalAgents={totalAgents}
        />
        
        {/* Main Header Content - Flexible */}
        <div className="flex-1 border-b">
          <div className="flex h-9 items-center justify-between px-2 gap-1 max-w-full overflow-hidden">
            {/* Mobile Project Switcher - Only visible on mobile */}
            <div className="lg:hidden flex items-center gap-1 flex-shrink-0">
              <MobileProjectSwitcher />
            </div>
            
            {/* Center Section: Optimized Navigation */}
            <div className="flex-1 flex justify-center min-w-0 max-w-full mx-1">
              <OptimizedConsolidatedNavigation 
                viewMode={viewMode}
                onViewModeChange={onViewModeChange}
                notificationCounts={notificationCounts}
              />
            </div>
            
            {/* Right Section: Optimized Actions */}
            <div className="flex items-center gap-1 flex-shrink-0 max-w-20">
              <OptimizedActionButtons />
            </div>
          </div>
        </div>
      </div>
      
      {/* Status Sub-Header - Full Width */}
      <StatusSubHeader 
        agents={agents}
        showTeamView={showTeamView}
      />
    </div>
  );
};
