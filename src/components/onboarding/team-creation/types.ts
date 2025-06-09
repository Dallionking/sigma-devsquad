
import { z } from 'zod';

export interface TeamMember {
  id: string;
  email: string;
  role: 'admin' | 'member';
}

export interface InvitedMember {
  email: string;
  role: 'admin' | 'member';
}

export interface TeamCreationData {
  teamName: string;
  teamDescription: string;
  teamType: 'human' | 'ai';
  teamAvatar?: string;
  members: TeamMember[];
}

export const teamCreationSchema = z.object({
  teamName: z.string().min(1, "Team name is required"),
  description: z.string().optional(),
  teamLogo: z.string().optional(),
  category: z.enum(["development", "design", "marketing", "research", "other"]).default("development"),
  objectives: z.array(z.string()).default([]),
  invitedMembers: z.array(z.object({
    email: z.string().email(),
    role: z.enum(["admin", "member"]).default("member")
  })).default([])
});

export type TeamCreationFormData = z.infer<typeof teamCreationSchema>;

export interface TeamCreationFormProps {
  onComplete: (data: TeamCreationFormData) => void;
  onSkip: () => void;
  initialData?: TeamCreationFormData | null;
}
