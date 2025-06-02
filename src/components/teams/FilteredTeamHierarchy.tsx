
import React from 'react';
import { TeamHierarchy } from './TeamHierarchy';
import { TeamFiltersPanel } from './filters/TeamFiltersPanel';
import { useTeamFilters } from '@/hooks/useTeamFilters';
import { useTeams } from '@/contexts/TeamContext';
import { Team, AgentProfile } from '@/types/teams';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
    filteredTeamsCount: filteredTeams.length,
    filtersExpanded
  });

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Always Visible Filter Header */}
      {showFilters && (
        <div className="flex-shrink-0">
          {/* Filter Status Bar - Always Visible */}
          <div className="bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  Team Filters
                </span>
                {activeFilterCount > 0 && (
                  <Badge variant="default" className="bg-blue-600 text-white">
                    {activeFilterCount} active
                  </Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFiltersExpanded(!filtersExpanded)}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
              >
                {filtersExpanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </Button>
            </div>
            
            {/* Quick Filter Status */}
            {activeFilterCount > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {selectedCompositions.length > 0 && (
                  <Badge variant="outline" className="text-xs">
                    {selectedCompositions.length} composition{selectedCompositions.length > 1 ? 's' : ''}
                  </Badge>
                )}
                {selectedTypes.length > 0 && (
                  <Badge variant="outline" className="text-xs">
                    {selectedTypes.length} type{selectedTypes.length > 1 ? 's' : ''}
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="h-6 px-2 text-xs text-muted-foreground hover:text-destructive"
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>

          {/* Expandable Filter Panel */}
          {filtersExpanded && (
            <div className="bg-card border rounded-lg p-4 shadow-sm">
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
      )}
      
      {/* Team Results Summary */}
      <Card className="flex-shrink-0 border-muted">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4" />
            <span>Teams</span>
            {activeFilterCount > 0 ? (
              <span className="text-muted-foreground font-normal">
                ({filteredTeams.length} of {teams.length} shown)
              </span>
            ) : (
              <span className="text-muted-foreground font-normal">
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
