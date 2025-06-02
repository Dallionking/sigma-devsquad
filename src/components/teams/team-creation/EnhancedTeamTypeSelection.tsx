
import React from 'react';
import { TeamType } from '@/types/teams';
import { cn } from '@/lib/utils';
import { TeamTypeOptionsGrid } from './TeamTypeOptionsGrid';
import { TeamTypeDetails } from './TeamTypeDetails';

interface EnhancedTeamTypeSelectionProps {
  selectedType: TeamType | "";
  onTypeSelect: (type: TeamType) => void;
  className?: string;
}

export const EnhancedTeamTypeSelection = ({
  selectedType,
  onTypeSelect,
  className
}: EnhancedTeamTypeSelectionProps) => {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold">Choose Your Team Type</h3>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto">
          Select the primary focus area for your team. Each type comes with tailored recommendations.
        </p>
      </div>

      <TeamTypeOptionsGrid
        selectedType={selectedType}
        onTypeSelect={onTypeSelect}
      />

      {selectedType && (
        <TeamTypeDetails selectedType={selectedType} />
      )}
    </div>
  );
};
