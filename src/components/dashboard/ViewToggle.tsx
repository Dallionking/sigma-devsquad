
import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, User } from 'lucide-react';

interface ViewToggleProps {
  showTeamView: boolean;
  onToggleView: (showTeamView: boolean) => void;
}

export const ViewToggle = ({ showTeamView, onToggleView }: ViewToggleProps) => {
  return (
    <div className="bg-background border-b px-4 py-2">
      <div className="flex items-center gap-2">
        <Button
          variant={showTeamView ? "default" : "outline"}
          size="sm"
          onClick={() => onToggleView(true)}
          className="flex items-center gap-2"
        >
          <Users className="w-4 h-4" />
          Team View
        </Button>
        <Button
          variant={!showTeamView ? "default" : "outline"}
          size="sm"
          onClick={() => onToggleView(false)}
          className="flex items-center gap-2"
        >
          <User className="w-4 h-4" />
          Individual Agents
        </Button>
      </div>
    </div>
  );
};
