
import React from 'react';
import { Agent, Task, Message, ViewMode } from '@/types';
import { Team, AgentProfile } from '@/types/teams';
import { MainLayoutHeader } from './MainLayoutHeader';
import { MainLayoutContent } from './MainLayoutContent';
import { LeftNavigationSidebar } from './LeftNavigationSidebar';
import { ViewSpecificOnboardingManager } from '@/components/onboarding/view-specific/ViewSpecificOnboardingManager';
import { cn } from '@/lib/utils';

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

export const MainLayoutContainer = ({
  showTeamView,
  sidebarCollapsed,
  syncPanelCollapsed,
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
  onSyncPanelToggle,
  onAgentSelect,
  onTaskSelect,
  onMessageSelect,
  onTeamSelect,
  onAgentProfileSelect,
  onDismissSelection,
  onViewModeChange
}: MainLayoutContainerProps) => {
  
  // Calculate notification counts for tabs
  const notificationCounts = {
    workflow: agents.filter(a => a.status === 'active').length,
    communication: messages.filter(m => !m.read).length,
    tasks: tasks.filter(t => t.status === 'pending').length,
    messages: messages.filter(m => !m.read).length,
  };

  // Calculate agent statistics
  const activeAgents = agents.filter(agent => agent.status === "working").length;
  const totalAgents = agents.length;
  const errorAgents = agents.filter(agent => agent.status === "error").length;
  const idleAgents = agents.filter(agent => agent.status === "idle").length;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* View-Specific Onboarding Manager */}
      <ViewSpecificOnboardingManager
        showTeamView={showTeamView}
        viewMode={viewMode}
      />
      
      {/* Left Navigation Sidebar */}
      <LeftNavigationSidebar
        collapsed={sidebarCollapsed}
        onToggle={onSidebarToggle}
        activeAgents={activeAgents}
        totalAgents={totalAgents}
        errorAgents={errorAgents}
        idleAgents={idleAgents}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Main Layout Header - Simplified without logo */}
        <MainLayoutHeader
          showTeamView={showTeamView}
          viewMode={viewMode}
          onViewModeChange={onViewModeChange}
          notificationCounts={notificationCounts}
        />
        
        {/* Main Content */}
        <MainLayoutContent
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
          hasSelection={hasSelection}
          syncPanelCollapsed={syncPanelCollapsed}
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
    </div>
  );
};
