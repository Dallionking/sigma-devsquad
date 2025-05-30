
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TeamType } from "@/types/teams";
import { ObjectivesInput } from "./ObjectivesInput";
import { TEAM_TYPES } from "./constants";

interface TeamFormData {
  name: string;
  type: TeamType | "";
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
  const handleTeamTypeChange = (value: string) => {
    onChange("type", value as TeamType);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="team-name">Team Name *</Label>
        <Input
          id="team-name"
          value={data.name}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="Enter team name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="team-type">Team Type *</Label>
        <Select value={data.type} onValueChange={handleTeamTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select team type" />
          </SelectTrigger>
          <SelectContent>
            {TEAM_TYPES.map((teamType) => (
              <SelectItem key={teamType.value} value={teamType.value}>
                {teamType.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="team-description">Description *</Label>
        <Textarea
          id="team-description"
          value={data.description}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Describe the team's purpose and responsibilities"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="team-color">Team Color</Label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            id="team-color"
            value={data.color}
            onChange={(e) => onChange("color", e.target.value)}
            className="w-12 h-8 rounded border"
          />
          <Input
            value={data.color}
            onChange={(e) => onChange("color", e.target.value)}
            placeholder="#3B82F6"
            className="flex-1"
          />
        </div>
      </div>

      <ObjectivesInput
        objectives={data.objectives}
        onChange={(objectives) => onChange("objectives", objectives)}
      />

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
