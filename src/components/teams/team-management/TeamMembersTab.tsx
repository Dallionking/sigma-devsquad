
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Team, TeamRole } from '@/types/teams';
import { useTeams } from '@/contexts/TeamContext';
import { Users, Crown, UserMinus, UserPlus, Search, Mail, MoreHorizontal } from 'lucide-react';
import { AgentAdditionDialog } from '../AgentAdditionDialog';
import { useToast } from '@/hooks/use-toast';

interface TeamMembersTabProps {
  team: Team;
}

export const TeamMembersTab = ({ team }: TeamMembersTabProps) => {
  const { getTeamMembers, updateAgentProfile, updateTeam } = useTeams();
  const { toast } = useToast();
  const members = getTeamMembers(team.id);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<TeamRole | 'all'>('all');

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || member.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleRoleChange = (memberId: string, newRole: TeamRole) => {
    updateAgentProfile(memberId, { role: newRole });
    
    // If promoting to lead, update team leader
    if (newRole === 'lead') {
      updateTeam(team.id, { leaderId: memberId });
    }
    
    toast({
      title: "Role Updated",
      description: "Member role has been updated successfully.",
    });
  };

  const handleRemoveMember = (memberId: string) => {
    updateAgentProfile(memberId, { teamId: "" });
    updateTeam(team.id, {
      memberIds: team.memberIds.filter(id => id !== memberId)
    });
    
    toast({
      title: "Member Removed",
      description: "Member has been removed from the team.",
    });
  };

  const getRoleColor = (role: TeamRole) => {
    switch (role) {
      case 'lead': return 'bg-yellow-100 text-yellow-800';
      case 'senior': return 'bg-blue-100 text-blue-800';
      case 'mid': return 'bg-green-100 text-green-800';
      case 'junior': return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleStats = () => {
    const stats = members.reduce((acc, member) => {
      acc[member.role] = (acc[member.role] || 0) + 1;
      return acc;
    }, {} as Record<TeamRole, number>);
    
    return stats;
  };

  const roleStats = getRoleStats();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Users className="w-5 h-5" />
            Team Members ({members.length})
          </h3>
          <p className="text-sm text-muted-foreground">
            Manage team members and their roles
          </p>
        </div>
        <AgentAdditionDialog teamId={team.id}>
          <Button>
            <UserPlus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        </AgentAdditionDialog>
      </div>

      {/* Role Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Role Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            {(['lead', 'senior', 'mid', 'junior'] as TeamRole[]).map(role => (
              <div key={role} className="text-center">
                <div className="text-2xl font-bold">{roleStats[role] || 0}</div>
                <div className={`text-sm capitalize px-2 py-1 rounded-full inline-block ${getRoleColor(role)}`}>
                  {role}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterRole} onValueChange={(value: TeamRole | 'all') => setFilterRole(value)}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="lead">Lead</SelectItem>
            <SelectItem value="senior">Senior</SelectItem>
            <SelectItem value="mid">Mid</SelectItem>
            <SelectItem value="junior">Junior</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Members List */}
      <div className="space-y-3">
        {filteredMembers.map((member) => (
          <Card key={member.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{member.name}</h4>
                      {member.id === team.leaderId && (
                        <Crown className="w-4 h-4 text-yellow-500" />
                      )}
                      <Badge variant="outline" className={getRoleColor(member.role)}>
                        {member.role}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {member.specialization.replace(/-/g, ' ')}
                    </p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {member.experience}+ years experience
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Rating: {member.performanceRating}/5
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
        
        {filteredMembers.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">
                {searchTerm || filterRole !== 'all' 
                  ? 'No members match your search criteria'
                  : 'No team members yet. Add your first member to get started.'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
