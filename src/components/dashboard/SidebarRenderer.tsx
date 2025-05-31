
import React from 'react';
import { Agent, Task, Message, ViewMode } from "@/types";
import { Team, AgentProfile } from "@/types/teams";
import { AgentSidebar } from "./AgentSidebar";
import { TaskManagement } from "./TaskManagement";
import { CommunicationHistory } from "../communication/CommunicationHistory";
import { CompactTeamHierarchy } from "../teams/CompactTeamHierarchy";
import { cn } from "@/lib/utils";

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
  collapsed?: boolean;
  onToggleCollapse?: () => void;
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
  collapsed = false,
  onToggleCollapse,
  onAgentSelect,
  onTaskSelect,
  onMessageSelect,
  onTeamSelect,
  onAgentProfileSelect,
}: SidebarRendererProps) => {
  
  // In team view, show Compact Team Hierarchy
  if (showTeamView) {
    return (
      <div className={cn(
        "h-full bg-sidebar-background border-r border-sidebar-border transition-all duration-300 overflow-hidden",
        collapsed ? "w-16" : "w-64 sm:w-72 lg:w-80"
      )}>
        <div className={cn(
          "h-full transition-all duration-300",
          collapsed ? "p-2" : "p-3 sm:p-4"
        )}>
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
        <AgentSidebar
          agents={agents}
          selectedAgent={selectedAgent}
          onAgentSelect={onAgentSelect}
          collapsed={collapsed}
          onToggleCollapse={onToggleCollapse}
        />
      );
    case 'communication':
      return (
        <div className={cn(
          "h-full bg-sidebar-background border-r border-sidebar-border transition-all duration-300 overflow-hidden flex flex-col",
          collapsed ? "w-16" : "w-72 sm:w-80 lg:w-96"
        )}>
          <div className={cn(
            "h-full transition-all duration-300 flex flex-col min-h-0",
            collapsed ? "p-2" : "p-0"
          )}>
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
        <div className={cn(
          "h-full bg-sidebar-background border-r border-sidebar-border transition-all duration-300 overflow-hidden flex flex-col",
          collapsed ? "w-16" : "w-72 sm:w-80 lg:w-96"
        )}>
          <div className={cn(
            "h-full transition-all duration-300 flex flex-col min-h-0",
            collapsed ? "p-2" : "p-3 sm:p-4"
          )}>
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
        <div className={cn(
          "h-full bg-sidebar-background border-r border-sidebar-border transition-all duration-300 overflow-hidden flex flex-col",
          collapsed ? "w-16" : "w-72 sm:w-80 lg:w-96"
        )}>
          <div className={cn(
            "h-full transition-all duration-300 flex flex-col min-h-0",
            collapsed ? "p-2" : "p-3 sm:p-4"
          )}>
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
        <AgentSidebar
          agents={agents}
          selectedAgent={selectedAgent}
          onAgentSelect={onAgentSelect}
          collapsed={collapsed}
          onToggleCollapse={onToggleCollapse}
        />
      );
  }
};
