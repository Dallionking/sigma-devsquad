
import { useState } from 'react';
import { OnboardingStep } from '@/contexts/OnboardingContext';

export interface VideoTutorial {
  id: string;
  title: string;
  description: string;
  duration: string;
  available: boolean;
}

const videoTutorials: Record<OnboardingStep, VideoTutorial> = {
  welcome: {
    id: 'welcome-intro',
    title: 'Welcome to Vibe DevSquad',
    description: 'Get introduced to your AI-powered development team',
    duration: '45s',
    available: true
  },
  'profile-setup': {
    id: 'profile-setup-guide',
    title: 'Setting Up Your Developer Profile',
    description: 'Learn how to create an effective developer profile',
    duration: '50s',
    available: true
  },
  'team-creation': {
    id: 'team-creation-tutorial',
    title: 'Creating Your First Team',
    description: 'Organize your AI agents into effective teams',
    duration: '55s',
    available: true
  },
  'first-agent': {
    id: 'first-agent-configuration',
    title: 'Configuring Your First AI Agent',
    description: 'Set up a specialized AI assistant for your development needs',
    duration: '60s',
    available: true
  },
  'planning-tour': {
    id: 'planning-agent-tour',
    title: 'Discovering the Planning Agent',
    description: 'Learn how AI can help plan and manage your projects',
    duration: '50s',
    available: true
  },
  completion: {
    id: 'setup-complete',
    title: 'Setup Complete - You\'re Ready!',
    description: 'Your AI development team is configured and ready to go',
    duration: '40s',
    available: true
  }
};

export const useVideoTutorial = (step: OnboardingStep) => {
  const [isWatching, setIsWatching] = useState(false);
  const [hasWatched, setHasWatched] = useState(false);

  const tutorial = videoTutorials[step];

  const startWatching = () => setIsWatching(true);
  const stopWatching = () => setIsWatching(false);
  const markAsWatched = () => {
    setHasWatched(true);
    setIsWatching(false);
  };

  return {
    tutorial,
    isWatching,
    hasWatched,
    startWatching,
    stopWatching,
    markAsWatched
  };
};

export const getAllVideoTutorials = () => Object.values(videoTutorials);
