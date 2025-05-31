
import React from 'react';
import { Agent, Task, Message, ViewMode } from "@/types";
import { Team, AgentProfile } from "@/types/teams";
import { AgentSidebar } from "./AgentSidebar";
import { TaskManagement } from "./TaskManagement";
import { CommunicationHistory } from "../communication/CommunicationHistory";
import { CompactTeamHierarchy } from "../teams/CompactTeamHierarchy";

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
  
  // In team view, show Compact Team Hierarchy
  if (showTeamView) {
    return (
      <div className="h-full bg-card/50 dark:bg-card/50">
        <div className="p-3">
          <CompactTeamHierarchy
            onTeamSelect={onTeamSelect}
            onAgentSelect={onAgentProfileSelect}
            selectedTeamId={selectedTeam?.id}
            selectedAgentId={selectedAgentProfile?.id}
          />
        </div>
      </div>
    );
  }

  // Render content based on view mode for individual view
  switch (viewMode) {
    case 'workflow':
      return (
        <div className="h-full bg-card/50 dark:bg-card/50">
          <AgentSidebar
            agents={agents}
            selectedAgent={selectedAgent}
            onAgentSelect={onAgentSelect}
          />
        </div>
      );
    case 'communication':
      return (
        <div className="h-full bg-card/50 dark:bg-card/50">
          <div className="p-4">
            <CommunicationHistory
              messages={messages}
              selectedMessage={selectedMessage}
              onMessageSelect={onMessageSelect}
            />
          </div>
        </div>
      );
    case 'tasks':
      return (
        <div className="h-full bg-card/50 dark:bg-card/50">
          <div className="p-4">
            <TaskManagement
              tasks={tasks}
              agents={agents}
              selectedTask={selectedTask}
              onTaskSelect={onTaskSelect}
            />
          </div>
        </div>
      );
    case 'messages':
      return (
        <div className="h-full bg-card/50 dark:bg-card/50">
          <div className="p-4">
            <CommunicationHistory
              messages={messages}
              selectedMessage={selectedMessage}
              onMessageSelect={onMessageSelect}
            />
          </div>
        </div>
      );
    default:
      return (
        <div className="h-full bg-card/50 dark:bg-card/50">
          <AgentSidebar
            agents={agents}
            selectedAgent={selectedAgent}
            onAgentSelect={onAgentSelect}
          />
        </div>
      );
  }
};
