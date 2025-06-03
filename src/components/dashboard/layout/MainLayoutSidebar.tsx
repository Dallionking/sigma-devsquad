
import React from 'react';
import { SidebarRenderer } from '../SidebarRenderer';
import { Agent, Task, Message, ViewMode } from '@/types';
import { Team, AgentProfile } from '@/types/teams';
import { cn } from '@/lib/utils';

interface MainLayoutSidebarProps {
  sidebarCollapsed: boolean;
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
  onSidebarToggle: () => void;
  onAgentSelect: (agent: Agent | null) => void;
  onTaskSelect: (task: Task | null) => void;
  onMessageSelect: (message: Message | null) => void;
  onTeamSelect: (team: Team | null) => void;
  onAgentProfileSelect: (profile: AgentProfile | null) => void;
}

export const MainLayoutSidebar = ({
  sidebarCollapsed,
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
  onSidebarToggle,
  onAgentSelect,
  onTaskSelect,
  onMessageSelect,
  onTeamSelect,
  onAgentProfileSelect
}: MainLayoutSidebarProps) => {
  return (
    <div className="h-full bg-background/95 backdrop-blur-sm flex flex-col">
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
        collapsed={sidebarCollapsed}
        onToggleCollapse={onSidebarToggle}
        onAgentSelect={onAgentSelect}
        onTaskSelect={onTaskSelect}
        onMessageSelect={onMessageSelect}
        onTeamSelect={onTeamSelect}
        onAgentProfileSelect={onAgentProfileSelect}
      />
    </div>
  );
};
