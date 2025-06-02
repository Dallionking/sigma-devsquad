
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Team, TeamType } from '@/types/teams';
import { getTeamTypeIcon } from '@/utils/teamVisualUtils';
import { useTeams } from '@/contexts/TeamContext';
import { TeamConversionButton } from './TeamConversionButton';
import { RefreshCw, Info, AlertTriangle } from 'lucide-react';

interface TeamConversionManagerProps {
  teams: Team[];
}

export const TeamConversionManager = ({ teams }: TeamConversionManagerProps) => {
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const { teams: allTeams } = useTeams();

  const handleTeamSelection = (teamId: string, checked: boolean) => {
    if (checked) {
      setSelectedTeams(prev => [...prev, teamId]);
    } else {
      setSelectedTeams(prev => prev.filter(id => id !== teamId));
    }
  };

  const getTeamTypeStats = () => {
    const stats = teams.reduce((acc, team) => {
      acc[team.type] = (acc[team.type] || 0) + 1;
      return acc;
    }, {} as Record<TeamType, number>);

    return Object.entries(stats).map(([type, count]) => ({
      type: type as TeamType,
      count
    }));
  };

  const getConversionRecommendations = () => {
    const typeStats = getTeamTypeStats();
    const recommendations = [];

    // Check for imbalances
    const frontendCount = typeStats.find(s => s.type === 'frontend')?.count || 0;
    const backendCount = typeStats.find(s => s.type === 'backend')?.count || 0;
    const qaCount = typeStats.find(s => s.type === 'qa')?.count || 0;

    if (frontendCount > backendCount * 2) {
      recommendations.push({
        type: 'warning',
        message: 'Consider converting some frontend teams to backend for better balance'
      });
    }

    if (qaCount === 0 && teams.length > 3) {
      recommendations.push({
        type: 'info',
        message: 'Consider converting a team to QA to improve quality assurance'
      });
    }

    return recommendations;
  };

  const stats = getTeamTypeStats();
  const recommendations = getConversionRecommendations();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5" />
            Team Conversion Manager
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-3">Team Type Distribution</h4>
            <div className="flex flex-wrap gap-2">
              {stats.map(({ type, count }) => (
                <Badge key={type} variant="outline" className="flex items-center gap-1">
                  <span>{getTeamTypeIcon(type)}</span>
                  <span className="capitalize">{type}</span>
                  <span className="bg-primary/10 px-1 rounded text-xs">{count}</span>
                </Badge>
              ))}
            </div>
          </div>

          {recommendations.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Recommendations</h4>
              {recommendations.map((rec, index) => (
                <Alert key={index}>
                  {rec.type === 'warning' ? (
                    <AlertTriangle className="h-4 w-4" />
                  ) : (
                    <Info className="h-4 w-4" />
                  )}
                  <AlertDescription>{rec.message}</AlertDescription>
                </Alert>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Individual Team Conversions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {teams.map((team) => (
              <div key={team.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id={team.id}
                    checked={selectedTeams.includes(team.id)}
                    onCheckedChange={(checked) => 
                      handleTeamSelection(team.id, checked as boolean)
                    }
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getTeamTypeIcon(team.type)}</span>
                    <div>
                      <h4 className="font-medium">{team.name}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs capitalize">
                          {team.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {team.memberIds.length} members
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <TeamConversionButton team={team} size="sm" />
              </div>
            ))}

            {teams.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No teams available for conversion.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
