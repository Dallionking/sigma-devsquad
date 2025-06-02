
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Team, TeamRole } from '@/types/teams';
import { Shield, Info, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TeamPermissionsTabProps {
  team: Team;
}

interface TeamPermissions {
  canAddMembers: boolean;
  canRemoveMembers: boolean;
  canEditTeamSettings: boolean;
  canManageTasks: boolean;
  canViewAnalytics: boolean;
  canInviteExternal: boolean;
  minimumRoleForManagement: TeamRole;
}

export const TeamPermissionsTab = ({ team }: TeamPermissionsTabProps) => {
  const { toast } = useToast();
  
  const [permissions, setPermissions] = useState<TeamPermissions>({
    canAddMembers: true,
    canRemoveMembers: false,
    canEditTeamSettings: false,
    canManageTasks: true,
    canViewAnalytics: true,
    canInviteExternal: false,
    minimumRoleForManagement: 'lead'
  });

  const [hasChanges, setHasChanges] = useState(false);

  const handlePermissionChange = (key: keyof TeamPermissions, value: boolean | TeamRole) => {
    setPermissions(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // In a real app, this would save to the backend
    setHasChanges(false);
    toast({
      title: "Permissions Updated",
      description: "Team permissions have been saved successfully.",
    });
  };

  const permissionSections = [
    {
      title: "Member Management",
      permissions: [
        {
          key: "canAddMembers" as keyof TeamPermissions,
          label: "Add New Members",
          description: "Allow team members to invite new people to the team"
        },
        {
          key: "canRemoveMembers" as keyof TeamPermissions,
          label: "Remove Members",
          description: "Allow team members to remove others from the team"
        }
      ]
    },
    {
      title: "Team Administration",
      permissions: [
        {
          key: "canEditTeamSettings" as keyof TeamPermissions,
          label: "Edit Team Settings",
          description: "Allow members to modify team name, description, and other settings"
        },
        {
          key: "canInviteExternal" as keyof TeamPermissions,
          label: "Invite External Users",
          description: "Allow inviting users from outside the organization"
        }
      ]
    },
    {
      title: "Project Management",
      permissions: [
        {
          key: "canManageTasks" as keyof TeamPermissions,
          label: "Manage Tasks",
          description: "Create, assign, and modify team tasks and projects"
        },
        {
          key: "canViewAnalytics" as keyof TeamPermissions,
          label: "View Analytics",
          description: "Access team performance metrics and analytics"
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Team Permissions</h3>
          <p className="text-sm text-muted-foreground">
            Configure what team members can do within this team
          </p>
        </div>
        <Button onClick={handleSave} disabled={!hasChanges}>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* Minimum Role Requirement */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Management Role Requirement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <Label>Minimum Role for Team Management</Label>
              <p className="text-sm text-muted-foreground">
                The minimum role required to perform administrative actions
              </p>
            </div>
            <Select
              value={permissions.minimumRoleForManagement}
              onValueChange={(value: TeamRole) => 
                handlePermissionChange('minimumRoleForManagement', value)
              }
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="junior">Junior</SelectItem>
                <SelectItem value="mid">Mid</SelectItem>
                <SelectItem value="senior">Senior</SelectItem>
                <SelectItem value="lead">Lead</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Permission Sections */}
      {permissionSections.map((section) => (
        <Card key={section.title}>
          <CardHeader>
            <CardTitle>{section.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {section.permissions.map((permission) => (
              <div key={permission.key} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={permission.key}>{permission.label}</Label>
                    <Badge variant="outline" className="text-xs">
                      {permissions.minimumRoleForManagement}+
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {permission.description}
                  </p>
                </div>
                <Switch
                  id={permission.key}
                  checked={permissions[permission.key] as boolean}
                  onCheckedChange={(checked) => 
                    handlePermissionChange(permission.key, checked)
                  }
                />
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      {/* Info Banner */}
      <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-100">
                Permission Inheritance
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Team leaders always have full permissions regardless of these settings. 
                These permissions only apply to members with roles below the leader level.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
