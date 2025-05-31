
import React from 'react';
import { Agent, Task, Message, ViewMode } from "@/types";
import { Team, AgentProfile } from "@/types/teams";
import { AgentSidebar } from "./AgentSidebar";
import { TaskManagement } from "./TaskManagement";
import { CommunicationHistory } from "../communication/CommunicationHistory";
import { TeamDashboard } from "../teams/TeamDashboard";

interface SidebarRendererProps {
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
}

export const SidebarRenderer = ({
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
}: SidebarRendererProps) => {
  
  // Render team view if enabled
  if (showTeamView) {
    return (
      <TeamDashboard
        team={selectedTeam}
        selectedAgentProfile={selectedAgentProfile}
        onTeamSelect={onTeamSelect}
        onAgentProfileSelect={onAgentProfileSelect}
      />
    );
  }

  // Render content based on view mode - NO SYNC COMPONENTS
  switch (viewMode) {
    case 'workflow':
      return (
        <AgentSidebar
          agents={agents}
          selectedAgent={selectedAgent}
          onAgentSelect={onAgentSelect}
        />
      );
    case 'communication':
      return (
        <CommunicationHistory
          messages={messages}
          selectedMessage={selectedMessage}
          onMessageSelect={onMessageSelect}
        />
      );
    case 'tasks':
      return (
        <TaskManagement
          tasks={tasks}
          agents={agents}
          selectedTask={selectedTask}
          onTaskSelect={onTaskSelect}
        />
      );
    case 'messages':
      return (
        <CommunicationHistory
          messages={messages}
          selectedMessage={selectedMessage}
          onMessageSelect={onMessageSelect}
        />
      );
    default:
      return (
        <AgentSidebar
          agents={agents}
          selectedAgent={selectedAgent}
          onAgentSelect={onAgentSelect}
        />
      );
  }
};
