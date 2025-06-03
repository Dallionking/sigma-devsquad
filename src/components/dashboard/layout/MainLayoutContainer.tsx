
import React from 'react';
import { Agent, Task, Message, ViewMode } from "@/types";
import { Team, AgentProfile } from "@/types/teams";
import { UnifiedLayout } from '@/components/layout/UnifiedLayout';
import { SimplifiedHeader } from '../header/SimplifiedHeader';
import { MainLayoutSidebar } from './MainLayoutSidebar';
import { MainLayoutContent } from './MainLayoutContent';
import { MainLayoutSyncPanel } from './MainLayoutSyncPanel';

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
  return (
    <UnifiedLayout showBreadcrumbs={true}>
      {/* Simplified Header - No redundant navigation */}
      <SimplifiedHeader 
        viewMode={props.viewMode}
        agents={props.agents}
        showTeamView={props.showTeamView}
      />
      
      {/* Main Dashboard Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Context Sidebar (for agents/teams/etc) */}
        <MainLayoutSidebar
          sidebarCollapsed={props.sidebarCollapsed}
          showTeamView={props.showTeamView}
          viewMode={props.viewMode}
          agents={props.agents}
          tasks={props.tasks}
          messages={props.messages}
          selectedAgent={props.selectedAgent}
          selectedTask={props.selectedTask}
          selectedMessage={props.selectedMessage}
          selectedTeam={props.selectedTeam}
          selectedAgentProfile={props.selectedAgentProfile}
          onSidebarToggle={props.onSidebarToggle}
          onAgentSelect={props.onAgentSelect}
          onTaskSelect={props.onTaskSelect}
          onMessageSelect={props.onMessageSelect}
          onTeamSelect={props.onTeamSelect}
          onAgentProfileSelect={props.onAgentProfileSelect}
        />

        {/* Main Content */}
        <MainLayoutContent
          viewMode={props.viewMode}
          agents={props.agents}
          tasks={props.tasks}
          messages={props.messages}
          selectedAgent={props.selectedAgent}
          selectedTask={props.selectedTask}
          selectedMessage={props.selectedMessage}
          selectedTeam={props.selectedTeam}
          selectedAgentProfile={props.selectedAgentProfile}
          showTeamView={props.showTeamView}
          hasSelection={props.hasSelection}
          syncPanelCollapsed={props.syncPanelCollapsed}
          onViewModeChange={props.onViewModeChange}
          onAgentSelect={props.onAgentSelect}
          onTaskSelect={props.onTaskSelect}
          onMessageSelect={props.onMessageSelect}
          onTeamSelect={props.onTeamSelect}
          onAgentProfileSelect={props.onAgentProfileSelect}
          onSyncPanelToggle={props.onSyncPanelToggle}
          onDismissSelection={props.onDismissSelection}
        />

        {/* Sync Panel */}
        <MainLayoutSyncPanel
          syncPanelCollapsed={props.syncPanelCollapsed}
          hasSelection={props.hasSelection}
          selectedAgent={props.selectedAgent}
          selectedTask={props.selectedTask}
          selectedMessage={props.selectedMessage}
          onSyncPanelToggle={props.onSyncPanelToggle}
          onDismissSelection={props.onDismissSelection}
        />
      </div>
    </UnifiedLayout>
  );
};
