
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
  const [filtersExpanded, setFiltersExpanded] = useState(false);
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
    <div className="h-full flex flex-col space-y-6 w-full max-w-none">
      {/* Team Filters Collapsible Section - Standardized Colors */}
      {showFilters && (
        <div className="flex-shrink-0">
          <Collapsible open={filtersExpanded} onOpenChange={setFiltersExpanded}>
            <CollapsibleTrigger asChild>
              <div className="w-full bg-sidebar-accent border border-sidebar-border rounded-lg p-5 cursor-pointer hover:bg-sidebar-accent/80 transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Filter className="w-5 h-5 text-sidebar-foreground" />
                    <span className="text-lg font-semibold text-sidebar-foreground">
                      Team Filters
                    </span>
                    {activeFilterCount > 0 && (
                      <Badge variant="default" className="bg-sidebar-primary text-sidebar-primary-foreground text-sm">
                        {activeFilterCount}
                      </Badge>
                    )}
                  </div>
                  <ChevronDown className={`w-5 h-5 text-sidebar-foreground transition-transform duration-200 ${filtersExpanded ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent className="mt-4">
              <div className="bg-card border rounded-lg p-5 shadow-sm">
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
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-3 text-base">
            <Users className="w-5 h-5" />
            <span>Teams</span>
            {activeFilterCount > 0 ? (
              <span className="text-muted-foreground font-normal text-sm">
                ({filteredTeams.length} of {teams.length} shown)
              </span>
            ) : (
              <span className="text-muted-foreground font-normal text-sm">
                ({teams.length} total)
              </span>
            )}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Debug Info - Show if no teams */}
      {teams.length === 0 && (
        <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/50">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 text-amber-800 dark:text-amber-200">
              <AlertCircle className="w-5 h-5" />
              <span className="text-base font-medium">No teams found in the system</span>
            </div>
            <p className="text-sm text-amber-700 dark:text-amber-300 mt-2">
              Teams need to be created first before they can be managed. Check the team creation functionality.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Show filtered results info */}
      {teams.length > 0 && filteredTeams.length === 0 && activeFilterCount > 0 && (
        <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/50">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 text-amber-800 dark:text-amber-200">
              <AlertCircle className="w-5 h-5" />
              <span className="text-base font-medium">No teams match the current filters</span>
            </div>
            <p className="text-sm text-amber-700 dark:text-amber-300 mt-2">
              Try clearing some filters or adjusting your selection criteria.
            </p>
          </CardContent>
        </Card>
      )}
      
      {/* Team Hierarchy */}
      <div className="flex-1 min-h-0 overflow-hidden w-full">
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
