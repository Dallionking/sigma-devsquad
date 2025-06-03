
import React from 'react';
import { Agent, Task, Message, ViewMode } from '@/types';
import { Team, AgentProfile } from '@/types/teams';
import { MainLayoutHeader } from './MainLayoutHeader';
import { MainLayoutContent } from './MainLayoutContent';
import { MainLayoutSidebar } from './MainLayoutSidebar';
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

  // Calculate sidebar width for proper content positioning
  const sidebarWidth = sidebarCollapsed ? 64 : (showTeamView ? 320 : 384);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-background">
      {/* View-Specific Onboarding Manager */}
      <ViewSpecificOnboardingManager
        showTeamView={showTeamView}
        viewMode={viewMode}
      />
      
      {/* Main Layout Header - Fixed positioning to avoid overlap */}
      <div className="sticky top-0 z-40 border-b border-border/60 bg-background/95 backdrop-blur-sm">
        <MainLayoutHeader
          showTeamView={showTeamView}
          viewMode={viewMode}
          onViewModeChange={onViewModeChange}
          notificationCounts={notificationCounts}
        />
      </div>
      
      {/* Main Content Area with proper spacing */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar - Fixed positioning to prevent content overlap */}
        <div className={cn(
          "fixed left-0 top-0 z-30 h-full transition-all duration-300 ease-in-out bg-background border-r border-border/60",
          sidebarCollapsed ? "w-16" : (showTeamView ? "w-80" : "w-96")
        )}>
          <div className="pt-20"> {/* Account for header height */}
            <MainLayoutSidebar
              showTeamView={showTeamView}
              sidebarCollapsed={sidebarCollapsed}
              agents={agents}
              tasks={tasks}
              messages={messages}
              selectedAgent={selectedAgent}
              selectedTask={selectedTask}
              selectedMessage={selectedMessage}
              selectedTeam={selectedTeam}
              selectedAgentProfile={selectedAgentProfile}
              viewMode={viewMode}
              onAgentSelect={onAgentSelect}
              onTaskSelect={onTaskSelect}
              onMessageSelect={onMessageSelect}
              onTeamSelect={onTeamSelect}
              onAgentProfileSelect={onAgentProfileSelect}
              onSidebarToggle={onSidebarToggle}
            />
          </div>
        </div>
        
        {/* Main Content - Properly positioned to avoid sidebar overlap */}
        <div 
          className="flex-1 overflow-hidden transition-all duration-300 ease-in-out"
          style={{ 
            marginLeft: `${sidebarWidth}px`,
            paddingTop: '1rem'
          }}
        >
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
    </div>
  );
};
