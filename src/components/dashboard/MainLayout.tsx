
import React from 'react';
import { Agent, Task, Message, ViewMode } from "@/types";
import { Team, AgentProfile } from "@/types/teams";
import { SidebarRenderer } from "./SidebarRenderer";
import { MainContentRenderer } from "./MainContentRenderer";
import { ViewModeTabs } from "./ViewModeTabs";
import { UserPresencePanel } from "./UserPresencePanel";
import { ContextAwarePanel } from "./ContextAwarePanel";
import { Button } from "@/components/ui/button";
import { PanelLeft, PanelLeftClose } from "lucide-react";
import { useCollapsibleSidebar } from "@/hooks/useCollapsibleSidebar";
import { useContextAwarePanel } from "@/hooks/useContextAwarePanel";
import { usePanelKeyboardShortcuts } from "@/hooks/usePanelKeyboardShortcuts";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  showTeamView: boolean;
  sidebarCollapsed: boolean;
  syncPanelCollapsed: boolean;
  agents: Agent[];
  tasks: Task[];
  messages: Message[];
  selectedAgent: Agent | null;
  selectedTask: Task | null;
  selectedMessage: Message | null;
  selectedTeam: Team | null;
  selectedAgentProfile: AgentProfile | null;
  viewMode: ViewMode;
  hasSelection: boolean;
  onSidebarToggle: () => void;
  onSyncPanelToggle: () => void;
  onAgentSelect: (agent: Agent | null) => void;
  onTaskSelect: (task: Task | null) => void;
  onMessageSelect: (message: Message | null) => void;
  onTeamSelect: (team: Team | null) => void;
  onAgentProfileSelect: (profile: AgentProfile | null) => void;
  onDismissSelection: () => void;
  onViewModeChange: (mode: ViewMode) => void;
}

