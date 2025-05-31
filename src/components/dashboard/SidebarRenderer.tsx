
import React from 'react';
import { AgentSidebar } from "./AgentSidebar";
import { TeamHierarchy } from "@/components/teams/TeamHierarchy";
import { Agent } from "@/types";
import { Team, AgentProfile } from "@/types/teams";

interface SidebarRendererProps {
  showTeamView: boolean;
  sidebarCollapsed: boolean;
  agents: Agent[];
  selectedAgent: Agent | null;
  selectedTeam: Team | null;
  selectedAgentProfile: AgentProfile | null;
  onAgentSelect: (agent: Agent | null) => void;
  onTeamSelect: (team: Team | null) => void;
  onAgentProfileSelect: (profile: AgentProfile | null) => void;
  onToggleCollapse: () => void;
}

export const SidebarRenderer = ({
  showTeamView,
  sidebarCollapsed,
  agents,
  selectedAgent,
  selectedTeam,
  selectedAgentProfile,
  onAgentSelect,
  onTeamSelect,
  onAgentProfileSelect,
  onToggleCollapse,
}: SidebarRendererProps) => {
  if (showTeamView) {
    return (
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-80'}`}>
        <TeamHierarchy
          onTeamSelect={onTeamSelect}
          onAgentSelect={onAgentProfileSelect}
          selectedTeamId={selectedTeam?.id}
          selectedAgentId={selectedAgentProfile?.id}
        />
      </div>
    );
  } else {
    return (
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
        <AgentSidebar 
          agents={agents}
          selectedAgent={selectedAgent}
          onAgentSelect={onAgentSelect}
          collapsed={sidebarCollapsed}
          onToggleCollapse={onToggleCollapse}
        />
      </div>
    );
  }
};
