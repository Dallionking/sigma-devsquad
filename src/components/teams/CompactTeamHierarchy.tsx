
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

interface CompactTeamHierarchyProps {
  onTeamSelect: (team: Team) => void;
  onAgentSelect: (agent: AgentProfile) => void;
  selectedTeamId?: string;
  selectedAgentId?: string;
}

export const CompactTeamHierarchy = ({
  onTeamSelect,
  onAgentSelect,
  selectedTeamId,
  selectedAgentId
}: CompactTeamHierarchyProps) => {
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

  return (
    <Card className="h-full relative z-30 bg-card border border-border shadow-sm">
      <CardHeader className="pb-3 relative z-40">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <Users className="w-4 h-4" />
            Teams
          </CardTitle>
          <TeamCreationDialog>
            <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
              <Plus className="w-3 h-3" />
            </Button>
          </TeamCreationDialog>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 relative z-40">
        <div className="space-y-1">
          {teams.map((team) => {
            const isExpanded = expandedTeams.has(team.id);
            const members = getTeamMembers(team.id);
            const isSelected = selectedTeamId === team.id;

            return (
              <div key={team.id} className="border-l-2 border-transparent hover:border-primary/20">
                {/* Team Header */}
                <div 
                  className={cn(
                    "flex items-center justify-between p-2 hover:bg-muted/50 cursor-pointer transition-colors text-sm relative z-50",
                    isSelected && "bg-primary/10 border-l-primary"
                  )}
                  onClick={() => onTeamSelect(team)}
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-5 w-5 p-0"
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
                    
                    <div className="text-sm">{getTeamIcon(team.type)}</div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <h3 className="font-medium truncate text-xs">{team.name}</h3>
                        <Badge 
                          variant="secondary" 
                          className={cn("text-xs px-1 py-0", getStatusColor(team.status))}
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
                  <div className="ml-4 border-l border-border/30 relative z-50">
                    {members.slice(0, 3).map((member) => {
                      const isLeader = member.id === team.leaderId;
                      const isAgentSelected = selectedAgentId === member.id;
                      
                      return (
                        <div
                          key={member.id}
                          className={cn(
                            "flex items-center gap-2 p-1 mx-1 rounded hover:bg-muted/50 cursor-pointer transition-colors relative z-50",
                            isAgentSelected && "bg-primary/10"
                          )}
                          onClick={() => onAgentSelect(member)}
                        >
                          <Avatar className="w-5 h-5">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback className="text-xs">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1">
                              <span className="text-xs font-medium truncate">
                                {member.name}
                              </span>
                              {isLeader && <Crown className="w-3 h-3 text-yellow-500" />}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    
                    {members.length > 3 && (
                      <div className="p-1 mx-1 text-xs text-muted-foreground">
                        +{members.length - 3} more
                      </div>
                    )}
                    
                    {/* Add Member Button */}
                    <div className="p-1 mx-1">
                      <AgentAdditionDialog teamId={team.id}>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full justify-start text-muted-foreground h-6 text-xs"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Add
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
