
import { useState } from 'react';
import { TeamType } from "@/types/teams";
import { useTeams } from "@/contexts/TeamContext";
import { useToast } from "@/hooks/use-toast";
import { DEFAULT_TEAM_COLORS } from "./constants";

interface TeamFormData {
  name: string;
  type: TeamType | "";
  description: string;
  color: string;
  objectives: string[];
}

export const useTeamForm = (onSuccess: () => void) => {
  const { createTeam } = useTeams();
  const { toast } = useToast();

  const [formData, setFormData] = useState<TeamFormData>({
    name: "",
    type: "",
    description: "",
    color: DEFAULT_TEAM_COLORS[0],
    objectives: [],
  });

  const updateField = (field: keyof TeamFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      type: "",
      description: "",
      color: DEFAULT_TEAM_COLORS[0],
      objectives: [],
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Team name is required.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.type) {
      toast({
        title: "Validation Error",
        description: "Please select a team type.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.description.trim()) {
      toast({
        title: "Validation Error",
        description: "Team description is required.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      createTeam({
        name: formData.name.trim(),
        type: formData.type as TeamType,
        description: formData.description.trim(),
        color: formData.color,
        objectives: formData.objectives,
        memberIds: [],
        status: "active",
        kpis: [], // Add the missing kpis property with empty array as default
      });

      toast({
        title: "Team Created",
        description: `${formData.name} has been created successfully.`,
      });

      resetForm();
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create team. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    formData,
    updateField,
    handleSubmit,
    resetForm,
  };
};
