
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTeams } from '@/contexts/TeamContext';
import { Team, TeamRole } from '@/types/teams';
import { UserMinus, Crown, Plus } from 'lucide-react';
import { AgentAdditionDialog } from '../AgentAdditionDialog';
import { useToast } from '@/hooks/use-toast';

interface TeamMembersTabProps {
  team: Team;
}

export const TeamMembersTab = ({ team }: TeamMembersTabProps) => {
  const { getTeamMembers, updateAgentProfile, updateTeam } = useTeams();
  const { toast } = useToast();
  const members = getTeamMembers(team.id);

  const handleRoleChange = (memberId: string, newRole: TeamRole) => {
    updateAgentProfile(memberId, { role: newRole });
    toast({
      title: "Role Updated",
      description: "Member role has been updated successfully.",
    });
  };

  const handleRemoveMember = (memberId: string) => {
    // Remove from team member list
    updateTeam(team.id, {
      memberIds: team.memberIds.filter(id => id !== memberId)
    });
    
    // Clear team assignment from agent profile
    updateAgentProfile(memberId, { teamId: "" });
    
    toast({
      title: "Member Removed",
      description: "Member has been removed from the team.",
    });
  };

  const handlePromoteToLeader = (memberId: string) => {
    updateTeam(team.id, { leaderId: memberId });
    updateAgentProfile(memberId, { role: 'lead' });
    toast({
      title: "Leader Promoted",
      description: "Member has been promoted to team leader.",
    });
  };

  return (
    <div className="space-y-4">
      {/* Add Member Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Team Members ({members.length})</h3>
        <AgentAdditionDialog teamId={team.id}>
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        </AgentAdditionDialog>
      </div>

      {/* Members List */}
      <div className="space-y-3">
        {members.map((member) => (
          <Card key={member.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{member.name}</h4>
                      {member.id === team.leaderId && (
                        <Crown className="w-4 h-4 text-yellow-500" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {member.specialization.replace(/-/g, ' ')}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {member.role}
                      </Badge>
                      <span className={`w-2 h-2 rounded-full ${
                        member.availability === 'available' ? 'bg-green-500' :
                        member.availability === 'busy' ? 'bg-yellow-500' : 'bg-gray-500'
                      }`} />
                      <span className="text-xs text-muted-foreground capitalize">
                        {member.availability}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Select 
                    value={member.role} 
                    onValueChange={(value: TeamRole) => handleRoleChange(member.id, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lead">Lead</SelectItem>
                      <SelectItem value="senior">Senior</SelectItem>
                      <SelectItem value="mid">Mid</SelectItem>
                      <SelectItem value="junior">Junior</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {member.id !== team.leaderId && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePromoteToLeader(member.id)}
                      title="Promote to Leader"
                    >
                      <Crown className="w-4 h-4" />
                    </Button>
                  )}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveMember(member.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <UserMinus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {members.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">No team members yet.</p>
              <AgentAdditionDialog teamId={team.id}>
                <Button variant="outline" className="mt-2">
                  Add First Member
                </Button>
              </AgentAdditionDialog>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
