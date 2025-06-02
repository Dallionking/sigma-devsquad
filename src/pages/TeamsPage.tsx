
import React, { useState } from 'react';
import { useTeams } from '@/contexts/TeamContext';
import { TeamHierarchy } from '@/components/teams/TeamHierarchy';
import { TeamCreationDialog } from '@/components/teams/TeamCreationDialog';
import { Button } from '@/components/ui/button';
import { Plus, Users } from 'lucide-react';
import { Team, AgentProfile } from '@/types/teams';

export const TeamsPage = () => {
  const { teams } = useTeams();
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<AgentProfile | null>(null);

  const handleTeamSelect = (team: Team) => {
    setSelectedTeam(team);
    setSelectedAgent(null);
  };

  const handleAgentSelect = (agent: AgentProfile) => {
    setSelectedAgent(agent);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Teams</h1>
            <p className="text-muted-foreground">
              Manage your teams and view team type information with detailed tooltips
            </p>
          </div>
        </div>
        
        <TeamCreationDialog>
          <Button size="lg">
            <Plus className="w-5 h-5 mr-2" />
            Create Team
          </Button>
        </TeamCreationDialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Hierarchy */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg border h-[calc(100vh-200px)]">
            <TeamHierarchy
              onTeamSelect={handleTeamSelect}
              onAgentSelect={handleAgentSelect}
              selectedTeamId={selectedTeam?.id}
              selectedAgentId={selectedAgent?.id}
            />
          </div>
        </div>

        {/* Team Details Panel */}
        <div className="bg-card rounded-lg border p-6">
          {selectedTeam ? (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">{selectedTeam.name}</h3>
              <p className="text-muted-foreground">{selectedTeam.description}</p>
              
              <div className="space-y-2">
                <h4 className="font-medium">Team Details</h4>
                <div className="text-sm space-y-1">
                  <p><span className="font-medium">Type:</span> {selectedTeam.type}</p>
                  <p><span className="font-medium">Composition:</span> {selectedTeam.composition}</p>
                  <p><span className="font-medium">Status:</span> {selectedTeam.status}</p>
                  <p><span className="font-medium">Members:</span> {selectedTeam.memberIds.length}</p>
                </div>
              </div>

              {selectedAgent && (
                <div className="pt-4 border-t space-y-2">
                  <h4 className="font-medium">Selected Member</h4>
                  <div className="text-sm space-y-1">
                    <p><span className="font-medium">Name:</span> {selectedAgent.name}</p>
                    <p><span className="font-medium">Role:</span> {selectedAgent.role}</p>
                    <p><span className="font-medium">Availability:</span> {selectedAgent.availability}</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Select a team to view details</p>
              <p className="text-sm mt-2">
                Hover over team type icons to see detailed tooltips with capabilities and use cases
              </p>
            </div>
          )}
        </div>
      </div>

      {teams.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-xl font-semibold mb-2">No teams yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first team to get started. Each team type has detailed tooltips explaining their capabilities.
          </p>
          <TeamCreationDialog>
            <Button size="lg">
              <Plus className="w-5 h-5 mr-2" />
              Create Your First Team
            </Button>
          </TeamCreationDialog>
        </div>
      )}
    </div>
  );
};
