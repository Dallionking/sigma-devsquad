
import React, { useState } from 'react';
import { useInputValidation } from '@/hooks/useInputValidation';
import { useAutoSave } from '@/hooks/useAutoSave';
import { useToast } from '@/hooks/use-toast';
import { TeamAvatarUpload } from './team-creation/TeamAvatarUpload';
import { TeamInformationForm } from './team-creation/TeamInformationForm';
import { MemberInvitation } from './team-creation/MemberInvitation';
import { FormActions } from './team-creation/FormActions';
import { TeamCreationData, TeamCreationFormProps, TeamMember } from './team-creation/types';

export const TeamCreationForm = ({ onComplete, onSkip }: TeamCreationFormProps) => {
  const { toast } = useToast();
  const [teamAvatar, setTeamAvatar] = useState<string>('');
  const [teamType, setTeamType] = useState<'human' | 'ai'>('human');
  const [members, setMembers] = useState<TeamMember[]>([]);

  // Form validation
  const teamName = useInputValidation('', {
    rules: { required: true, minLength: 2, maxLength: 50 },
    validateOnChange: true,
    debounceMs: 300
  });

  const teamDescription = useInputValidation('', {
    rules: { required: true, minLength: 10, maxLength: 500 },
    validateOnChange: true,
    debounceMs: 300
  });

  // Combine all form data
  const formData: TeamCreationData = {
    teamName: teamName.value,
    teamDescription: teamDescription.value,
    teamType,
    teamAvatar,
    members
  };

  // Auto-save functionality
  const { forceSave } = useAutoSave(formData, {
    delay: 3000,
    enabled: true,
    showToast: true,
    onSave: async () => {
      localStorage.setItem('team-creation-draft', JSON.stringify(formData));
    }
  });

  // Load saved data on component mount
  React.useEffect(() => {
    const savedData = localStorage.getItem('team-creation-draft');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        teamName.handleChange(parsed.teamName || '');
        teamDescription.handleChange(parsed.teamDescription || '');
        setTeamType(parsed.teamType || 'human');
        setTeamAvatar(parsed.teamAvatar || '');
        setMembers(parsed.members || []);
      } catch (error) {
        console.error('Failed to load saved team data:', error);
      }
    }
  }, []);

  const isFormValid = () => {
    return (
      !teamName.error && teamName.value.trim() &&
      !teamDescription.error && teamDescription.value.trim()
    );
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      toast({
        title: 'Please complete all required fields',
        description: 'Make sure team name and description are filled out correctly.',
        variant: 'destructive'
      });
      return;
    }

    // Clear the draft from localStorage
    localStorage.removeItem('team-creation-draft');
    
    await forceSave();
    onComplete(formData);
  };

  const handleSkipForNow = async () => {
    // Save current progress before skipping
    await forceSave();
    onSkip();
  };

  return (
    <div className="space-y-6">
      <TeamAvatarUpload 
        teamAvatar={teamAvatar}
        onAvatarChange={setTeamAvatar}
      />

      <TeamInformationForm
        teamType={teamType}
        onTeamTypeChange={setTeamType}
        teamNameValidation={teamName}
        teamDescriptionValidation={teamDescription}
      />

      <MemberInvitation
        members={members}
        onMembersChange={setMembers}
      />

      <FormActions
        isFormValid={isFormValid()}
        onSubmit={handleSubmit}
        onSkip={handleSkipForNow}
      />
    </div>
  );
};
