
import React from 'react';
import { MainContentRenderer } from '../MainContentRenderer';
import { Agent, Task, Message, ViewMode } from '@/types';
import { Team, AgentProfile } from '@/types/teams';
import { cn } from '@/lib/utils';

interface MainLayoutContentProps {
  showContextPanel: boolean;
  viewMode: ViewMode;
  agents: Agent[];
  tasks: Task[];
  messages: Message[];
  selectedAgent: Agent | null;
  selectedTask: Task | null;
  selectedMessage: Message | null;
  selectedTeam: Team | null;
  selectedAgentProfile: AgentProfile | null;
  showTeamView: boolean;
  onAgentSelect: (agent: Agent | null) => void;
  onTaskSelect: (task: Task | null) => void;
  onMessageSelect: (message: Message | null) => void;
  onTeamSelect: (team: Team | null) => void;
  onAgentProfileSelect: (profile: AgentProfile | null) => void;
  onViewModeChange: (mode: ViewMode) => void;
}

export const MainLayoutContent = ({
  showContextPanel,
  viewMode,
  agents,
  tasks,
  messages,
  selectedAgent,
  selectedTask,
  selectedMessage,
  selectedTeam,
  selectedAgentProfile,
  showTeamView,
  onAgentSelect,
  onTaskSelect,
  onMessageSelect,
  onTeamSelect,
  onAgentProfileSelect,
  onViewModeChange
}: MainLayoutContentProps) => {
  return (
    <div className={cn(
      "flex-1 flex flex-col overflow-hidden bg-gradient-to-br from-background to-muted/10 transition-all duration-300 ease-in-out",
      showContextPanel && "mr-96"
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
  );
};
