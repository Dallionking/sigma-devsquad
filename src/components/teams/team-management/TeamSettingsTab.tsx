
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useTeams } from '@/contexts/TeamContext';
import { Team, TeamType } from '@/types/teams';
import { Save, X, Edit2, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getTeamTypeIcon } from '@/utils/teamVisualUtils';

interface TeamSettingsTabProps {
  team: Team;
  onClose: () => void;
}

export const TeamSettingsTab = ({ team, onClose }: TeamSettingsTabProps) => {
  const { updateTeam, deleteTeam } = useTeams();
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedTeam, setEditedTeam] = useState(team);
  const [hasChanges, setHasChanges] = useState(false);

  const handleFieldChange = (field: keyof Team, value: any) => {
    setEditedTeam(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    updateTeam(team.id, editedTeam);
    setIsEditing(false);
    setHasChanges(false);
    toast({
      title: "Team Updated",
      description: "Team settings have been saved successfully.",
    });
  };

  const handleCancel = () => {
    setEditedTeam(team);
    setIsEditing(false);
    setHasChanges(false);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this team? This action cannot be undone.")) {
      deleteTeam(team.id);
      onClose();
      toast({
        title: "Team Deleted",
        description: "Team has been deleted successfully.",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Basic Information</CardTitle>
          <div className="flex gap-2">
            {!isEditing ? (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Edit2 className="w-4 h-4 mr-2" />
                Edit
              </Button>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleSave}
                  disabled={!hasChanges}
                >
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
                value={editedTeam.name}
                onChange={(e) => handleFieldChange('name', e.target.value)}
                disabled={!isEditing}
                placeholder="Enter team name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="team-type">Team Type</Label>
              <Select
                value={editedTeam.type}
                onValueChange={(value: TeamType) => handleFieldChange('type', value)}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="frontend">
                    <div className="flex items-center gap-2">
                      <span>🎨</span>
                      Frontend
                    </div>
                  </SelectItem>
                  <SelectItem value="backend">
                    <div className="flex items-center gap-2">
                      <span>⚙️</span>
                      Backend
                    </div>
                  </SelectItem>
                  <SelectItem value="devops">
                    <div className="flex items-center gap-2">
                      <span>🚀</span>
                      DevOps
                    </div>
                  </SelectItem>
                  <SelectItem value="qa">
                    <div className="flex items-center gap-2">
                      <span>🧪</span>
                      QA
                    </div>
                  </SelectItem>
                  <SelectItem value="data">
                    <div className="flex items-center gap-2">
                      <span>📊</span>
                      Data
                    </div>
                  </SelectItem>
                  <SelectItem value="design">
                    <div className="flex items-center gap-2">
                      <span>🎨</span>
                      Design
                    </div>
                  </SelectItem>
                  <SelectItem value="product">
                    <div className="flex items-center gap-2">
                      <span>📋</span>
                      Product
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="team-description">Description</Label>
            <Textarea
              id="team-description"
              value={editedTeam.description}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              disabled={!isEditing}
              rows={3}
              placeholder="Describe the team's purpose and responsibilities"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="team-status">Status</Label>
              <Select
                value={editedTeam.status}
                onValueChange={(value: "active" | "inactive" | "archived") => 
                  handleFieldChange('status', value)
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

            <div className="space-y-2">
              <Label htmlFor="team-color">Team Color</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  id="team-color"
                  value={editedTeam.color}
                  onChange={(e) => handleFieldChange('color', e.target.value)}
                  disabled={!isEditing}
                  className="w-12 h-8 rounded border"
                />
                <Input
                  value={editedTeam.color}
                  onChange={(e) => handleFieldChange('color', e.target.value)}
                  disabled={!isEditing}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Team Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{team.memberIds.length}</div>
              <div className="text-sm text-muted-foreground">Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {team.status === 'active' ? '✓' : '○'}
              </div>
              <div className="text-sm text-muted-foreground">Status</div>
            </div>
            <div className="text-center">
              <div className="text-2xl">{getTeamTypeIcon(team.type)}</div>
              <div className="text-sm text-muted-foreground">Type</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{team.objectives.length}</div>
              <div className="text-sm text-muted-foreground">Objectives</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Delete Team</h4>
              <p className="text-sm text-muted-foreground">
                Permanently delete this team and remove all members. This action cannot be undone.
              </p>
            </div>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Team
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
