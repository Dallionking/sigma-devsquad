
import { useParams, useSearchParams, Navigate } from 'react-router-dom';
import { TeamSettingsPage } from "@/components/teams/TeamSettingsPage";
import { UnifiedMainLayout } from "@/components/dashboard/layout/UnifiedMainLayout";

const TeamSettings = () => {
  const { teamId } = useParams();
  const [searchParams] = useSearchParams();
  
  // Get teamId from either URL params or search params
  const finalTeamId = teamId || searchParams.get('teamId');

  if (!finalTeamId) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <UnifiedMainLayout>
      <TeamSettingsPage teamId={finalTeamId} />
    </UnifiedMainLayout>
  );
};

export default TeamSettings;
