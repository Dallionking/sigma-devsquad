
import { useState } from "react";
import { TeamRole, AgentSpecialization } from "@/types/teams";
import { useTeams } from "@/contexts/TeamContext";
import { useToast } from "@/hooks/use-toast";

interface AgentFormData {
  name: string;
  role: TeamRole | "";
  specialization: AgentSpecialization | "";
  bio: string;
  frameworks: string[];
  experience: number;
}

export const useAgentForm = (teamId: string, onSuccess: () => void) => {
  const [formData, setFormData] = useState<AgentFormData>({
    name: "",
    role: "",
    specialization: "",
    bio: "",
    frameworks: [],
    experience: 1
  });

  const { createAgentProfile } = useTeams();
  const { toast } = useToast();

  const updateField = (field: keyof AgentFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      specialization: "",
      bio: "",
      frameworks: [],
      experience: 1
    });
  };

  const validateForm = () => {
    return formData.name.trim() && formData.role && formData.specialization && formData.bio.trim();
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
      createAgentProfile({
        name: formData.name.trim(),
        teamId,
        role: formData.role as TeamRole,
        specialization: formData.specialization as AgentSpecialization,
        skills: [],
        frameworks: formData.frameworks,
        experience: formData.experience,
        availability: "available",
        performanceRating: 4.0,
        communicationPreference: "direct",
        avatar: `/avatars/${formData.name.toLowerCase().replace(/\s+/g, '')}.jpg`,
        bio: formData.bio.trim()
      });

      toast({
        title: "Success",
        description: "Agent added to team successfully",
      });

      resetForm();
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add agent to team",
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
