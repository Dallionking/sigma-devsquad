
import { OptimizedHeader } from "./header/OptimizedHeader";
import { ViewMode, Agent } from "@/types";

interface HeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  agents: Agent[];
  sidebarCollapsed?: boolean;
  onSidebarToggle?: () => void;
  showTeamView?: boolean;
}

export const Header = ({ 
  viewMode, 
  onViewModeChange, 
  agents,
  sidebarCollapsed,
  onSidebarToggle,
  showTeamView = false
}: HeaderProps) => {
  return (
    <OptimizedHeader
      viewMode={viewMode}
      onViewModeChange={onViewModeChange}
      agents={agents}
      sidebarCollapsed={sidebarCollapsed}
      onSidebarToggle={onSidebarToggle}
      showTeamView={showTeamView}
    />
  );
};
