
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useTeams } from "@/contexts/TeamContext";
import { Team } from "@/types/teams";
import { ChevronDown, Users, Plus } from "lucide-react";
import { TeamCreationDialog } from "@/components/teams/TeamCreationDialog";

interface TeamSwitcherProps {
  currentTeamId?: string;
  onTeamChange: (teamId: string) => void;
  compact?: boolean;
}

export const TeamSwitcher = ({ currentTeamId, onTeamChange, compact = false }: TeamSwitcherProps) => {
  const { teams, getTeamById } = useTeams();
  const currentTeam = currentTeamId ? getTeamById(currentTeamId) : teams[0];

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

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <Select value={currentTeam?.id || ""} onValueChange={onTeamChange}>
          <SelectTrigger className="w-40">
            <SelectValue>
              {currentTeam ? (
                <div className="flex items-center gap-2">
                  <span>{getTeamIcon(currentTeam.type)}</span>
                  <span className="truncate">{currentTeam.name}</span>
                </div>
              ) : (
                "Select team"
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {teams.map((team) => (
              <SelectItem key={team.id} value={team.id}>
                <div className="flex items-center gap-2">
                  <span>{getTeamIcon(team.type)}</span>
                  <span>{team.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {team.memberIds.length}
                  </Badge>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <TeamCreationDialog>
          <Button size="sm" variant="outline">
            <Plus className="w-4 h-4" />
          </Button>
        </TeamCreationDialog>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">Current Team</h3>
        <TeamCreationDialog>
          <Button size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-1" />
            New Team
          </Button>
        </TeamCreationDialog>
      </div>
      
      {currentTeam && (
        <div className="p-3 border rounded-lg bg-muted/50">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{getTeamIcon(currentTeam.type)}</div>
            <div className="flex-1">
              <h4 className="font-medium">{currentTeam.name}</h4>
              <p className="text-sm text-muted-foreground">
                {currentTeam.memberIds.length} members
              </p>
            </div>
            <Badge variant="secondary">{currentTeam.status}</Badge>
          </div>
        </div>
      )}

      <div className="space-y-1">
        <h4 className="text-sm font-medium text-muted-foreground">Switch Team</h4>
        {teams.map((team) => (
          <Button
            key={team.id}
            variant={team.id === currentTeam?.id ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => onTeamChange(team.id)}
          >
            <span className="mr-2">{getTeamIcon(team.type)}</span>
            <span className="flex-1 text-left">{team.name}</span>
            <Badge variant="outline" className="text-xs">
              {team.memberIds.length}
            </Badge>
          </Button>
        ))}
      </div>
    </div>
  );
};
