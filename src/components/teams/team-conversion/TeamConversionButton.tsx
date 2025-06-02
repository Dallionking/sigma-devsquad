
import React from 'react';
import { Button } from '@/components/ui/button';
import { TeamConversionDialog } from './TeamConversionDialog';
import { Team } from '@/types/teams';
import { RefreshCw } from 'lucide-react';

interface TeamConversionButtonProps {
  team: Team;
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "sm" | "default" | "lg";
}

export const TeamConversionButton = ({ 
  team, 
  variant = "outline", 
  size = "default" 
}: TeamConversionButtonProps) => {
  return (
    <TeamConversionDialog team={team}>
      <Button variant={variant} size={size}>
        <RefreshCw className="w-4 h-4 mr-2" />
        Convert Team Type
      </Button>
    </TeamConversionDialog>
  );
};
