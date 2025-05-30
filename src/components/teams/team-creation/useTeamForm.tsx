
import { useState } from "react";
import { TeamType } from "@/types/teams";
import { useTeams } from "@/contexts/TeamContext";
import { useToast } from "@/hooks/use-toast";

interface TeamFormData {
  name: string;
  type: TeamType | "";
  description: string;
  color: string;
  objectives: string[];
}

export const useTeamForm = (onSuccess: () => void) => {
  const [formData, setFormData] = useState<TeamFormData>({
    name: "",
    type: "",
    description: "",
    color: "#3B82F6",
    objectives: []
  });

  const { createTeam } = useTeams();
  const { toast } = useToast();

  const updateField = (field: keyof TeamFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      type: "",
      description: "",
      color: "#3B82F6",
      objectives: []
    });
  };

  const validateForm = () => {
    return formData.name.trim() && formData.type && formData.description.trim();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      createTeam({
        name: formData.name.trim(),
        type: formData.type as TeamType,
        description: formData.description.trim(),
        memberIds: [],
        color: formData.color,
        status: "active",
        objectives: formData.objectives,
        kpis: []
      });

      toast({
        title: "Success",
        description: "Team created successfully",
      });

      resetForm();
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create team",
        variant: "destructive"
      });
    }
  };

  return {
    formData,
    updateField,
    handleSubmit,
    resetForm
  };
};
