
import React from 'react';
import { Agent, Task, Message, ViewMode } from "@/types";
import { Team, AgentProfile } from "@/types/teams";
import { TeamHierarchy } from "../teams/TeamHierarchy";
import { AgentSidebar } from "./AgentSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Bot, Workflow, MessageSquare, CheckSquare, Mail } from "lucide-react";

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

  const getViewModeIcon = (mode: ViewMode) => {
    switch (mode) {
      case 'workflow': return Workflow;
      case 'communication': return MessageSquare;
      case 'tasks': return CheckSquare;
      case 'messages': return Mail;
      default: return Bot;
    }
  };

  const getViewModeDescription = (mode: ViewMode) => {
    switch (mode) {
      case 'workflow': return 'Visual workflow management';
      case 'communication': return 'Team communication hub';
      case 'tasks': return 'Task coordination center';
      case 'messages': return 'Message history & analytics';
      default: return 'Agent management';
    }
  };

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
      <div className="h-full flex flex-col bg-gradient-to-b from-background to-muted/30">
        <div className="p-4 border-b border-border/50 bg-gradient-to-r from-primary/5 to-secondary/5">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
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
  const ViewIcon = getViewModeIcon(viewMode);
  
  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-background to-muted/30">
      <div className="p-4 border-b border-border/50 bg-gradient-to-r from-primary/5 to-secondary/5">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <ViewIcon className="w-5 h-5 text-primary" />
          Agents
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {getViewModeDescription(viewMode)}
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
      
      {/* Quick Stats */}
      <div className="p-4 border-t border-border/50 bg-muted/30">
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="p-2 rounded bg-card/50 border border-border/30">
            <div className="text-lg font-bold text-primary">
              {agents.filter(a => a.status === 'working').length}
            </div>
            <div className="text-xs text-muted-foreground">Active</div>
          </div>
          <div className="p-2 rounded bg-card/50 border border-border/30">
            <div className="text-lg font-bold text-secondary">
              {agents.length}
            </div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
        </div>
      </div>
    </div>
  );
};
