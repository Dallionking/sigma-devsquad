
import React from 'react';
import { Agent, Task, Message, ViewMode } from "@/types";
import { Team, AgentProfile } from "@/types/teams";
import { ViewContextHeader } from "../ViewContextHeader";
import { BreadcrumbNavigation } from "../BreadcrumbNavigation";
import { ViewTransition } from "../ViewTransition";
import { MainLayoutContent } from "./MainLayoutContent";
import { MainLayoutSidebar } from "./MainLayoutSidebar";
import { MainLayoutHeader } from "./MainLayoutHeader";

interface MainLayoutContainerProps {
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

export const MainLayoutContainer = (props: MainLayoutContainerProps) => {
  const {
    showTeamView,
    viewMode,
    sidebarCollapsed,
    onSidebarToggle,
    onViewModeChange,
    // Extract all the handler props that need to be passed to MainLayoutContent
    onAgentSelect,
    onTaskSelect,
    onMessageSelect,
    onTeamSelect,
    onAgentProfileSelect,
    onDismissSelection,
    onSyncPanelToggle,
    ...restProps
  } = props;

  // Calculate notification counts
  const notificationCounts = {
    workflow: 0,
    communication: 0,
    tasks: props.tasks.filter(task => task.status === 'pending').length,
    messages: props.messages.filter(message => !message.read).length
  };

  return (
    <ViewTransition viewKey={showTeamView ? 'team' : 'individual'} className="flex-1 flex flex-col">
      {/* Persistent Breadcrumb */}
      <BreadcrumbNavigation 
        viewMode={viewMode}
        showTeamView={showTeamView}
      />
      
      {/* Color-coded Context Header */}
      <ViewContextHeader showTeamView={showTeamView} />
      
      {/* Main Layout Header */}
      <MainLayoutHeader
        showTeamView={showTeamView}
        viewMode={viewMode}
        onViewModeChange={onViewModeChange}
        notificationCounts={notificationCounts}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <MainLayoutSidebar
          sidebarCollapsed={sidebarCollapsed}
          onSidebarToggle={onSidebarToggle}
          showTeamView={showTeamView}
          viewMode={viewMode}
          agents={props.agents}
          tasks={props.tasks}
          messages={props.messages}
          selectedAgent={props.selectedAgent}
          selectedTask={props.selectedTask}
          selectedMessage={props.selectedMessage}
          selectedTeam={props.selectedTeam}
          selectedAgentProfile={props.selectedAgentProfile}
          onAgentSelect={onAgentSelect}
          onTaskSelect={onTaskSelect}
          onMessageSelect={onMessageSelect}
          onTeamSelect={onTeamSelect}
          onAgentProfileSelect={onAgentProfileSelect}
        />

        {/* Main Content */}
        <MainLayoutContent
          showTeamView={showTeamView}
          viewMode={viewMode}
          agents={props.agents}
          tasks={props.tasks}
          messages={props.messages}
          selectedAgent={props.selectedAgent}
          selectedTask={props.selectedTask}
          selectedMessage={props.selectedMessage}
          selectedTeam={props.selectedTeam}
          selectedAgentProfile={props.selectedAgentProfile}
          hasSelection={props.hasSelection}
          syncPanelCollapsed={props.syncPanelCollapsed}
          onSyncPanelToggle={onSyncPanelToggle}
          onDismissSelection={onDismissSelection}
          onAgentSelect={onAgentSelect}
          onTaskSelect={onTaskSelect}
          onMessageSelect={onMessageSelect}
          onTeamSelect={onTeamSelect}
          onAgentProfileSelect={onAgentProfileSelect}
          onViewModeChange={onViewModeChange}
        />
      </div>
    </ViewTransition>
  );
};
