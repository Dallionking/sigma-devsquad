
import React from 'react';
import { ViewMode } from '@/types';
import { Agent, Task, Message } from '@/types';
import { Team, AgentProfile } from '@/types/teams';
import { TeamDashboard } from '@/components/teams/TeamDashboard';
import { TeamsEmptyState } from '@/components/empty-states';
import { MainLayoutHeader } from '../layout/MainLayoutHeader';

interface TeamViewLayoutProps {
  viewMode: ViewMode;
  agents: Agent[];
  tasks: Task[];
  messages: Message[];
  selectedAgent: Agent | null;
  selectedTask: Task | null;
  selectedMessage: Message | null;
  selectedTeam: Team | null;
  selectedAgentProfile: AgentProfile | null;
  onAgentSelect: (agent: Agent | null) => void;
  onTaskSelect: (task: Task | null) => void;
  onMessageSelect: (message: Message | null) => void;
  onTeamSelect: (team: Team | null) => void;
  onAgentProfileSelect: (profile: AgentProfile | null) => void;
  onViewModeChange: (mode: ViewMode) => void;
}

export const TeamViewLayout = ({
  selectedTeam,
  selectedAgentProfile,
  onAgentProfileSelect
}: TeamViewLayoutProps) => {
  
  if (!selectedTeam) {
    return (
      <div className="h-full flex items-center justify-center">
        <TeamsEmptyState />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <TeamDashboard 
        team={selectedTeam}
        onAgentSelect={onAgentProfileSelect}
      />
    </div>
  );
};
