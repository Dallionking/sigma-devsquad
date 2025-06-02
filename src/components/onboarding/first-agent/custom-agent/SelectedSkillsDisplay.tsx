
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';

interface SelectedSkillsDisplayProps {
  selectedSkills: string[];
  onRemoveSkill: (skill: string) => void;
}

export const SelectedSkillsDisplay = ({ selectedSkills, onRemoveSkill }: SelectedSkillsDisplayProps) => {
  return (
    <div>
      <Label className="text-sm font-medium">Selected Skills & Capabilities ({selectedSkills.length})</Label>
      <div className="flex flex-wrap gap-2 mt-2 min-h-[40px] p-2 border rounded-md bg-muted/30">
        {selectedSkills.length === 0 ? (
          <span className="text-sm text-muted-foreground">No skills selected</span>
        ) : (
          selectedSkills.map((skill) => (
            <Badge 
              key={skill} 
              variant="default" 
              className="cursor-pointer hover:bg-destructive"
              onClick={() => onRemoveSkill(skill)}
            >
              {skill} ×
            </Badge>
          ))
        )}
      </div>
    </div>
  );
};
