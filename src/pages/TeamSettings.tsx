
import { useParams, Navigate } from 'react-router-dom';
import { TeamSettingsPage } from "@/components/teams/TeamSettingsPage";

const TeamSettings = () => {
  const { teamId } = useParams();

  if (!teamId) {
    return <Navigate to="/dashboard" replace />;
  }

  return <TeamSettingsPage teamId={teamId} />;
};

export default TeamSettings;
