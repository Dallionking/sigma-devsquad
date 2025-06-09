
import React from 'react';
import { EnhancedTeamSettingsPage } from './team-settings/EnhancedTeamSettingsPage';

interface TeamSettingsPageProps {
  teamId: string;
}

export const TeamSettingsPage = ({ teamId }: TeamSettingsPageProps) => {
  return <EnhancedTeamSettingsPage teamId={teamId} />;
};
