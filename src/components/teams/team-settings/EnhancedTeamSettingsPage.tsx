
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useTeams } from '@/contexts/TeamContext';
import { Team } from '@/types/teams';
import { Save, Settings, Bell, Link, Archive } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import { TeamVisibilitySettings, TeamVisibility } from './TeamVisibilitySettings';
import { TeamNotificationSettings, TeamNotificationPreferences } from './TeamNotificationSettings';
import { TeamIntegrationSettings, TeamIntegration } from './TeamIntegrationSettings';
import { TeamArchiveSettings } from './TeamArchiveSettings';

// Import icons for integrations
import { Github, MessageSquare, Calendar, FileText } from 'lucide-react';

interface EnhancedTeamSettingsPageProps {
  teamId: string;
}

export const EnhancedTeamSettingsPage = ({ teamId }: EnhancedTeamSettingsPageProps) => {
  const { getTeamById, updateTeam, deleteTeam } = useTeams();
  const { toast } = useToast();
  const team = getTeamById(teamId);
  
  const [activeTab, setActiveTab] = useState('visibility');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Team settings state
  const [visibility, setVisibility] = useState<TeamVisibility>('private');
  const [notificationPreferences, setNotificationPreferences] = useState<TeamNotificationPreferences>({
    memberJoined: true,
    memberLeft: true,
    taskAssigned: true,
    taskCompleted: true,
    taskOverdue: true,
    newMessage: true,
    mentionInMessage: true,
    teamUpdates: true,
    frequency: 'immediate',
    channels: {
      email: true,
      inApp: true,
      discord: false,
      slack: false
    }
  });

  const [integrations, setIntegrations] = useState<TeamIntegration[]>([
    {
      id: 'github',
      name: 'GitHub',
      description: 'Connect with GitHub repositories for issue tracking and code management',
      icon: Github,
      enabled: false,
      configured: false
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Send notifications and updates to Slack channels',
      icon: MessageSquare,
      enabled: false,
      configured: false
    },
    {
      id: 'discord',
      name: 'Discord',
      description: 'Integrate with Discord for team communication',
      icon: MessageSquare,
      enabled: false,
      configured: false
    },
    {
      id: 'calendar',
      name: 'Calendar',
      description: 'Sync team events and deadlines with calendar applications',
      icon: Calendar,
      enabled: false,
      configured: false
    },
    {
      id: 'docs',
      name: 'Documentation',
      description: 'Connect with documentation platforms for knowledge sharing',
      icon: FileText,
      enabled: false,
      configured: false
    }
  ]);

  useEffect(() => {
    if (team) {
      // Load existing team settings
      const teamExtended = team as any;
      setVisibility(teamExtended.visibility || 'private');
      if (teamExtended.notificationPreferences) {
        setNotificationPreferences(teamExtended.notificationPreferences);
      }
      if (teamExtended.integrations) {
        setIntegrations(teamExtended.integrations);
      }
    }
  }, [team]);

  if (!team) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">Team not found</p>
      </div>
    );
  }

  const handleSaveSettings = () => {
    const updatedTeam = {
      ...team,
      visibility,
      notificationPreferences,
      integrations
    };

    updateTeam(teamId, updatedTeam);
    setHasUnsavedChanges(false);
    
    toast({
      title: "Settings Saved",
      description: "Team settings have been updated successfully.",
    });
  };

  const handleVisibilityChange = (newVisibility: TeamVisibility) => {
    setVisibility(newVisibility);
    setHasUnsavedChanges(true);
  };

  const handleNotificationChange = (newPreferences: TeamNotificationPreferences) => {
    setNotificationPreferences(newPreferences);
    setHasUnsavedChanges(true);
  };

  const handleIntegrationToggle = (integrationId: string, enabled: boolean) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { ...integration, enabled }
        : integration
    ));
    setHasUnsavedChanges(true);
  };

  const handleIntegrationConfigure = (integrationId: string, config: Record<string, any>) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { ...integration, config, configured: true }
        : integration
    ));
    setHasUnsavedChanges(true);
  };

  const handleArchiveTeam = (reason?: string) => {
    updateTeam(teamId, { 
      status: 'archived',
      archiveReason: reason,
      archivedAt: new Date().toISOString()
    });
  };

  const handleDeleteTeam = (confirmationText: string, reason?: string) => {
    deleteTeam(teamId);
  };

  const handleExportTeamData = () => {
    // Implementation for exporting team data
    console.log('Exporting team data for team:', teamId);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Settings className="w-6 h-6" />
            Team Settings
          </h1>
          <p className="text-muted-foreground">
            Manage {team.name} settings and configuration
          </p>
        </div>
        {hasUnsavedChanges && (
          <Button onClick={handleSaveSettings}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="visibility" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Visibility
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Link className="w-4 h-4" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="archive" className="flex items-center gap-2">
            <Archive className="w-4 h-4" />
            Archive
          </TabsTrigger>
        </TabsList>

        <TabsContent value="visibility" className="mt-6">
          <TeamVisibilitySettings
            visibility={visibility}
            onVisibilityChange={handleVisibilityChange}
          />
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <TeamNotificationSettings
            preferences={notificationPreferences}
            onPreferencesChange={handleNotificationChange}
          />
        </TabsContent>

        <TabsContent value="integrations" className="mt-6">
          <TeamIntegrationSettings
            integrations={integrations}
            onIntegrationToggle={handleIntegrationToggle}
            onIntegrationConfigure={handleIntegrationConfigure}
          />
        </TabsContent>

        <TabsContent value="archive" className="mt-6">
          <TeamArchiveSettings
            team={team}
            onArchiveTeam={handleArchiveTeam}
            onDeleteTeam={handleDeleteTeam}
            onExportTeamData={handleExportTeamData}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
