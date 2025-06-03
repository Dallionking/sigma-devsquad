
import React from 'react';
import { Agent, Task, Message, ViewMode } from "@/types";
import { Team, AgentProfile } from "@/types/teams";
import { FilteredTeamHierarchy } from "../teams/FilteredTeamHierarchy";
import { AgentSidebar } from "./AgentSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Bot, Workflow, MessageSquare, CheckSquare, Mail, Activity, Filter, Settings } from "lucide-react";

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
      <div className="w-full h-full flex flex-col items-center py-4 space-y-4 bg-sidebar-background">
        {showTeamView ? (
          <div className="p-2 rounded-lg bg-sidebar-primary/20 relative">
            <Users className="w-6 h-6 text-sidebar-primary" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-sidebar-primary rounded-full flex items-center justify-center">
              <Filter className="w-2 h-2 text-sidebar-primary-foreground" />
            </div>
          </div>
        ) : (
          <div className="p-2 rounded-lg bg-sidebar-primary/20">
            <Activity className="w-6 h-6 text-sidebar-primary" />
          </div>
        )}
      </div>
    );
  }

  if (showTeamView) {
    return (
      <div className="h-full flex flex-col bg-sidebar-background">
        <div className="p-4 border-b border-sidebar-border bg-sidebar-background">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <Users className="w-5 h-5 text-sidebar-foreground" />
            <span className="text-sidebar-foreground">Team Management</span>
          </h2>
          <p className="text-sm text-sidebar-foreground/70 mt-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Filter and organize your teams below
          </p>
        </div>
        
        <div className="flex-1 overflow-auto p-2">
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
    <div className="h-full flex flex-col bg-sidebar-background">
      <div className="p-4 border-b border-sidebar-border bg-sidebar-background">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <ViewIcon className="w-5 h-5 text-sidebar-foreground" />
          <span className="text-sidebar-foreground">
            {viewMode === 'workflow' ? 'Workflow Status' : 'Agent Overview'}
          </span>
        </h2>
        <p className="text-sm text-sidebar-foreground/70 mt-1">
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
      <div className="p-4 border-t border-sidebar-border bg-sidebar-background">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-sidebar-foreground/70">Active Agents</span>
            <span className="font-medium text-green-600">
              {agents.filter(a => a.status === 'working').length}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-sidebar-foreground/70">Total Agents</span>
            <span className="font-medium text-sidebar-foreground">{agents.length}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-sidebar-foreground/70">System Status</span>
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
