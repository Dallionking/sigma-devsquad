
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TeamComposition, TeamType } from '@/types/teams';
import { getTeamCompositionEmoji, getTeamCompositionLabel } from '@/utils/teamVisualUtils';
import { cn } from '@/lib/utils';

interface TeamTypeFiltersProps {
  selectedCompositions: TeamComposition[];
  selectedTypes: TeamType[];
  onCompositionChange: (compositions: TeamComposition[]) => void;
  onTypeChange: (types: TeamType[]) => void;
  onClearFilters: () => void;
  className?: string;
}

export const TeamTypeFilters = ({
  selectedCompositions,
  selectedTypes,
  onCompositionChange,
  onTypeChange,
  onClearFilters,
  className
}: TeamTypeFiltersProps) => {
  const compositionOptions: TeamComposition[] = ['human', 'ai', 'hybrid'];
  const typeOptions: TeamType[] = ['frontend', 'backend', 'devops', 'qa', 'data', 'design', 'product'];

  const hasActiveFilters = selectedCompositions.length > 0 || selectedTypes.length > 0;

  const toggleComposition = (composition: TeamComposition) => {
    const newCompositions = selectedCompositions.includes(composition)
      ? selectedCompositions.filter(c => c !== composition)
      : [...selectedCompositions, composition];
    onCompositionChange(newCompositions);
  };

  const toggleType = (type: TeamType) => {
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type];
    onTypeChange(newTypes);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Quick Filter Buttons */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">Team Composition</h4>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={onClearFilters}>
              Clear All
            </Button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {compositionOptions.map((composition) => {
            const isSelected = selectedCompositions.includes(composition);
            return (
              <Button
                key={composition}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => toggleComposition(composition)}
                className="flex items-center gap-2"
              >
                <span>{getTeamCompositionEmoji(composition)}</span>
                <span>{getTeamCompositionLabel(composition)}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Team Type Filters */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Team Type</h4>
        <div className="flex flex-wrap gap-2">
          {typeOptions.map((type) => {
            const isSelected = selectedTypes.includes(type);
            return (
              <Button
                key={type}
                variant={isSelected ? "secondary" : "outline"}
                size="sm"
                onClick={() => toggleType(type)}
                className="capitalize"
              >
                {type}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Active Filter Indicators */}
      {hasActiveFilters && (
        <div className="space-y-2">
          <h5 className="text-xs font-medium text-muted-foreground">Active Filters</h5>
          <div className="flex flex-wrap gap-1">
            {selectedCompositions.map((composition) => (
              <Badge key={composition} variant="default" className="text-xs">
                {getTeamCompositionEmoji(composition)} {getTeamCompositionLabel(composition)}
              </Badge>
            ))}
            {selectedTypes.map((type) => (
              <Badge key={type} variant="secondary" className="text-xs capitalize">
                {type}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
