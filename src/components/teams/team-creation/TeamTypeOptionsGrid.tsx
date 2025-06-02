
import React from 'react';
import { TeamType } from '@/types/teams';
import { TeamTypeOption } from './TeamTypeOption';
import { teamTypeOptions } from './teamTypeData';

interface TeamTypeOptionsGridProps {
  selectedType: TeamType | "";
  onTypeSelect: (type: TeamType) => void;
}

export const TeamTypeOptionsGrid = ({ selectedType, onTypeSelect }: TeamTypeOptionsGridProps) => {
  return (
    <div className="space-y-3">
      {teamTypeOptions.map((option) => (
        <TeamTypeOption
          key={option.type}
          option={option}
          isSelected={selectedType === option.type}
          onSelect={onTypeSelect}
        />
      ))}
    </div>
  );
};
