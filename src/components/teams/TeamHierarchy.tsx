
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useTeams } from "@/contexts/TeamContext";
import { Team, AgentProfile } from "@/types/teams";
import { ChevronDown, ChevronRight, Users, Crown, Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { TeamCreationDialog } from "./TeamCreationDialog";
import { AgentAdditionDialog } from "./AgentAdditionDialog";

interface TeamHierarchyProps {
  onTeamSelect: (team: Team) => void;
  onAgentSelect: (agent: AgentProfile) => void;
  selectedTeamId?: string;
  selectedAgentId?: string;
}

export const TeamHierarchy = ({
  onTeamSelect,
  onAgentSelect,
  selectedTeamId,
  selectedAgentId
}: TeamHierarchyProps) => {
  const { teams, getTeamMembers, getAgentProfileById } = useTeams();
  const [expandedTeams, setExpandedTeams] = useState<Set<string>>(new Set());

  const toggleTeamExpansion = (teamId: string) => {
    const newExpanded = new Set(expandedTeams);
    if (newExpanded.has(teamId)) {
      newExpanded.delete(teamId);
    } else {
      newExpanded.add(teamId);
    }
    setExpandedTeams(newExpanded);
  };

  const getTeamIcon = (teamType: string) => {
    const iconMap = {
      frontend: "🎨",
      backend: "⚙️",
      devops: "🚀",
      qa: "🧪",
      data: "📊",
      design: "✨",
      product: "📋"
    };
    return iconMap[teamType as keyof typeof iconMap] || "👥";
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
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="w-5 h-5" />
            Team Hierarchy
          </CardTitle>
          <TeamCreationDialog>
            <Button size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-1" />
              Add Team
            </Button>
          </TeamCreationDialog>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="space-y-1">
          {teams.map((team) => {
            const isExpanded = expandedTeams.has(team.id);
            const members = getTeamMembers(team.id);
            const teamLead = team.leaderId ? getAgentProfileById(team.leaderId) : null;
            const isSelected = selectedTeamId === team.id;

            return (
              <div key={team.id} className="border-l-2 border-transparent hover:border-primary/20">
                {/* Team Header */}
                <div 
                  className={cn(
                    "flex items-center justify-between p-3 hover:bg-muted/50 cursor-pointer transition-colors",
                    isSelected && "bg-primary/10 border-l-primary"
                  )}
                  onClick={() => onTeamSelect(team)}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTeamExpansion(team.id);
                      }}
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </Button>
                    
                    <div className="text-lg">{getTeamIcon(team.type)}</div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium truncate">{team.name}</h3>
                        <Badge 
                          variant="secondary" 
                          className={cn("text-xs", getStatusColor(team.status))}
                        >
                          {team.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {members.length} members
                      </p>
                    </div>
                  </div>
                </div>

                {/* Team Members */}
                {isExpanded && (
                  <div className="ml-6 border-l border-border/30">
                    {members.map((member) => {
                      const isLeader = member.id === team.leaderId;
                      const isAgentSelected = selectedAgentId === member.id;
                      
                      return (
                        <div
                          key={member.id}
                          className={cn(
                            "flex items-center gap-3 p-2 mx-2 rounded hover:bg-muted/50 cursor-pointer transition-colors",
                            isAgentSelected && "bg-primary/10"
                          )}
                          onClick={() => onAgentSelect(member)}
                        >
                          <Avatar className="w-7 h-7">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback className="text-xs">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium truncate">
                                {member.name}
                              </span>
                              {isLeader && getRoleIcon("lead")}
                              {!isLeader && getRoleIcon(member.role)}
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-muted-foreground">
                                {member.specialization.replace(/-/g, ' ')}
                              </span>
                              <div className={cn(
                                "w-2 h-2 rounded-full",
                                member.availability === "available" && "bg-green-500",
                                member.availability === "busy" && "bg-yellow-500",
                                member.availability === "offline" && "bg-gray-500"
                              )} />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    
                    {/* Add Member Button */}
                    <div className="p-2 mx-2">
                      <AgentAdditionDialog teamId={team.id}>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full justify-start text-muted-foreground"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Member
                        </Button>
                      </AgentAdditionDialog>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
