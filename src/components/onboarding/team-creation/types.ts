
export interface TeamMember {
  id: string;
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

export interface TeamCreationFormProps {
  onComplete: (data: TeamCreationData) => void;
  onSkip: () => void;
}
