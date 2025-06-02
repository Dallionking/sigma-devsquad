
import React from 'react';
import { Agent, Task, Message, ViewMode } from "@/types";
import { Team, AgentProfile } from "@/types/teams";
import { FilteredTeamHierarchy } from "../teams/FilteredTeamHierarchy";
import { AgentSidebar } from "./AgentSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Bot, Workflow, MessageSquare, CheckSquare, Mail, Activity } from "lucide-react";

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
      case 'workflow': return 'Active workflows and processes';
      case 'communication': return 'Team communication overview';
      case 'tasks': return 'Task management and tracking';
      case 'messages': return 'Message history and analytics';
      default: return 'Agent status and management';
    }
  };

  console.log('SidebarRenderer:', { showTeamView, collapsed, viewMode });

  if (collapsed) {
    return (
      <div className="w-full h-full flex flex-col items-center py-4 space-y-4">
        {showTeamView ? (
          <div className="p-2 rounded-lg bg-primary/10">
            <Users className="w-6 h-6 text-primary" />
          </div>
        ) : (
          <div className="p-2 rounded-lg bg-primary/10">
            <Activity className="w-6 h-6 text-primary" />
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
            Team Management
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Filter and organize your teams
          </p>
        </div>
        
        <div className="flex-1 overflow-auto">
          <FilteredTeamHierarchy
            onTeamSelect={onTeamSelect}
            onAgentSelect={onAgentProfileSelect}
            selectedTeamId={selectedTeam?.id}
            selectedAgentId={selectedAgentProfile?.id}
            showFilters={true}
          />
        </div>
      </div>
    );
  }

  // Contextual content based on current view mode
  const ViewIcon = getViewModeIcon(viewMode);
  
  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-background to-muted/30">
      <div className="p-4 border-b border-border/50 bg-gradient-to-r from-primary/5 to-secondary/5">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <ViewIcon className="w-5 h-5 text-primary" />
          {viewMode === 'workflow' ? 'Workflow Status' : 'Agent Overview'}
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
      
      {/* Activity Summary - No duplicate navigation */}
      <div className="p-4 border-t border-border/50 bg-muted/30">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Active Agents</span>
            <span className="font-medium text-green-600">
              {agents.filter(a => a.status === 'working').length}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total Agents</span>
            <span className="font-medium">{agents.length}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">System Status</span>
            <span className="font-medium text-green-600 flex items-center gap-1">
              <Activity className="w-3 h-3" />
              Optimal
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
