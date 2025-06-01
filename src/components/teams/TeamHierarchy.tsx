
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

  const getTeamColorClass = (teamType: string) => {
    const colorMap = {
      frontend: "bg-gradient-to-r from-orange-50 to-red-50 border-orange-200 dark:from-orange-950 dark:to-red-950 dark:border-orange-800",
      backend: "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 dark:from-blue-950 dark:to-indigo-950 dark:border-blue-800",
      devops: "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 dark:from-purple-950 dark:to-pink-950 dark:border-purple-800",
      qa: "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 dark:from-green-950 dark:to-emerald-950 dark:border-green-800",
      data: "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200 dark:from-yellow-950 dark:to-amber-950 dark:border-yellow-800",
      design: "bg-gradient-to-r from-pink-50 to-rose-50 border-pink-200 dark:from-pink-950 dark:to-rose-950 dark:border-pink-800",
      product: "bg-gradient-to-r from-slate-50 to-gray-50 border-slate-200 dark:from-slate-950 dark:to-gray-950 dark:border-slate-800"
    };
    return colorMap[teamType as keyof typeof colorMap] || "bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200";
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
        <h3 className="text-sm font-medium text-muted-foreground">Teams</h3>
        <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="space-y-2">
        {teams.map((team) => {
          const isExpanded = expandedTeams.has(team.id);
          const members = getTeamMembers(team.id);
          const teamLead = team.leaderId ? getAgentProfileById(team.leaderId) : null;
          const isSelected = selectedTeamId === team.id;

          return (
            <div key={team.id} className="space-y-1">
              {/* Team Card */}
              <div 
                className={cn(
                  "rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md",
                  getTeamColorClass(team.type),
                  isSelected && "ring-2 ring-primary"
                )}
                onClick={() => onTeamSelect(team)}
              >
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-5 w-5 p-0 hover:bg-white/20"
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
                      
                      <div className="text-lg">{getTeamIcon(team.type)}</div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-sm truncate">{team.name}</h4>
                          <Badge 
                            variant="secondary" 
                            className={cn("text-xs", getStatusColor(team.status))}
                          >
                            {team.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {members.length} members
                        </p>
                      </div>
                    </div>
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
