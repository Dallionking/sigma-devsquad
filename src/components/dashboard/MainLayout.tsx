
import React from 'react';
import { Agent, Task, Message, ViewMode } from "@/types";
import { Team, AgentProfile } from "@/types/teams";
import { SidebarRenderer } from "./SidebarRenderer";
import { MainContentRenderer } from "./MainContentRenderer";
import { DetailPanelRenderer } from "./DetailPanelRenderer";
import { ViewModeTabs } from "./ViewModeTabs";
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
  
  const notificationCounts = {
    workflow: 3,
    communication: 2,
    tasks: 5,
    messages: 1,
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* View Mode Tabs - Only show in individual view */}
      {!showTeamView && (
        <ViewModeTabs
          viewMode={viewMode}
          onViewModeChange={onViewModeChange}
          notificationCounts={notificationCounts}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Hide in team view or when collapsed */}
        {!showTeamView && !sidebarCollapsed && (
          <div className="w-80 bg-card border-r transition-all duration-300 overflow-hidden">
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
              onAgentSelect={onAgentSelect}
              onTaskSelect={onTaskSelect}
              onMessageSelect={onMessageSelect}
              onTeamSelect={onTeamSelect}
              onAgentProfileSelect={onAgentProfileSelect}
            />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
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

        {/* Detail Panel - Only show when not in team view and has selection */}
        {!showTeamView && hasSelection && (
          <div className="w-96 bg-card border-l overflow-hidden flex-shrink-0">
            <DetailPanelRenderer
              selectedAgent={selectedAgent}
              selectedTask={selectedTask}
              selectedMessage={selectedMessage}
              selectedAgentProfile={selectedAgentProfile}
              onDismissSelection={onDismissSelection}
            />
          </div>
        )}
      </div>
    </div>
  );
};
