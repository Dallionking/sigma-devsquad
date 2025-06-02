
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { TeamTypeFilters } from './TeamTypeFilters';
import { FilterPresets } from './FilterPresets';
import { TeamComposition, TeamType } from '@/types/teams';
import { Filter } from 'lucide-react';

interface TeamFiltersPanelProps {
  selectedCompositions: TeamComposition[];
  selectedTypes: TeamType[];
  activeFilterCount: number;
  onCompositionChange: (compositions: TeamComposition[]) => void;
  onTypeChange: (types: TeamType[]) => void;
  onClearFilters: () => void;
  onApplyPreset: (compositions: TeamComposition[], types: TeamType[]) => void;
}

export const TeamFiltersPanel = ({
  selectedCompositions,
  selectedTypes,
  activeFilterCount,
  onCompositionChange,
  onTypeChange,
  onClearFilters,
  onApplyPreset
}: TeamFiltersPanelProps) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Filter className="w-4 h-4" />
          Team Filters
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="text-xs">
              {activeFilterCount} active
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <TeamTypeFilters
          selectedCompositions={selectedCompositions}
          selectedTypes={selectedTypes}
          onCompositionChange={onCompositionChange}
          onTypeChange={onTypeChange}
          onClearFilters={onClearFilters}
        />
        
        <Separator />
        
        <FilterPresets
          currentCompositions={selectedCompositions}
          currentTypes={selectedTypes}
          onApplyPreset={onApplyPreset}
        />
      </CardContent>
    </Card>
  );
};
