
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useTeams } from "@/contexts/TeamContext";
import { Team, AgentProfile, TeamRole } from "@/types/teams";
import { Settings, Users, Save, Trash2, UserMinus, Crown, RefreshCw } from "lucide-react";
import { AgentAdditionDialog } from "./AgentAdditionDialog";
import { TeamConversionButton } from "./team-conversion/TeamConversionButton";
import { useToast } from "@/hooks/use-toast";

interface TeamSettingsPageProps {
  teamId: string;
}

export const TeamSettingsPage = ({ teamId }: TeamSettingsPageProps) => {
  const { getTeamById, getTeamMembers, updateTeam, updateAgentProfile, deleteTeam } = useTeams();
  const { toast } = useToast();
  const team = getTeamById(teamId);
  const members = getTeamMembers(teamId);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedTeam, setEditedTeam] = useState(team);

  if (!team) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">Team not found</p>
      </div>
    );
  }

  const handleSaveTeam = () => {
    if (editedTeam) {
      updateTeam(teamId, editedTeam);
      setIsEditing(false);
      toast({
        title: "Team Updated",
        description: "Team settings have been saved successfully.",
      });
    }
  };

  const handleMemberRoleChange = (memberId: string, newRole: TeamRole) => {
    updateAgentProfile(memberId, { role: newRole });
    toast({
      title: "Role Updated",
      description: "Member role has been updated successfully.",
    });
  };

  const handleRemoveMember = (memberId: string) => {
    updateAgentProfile(memberId, { teamId: "" });
    updateTeam(teamId, {
      memberIds: team.memberIds.filter(id => id !== memberId)
    });
    toast({
      title: "Member Removed",
      description: "Member has been removed from the team.",
    });
  };

  const handleDeleteTeam = () => {
    if (confirm("Are you sure you want to delete this team? This action cannot be undone.")) {
      deleteTeam(teamId);
      toast({
        title: "Team Deleted",
        description: "Team has been deleted successfully.",
      });
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Team Settings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Team Settings
          </CardTitle>
          <div className="flex gap-2">
            {!isEditing ? (
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
            ) : (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveTeam}>
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="team-name">Team Name</Label>
              <Input
                id="team-name"
                value={editedTeam?.name || ""}
                onChange={(e) => setEditedTeam(prev => prev ? { ...prev, name: e.target.value } : null)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="team-status">Status</Label>
              <Select 
                value={editedTeam?.status || "active"} 
                onValueChange={(value: "active" | "inactive" | "archived") => 
                  setEditedTeam(prev => prev ? { ...prev, status: value } : null)
                }
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="team-description">Description</Label>
            <Textarea
              id="team-description"
              value={editedTeam?.description || ""}
              onChange={(e) => setEditedTeam(prev => prev ? { ...prev, description: e.target.value } : null)}
              disabled={!isEditing}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="team-color">Team Color</Label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                id="team-color"
                value={editedTeam?.color || "#3B82F6"}
                onChange={(e) => setEditedTeam(prev => prev ? { ...prev, color: e.target.value } : null)}
                disabled={!isEditing}
                className="w-12 h-8 rounded border"
              />
              <Input
                value={editedTeam?.color || "#3B82F6"}
                onChange={(e) => setEditedTeam(prev => prev ? { ...prev, color: e.target.value } : null)}
                disabled={!isEditing}
                className="flex-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Type Conversion */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5" />
            Team Type Conversion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Current Team Type</h4>
              <p className="text-sm text-muted-foreground mb-2">
                This team is currently specialized as a <Badge variant="outline" className="capitalize">{team.type}</Badge> team.
              </p>
              <p className="text-sm text-muted-foreground">
                You can convert this team to a different specialization if needed.
              </p>
            </div>
            <TeamConversionButton team={team} />
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Team Members */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Team Members ({members.length})
          </CardTitle>
          <AgentAdditionDialog teamId={teamId}>
            <Button variant="outline">
              Add Member
            </Button>
          </AgentAdditionDialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {members.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
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
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Select 
                    value={member.role} 
                    onValueChange={(value: TeamRole) => handleMemberRoleChange(member.id, value)}
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
            ))}
            
            {members.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No team members yet. Add your first member to get started.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2">
            <Trash2 className="w-5 h-5" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Delete Team</h4>
              <p className="text-sm text-muted-foreground">
                Permanently delete this team and remove all members. This action cannot be undone.
              </p>
            </div>
            <Button variant="destructive" onClick={handleDeleteTeam}>
              Delete Team
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
