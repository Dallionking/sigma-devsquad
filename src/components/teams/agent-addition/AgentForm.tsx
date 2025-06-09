
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AgentSpecialization, TeamRole } from "@/types/teams";
import { Save, X } from "lucide-react";

interface AgentFormData {
  name: string;
  role: TeamRole | "";
  specialization: AgentSpecialization | "";
  experience: number;
  bio: string;
  frameworks: string[];
}

interface AgentFormProps {
  data: AgentFormData;
  onChange: (field: keyof AgentFormData, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const TEAM_ROLES = [
  { value: "lead" as TeamRole, label: "Team Lead" },
  { value: "senior" as TeamRole, label: "Senior" },
  { value: "mid" as TeamRole, label: "Mid-level" },
  { value: "junior" as TeamRole, label: "Junior" },
];

const SPECIALIZATIONS = [
  { value: "ui-ux-designer" as AgentSpecialization, label: "UI/UX Designer" },
  { value: "component-developer" as AgentSpecialization, label: "Component Developer" },
  { value: "react-specialist" as AgentSpecialization, label: "React Specialist" },
  { value: "api-developer" as AgentSpecialization, label: "API Developer" },
  { value: "database-engineer" as AgentSpecialization, label: "Database Engineer" },
  { value: "system-architect" as AgentSpecialization, label: "System Architect" },
  { value: "infrastructure-engineer" as AgentSpecialization, label: "Infrastructure Engineer" },
  { value: "test-engineer" as AgentSpecialization, label: "Test Engineer" },
  { value: "data-engineer" as AgentSpecialization, label: "Data Engineer" },
  { value: "product-manager" as AgentSpecialization, label: "Product Manager" },
];

export const AgentForm = ({ data, onChange, onSubmit, onCancel }: AgentFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="agent-name">Agent Name *</Label>
        <Input
          id="agent-name"
          value={data.name}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="Enter agent name"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="agent-role">Role *</Label>
          <Select value={data.role} onValueChange={(value) => onChange("role", value as TeamRole)}>
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              {TEAM_ROLES.map((role) => (
                <SelectItem key={role.value} value={role.value}>
                  {role.label}
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
            min="0"
            max="20"
            value={data.experience}
            onChange={(e) => onChange("experience", parseInt(e.target.value) || 0)}
            placeholder="0"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="agent-specialization">Specialization *</Label>
        <Select value={data.specialization} onValueChange={(value) => onChange("specialization", value as AgentSpecialization)}>
          <SelectTrigger>
            <SelectValue placeholder="Select specialization" />
          </SelectTrigger>
          <SelectContent>
            {SPECIALIZATIONS.map((spec) => (
              <SelectItem key={spec.value} value={spec.value}>
                {spec.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="agent-bio">Bio</Label>
        <Textarea
          id="agent-bio"
          value={data.bio}
          onChange={(e) => onChange("bio", e.target.value)}
          placeholder="Brief description of the agent's background and expertise..."
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
        <Button type="submit">
          <Save className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </div>
    </form>
  );
};
