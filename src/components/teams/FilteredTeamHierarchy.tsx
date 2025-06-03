
import React from 'react';
import { TeamHierarchy } from './TeamHierarchy';
import { TeamFiltersPanel } from './filters/TeamFiltersPanel';
import { useTeamFilters } from '@/hooks/useTeamFilters';
import { useTeams } from '@/contexts/TeamContext';
import { Team, AgentProfile } from '@/types/teams';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Filter, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
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
  const [filtersExpanded, setFiltersExpanded] = useState(false); // Closed by default
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

  console.log('FilteredTeamHierarchy Debug:', {
    showFilters,
    activeFilterCount,
    totalTeams: teams.length,
    filteredTeamsCount: filteredTeams.length,
    filtersExpanded,
    teams: teams.map(t => ({ id: t.id, name: t.name, type: t.type, composition: t.composition }))
  });

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Team Filters Collapsible Section */}
      {showFilters && (
        <div className="flex-shrink-0">
          <Collapsible open={filtersExpanded} onOpenChange={setFiltersExpanded}>
            <CollapsibleTrigger asChild>
              <div className="w-full bg-gradient-to-r from-blue-600/10 to-blue-700/10 border border-blue-300/30 rounded-lg p-4 cursor-pointer hover:from-blue-600/20 hover:to-blue-700/20 transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Filter className="w-5 h-5 text-blue-600" />
                    <span className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                      Team Filters
                    </span>
                    {activeFilterCount > 0 && (
                      <Badge variant="default" className="bg-blue-600 text-white text-xs">
                        {activeFilterCount}
                      </Badge>
                    )}
                  </div>
                  <ChevronDown className={`w-5 h-5 text-blue-600 transition-transform duration-200 ${filtersExpanded ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent className="mt-3">
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
            </CollapsibleContent>
          </Collapsible>
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

      {/* Debug Info - Show if no teams */}
      {teams.length === 0 && (
        <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">No teams found in the system</span>
            </div>
            <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
              Teams need to be created first before they can be managed. Check the team creation functionality.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Show filtered results info */}
      {teams.length > 0 && filteredTeams.length === 0 && activeFilterCount > 0 && (
        <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">No teams match the current filters</span>
            </div>
            <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
              Try clearing some filters or adjusting your selection criteria.
            </p>
          </CardContent>
        </Card>
      )}
      
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
