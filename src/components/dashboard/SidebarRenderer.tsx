
import React from 'react';
import { Button } from "@/components/ui/button";
import { AgentSidebar } from "./AgentSidebar";
import { TeamHierarchy } from "@/components/teams/TeamHierarchy";
import { Agent } from "@/types";
import { Team, AgentProfile } from "@/types/teams";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
      <div className={`transition-all duration-300 border-r bg-background ${
        sidebarCollapsed ? 'w-12' : 'w-80'
      }`}>
        <div className="h-full flex flex-col">
          {/* Team View Header */}
          <div className="flex justify-between items-center p-2 border-b">
            {!sidebarCollapsed && (
              <span className="text-sm font-medium text-muted-foreground">Teams</span>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className="p-1 h-8 w-8"
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </Button>
          </div>
          
          {/* Team Content */}
          <div className="flex-1 overflow-hidden">
            {sidebarCollapsed ? (
              <div className="p-2 flex flex-col items-center space-y-2">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                  <span className="text-xs">👥</span>
                </div>
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-xs">🎨</span>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-xs">⚙️</span>
                </div>
              </div>
            ) : (
              <TeamHierarchy
                onTeamSelect={onTeamSelect}
                onAgentSelect={onAgentProfileSelect}
                selectedTeamId={selectedTeam?.id}
                selectedAgentId={selectedAgentProfile?.id}
              />
            )}
          </div>
        </div>
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
