
import { useState } from 'react';
import { AgentSpecialization, TeamRole } from "@/types/teams";
import { useTeams } from "@/contexts/TeamContext";
import { useToast } from "@/hooks/use-toast";

interface AgentFormData {
  name: string;
  role: TeamRole | "";
  specialization: AgentSpecialization | "";
  experience: number;
  bio: string;
  frameworks: string[];
}

export const useAgentForm = (teamId: string, onSuccess: () => void) => {
  const { createAgentProfile } = useTeams();
  const { toast } = useToast();

  const [formData, setFormData] = useState<AgentFormData>({
    name: "",
    role: "",
    specialization: "",
    experience: 0,
    bio: "",
    frameworks: [],
  });

  const updateField = (field: keyof AgentFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      specialization: "",
      experience: 0,
      bio: "",
      frameworks: [],
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Agent name is required.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.role) {
      toast({
        title: "Validation Error",
        description: "Please select a role.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.specialization) {
      toast({
        title: "Validation Error",
        description: "Please select a specialization.",
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
      createAgentProfile({
        name: formData.name.trim(),
        teamId: teamId,
        role: formData.role as TeamRole,
        specialization: formData.specialization as AgentSpecialization,
        skills: [],
        frameworks: formData.frameworks,
        experience: formData.experience,
        availability: "available",
        performanceRating: 5,
        communicationPreference: "direct",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`,
        bio: formData.bio.trim(),
      });

      toast({
        title: "Member Added",
        description: `${formData.name} has been added to the team.`,
      });

      resetForm();
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add team member. Please try again.",
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
