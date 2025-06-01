
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { TooltipWrapper } from './tooltips/TooltipWrapper';
import { TeamAvatarUpload } from './team-creation/TeamAvatarUpload';
import { TeamInformationForm } from './team-creation/TeamInformationForm';
import { MemberInvitation } from './team-creation/MemberInvitation';
import { FormActions } from './team-creation/FormActions';
import { teamCreationSchema, type TeamCreationFormData, type InvitedMember } from './team-creation/types';

interface TeamCreationFormProps {
  onComplete: (data: TeamCreationFormData) => void;
  onSkip: () => void;
  initialData?: TeamCreationFormData | null;
}

export const TeamCreationForm = ({ onComplete, onSkip, initialData }: TeamCreationFormProps) => {
  const { toast } = useToast();
  const [teamLogo, setTeamLogo] = useState<string | null>(null);
  const [invitedMembers, setInvitedMembers] = useState<InvitedMember[]>([]);

  const form = useForm<TeamCreationFormData>({
    resolver: zodResolver(teamCreationSchema),
    defaultValues: {
      teamName: "",
      description: "",
      teamLogo: "",
      category: "development",
      objectives: [],
      invitedMembers: [],
    },
  });

  // Load initial data if available
  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
      if (initialData.teamLogo) {
        setTeamLogo(initialData.teamLogo);
      }
      if (initialData.invitedMembers) {
        setInvitedMembers(initialData.invitedMembers.filter((member): member is InvitedMember => 
          member.email !== undefined && member.role !== undefined
        ));
      }
    } else {
      // Try to load from localStorage
      const savedTeam = localStorage.getItem('team-creation-draft');
      if (savedTeam) {
        try {
          const parsedTeam = JSON.parse(savedTeam);
          form.reset(parsedTeam);
          if (parsedTeam.teamLogo) {
            setTeamLogo(parsedTeam.teamLogo);
          }
          if (parsedTeam.invitedMembers) {
            setInvitedMembers(parsedTeam.invitedMembers.filter((member: any): member is InvitedMember => 
              member.email !== undefined && member.role !== undefined
            ));
          }
        } catch (error) {
          console.error('Failed to parse team data:', error);
        }
      }
    }
  }, [initialData, form]);

  // Auto-save form data
  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem('team-creation-draft', JSON.stringify(value));
    });
    return () => {
      if (subscription && typeof subscription.unsubscribe === 'function') {
        subscription.unsubscribe();
      }
    };
  }, [form]);

  const onSubmit = (data: TeamCreationFormData) => {
    localStorage.removeItem('team-creation-draft');
    data.invitedMembers = invitedMembers;
    onComplete(data);
  };

  const handleLogoChange = (logoUrl: string) => {
    setTeamLogo(logoUrl);
    form.setValue("teamLogo", logoUrl);
  };

  const handleMemberInvite = (member: InvitedMember) => {
    setInvitedMembers(prev => [...prev, member]);
    form.setValue("invitedMembers", [...invitedMembers, member]);
  };

  const handleMemberRemove = (email: string) => {
    const updated = invitedMembers.filter(m => m.email !== email);
    setInvitedMembers(updated);
    form.setValue("invitedMembers", updated);
  };

  const teamName = form.watch("teamName") || "";

  return (
    <TooltipWrapper
      id="team-creation-section"
      title="Team Creation Process"
      content="Set up your team workspace where you'll collaborate with AI agents and team members. You can configure team settings, invite members, and define your team's objectives and focus areas."
      position="top"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <TeamAvatarUpload
            teamLogo={teamLogo}
            teamName={teamName}
            onLogoChange={handleLogoChange}
          />

          <TeamInformationForm form={form} />

          <MemberInvitation
            members={invitedMembers}
            onMemberInvite={handleMemberInvite}
            onMemberRemove={handleMemberRemove}
          />

          <FormActions
            onSkip={onSkip}
            onSubmit={form.handleSubmit(onSubmit)}
            isFormValid={form.formState.isValid}
          />
        </form>
      </Form>
    </TooltipWrapper>
  );
};
