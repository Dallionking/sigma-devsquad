
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, ExternalLink } from 'lucide-react';
import { Team } from '@/types/teams';
import { useNavigate } from 'react-router-dom';

interface TeamSettingsTabProps {
  team: Team;
  onClose: () => void;
}

export const TeamSettingsTab = ({ team, onClose }: TeamSettingsTabProps) => {
  const navigate = useNavigate();

  const handleOpenSettings = () => {
    navigate(`/team-settings/${team.id}`);
    onClose();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Team Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Configure advanced team settings including visibility, notifications, integrations, and archive options.
          </p>
          <Button onClick={handleOpenSettings} className="w-full">
            <ExternalLink className="w-4 h-4 mr-2" />
            Open Team Settings
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Team Name</p>
              <p className="text-sm text-muted-foreground">{team.name}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Team Type</p>
              <p className="text-sm text-muted-foreground capitalize">{team.type}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Status</p>
              <p className="text-sm text-muted-foreground capitalize">{team.status}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Members</p>
              <p className="text-sm text-muted-foreground">{team.memberIds.length} members</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
