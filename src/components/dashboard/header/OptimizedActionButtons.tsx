
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bell, HelpCircle, User, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTeams } from '@/contexts/TeamContext';

export const OptimizedActionButtons = () => {
  const navigate = useNavigate();
  const { teams } = useTeams();

  const handleOpenTeamSettings = () => {
    const teamId = teams.length > 0 ? teams[0].id : 'team_1';
    navigate(`/team-settings/${teamId}`);
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Team Settings Test Button */}
      <Button 
        variant="ghost" 
        size="sm"
        onClick={handleOpenTeamSettings}
        className="hidden sm:flex"
      >
        <Settings className="w-4 h-4" />
        <span className="ml-2 hidden lg:inline">Team Settings</span>
      </Button>
      
      {/* Notifications */}
      <Button variant="ghost" size="sm">
        <Bell className="w-4 h-4" />
      </Button>
      
      {/* Help */}
      <Button variant="ghost" size="sm">
        <HelpCircle className="w-4 h-4" />
      </Button>
      
      {/* Profile */}
      <Button variant="ghost" size="sm">
        <User className="w-4 h-4" />
      </Button>
    </div>
  );
};
