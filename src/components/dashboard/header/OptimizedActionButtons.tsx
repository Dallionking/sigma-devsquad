
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
    <div className="flex items-center space-x-1">
      {/* Team Settings - Gear icon only */}
      <Button 
        variant="ghost" 
        size="sm"
        onClick={handleOpenTeamSettings}
        className="h-6 w-6 p-0"
      >
        <Settings className="w-3 h-3" />
      </Button>
      
      {/* Notifications */}
      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
        <Bell className="w-3 h-3" />
      </Button>
      
      {/* Help */}
      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
        <HelpCircle className="w-3 h-3" />
      </Button>
      
      {/* Profile */}
      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
        <User className="w-3 h-3" />
      </Button>
    </div>
  );
};
