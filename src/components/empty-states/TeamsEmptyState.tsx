
import React from 'react';
import { Users, Plus, Lightbulb } from 'lucide-react';
import { EmptyStateCard } from './EmptyStateCard';

interface TeamsEmptyStateProps {
  onCreateTeam?: () => void;
  onShowSamples?: () => void;
}

export const TeamsEmptyState = ({ onCreateTeam, onShowSamples }: TeamsEmptyStateProps) => {
  return (
    <EmptyStateCard
      icon={Users}
      title="No teams created"
      description="Teams help organize your AI agents around specific projects or domains. Create your first team to get started with collaborative development."
      action={onCreateTeam ? {
        label: "Create Team",
        onClick: onCreateTeam
      } : undefined}
      secondaryAction={onShowSamples ? {
        label: "View sample teams",
        onClick: onShowSamples
      } : undefined}
    />
  );
};
