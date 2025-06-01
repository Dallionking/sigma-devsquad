
import { OnboardingStep } from '@/contexts/OnboardingContext';

export interface VideoTutorial {
  id: string;
  step: OnboardingStep;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  captions: Array<{
    start: number;
    end: number;
    text: string;
  }>;
  thumbnail?: string;
}

export const videoTutorials: Record<OnboardingStep, VideoTutorial> = {
  welcome: {
    id: 'welcome-intro',
    step: 'welcome',
    title: 'Welcome to Vibe DevSquad',
    description: 'Get introduced to your AI-powered development team',
    videoUrl: '/videos/welcome-intro.mp4',
    duration: '45s',
    captions: [
      { start: 0, end: 3, text: 'Welcome to Vibe DevSquad!' },
      { start: 3, end: 8, text: 'Your AI-powered development team is ready to help you build amazing projects.' },
      { start: 8, end: 15, text: 'In the next few minutes, we\'ll set up your profile, create your first team, and configure your first AI agent.' },
      { start: 15, end: 22, text: 'You can skip any step and return to it later, or watch these videos again from the help menu.' },
      { start: 22, end: 30, text: 'Let\'s start by setting up your developer profile to personalize your experience.' },
      { start: 30, end: 35, text: 'Click continue when you\'re ready to begin your journey with AI development.' },
      { start: 35, end: 45, text: 'Welcome aboard! Let\'s build something amazing together.' }
    ]
  },
  'profile-setup': {
    id: 'profile-setup-guide',
    step: 'profile-setup',
    title: 'Setting Up Your Developer Profile',
    description: 'Learn how to create an effective developer profile',
    videoUrl: '/videos/profile-setup.mp4',
    duration: '50s',
    captions: [
      { start: 0, end: 4, text: 'Let\'s set up your developer profile.' },
      { start: 4, end: 10, text: 'Start by uploading a profile photo - this makes interactions with AI agents more personal.' },
      { start: 10, end: 16, text: 'Add your name, job title, and company to help agents understand your professional context.' },
      { start: 16, end: 23, text: 'Select your programming languages and areas of interest - this helps AI provide relevant suggestions.' },
      { start: 23, end: 30, text: 'Choose your experience level to ensure AI responses are tailored to your skill level.' },
      { start: 30, end: 38, text: 'Write a brief bio describing your background and what you\'re working on.' },
      { start: 38, end: 45, text: 'Don\'t worry - you can update all this information later in your settings.' },
      { start: 45, end: 50, text: 'When you\'re done, click continue to create your first team.' }
    ]
  },
  'team-creation': {
    id: 'team-creation-tutorial',
    step: 'team-creation',
    title: 'Creating Your First Team',
    description: 'Organize your AI agents into effective teams',
    videoUrl: '/videos/team-creation.mp4',
    duration: '55s',
    captions: [
      { start: 0, end: 4, text: 'Now let\'s create your first development team.' },
      { start: 4, end: 10, text: 'Teams help organize your AI agents around specific projects or goals.' },
      { start: 10, end: 16, text: 'Upload a team avatar or logo to represent your project visually.' },
      { start: 16, end: 23, text: 'Give your team a descriptive name that reflects your project or organization.' },
      { start: 23, end: 30, text: 'Add a clear description of your team\'s purpose and objectives.' },
      { start: 30, end: 37, text: 'Choose whether your team should be public or private.' },
      { start: 37, end: 44, text: 'You can invite team members now or add them later through team settings.' },
      { start: 44, end: 50, text: 'Remember, you can create multiple teams for different projects.' },
      { start: 50, end: 55, text: 'Ready? Let\'s move on to configuring your first AI agent.' }
    ]
  },
  'first-agent': {
    id: 'first-agent-configuration',
    step: 'first-agent',
    title: 'Configuring Your First AI Agent',
    description: 'Set up a specialized AI assistant for your development needs',
    videoUrl: '/videos/first-agent.mp4',
    duration: '60s',
    captions: [
      { start: 0, end: 4, text: 'Time to configure your first AI agent!' },
      { start: 4, end: 10, text: 'AI agents are specialized assistants that help with specific development tasks.' },
      { start: 10, end: 17, text: 'Choose from templates like Frontend Developer, Backend Developer, or DevOps Engineer.' },
      { start: 17, end: 24, text: 'Each template comes pre-configured with relevant skills and capabilities.' },
      { start: 24, end: 31, text: 'Customize your agent\'s name, description, and specific capabilities.' },
      { start: 31, end: 38, text: 'Add programming languages, frameworks, and tools your agent should be familiar with.' },
      { start: 38, end: 45, text: 'Set the agent\'s personality and communication style to match your preferences.' },
      { start: 45, end: 52, text: 'Review the agent preview to see how it will appear in your team.' },
      { start: 52, end: 60, text: 'Once created, your agent will be ready to help with development tasks immediately.' }
    ]
  },
  'planning-tour': {
    id: 'planning-agent-tour',
    step: 'planning-tour',
    title: 'Discovering the Planning Agent',
    description: 'Learn how AI can help plan and manage your projects',
    videoUrl: '/videos/planning-tour.mp4',
    duration: '50s',
    captions: [
      { start: 0, end: 4, text: 'Let\'s explore the powerful planning agent features.' },
      { start: 4, end: 11, text: 'The planning agent helps break down complex projects into manageable tasks.' },
      { start: 11, end: 18, text: 'Simply describe your project goals in natural language.' },
      { start: 18, end: 25, text: 'Watch as AI automatically creates a structured workflow with tasks and dependencies.' },
      { start: 25, end: 32, text: 'Tasks are intelligently assigned to agents based on their specializations.' },
      { start: 32, end: 39, text: 'Use the visual workflow to track progress and identify bottlenecks.' },
      { start: 39, end: 45, text: 'The planning agent continuously optimizes workflows based on team performance.' },
      { start: 45, end: 50, text: 'You\'ll master these tools as you work with your AI development team.' }
    ]
  },
  completion: {
    id: 'setup-complete',
    step: 'completion',
    title: 'Setup Complete - You\'re Ready!',
    description: 'Your AI development team is configured and ready to go',
    videoUrl: '/videos/setup-complete.mp4',
    duration: '40s',
    captions: [
      { start: 0, end: 4, text: 'Congratulations! Your setup is complete.' },
      { start: 4, end: 10, text: 'You now have a fully configured AI development team ready to help.' },
      { start: 10, end: 17, text: 'Start by creating your first project from the dashboard.' },
      { start: 17, end: 24, text: 'Use the planning agent to break down features and assign tasks.' },
      { start: 24, end: 30, text: 'Collaborate with your AI agents through the communication interface.' },
      { start: 30, end: 35, text: 'Explore the analytics to track your team\'s performance and productivity.' },
      { start: 35, end: 40, text: 'Welcome to the future of AI-powered development!' }
    ]
  }
};

export const getVideoTutorial = (step: OnboardingStep): VideoTutorial => {
  return videoTutorials[step];
};

export const getAllVideoTutorials = (): VideoTutorial[] => {
  return Object.values(videoTutorials);
};
