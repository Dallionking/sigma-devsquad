
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { TeamRole, AgentSpecialization } from "@/types/teams";
import { FrameworksInput } from "./FrameworksInput";
import { TEAM_ROLES, AGENT_SPECIALIZATIONS } from "./constants";

interface AgentFormData {
  name: string;
  role: TeamRole | "";
  specialization: AgentSpecialization | "";
  bio: string;
  frameworks: string[];
  experience: number;
}

interface AgentFormProps {
  data: AgentFormData;
  onChange: (field: keyof AgentFormData, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export const AgentForm = ({ data, onChange, onSubmit, onCancel }: AgentFormProps) => {
  const handleRoleChange = (value: string) => {
    onChange('role', value as TeamRole);
  };

  const handleSpecializationChange = (value: string) => {
    onChange('specialization', value as AgentSpecialization);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="agent-name">Name *</Label>
        <Input
          id="agent-name"
          value={data.name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="Enter agent name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="agent-role">Role *</Label>
        <Select value={data.role} onValueChange={handleRoleChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            {TEAM_ROLES.map((r) => (
              <SelectItem key={r.value} value={r.value}>
                {r.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="agent-specialization">Specialization *</Label>
        <Select value={data.specialization} onValueChange={handleSpecializationChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select specialization" />
          </SelectTrigger>
          <SelectContent>
            {AGENT_SPECIALIZATIONS.map((spec) => (
              <SelectItem key={spec.value} value={spec.value}>
                {spec.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="agent-experience">Experience (years)</Label>
        <Input
          id="agent-experience"
          type="number"
          min="1"
          max="20"
          value={data.experience}
          onChange={(e) => onChange('experience', Number(e.target.value))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="agent-bio">Bio *</Label>
        <Textarea
          id="agent-bio"
          value={data.bio}
          onChange={(e) => onChange('bio', e.target.value)}
          placeholder="Describe the agent's background and expertise"
          rows={3}
        />
      </div>

      <FrameworksInput
        frameworks={data.frameworks}
        onChange={(frameworks) => onChange('frameworks', frameworks)}
      />

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Add Agent
        </Button>
      </div>
    </form>
  );
};
