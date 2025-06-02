
import { useState } from 'react';
import { TeamType, TeamComposition } from "@/types/teams";
import { useTeams } from "@/contexts/TeamContext";
import { useToast } from "@/hooks/use-toast";
import { DEFAULT_TEAM_COLORS } from "./constants";

interface TeamFormData {
  name: string;
  type: TeamType | "";
  composition: TeamComposition;
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
    composition: "hybrid",
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
      composition: "hybrid",
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
      const newTeam = createTeam({
        name: formData.name.trim(),
        type: formData.type as TeamType,
        composition: formData.composition,
        description: formData.description.trim(),
        color: formData.color,
        objectives: formData.objectives,
        memberIds: [],
        status: "active",
        kpis: [],
      });

      toast({
        title: "Team Created Successfully!",
        description: `${formData.name} has been created and is ready for team members.`,
      });

      console.log('New team created:', newTeam);
      resetForm();
      onSuccess();
    } catch (error) {
      console.error('Team creation error:', error);
      toast({
        title: "Error Creating Team",
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
