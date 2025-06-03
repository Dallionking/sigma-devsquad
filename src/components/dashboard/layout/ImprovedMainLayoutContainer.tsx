
import React from 'react';
import { Agent, Task, Message, ViewMode } from '@/types';
import { Team, AgentProfile } from '@/types/teams';
import { MainLayoutHeader } from './MainLayoutHeader';
import { MainLayoutContent } from './MainLayoutContent';
import { MainLayoutSidebar } from './MainLayoutSidebar';
import { ViewSpecificOnboardingManager } from '@/components/onboarding/view-specific/ViewSpecificOnboardingManager';
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
  const { preventOverlap } = useLayoutConsistency(props.sidebarCollapsed);
  
  // Calculate notification counts for tabs
  const notificationCounts = {
    workflow: props.agents.filter(a => a.status === 'active').length,
    communication: props.messages.filter(m => !m.read).length,
    tasks: props.tasks.filter(t => t.status === 'pending').length,
    messages: props.messages.filter(m => !m.read).length,
  };

  // Standardized layout calculations
  const sidebarWidth = props.sidebarCollapsed ? 64 : (props.showTeamView ? 320 : 384); // 4rem, 20rem, 24rem
  const syncPanelWidth = props.syncPanelCollapsed || !props.hasSelection ? 0 : 384; // 24rem

  return (
    <div className="min-h-screen bg-background flex overflow-hidden relative">
      {/* View-Specific Onboarding Manager */}
      <ViewSpecificOnboardingManager
        showTeamView={props.showTeamView}
        viewMode={props.viewMode}
      />
      
      {/* Contextual Sidebar - Fixed positioning */}
      <div 
        className={cn(
          "fixed top-0 left-0 h-full transition-all duration-300 ease-in-out z-40 bg-sidebar border-r border-sidebar-border",
          props.sidebarCollapsed ? "w-16" : (props.showTeamView ? "w-80" : "w-96")
        )}
      >
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

      {/* Main Content Area - Properly offset with consistent 48px top padding */}
      <div 
        className="flex flex-col flex-1 overflow-hidden bg-background transition-all duration-300 ease-in-out"
        style={{
          marginLeft: `${sidebarWidth}px`,
          marginRight: `${syncPanelWidth}px`,
          paddingTop: '48px' // Consistent 48px padding-top as required
        }}
      >
        {/* Consolidated Header - No duplicate navigation */}
        <div className="fixed top-0 left-0 right-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border"
             style={{ marginLeft: `${sidebarWidth}px`, marginRight: `${syncPanelWidth}px` }}>
          <MainLayoutHeader
            showTeamView={props.showTeamView}
            viewMode={props.viewMode}
            onViewModeChange={props.onViewModeChange}
            notificationCounts={notificationCounts}
          />
        </div>
        
        {/* Main Content - Consistent spacing */}
        <div className="flex-1 overflow-hidden container-spacing-tight">
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

      {/* Sync Panel - Fixed positioning on the right */}
      {!props.syncPanelCollapsed && props.hasSelection && (
        <div 
          className="fixed top-0 right-0 h-full w-96 bg-background border-l border-border z-30 transition-all duration-300 ease-in-out"
          style={{ paddingTop: '48px' }} // Consistent 48px padding-top
        >
          <div className="p-4 h-full overflow-auto">
            <h3 className="text-lg font-semibold mb-4">Details Panel</h3>
            <p className="text-sm text-muted-foreground">
              Selected item details would appear here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
