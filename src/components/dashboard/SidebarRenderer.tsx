
import React from 'react';
import { Agent, Task, Message, ViewMode } from "@/types";
import { Team, AgentProfile } from "@/types/teams";
import { TeamHierarchy } from "../teams/TeamHierarchy";
import { AgentSidebar } from "./AgentSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Bot } from "lucide-react";

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
  collapsed: boolean;
  onToggleCollapse: () => void;
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
  collapsed,
  onToggleCollapse,
  onAgentSelect,
  onTaskSelect,
  onMessageSelect,
  onTeamSelect,
  onAgentProfileSelect,
}: SidebarRendererProps) => {

  if (collapsed) {
    return (
      <div className="w-full h-full flex flex-col items-center py-4 space-y-4">
        {showTeamView ? (
          <div className="p-2 rounded-lg bg-primary/10">
            <Users className="w-6 h-6 text-primary" />
          </div>
        ) : (
          <div className="p-2 rounded-lg bg-primary/10">
            <Bot className="w-6 h-6 text-primary" />
          </div>
        )}
      </div>
    );
  }

  if (showTeamView) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-border/50">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <Users className="w-5 h-5" />
            Teams
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and monitor your teams
          </p>
        </div>
        
        <div className="flex-1 overflow-auto">
          <TeamHierarchy
            onTeamSelect={onTeamSelect}
            onAgentSelect={onAgentProfileSelect}
            selectedTeamId={selectedTeam?.id}
            selectedAgentId={selectedAgentProfile?.id}
          />
        </div>
      </div>
    );
  }

  // Individual agents view
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border/50">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <Bot className="w-5 h-5" />
          Agents
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {viewMode === 'workflow' && 'Workflow management'}
          {viewMode === 'communication' && 'Communication hub'}
          {viewMode === 'tasks' && 'Task coordination'}
          {viewMode === 'messages' && 'Message center'}
        </p>
      </div>
      
      <div className="flex-1 overflow-auto">
        <AgentSidebar
          agents={agents}
          selectedAgent={selectedAgent}
          onAgentSelect={onAgentSelect}
          viewMode={viewMode}
        />
      </div>
    </div>
  );
};
