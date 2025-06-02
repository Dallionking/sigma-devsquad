
import React from 'react';
import { TeamHierarchy } from './TeamHierarchy';
import { TeamFiltersPanel } from './filters/TeamFiltersPanel';
import { useTeamFilters } from '@/hooks/useTeamFilters';
import { useTeams } from '@/contexts/TeamContext';
import { Team, AgentProfile } from '@/types/teams';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

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
  const [filtersExpanded, setFiltersExpanded] = useState(true);
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
    <div className="h-full flex flex-col space-y-4">
      {/* Prominent Filter Section */}
      {showFilters && (
        <div className="flex-shrink-0 bg-primary/5 border-2 border-primary/20 rounded-lg">
          <div className="p-3">
            <Button
              variant="ghost"
              onClick={() => setFiltersExpanded(!filtersExpanded)}
              className="w-full flex items-center justify-between text-left hover:bg-primary/10"
            >
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-primary" />
                <span className="font-medium">Team Filters</span>
                {activeFilterCount > 0 && (
                  <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs">
                    {activeFilterCount}
                  </span>
                )}
              </div>
              {filtersExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
            
            {filtersExpanded && (
              <div className="mt-3">
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
          </div>
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
                ({filteredTeams.length} of {teams.length} shown)
              </span>
            )}
            {activeFilterCount === 0 && (
              <span className="text-muted-foreground">
                ({teams.length} total)
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
