
import React from 'react';
import { Agent, Task, Message, ViewMode } from '@/types';
import { Team, AgentProfile } from '@/types/teams';
import { MainLayoutHeader } from './MainLayoutHeader';
import { MainLayoutContent } from './MainLayoutContent';
import { MainLayoutSidebar } from './MainLayoutSidebar';
import { ViewSpecificOnboardingManager } from '@/components/onboarding/view-specific/ViewSpecificOnboardingManager';
import { ConsistentLayout } from '@/components/layout/ConsistentLayout';
import { useLayoutConsistency } from '@/hooks/useLayoutConsistency';
import { cn } from '@/lib/utils';

interface ImprovedMainLayoutContainerProps {
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

export const ImprovedMainLayoutContainer = (props: ImprovedMainLayoutContainerProps) => {
  const { getLayoutClasses, preventOverlap } = useLayoutConsistency(props.sidebarCollapsed);
  const layoutClasses = getLayoutClasses();
  
  // Calculate notification counts for tabs
  const notificationCounts = {
    workflow: props.agents.filter(a => a.status === 'active').length,
    communication: props.messages.filter(m => !m.read).length,
    tasks: props.tasks.filter(t => t.status === 'pending').length,
    messages: props.messages.filter(m => !m.read).length,
  };

  return (
    <div className={cn(
      "min-h-screen bg-background flex overflow-hidden",
      preventOverlap.ensureZIndex('sidebar')
    )}>
      {/* View-Specific Onboarding Manager */}
      <ViewSpecificOnboardingManager
        showTeamView={props.showTeamView}
        viewMode={props.viewMode}
      />
      
      {/* Sidebar - Fixed positioning to prevent overlap */}
      <div className={cn(
        layoutClasses.sidebar,
        "bg-sidebar border-r border-sidebar-border",
        preventOverlap.ensureZIndex('sidebar')
      )}>
        <MainLayoutSidebar
          showTeamView={props.showTeamView}
          sidebarCollapsed={props.sidebarCollapsed}
          agents={props.agents}
          tasks={props.tasks}
          messages={props.messages}
          selectedAgent={props.selectedAgent}
          selectedTask={props.selectedTask}
          selectedMessage={props.selectedMessage}
          selectedTeam={props.selectedTeam}
          selectedAgentProfile={props.selectedAgentProfile}
          viewMode={props.viewMode}
          onAgentSelect={props.onAgentSelect}
          onTaskSelect={props.onTaskSelect}
          onMessageSelect={props.onMessageSelect}
          onTeamSelect={props.onTeamSelect}
          onAgentProfileSelect={props.onAgentProfileSelect}
          onSidebarToggle={props.onSidebarToggle}
        />
      </div>

      {/* Main Content Area - Properly offset from sidebar */}
      <div className={cn(
        layoutClasses.mainContent,
        "flex flex-col overflow-hidden bg-background"
      )}>
        {/* Main Layout Header */}
        <div className="flex-shrink-0 border-b border-border bg-background/95 backdrop-blur-sm">
          <MainLayoutHeader
            showTeamView={props.showTeamView}
            viewMode={props.viewMode}
            onViewModeChange={props.onViewModeChange}
            notificationCounts={notificationCounts}
          />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <MainLayoutContent
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
            hasSelection={props.hasSelection}
            syncPanelCollapsed={props.syncPanelCollapsed}
            onSyncPanelToggle={props.onSyncPanelToggle}
            onDismissSelection={props.onDismissSelection}
            onAgentSelect={props.onAgentSelect}
            onTaskSelect={props.onTaskSelect}
            onMessageSelect={props.onMessageSelect}
            onTeamSelect={props.onTeamSelect}
            onAgentProfileSelect={props.onAgentProfileSelect}
            onViewModeChange={props.onViewModeChange}
          />
        </div>
      </div>
    </div>
  );
};
