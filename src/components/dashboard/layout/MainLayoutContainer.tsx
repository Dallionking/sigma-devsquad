
import React from 'react';
import { Agent, Task, Message, ViewMode } from "@/types";
import { Team, AgentProfile } from "@/types/teams";
import { ContextAwarePanel } from "../ContextAwarePanel";
import { MainLayoutHeader } from "./MainLayoutHeader";
import { MainLayoutSidebar } from "./MainLayoutSidebar";
import { MainLayoutContent } from "./MainLayoutContent";
import { MainLayoutFooter } from "./MainLayoutFooter";
import { OnboardingRoadmap, RoadmapToggle } from "../../onboarding/roadmap";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useCollapsibleSidebar } from "@/hooks/useCollapsibleSidebar";
import { useContextAwarePanel } from "@/hooks/useContextAwarePanel";
import { usePanelKeyboardShortcuts } from "@/hooks/usePanelKeyboardShortcuts";

interface MainLayoutContainerProps {
  showTeamView: boolean;
  sidebarCollapsed: boolean;
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
  onAgentSelect: (agent: Agent | null) => void;
  onTaskSelect: (task: Task | null) => void;
  onMessageSelect: (message: Message | null) => void;
  onTeamSelect: (team: Team | null) => void;
  onAgentProfileSelect: (profile: AgentProfile | null) => void;
  onDismissSelection: () => void;
  onViewModeChange: (mode: ViewMode) => void;
}

export const MainLayoutContainer = ({
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
}: MainLayoutContainerProps) => {
  
  // Onboarding state
  const { progress, showOnboarding, setShowOnboarding } = useOnboarding();
  const [isRoadmapVisible, setIsRoadmapVisible] = React.useState(false);
  
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

  // Handle roadmap toggle
  const handleRoadmapToggle = () => {
    setIsRoadmapVisible(!isRoadmapVisible);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* View Mode Tabs Header */}
      <MainLayoutHeader
        showTeamView={showTeamView}
        viewMode={viewMode}
        onViewModeChange={onViewModeChange}
        notificationCounts={notificationCounts}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 flex overflow-hidden relative">
          {/* Onboarding Roadmap */}
          {isRoadmapVisible && !progress.isOnboardingComplete && (
            <OnboardingRoadmap />
          )}

          {/* Sidebar */}
          <MainLayoutSidebar
            isCollapsed={isCollapsed}
            showTeamView={showTeamView}
            viewMode={viewMode}
            agents={agents}
            tasks={tasks}
            messages={messages}
            selectedAgent={selectedAgent}
            selectedTask={selectedTask}
            selectedMessage={selectedMessage}
            selectedTeam={selectedTeam}
            selectedAgentProfile={selectedAgentProfile}
            onToggleCollapse={toggleSidebar}
            onAgentSelect={onAgentSelect}
            onTaskSelect={onTaskSelect}
            onMessageSelect={onMessageSelect}
            onTeamSelect={onTeamSelect}
            onAgentProfileSelect={onAgentProfileSelect}
          />

          {/* Main Content */}
          <MainLayoutContent
            showContextPanel={panelContext.isVisible}
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

          {/* Context-Aware Panel */}
          <ContextAwarePanel
            type={panelContext.type}
            data={panelContext.data}
            isVisible={panelContext.isVisible}
            agents={agents}
            onDismiss={handlePanelDismiss}
          />
        </div>

        {/* Footer for Individual Agents view */}
        <MainLayoutFooter
          showTeamView={showTeamView}
          viewMode={viewMode}
        />
      </div>

      {/* Roadmap Toggle Button */}
      {!progress.isOnboardingComplete && (
        <RoadmapToggle
          isRoadmapVisible={isRoadmapVisible}
          onToggle={handleRoadmapToggle}
        />
      )}
    </div>
  );
};