export const MainLayout = ({
  showTeamView,
  sidebarCollapsed,
  agents,
  tasks,
  messages,
  selectedAgent,
  selectedTask,
  selectedMessage,
  selectedTeam,
  selectedAgentProfile,
  viewMode,
  hasSelection,
  onSidebarToggle,
  onAgentSelect,
  onTaskSelect,
  onMessageSelect,
  onTeamSelect,
  onAgentProfileSelect,
  onDismissSelection,
  onViewModeChange,
}: MainLayoutProps) => {
  
  // Use standardized sidebar state management
  const { isCollapsed, toggleSidebar } = useCollapsibleSidebar({
    defaultCollapsed: sidebarCollapsed,
    keyboardShortcut: 'b',
    storageKey: 'main-sidebar-collapsed'
  });

  // Context-aware panel management
  const { panelContext, showPanel, hidePanel } = useContextAwarePanel();

  // Memoize the current selection to prevent unnecessary updates
  const currentSelection = React.useMemo(() => {
    if (selectedAgent) return { type: 'agent' as const, data: selectedAgent, id: selectedAgent.id };
    if (selectedTask) return { type: 'task' as const, data: selectedTask, id: selectedTask.id };
    if (selectedMessage) return { type: 'message' as const, data: selectedMessage, id: selectedMessage.id };
    if (selectedAgentProfile) return { type: 'agentProfile' as const, data: selectedAgentProfile, id: selectedAgentProfile.id };
    return null;
  }, [selectedAgent?.id, selectedTask?.id, selectedMessage?.id, selectedAgentProfile?.id]);

  // Update panel when selections change
  React.useEffect(() => {
    if (currentSelection) {
      showPanel(currentSelection.type, currentSelection.data);
    } else {
      hidePanel();
    }
  }, [currentSelection?.type, currentSelection?.id, showPanel, hidePanel]);

  // Handle panel dismissal
  const handlePanelDismiss = React.useCallback(() => {
    hidePanel();
    onDismissSelection();
  }, [hidePanel, onDismissSelection]);

  // Enhanced keyboard shortcuts for panel management
  usePanelKeyboardShortcuts({
    isVisible: panelContext.isVisible,
    onDismiss: handlePanelDismiss
  });
  
  const notificationCounts = React.useMemo(() => ({
    workflow: 3,
    communication: 2,
    tasks: 5,
    messages: 1,
  }), []);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* View Mode Tabs - Always show for Individual Agents view */}
      {!showTeamView && (
        <div className="border-b border-border/50 bg-background/95 backdrop-blur-sm">
          <ViewModeTabs
            viewMode={viewMode}
            onViewModeChange={onViewModeChange}
            notificationCounts={notificationCounts}
          />
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 flex overflow-hidden relative">
          {/* Sidebar Toggle */}
          <div className="flex-shrink-0 border-r border-border/60 bg-card/50 backdrop-blur-sm">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="m-2 h-8 w-8 p-0 hover:bg-primary/10 transition-all duration-200 hover:scale-105"
              title={isCollapsed ? "Expand sidebar (Ctrl+B)" : "Collapse sidebar (Ctrl+B)"}
            >
              {isCollapsed ? (
                <PanelLeft className="w-4 h-4" />
              ) : (
                <PanelLeftClose className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* Enhanced Sidebar */}
          <div className={cn(
            "bg-background/95 backdrop-blur-sm border-r border-border/60 transition-all duration-300 ease-in-out overflow-hidden flex-shrink-0 shadow-sm",
            isCollapsed ? "w-16" : (showTeamView ? "w-80" : "w-96")
          )}>
            <SidebarRenderer
              viewMode={viewMode}
              agents={agents}
              tasks={tasks}
              messages={messages}
              selectedAgent={selectedAgent}
              selectedTask={selectedTask}
              selectedMessage={selectedMessage}
              selectedTeam={selectedTeam}
              selectedAgentProfile={selectedAgentProfile}
              showTeamView={showTeamView}
              collapsed={isCollapsed}
              onToggleCollapse={toggleSidebar}
              onAgentSelect={onAgentSelect}
              onTaskSelect={onTaskSelect}
              onMessageSelect={onMessageSelect}
              onTeamSelect={onTeamSelect}
              onAgentProfileSelect={onAgentProfileSelect}
            />
          </div>

          {/* Main Content with Enhanced Styling */}
          <div className={cn(
            "flex-1 flex flex-col overflow-hidden bg-gradient-to-br from-background to-muted/10 transition-all duration-300 ease-in-out",
            panelContext.isVisible && "mr-96"
          )}>
            <MainContentRenderer
              viewMode={viewMode}
              agents={agents}
              tasks={tasks}
              messages={messages}
              selectedAgent={selectedAgent}
              selectedTask={selectedTask}
              selectedMessage={selectedMessage}
              selectedTeam={selectedTeam}
              selectedAgentProfile={selectedAgentProfile}
              showTeamView={showTeamView}
              onAgentSelect={onAgentSelect}
              onTaskSelect={onTaskSelect}
              onMessageSelect={onMessageSelect}
              onTeamSelect={onTeamSelect}
              onAgentProfileSelect={onAgentProfileSelect}
              onViewModeChange={onViewModeChange}
            />
          </div>

          {/* Context-Aware Panel */}
          <ContextAwarePanel
            type={panelContext.type}
            data={panelContext.data}
            isVisible={panelContext.isVisible}
            agents={agents}
            onDismiss={handlePanelDismiss}
          />
        </div>

        {/* User Presence Panel - Enhanced for Individual Agents view */}
        {!showTeamView && (
          <div className="border-t border-border/30 bg-background/80 backdrop-blur-sm">
            <UserPresencePanel 
              viewMode={viewMode}
              componentId={`${viewMode}-view`}
              projectId="current-project"
              showPerformance={true}
              className="animate-in slide-in-from-bottom duration-300"
            />
          </div>
        )}
      </div>
    </div>
  );
};
