
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { TeamTypeFilters } from './TeamTypeFilters';
import { FilterPresets } from './FilterPresets';
import { TeamComposition, TeamType } from '@/types/teams';
import { Filter, X, Settings } from 'lucide-react';

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
  console.log('TeamFiltersPanel rendered with:', { 
    selectedCompositions, 
    selectedTypes, 
    activeFilterCount 
  });

  return (
    <div className="space-y-4">
      {/* Quick Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Filter Options</span>
        </div>
        {activeFilterCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="h-7 px-2 text-xs"
          >
            <X className="w-3 h-3 mr-1" />
            Clear ({activeFilterCount})
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="p-2 bg-primary/10 rounded border border-primary/20">
          <div className="text-xs font-medium text-primary mb-2">Active Filters:</div>
          <div className="flex flex-wrap gap-1">
            {selectedCompositions.map(comp => (
              <Badge key={comp} variant="default" className="text-xs">
                {comp}
              </Badge>
            ))}
            {selectedTypes.map(type => (
              <Badge key={type} variant="secondary" className="text-xs">
                {type}
              </Badge>
            ))}
          </div>
        </div>
      )}

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
    </div>
  );
};
