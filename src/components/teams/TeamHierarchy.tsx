
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useTeams } from "@/contexts/TeamContext";
import { Team, AgentProfile } from "@/types/teams";
import { ChevronDown, ChevronRight, Users, Crown, Plus, Settings } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { TeamCreationDialog } from "./TeamCreationDialog";
import { AgentAdditionDialog } from "./AgentAdditionDialog";
import { TeamCompositionBadge } from "./TeamCompositionBadge";
import { TeamTypeTooltip } from "./TeamTypeTooltip";
import { TeamManagementModal } from "./TeamManagementModal";
import { getTeamCompositionColor, getTeamTypeIcon } from "@/utils/teamVisualUtils";

interface TeamHierarchyProps {
  onTeamSelect: (team: Team) => void;
  onAgentSelect: (agent: AgentProfile) => void;
  selectedTeamId?: string;
  selectedAgentId?: string;
  teams?: Team[]; // Optional prop to override teams
}

export const TeamHierarchy = ({
  onTeamSelect,
  onAgentSelect,
  selectedTeamId,
  selectedAgentId,
  teams: teamsOverride
}: TeamHierarchyProps) => {
  const { teams: allTeams, getTeamMembers, getAgentProfileById } = useTeams();
  const teams = teamsOverride || allTeams;
  const [expandedTeams, setExpandedTeams] = useState<Set<string>>(new Set());

  console.log('TeamHierarchy Debug:', {
    teamsOverride: !!teamsOverride,
    teamsCount: teams.length,
    teams: teams.map(t => ({ id: t.id, name: t.name }))
  });

  const toggleTeamExpansion = (teamId: string) => {
    const newExpanded = new Set(expandedTeams);
    if (newExpanded.has(teamId)) {
      newExpanded.delete(teamId);
    } else {
      newExpanded.add(teamId);
    }
    setExpandedTeams(newExpanded);
  };

  const getTeamColorClass = (team: Team) => {
    // Use composition-based coloring instead of type-based
    const compositionColors = getTeamCompositionColor(team.composition);
    return compositionColors.gradient;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "inactive": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "archived": return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "lead": return <Crown className="w-3 h-3 text-yellow-500" />;
      case "senior": return <Badge variant="outline" className="text-xs">Sr</Badge>;
      case "mid": return <Badge variant="outline" className="text-xs">Mid</Badge>;
      case "junior": return <Badge variant="outline" className="text-xs">Jr</Badge>;
      default: return null;
    }
  };

  return (
    <div className="h-full p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">
          Teams {teamsOverride && `(${teams.length})`}
        </h3>
        <TeamCreationDialog>
          <Button size="sm" variant="ghost" className="h-6 w-6 p-0" title="Create New Team">
            <Plus className="w-4 h-4" />
          </Button>
        </TeamCreationDialog>
      </div>
      
      {/* Debug: Show if no teams */}
      {teams.length === 0 && (
        <div className="text-center py-8">
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">No teams to display</p>
          <p className="text-xs text-muted-foreground mt-1">
            Create teams to see them here with management options
          </p>
        </div>
      )}
      
      <div className="space-y-2">
        {teams.map((team) => {
          const isExpanded = expandedTeams.has(team.id);
          const members = getTeamMembers(team.id);
          const teamLead = team.leaderId ? getAgentProfileById(team.leaderId) : null;
          const isSelected = selectedTeamId === team.id;

          return (
            <div key={team.id} className="space-y-1">
              {/* Team Card - Fixed layout to prevent button cutoff */}
              <div 
                className={cn(
                  "rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md overflow-hidden",
                  getTeamColorClass(team),
                  isSelected && "ring-2 ring-primary"
                )}
                onClick={() => onTeamSelect(team)}
              >
                <div className="p-3">
                  {/* Main team info row - improved layout */}
                  <div className="flex items-start gap-3 mb-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-5 w-5 p-0 hover:bg-white/20 flex-shrink-0 mt-0.5"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTeamExpansion(team.id);
                      }}
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-3 h-3" />
                      ) : (
                        <ChevronRight className="w-3 h-3" />
                      )}
                    </Button>
                    
                    <div className="text-lg flex-shrink-0">{getTeamTypeIcon(team.type)}</div>
                    
                    {/* Team info - takes available space */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h4 className="font-medium text-sm truncate">{team.name}</h4>
                        <TeamCompositionBadge 
                          composition={team.composition} 
                          size="sm"
                        />
                        <TeamTypeTooltip teamType={team.type} />
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge 
                          variant="secondary" 
                          className={cn("text-xs", getStatusColor(team.status))}
                        >
                          {team.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {members.length} members
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Manage button - separate row to ensure visibility */}
                  <div className="flex justify-end">
                    <TeamManagementModal team={team}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 px-3 text-xs hover:bg-primary/10 border-primary/20"
                        onClick={(e) => e.stopPropagation()}
                        title="Manage Team"
                      >
                        <Settings className="w-3 h-3 mr-1" />
                        Manage
                      </Button>
                    </TeamManagementModal>
                  </div>
                </div>

                {/* Team Members - Expanded */}
                {isExpanded && (
                  <div className="px-3 pb-3">
                    <div className="ml-8 space-y-1">
                      {members.map((member) => {
                        const isLeader = member.id === team.leaderId;
                        const isAgentSelected = selectedAgentId === member.id;
                        
                        return (
                          <div
                            key={member.id}
                            className={cn(
                              "flex items-center gap-2 p-2 rounded hover:bg-white/20 cursor-pointer transition-colors",
                              isAgentSelected && "bg-white/30"
                            )}
                            onClick={(e) => {
                              e.stopPropagation();
                              onAgentSelect(member);
                            }}
                          >
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={member.avatar} />
                              <AvatarFallback className="text-xs">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium truncate">
                                  {member.name}
                                </span>
                                {isLeader && getRoleIcon("lead")}
                                {!isLeader && getRoleIcon(member.role)}
                              </div>
                            </div>
                            
                            <div className={cn(
                              "w-2 h-2 rounded-full flex-shrink-0",
                              member.availability === "available" && "bg-green-500",
                              member.availability === "busy" && "bg-yellow-500", 
                              member.availability === "offline" && "bg-gray-500"
                            )} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
