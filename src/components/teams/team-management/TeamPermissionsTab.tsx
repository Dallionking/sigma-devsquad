
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Team, TeamRole } from '@/types/teams';
import { useTeams } from '@/contexts/TeamContext';
import { Shield, Users, Settings, MessageSquare, FileText, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TeamPermission {
  id: string;
  name: string;
  description: string;
  category: 'management' | 'communication' | 'content' | 'administration';
  defaultRoles: TeamRole[];
}

const teamPermissions: TeamPermission[] = [
  // Management permissions
  {
    id: 'invite_members',
    name: 'Invite Members',
    description: 'Can invite new members to the team',
    category: 'management',
    defaultRoles: ['lead', 'senior']
  },
  {
    id: 'remove_members',
    name: 'Remove Members',
    description: 'Can remove members from the team',
    category: 'management',
    defaultRoles: ['lead']
  },
  {
    id: 'manage_roles',
    name: 'Manage Roles',
    description: 'Can change member roles and permissions',
    category: 'management',
    defaultRoles: ['lead']
  },
  {
    id: 'create_tasks',
    name: 'Create Tasks',
    description: 'Can create and assign tasks',
    category: 'management',
    defaultRoles: ['lead', 'senior', 'mid']
  },
  {
    id: 'delete_tasks',
    name: 'Delete Tasks',
    description: 'Can delete tasks',
    category: 'management',
    defaultRoles: ['lead', 'senior']
  },
  
  // Communication permissions
  {
    id: 'send_messages',
    name: 'Send Messages',
    description: 'Can send messages in team channels',
    category: 'communication',
    defaultRoles: ['lead', 'senior', 'mid', 'junior']
  },
  {
    id: 'broadcast_messages',
    name: 'Broadcast Messages',
    description: 'Can send announcements to all team members',
    category: 'communication',
    defaultRoles: ['lead', 'senior']
  },
  {
    id: 'manage_channels',
    name: 'Manage Channels',
    description: 'Can create and manage communication channels',
    category: 'communication',
    defaultRoles: ['lead']
  },
  
  // Content permissions
  {
    id: 'edit_team_info',
    name: 'Edit Team Info',
    description: 'Can modify team name, description, and basic settings',
    category: 'content',
    defaultRoles: ['lead', 'senior']
  },
  {
    id: 'manage_documents',
    name: 'Manage Documents',
    description: 'Can create, edit, and delete team documents',
    category: 'content',
    defaultRoles: ['lead', 'senior', 'mid']
  },
  {
    id: 'view_analytics',
    name: 'View Analytics',
    description: 'Can access team performance analytics',
    category: 'content',
    defaultRoles: ['lead', 'senior']
  },
  
  // Administration permissions
  {
    id: 'team_settings',
    name: 'Team Settings',
    description: 'Can access and modify team settings',
    category: 'administration',
    defaultRoles: ['lead']
  },
  {
    id: 'manage_integrations',
    name: 'Manage Integrations',
    description: 'Can configure external tool integrations',
    category: 'administration',
    defaultRoles: ['lead']
  },
  {
    id: 'archive_team',
    name: 'Archive Team',
    description: 'Can archive or delete the team',
    category: 'administration',
    defaultRoles: ['lead']
  }
];

interface TeamPermissionsTabProps {
  team: Team;
}

export const TeamPermissionsTab = ({ team }: TeamPermissionsTabProps) => {
  const { updateTeam, getTeamMembers } = useTeams();
  const { toast } = useToast();
  const members = getTeamMembers(team.id);
  
  const [permissions, setPermissions] = useState<Record<string, TeamRole[]>>(() => {
    // Initialize with default permissions
    const defaultPermissions: Record<string, TeamRole[]> = {};
    teamPermissions.forEach(permission => {
      defaultPermissions[permission.id] = permission.defaultRoles;
    });
    return defaultPermissions;
  });

  const getCategoryIcon = (category: TeamPermission['category']) => {
    switch (category) {
      case 'management': return Users;
      case 'communication': return MessageSquare;
      case 'content': return FileText;
      case 'administration': return Settings;
    }
  };

  const getCategoryColor = (category: TeamPermission['category']) => {
    switch (category) {
      case 'management': return 'text-blue-600';
      case 'communication': return 'text-green-600';
      case 'content': return 'text-purple-600';
      case 'administration': return 'text-red-600';
    }
  };

  const handlePermissionChange = (permissionId: string, roles: TeamRole[]) => {
    setPermissions(prev => ({
      ...prev,
      [permissionId]: roles
    }));
  };

  const handleSavePermissions = () => {
    updateTeam(team.id, { permissions });
    toast({
      title: "Permissions Updated",
      description: "Team permissions have been saved successfully.",
    });
  };

  const handleResetToDefaults = () => {
    const defaultPermissions: Record<string, TeamRole[]> = {};
    teamPermissions.forEach(permission => {
      defaultPermissions[permission.id] = permission.defaultRoles;
    });
    setPermissions(defaultPermissions);
    toast({
      title: "Permissions Reset",
      description: "All permissions have been reset to default values.",
    });
  };

  const groupedPermissions = teamPermissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, TeamPermission[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Team Permissions
          </h3>
          <p className="text-sm text-muted-foreground">
            Configure what each role can do within the team
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleResetToDefaults}>
            Reset to Defaults
          </Button>
          <Button onClick={handleSavePermissions}>
            Save Permissions
          </Button>
        </div>
      </div>

      {/* Role Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Current Team Roles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {['lead', 'senior', 'mid', 'junior'].map(role => {
              const roleMembers = members.filter(member => member.role === role);
              return (
                <div key={role} className="flex items-center gap-2">
                  <Badge variant="outline" className="capitalize">
                    {role}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {roleMembers.length} member{roleMembers.length !== 1 ? 's' : ''}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Permissions by Category */}
      {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => {
        const Icon = getCategoryIcon(category as TeamPermission['category']);
        const colorClass = getCategoryColor(category as TeamPermission['category']);
        
        return (
          <Card key={category}>
            <CardHeader>
              <CardTitle className={`text-base flex items-center gap-2 ${colorClass}`}>
                <Icon className="w-5 h-5" />
                {category.charAt(0).toUpperCase() + category.slice(1)} Permissions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {categoryPermissions.map((permission) => (
                <div key={permission.id} className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Label className="font-medium">{permission.name}</Label>
                      <p className="text-sm text-muted-foreground">
                        {permission.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2">
                    {(['lead', 'senior', 'mid', 'junior'] as TeamRole[]).map(role => (
                      <div key={role} className="flex items-center space-x-2">
                        <Switch
                          id={`${permission.id}-${role}`}
                          checked={permissions[permission.id]?.includes(role) || false}
                          onCheckedChange={(checked) => {
                            const currentRoles = permissions[permission.id] || [];
                            const updatedRoles = checked
                              ? [...currentRoles, role]
                              : currentRoles.filter(r => r !== role);
                            handlePermissionChange(permission.id, updatedRoles);
                          }}
                        />
                        <Label 
                          htmlFor={`${permission.id}-${role}`}
                          className="text-sm capitalize cursor-pointer"
                        >
                          {role}
                        </Label>
                      </div>
                    ))}
                  </div>
                  
                  {permission !== categoryPermissions[categoryPermissions.length - 1] && (
                    <Separator />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
