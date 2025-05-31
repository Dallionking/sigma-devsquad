
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
  
  // Use internal sidebar state management
  const { isCollapsed, toggleSidebar } = useCollapsibleSidebar({
    defaultCollapsed: sidebarCollapsed,
    keyboardShortcut: 'b',
    storageKey: 'main-sidebar-collapsed'
  });

  // Context-aware panel management
  const { panelContext, showPanel, hidePanel } = useContextAwarePanel();

  // Update panel when selections change
  React.useEffect(() => {
    if (selectedAgent) {
      showPanel('agent', selectedAgent);
    } else if (selectedTask) {
      showPanel('task', selectedTask);
    } else if (selectedMessage) {
      showPanel('message', selectedMessage);
    } else if (selectedAgentProfile) {
      showPanel('agentProfile', selectedAgentProfile);
    } else {
      hidePanel();
    }
  }, [selectedAgent, selectedTask, selectedMessage, selectedAgentProfile, showPanel, hidePanel]);

  // Handle panel dismissal
  const handlePanelDismiss = () => {
    hidePanel();
    onDismissSelection();
  };

  // Keyboard shortcuts for panel
  usePanelKeyboardShortcuts({
    isVisible: panelContext.isVisible,
    onDismiss: handlePanelDismiss
  });
  
  const notificationCounts = {
    workflow: 3,
    communication: 2,
    tasks: 5,
    messages: 1,
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-background">
      {/* View Mode Tabs - Moved above content */}
      {!showTeamView && (
        <ViewModeTabs
          viewMode={viewMode}
          onViewModeChange={onViewModeChange}
          notificationCounts={notificationCounts}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 flex overflow-hidden relative">
          {/* Sidebar Toggle Button - Always visible */}
          <div className="flex-shrink-0 border-r border-border/60 bg-card/30 dark:bg-card/30">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="m-2 h-8 w-8 p-0 hover:bg-primary/10 transition-colors"
              title={isCollapsed ? "Expand sidebar (Ctrl+B)" : "Collapse sidebar (Ctrl+B)"}
            >
              {isCollapsed ? (
                <PanelLeft className="w-4 h-4" />
              ) : (
                <PanelLeftClose className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* Sidebar - Enhanced with collapsible functionality */}
          <div className={cn(
            "bg-background border-r border-border/60 transition-all duration-300 ease-in-out overflow-hidden flex-shrink-0",
            isCollapsed ? "w-16" : (showTeamView ? "w-64" : "w-80"),
            "animate-in slide-in-from-left duration-300"
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

          {/* Main Content - Adjusted width when panel is visible */}
          <div className={cn(
            "flex-1 flex flex-col overflow-hidden bg-background transition-all duration-300 ease-in-out",
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

          {/* Context-Aware Panel - Only show when there's a selection */}
          <ContextAwarePanel
            type={panelContext.type}
            data={panelContext.data}
            isVisible={panelContext.isVisible}
            agents={agents}
            onDismiss={handlePanelDismiss}
          />
        </div>

        {/* Enhanced Integrated User Presence Panel */}
        {!showTeamView && (
          <UserPresencePanel 
            viewMode={viewMode}
            componentId={`${viewMode}-view`}
            projectId="current-project"
            showPerformance={true}
            className="animate-in slide-in-from-bottom duration-300"
          />
        )}
      </div>
    </div>
  );
};
