
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TeamType, TeamComposition } from '@/types/teams';
import { DEFAULT_TEAM_COLORS } from './constants';

interface TeamFormData {
  name: string;
  type: TeamType | "";
  composition: TeamComposition;
  description: string;
  color: string;
  objectives: string[];
}

interface TeamFormProps {
  data: TeamFormData;
  onChange: (field: keyof TeamFormData, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export const TeamForm = ({ data, onChange, onSubmit, onCancel }: TeamFormProps) => {
  const teamTypes: { value: TeamType; label: string }[] = [
    { value: 'frontend', label: 'Frontend Development' },
    { value: 'backend', label: 'Backend Development' },
    { value: 'devops', label: 'DevOps & Infrastructure' },
    { value: 'qa', label: 'Quality Assurance' },
    { value: 'data', label: 'Data & Analytics' },
    { value: 'design', label: 'Design & UX' },
    { value: 'product', label: 'Product Management' },
  ];

  const compositionTypes: { value: TeamComposition; label: string; description: string }[] = [
    { value: 'human', label: 'Human Team', description: 'Traditional human-only team' },
    { value: 'ai', label: 'AI Team', description: 'AI agents working together' },
    { value: 'hybrid', label: 'Hybrid Team', description: 'Mix of humans and AI agents' },
  ];

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Team Name</Label>
        <Input
          id="name"
          value={data.name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="Enter team name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Team Type</Label>
        <Select value={data.type} onValueChange={(value) => onChange('type', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select team type" />
          </SelectTrigger>
          <SelectContent>
            {teamTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="composition">Team Composition</Label>
        <Select value={data.composition} onValueChange={(value) => onChange('composition', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select team composition" />
          </SelectTrigger>
          <SelectContent>
            {compositionTypes.map((comp) => (
              <SelectItem key={comp.value} value={comp.value}>
                <div className="flex flex-col">
                  <span>{comp.label}</span>
                  <span className="text-xs text-muted-foreground">{comp.description}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={data.description}
          onChange={(e) => onChange('description', e.target.value)}
          placeholder="Describe the team's purpose and responsibilities"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="color">Team Color</Label>
        <div className="flex gap-2 flex-wrap">
          {DEFAULT_TEAM_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              className={`w-8 h-8 rounded-full border-2 ${
                data.color === color ? 'border-foreground' : 'border-muted'
              }`}
              style={{ backgroundColor: color }}
              onClick={() => onChange('color', color)}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Create Team
        </Button>
      </div>
    </form>
  );
};
