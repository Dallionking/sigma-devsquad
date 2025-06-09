
import React from 'react';
import { Users, Plus, Lightbulb, Target } from 'lucide-react';
import { EmptyStateCard } from './EmptyStateCard';

interface TeamsEmptyStateProps {
  onCreateTeam?: () => void;
  onShowSamples?: () => void;
}

export const TeamsEmptyState = ({ onCreateTeam, onShowSamples }: TeamsEmptyStateProps) => {
  const handleViewGuide = () => {
    // Open team organization guide
    window.open('/docs/team-organization', '_blank');
  };

  const tips = [
    "Organize agents by project or domain expertise",
    "Define clear team objectives and goals",
    "Assign team leads for better coordination",
    "Use team dashboards to track progress"
  ];

  return (
    <EmptyStateCard
      icon={Users}
      title="Organize Your AI Workforce"
      description="Create teams to organize your AI agents around specific projects, domains, or objectives. Teams enable better collaboration and streamlined workflow management."
      illustration="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop&crop=center"
      tips={tips}
      action={onCreateTeam ? {
        label: "Create Team",
        onClick: onCreateTeam
      } : undefined}
      secondaryAction={onShowSamples ? {
        label: "View Sample Teams",
        onClick: onShowSamples
      } : undefined}
      tertiaryAction={{
        label: "Organization Guide",
        onClick: handleViewGuide
      }}
    />
  );
};
