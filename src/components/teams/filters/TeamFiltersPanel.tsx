
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { TeamTypeFilters } from './TeamTypeFilters';
import { FilterPresets } from './FilterPresets';
import { TeamComposition, TeamType } from '@/types/teams';
import { Filter, X } from 'lucide-react';

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
    <Card className="w-full border-2 border-primary/20 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/30 dark:to-indigo-950/30">
      <CardHeader className="pb-3 bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardTitle className="flex items-center justify-between text-base">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            <span>Team Filters</span>
            {activeFilterCount > 0 && (
              <Badge variant="default" className="text-xs bg-primary">
                {activeFilterCount} active
              </Badge>
            )}
          </div>
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="h-8 px-2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
              Clear All
            </Button>
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
