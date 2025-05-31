
import { ViewMode, Agent } from "@/types";
import { useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTasks } from "@/contexts/TaskContext";
import { useMessages } from "@/contexts/MessageContext";
import { HeaderLogo } from "./header/HeaderLogo";
import { ViewModeSelector } from "./header/ViewModeSelector";
import { StatusBadge } from "./header/StatusBadge";
import { NavigationButtons } from "./header/NavigationButtons";
import { ActionButtons } from "./header/ActionButtons";

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
  sidebarCollapsed = false,
  onSidebarToggle
}: HeaderProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { tasks } = useTasks();
  const { messages } = useMessages();
  
  const activeAgents = agents?.filter(agent => agent.status === "working").length || 0;
  const totalAgents = agents?.length || 0;
  const isDashboardPage = location.pathname === "/";
  
  // Calculate notification counts for each tab
  const getNotificationCounts = () => {
    const pendingTasks = tasks?.filter(task => task.status === "pending").length || 0;
    const inProgressTasks = tasks?.filter(task => task.status === "in-progress").length || 0;
    const recentMessages = messages?.filter(message => {
      const messageTime = new Date(message.timestamp).getTime();
      const oneHourAgo = Date.now() - (60 * 60 * 1000);
      return messageTime > oneHourAgo;
    }).length || 0;
    
    return {
      workflow: inProgressTasks,
      communication: recentMessages,
      tasks: pendingTasks,
      messages: recentMessages
    };
  };

  const notificationCounts = getNotificationCounts();

  return (
    <header className="bg-card border-b border-border px-4 sm:px-6 py-3 sm:py-4 sticky top-0 z-40 backdrop-blur-sm bg-card/95">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 sm:space-x-6">
          <HeaderLogo
            isDashboardPage={isDashboardPage}
            sidebarCollapsed={sidebarCollapsed}
            onSidebarToggle={onSidebarToggle}
            activeAgents={activeAgents}
            totalAgents={totalAgents}
          />
          
          {/* Enhanced View Mode Selector */}
          {!isMobile && isDashboardPage && (
            <ViewModeSelector
              viewMode={viewMode}
              onViewModeChange={onViewModeChange}
              notificationCounts={notificationCounts}
            />
          )}
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Status Badge */}
          {!isMobile && (
            <StatusBadge activeAgents={activeAgents} totalAgents={totalAgents} />
          )}
          
          {/* Navigation Buttons */}
          {!isMobile && <NavigationButtons />}
          
          {/* Action Buttons */}
          <ActionButtons />
        </div>
      </div>
    </header>
  );
};
