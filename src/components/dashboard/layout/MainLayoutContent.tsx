
import React from 'react';
import { Agent, Task, Message, ViewMode } from '@/types';
import { Team, AgentProfile } from '@/types/teams';
import { TeamViewLayout } from '../view-specific/TeamViewLayout';
import { IndividualViewLayout } from '../view-specific/IndividualViewLayout';
import { cn } from '@/lib/utils';

interface MainLayoutContentProps {
  showTeamView: boolean;
  viewMode: ViewMode;
  agents: Agent[];
  tasks: Task[];
  messages: Message[];
  selectedAgent: Agent | null;
  selectedTask: Task | null;
  selectedMessage: Message | null;
  selectedTeam: Team | null;
  selectedAgentProfile: AgentProfile | null;
  hasSelection: boolean;
  syncPanelCollapsed: boolean;
  onSyncPanelToggle: () => void;
  onDismissSelection: () => void;
  onAgentSelect: (agent: Agent | null) => void;
  onTaskSelect: (task: Task | null) => void;
  onMessageSelect: (message: Message | null) => void;
  onTeamSelect: (team: Team | null) => void;
  onAgentProfileSelect: (profile: AgentProfile | null) => void;
  onViewModeChange: (mode: ViewMode) => void;
}

export const MainLayoutContent = ({
  showTeamView,
  viewMode,
  agents,
  tasks,
  messages,
  selectedAgent,
  selectedTask,
  selectedMessage,
  selectedTeam,
  selectedAgentProfile,
  hasSelection,
  syncPanelCollapsed,
  onSyncPanelToggle,
  onDismissSelection,
  onAgentSelect,
  onTaskSelect,
  onMessageSelect,
  onTeamSelect,
  onAgentProfileSelect,
  onViewModeChange
}: MainLayoutContentProps) => {
  return (
    <div className={cn(
      "flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out",
      showTeamView 
        ? "bg-gradient-to-br from-blue-50/30 via-background to-blue-50/10 dark:from-blue-950/20 dark:via-background dark:to-blue-950/5"
        : "bg-gradient-to-br from-purple-50/30 via-background to-purple-50/10 dark:from-purple-950/20 dark:via-background dark:to-purple-950/5",
      !syncPanelCollapsed && hasSelection && "mr-96"
    )}>
      {showTeamView ? (
        <TeamViewLayout
          viewMode={viewMode}
          agents={agents}
          tasks={tasks}
          messages={messages}
          selectedAgent={selectedAgent}
          selectedTask={selectedTask}
          selectedMessage={selectedMessage}
          selectedTeam={selectedTeam}
          selectedAgentProfile={selectedAgentProfile}
          onAgentSelect={onAgentSelect}
          onTaskSelect={onTaskSelect}
          onMessageSelect={onMessageSelect}
          onTeamSelect={onTeamSelect}
          onAgentProfileSelect={onAgentProfileSelect}
          onViewModeChange={onViewModeChange}
        />
      ) : (
        <IndividualViewLayout
          viewMode={viewMode}
          agents={agents}
          tasks={tasks}
          messages={messages}
          selectedAgent={selectedAgent}
          selectedTask={selectedTask}
          selectedMessage={selectedMessage}
          selectedTeam={selectedTeam}
          selectedAgentProfile={selectedAgentProfile}
          onAgentSelect={onAgentSelect}
          onTaskSelect={onTaskSelect}
          onMessageSelect={onMessageSelect}
          onTeamSelect={onTeamSelect}
          onAgentProfileSelect={onAgentProfileSelect}
          onViewModeChange={onViewModeChange}
        />
      )}
    </div>
  );
};
