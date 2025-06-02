
import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTeams } from '@/contexts/TeamContext';

export const TeamSettingsTestButton = () => {
  const navigate = useNavigate();
  const { teams } = useTeams();
  
  const handleOpenSettings = () => {
    // Use the first available team or create a test team ID
    const teamId = teams.length > 0 ? teams[0].id : 'team_1';
    navigate(`/team-settings/${teamId}`);
  };

  return (
    <Button 
      onClick={handleOpenSettings}
      variant="outline"
      size="sm"
      className="flex items-center gap-2"
    >
      <Settings className="w-4 h-4" />
      Test Team Settings
    </Button>
  );
};
