
import { useState } from 'react';
import { TeamType, TeamComposition } from "@/types/teams";
import { useTeams } from "@/contexts/TeamContext";
import { useToast } from "@/hooks/use-toast";
import { DEFAULT_TEAM_COLORS } from "./constants";

interface TeamGoal {
  id: string;
  title: string;
  description: string;
  category: 'performance' | 'delivery' | 'quality' | 'growth' | 'collaboration';
  priority: 'high' | 'medium' | 'low';
  timeline: string;
}

interface TeamFormData {
  name: string;
  type: TeamType | "";
  composition: TeamComposition;
  description: string;
  color: string;
  objectives: string[];
  avatar: string;
  goals: TeamGoal[];
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
    avatar: "",
    goals: [],
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
      avatar: "",
      goals: [],
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
      // Convert goals to objectives format for backward compatibility
      const goalObjectives = formData.goals.map(goal => goal.title);
      const allObjectives = [...formData.objectives, ...goalObjectives];

      const newTeam = createTeam({
        name: formData.name.trim(),
        type: formData.type as TeamType,
        composition: formData.composition,
        description: formData.description.trim(),
        color: formData.color,
        objectives: allObjectives,
        memberIds: [],
        status: "active",
        kpis: [],
        // Store additional wizard data in metadata (if your Team type supports it)
        ...(formData.avatar && { avatar: formData.avatar }),
        ...(formData.goals.length > 0 && { goals: formData.goals }),
      });

      toast({
        title: "Team Created Successfully!",
        description: `${formData.name} has been created with ${formData.goals.length} goals and is ready for team members.`,
      });

      console.log('New team created with wizard data:', newTeam);
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
