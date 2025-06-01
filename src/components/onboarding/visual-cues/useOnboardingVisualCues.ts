
import { useState, useEffect } from 'react';
import { OnboardingStep } from '@/contexts/onboarding/types';

interface VisualCue {
  id: string;
  targetId?: string;
  type: 'pulse' | 'arrow' | 'ghost' | 'progress';
  direction?: 'right' | 'down' | 'up' | 'left';
  message?: string;
  isComplete?: boolean;
  progress?: number;
  delay?: number;
}

export const useOnboardingVisualCues = (currentStep: OnboardingStep, formState?: any) => {
  const [activeCues, setActiveCues] = useState<VisualCue[]>([]);

  const stepCues: Record<OnboardingStep, VisualCue[]> = {
    welcome: [
      {
        id: 'continue-button',
        type: 'pulse',
        message: 'Click to continue',
        delay: 1000
      }
    ],
    'profile-setup': [
      {
        id: 'profile-name',
        type: 'arrow',
        direction: 'down',
        message: 'Start by entering your name',
        delay: 500
      },
      {
        id: 'profile-progress',
        type: 'progress',
        message: 'Complete your profile',
        progress: formState?.name ? 50 : 0,
        isComplete: formState?.name && formState?.email
      }
    ],
    'team-creation': [
      {
        id: 'team-avatar',
        type: 'ghost',
        message: 'Upload a team avatar',
        delay: 800
      },
      {
        id: 'team-name',
        type: 'arrow',
        direction: 'down',
        message: 'Give your team a name',
        delay: 1200
      },
      {
        id: 'team-progress',
        type: 'progress',
        message: 'Setup your team',
        progress: formState?.teamName ? 75 : 25,
        isComplete: formState?.teamName && formState?.description
      }
    ],
    'first-agent': [
      {
        id: 'agent-template',
        type: 'pulse',
        message: 'Choose an agent template',
        delay: 600
      },
      {
        id: 'agent-preview',
        type: 'arrow',
        direction: 'right',
        message: 'Review your agent configuration',
        delay: 1000
      },
      {
        id: 'agent-progress',
        type: 'progress',
        message: 'Configure your first agent',
        progress: formState?.templateId ? 80 : 20,
        isComplete: formState?.name && formState?.capabilities?.length > 0
      }
    ],
    'planning-tour': [
      {
        id: 'tour-start',
        type: 'pulse',
        message: 'Start the planning tour',
        delay: 500
      }
    ],
    completion: [
      {
        id: 'completion-progress',
        type: 'progress',
        message: 'Setup complete!',
        progress: 100,
        isComplete: true
      }
    ]
  };

  useEffect(() => {
    const cues = stepCues[currentStep] || [];
    
    // Apply delays to cues
    cues.forEach((cue, index) => {
      setTimeout(() => {
        setActiveCues(prev => [...prev.filter(c => c.id !== cue.id), cue]);
      }, cue.delay || 0);
    });

    return () => {
      setActiveCues([]);
    };
  }, [currentStep, formState]);

  const updateCueProgress = (cueId: string, progress: number, isComplete?: boolean) => {
    setActiveCues(prev => 
      prev.map(cue => 
        cue.id === cueId 
          ? { ...cue, progress, isComplete }
          : cue
      )
    );
  };

  const removeCue = (cueId: string) => {
    setActiveCues(prev => prev.filter(cue => cue.id !== cueId));
  };

  return {
    activeCues,
    updateCueProgress,
    removeCue
  };
};
