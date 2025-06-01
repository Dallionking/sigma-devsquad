
import { OnboardingStep } from '@/contexts/OnboardingContext';

export interface VideoTutorial {
  id: string;
  title: string;
  description: string;
  src: string;
  captions?: string;
  duration: number; // in seconds
  thumbnail?: string;
}

export const videoTutorials: Record<OnboardingStep, VideoTutorial> = {
  welcome: {
    id: 'welcome-intro',
    title: 'Welcome to Your AI Development Platform',
    description: 'Learn how this platform will transform your development workflow with intelligent AI agents.',
    src: '/videos/onboarding/welcome-intro.mp4',
    captions: '/videos/onboarding/captions/welcome-intro.vtt',
    duration: 45,
    thumbnail: '/videos/onboarding/thumbnails/welcome-intro.jpg'
  },
  'profile-setup': {
    id: 'profile-setup',
    title: 'Setting Up Your Developer Profile',
    description: 'Customize your profile to help AI agents understand your preferences and working style.',
    src: '/videos/onboarding/profile-setup.mp4',
    captions: '/videos/onboarding/captions/profile-setup.vtt',
    duration: 50,
    thumbnail: '/videos/onboarding/thumbnails/profile-setup.jpg'
  },
  'team-creation': {
    id: 'team-creation',
    title: 'Creating Your First Team',
    description: 'Set up a collaborative workspace where you and your AI agents will work together.',
    src: '/videos/onboarding/team-creation.mp4',
    captions: '/videos/onboarding/captions/team-creation.vtt',
    duration: 55,
    thumbnail: '/videos/onboarding/thumbnails/team-creation.jpg'
  },
  'first-agent': {
    id: 'first-agent',
    title: 'Configuring Your First AI Agent',
    description: 'Learn how to set up and customize an AI agent tailored to your development needs.',
    src: '/videos/onboarding/first-agent.mp4',
    captions: '/videos/onboarding/captions/first-agent.vtt',
    duration: 60,
    thumbnail: '/videos/onboarding/thumbnails/first-agent.jpg'
  },
  'planning-tour': {
    id: 'planning-tour',
    title: 'Platform Features Tour',
    description: 'Explore the key features that will help you plan, execute, and manage your projects.',
    src: '/videos/onboarding/planning-tour.mp4',
    captions: '/videos/onboarding/captions/planning-tour.vtt',
    duration: 65,
    thumbnail: '/videos/onboarding/thumbnails/planning-tour.jpg'
  },
  completion: {
    id: 'completion',
    title: 'You\'re All Set!',
    description: 'Congratulations on completing the setup. Start building amazing things!',
    src: '/videos/onboarding/completion.mp4',
    captions: '/videos/onboarding/captions/completion.vtt',
    duration: 30,
    thumbnail: '/videos/onboarding/thumbnails/completion.jpg'
  }
};

export const getVideoTutorial = (step: OnboardingStep): VideoTutorial => {
  return videoTutorials[step];
};
