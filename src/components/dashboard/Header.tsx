
import { ViewModeSelector } from "./header/ViewModeSelector";
import { HeaderLogo } from "./header/HeaderLogo";
import { StatusBadge } from "./header/StatusBadge";
import { ActionButtons } from "./header/ActionButtons";
import { NavigationButtons } from "./header/NavigationButtons";
import { ViewMode, Agent } from "@/types";

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
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="flex h-14 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center space-x-4">
          <HeaderLogo />
          <NavigationButtons />
        </div>
        
        <div className="flex items-center space-x-4">
          <ViewModeSelector 
            viewMode={viewMode} 
            onViewModeChange={onViewModeChange}
          />
          <StatusBadge agents={agents} />
          <ActionButtons />
        </div>
      </div>
    </header>
  );
};
