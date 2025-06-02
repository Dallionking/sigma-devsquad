
import React from 'react';
import { TeamHierarchy } from './TeamHierarchy';
import { TeamFiltersPanel } from './filters/TeamFiltersPanel';
import { useTeamFilters } from '@/hooks/useTeamFilters';
import { useTeams } from '@/contexts/TeamContext';
import { Team, AgentProfile } from '@/types/teams';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Filter } from 'lucide-react';

interface FilteredTeamHierarchyProps {
  onTeamSelect: (team: Team) => void;
  onAgentSelect: (agent: AgentProfile) => void;
  selectedTeamId?: string;
  selectedAgentId?: string;
  showFilters?: boolean;
}

export const FilteredTeamHierarchy = ({
  onTeamSelect,
  onAgentSelect,
  selectedTeamId,
  selectedAgentId,
  showFilters = true
}: FilteredTeamHierarchyProps) => {
  const { teams } = useTeams();
  const {
    selectedCompositions,
    selectedTypes,
    filteredTeams,
    activeFilterCount,
    setCompositions,
    setTypes,
    clearAllFilters,
    applyPreset
  } = useTeamFilters(teams);

  console.log('FilteredTeamHierarchy rendered:', {
    showFilters,
    activeFilterCount,
    teamsCount: teams.length,
    filteredTeamsCount: filteredTeams.length
  });

  return (
    <div className="h-full flex flex-col space-y-4 p-4">
      {/* Always show filters prominently */}
      {showFilters && (
        <div className="flex-shrink-0">
          <TeamFiltersPanel
            selectedCompositions={selectedCompositions}
            selectedTypes={selectedTypes}
            activeFilterCount={activeFilterCount}
            onCompositionChange={setCompositions}
            onTypeChange={setTypes}
            onClearFilters={clearAllFilters}
            onApplyPreset={applyPreset}
          />
        </div>
      )}
      
      {/* Team Results Summary */}
      <Card className="flex-shrink-0 border-muted">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4" />
            Teams
            {activeFilterCount > 0 && (
              <span className="text-muted-foreground">
                ({filteredTeams.length} of {teams.length})
              </span>
            )}
          </CardTitle>
        </CardHeader>
      </Card>
      
      {/* Team Hierarchy */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <TeamHierarchy
          onTeamSelect={onTeamSelect}
          onAgentSelect={onAgentSelect}
          selectedTeamId={selectedTeamId}
          selectedAgentId={selectedAgentId}
          teams={filteredTeams}
        />
      </div>
    </div>
  );
};
