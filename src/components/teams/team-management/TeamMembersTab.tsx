
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTeams } from '@/contexts/TeamContext';
import { Team, TeamRole } from '@/types/teams';
import { UserMinus, Crown, Plus, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { MemberInvitationDialog } from '../member-management/MemberInvitationDialog';
import { BulkMemberActions } from '../member-management/BulkMemberActions';
import { MemberRemovalDialog } from '../member-management/MemberRemovalDialog';

interface TeamMembersTabProps {
  team: Team;
}

export const TeamMembersTab = ({ team }: TeamMembersTabProps) => {
  const { getTeamMembers, updateAgentProfile, updateTeam } = useTeams();
  const { toast } = useToast();
  const members = getTeamMembers(team.id);
  
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [memberToRemove, setMemberToRemove] = useState<{ id: string; name: string } | null>(null);

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
    
    setMemberToRemove(null);
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

  const handleSelectMember = (memberId: string, selected: boolean) => {
    setSelectedMembers(prev => 
      selected 
        ? [...prev, memberId]
        : prev.filter(id => id !== memberId)
    );
  };

  const handleSelectAll = (selected: boolean) => {
    setSelectedMembers(selected ? members.map(m => m.id) : []);
  };

  const handleBulkRoleChange = (memberIds: string[], newRole: TeamRole) => {
    memberIds.forEach(memberId => {
      updateAgentProfile(memberId, { role: newRole });
    });
    setSelectedMembers([]);
  };

  const handleBulkRemove = (memberIds: string[]) => {
    // Remove from team member list
    const updatedMemberIds = team.memberIds.filter(id => !memberIds.includes(id));
    updateTeam(team.id, { memberIds: updatedMemberIds });
    
    // Clear team assignment from agent profiles
    memberIds.forEach(memberId => {
      updateAgentProfile(memberId, { teamId: "" });
    });
    
    setSelectedMembers([]);
  };

  const handleInviteMembers = (invitations: Array<{ email: string; role: TeamRole }>) => {
    // In a real implementation, this would send invitations via email
    console.log('Sending invitations:', invitations);
    toast({
      title: "Invitations Sent",
      description: `${invitations.length} invitation${invitations.length > 1 ? 's' : ''} sent successfully.`,
    });
  };

  return (
    <div className="space-y-4">
      {/* Header with Add Member Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Team Members ({members.length})</h3>
        <div className="flex gap-2">
          <MemberInvitationDialog teamId={team.id} onInviteMembers={handleInviteMembers}>
            <Button variant="outline" size="sm">
              <Mail className="w-4 h-4 mr-2" />
              Invite Members
            </Button>
          </MemberInvitationDialog>
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Existing Agent
          </Button>
        </div>
      </div>

      {/* Bulk Actions */}
      {members.length > 1 && (
        <BulkMemberActions
          members={members}
          selectedMembers={selectedMembers}
          onSelectMember={handleSelectMember}
          onSelectAll={handleSelectAll}
          onBulkRoleChange={handleBulkRoleChange}
          onBulkRemove={handleBulkRemove}
          teamLeaderId={team.leaderId}
        />
      )}

      {/* Members List */}
      <div className="space-y-3">
        {members.map((member) => {
          const isSelected = selectedMembers.includes(member.id);
          const isLeader = member.id === team.leaderId;
          
          return (
            <Card key={member.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {members.length > 1 && !isLeader && (
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={(checked) => handleSelectMember(member.id, !!checked)}
                      />
                    )}
                    
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{member.name}</h4>
                        {isLeader && (
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
                    
                    {!isLeader && (
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
                      onClick={() => setMemberToRemove({ id: member.id, name: member.name })}
                      className="text-destructive hover:text-destructive"
                    >
                      <UserMinus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
        
        {members.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">No team members yet.</p>
              <MemberInvitationDialog teamId={team.id} onInviteMembers={handleInviteMembers}>
                <Button variant="outline" className="mt-2">
                  Invite First Member
                </Button>
              </MemberInvitationDialog>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Member Removal Dialog */}
      <MemberRemovalDialog
        open={!!memberToRemove}
        onOpenChange={(open) => !open && setMemberToRemove(null)}
        memberName={memberToRemove?.name}
        onConfirm={() => memberToRemove && handleRemoveMember(memberToRemove.id)}
      />
    </div>
  );
};
