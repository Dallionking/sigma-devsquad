
import { ViewModeSelector } from "./header/ViewModeSelector";
import { HeaderLogo } from "./header/HeaderLogo";
import { StatusBadge } from "./header/StatusBadge";
import { ActionButtons } from "./header/ActionButtons";
import { NavigationButtons } from "./header/NavigationButtons";
import { ViewMode, Agent } from "@/types";
import { useLocation } from "react-router-dom";

interface HeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  agents: Agent[];
  sidebarCollapsed?: boolean;
  onSidebarToggle?: () => void;
}

export const Header = ({ 
  viewMode, 
  onViewModeChange, 
  agents,
  sidebarCollapsed,
  onSidebarToggle 
}: HeaderProps) => {
  const location = useLocation();
  const isDashboardPage = location.pathname === "/";
  
  // Calculate agent status counts
  const activeAgents = agents.filter(agent => agent.status === "working").length;
  const totalAgents = agents.length;
  
  // Mock notification counts - in a real app, these would come from context/state
  const notificationCounts = {
    workflow: 0,
    communication: 0,
    tasks: 0,
    messages: 0
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="flex h-14 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center space-x-4">
          <HeaderLogo 
            isDashboardPage={isDashboardPage}
            sidebarCollapsed={sidebarCollapsed}
            onSidebarToggle={onSidebarToggle}
            activeAgents={activeAgents}
            totalAgents={totalAgents}
          />
          <NavigationButtons />
        </div>
        
        <div className="flex items-center space-x-4">
          <ViewModeSelector 
            viewMode={viewMode} 
            onViewModeChange={onViewModeChange}
            notificationCounts={notificationCounts}
          />
          <StatusBadge 
            activeAgents={activeAgents}
            totalAgents={totalAgents}
          />
          <ActionButtons />
        </div>
      </div>
    </header>
  );
};
