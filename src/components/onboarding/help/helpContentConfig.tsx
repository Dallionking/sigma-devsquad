
import React from 'react';
import { OnboardingStep } from '@/contexts/OnboardingContext';
import { User, Users, Bot, MapPin, Trophy, Home } from 'lucide-react';

export interface HelpContent {
  title: string;
  description: string;
  tips: string[];
  examples?: {
    title: string;
    description: string;
    image?: string;
  }[];
  learnMoreLinks?: {
    title: string;
    url: string;
    description: string;
  }[];
  quickActions?: {
    title: string;
    description: string;
    action: string;
  }[];
}

export const helpContentMap: Record<OnboardingStep, HelpContent> = {
  welcome: {
    title: "Welcome to Vibe DevSquad",
    description: "Let's get you started with building your AI development team. This quick setup will help you configure your profile, create your first team, and deploy your first AI agent.",
    tips: [
      "The entire process takes about 5-10 minutes",
      "You can skip any step and return to it later",
      "All information can be updated in settings after onboarding"
    ],
    examples: [
      {
        title: "What you'll build",
        description: "A fully configured AI development team ready to help with your projects"
      }
    ],
    learnMoreLinks: [
      {
        title: "Getting Started Guide",
        url: "#",
        description: "Comprehensive guide to using Vibe DevSquad"
      }
    ]
  },
  'profile-setup': {
    title: "Set Up Your Developer Profile",
    description: "Create your professional profile to help AI agents understand your background and preferences. This information helps personalize your experience.",
    tips: [
      "Upload a profile photo to make interactions more personal",
      "Select multiple programming languages you're comfortable with",
      "Choose areas of interest to get relevant agent suggestions",
      "Your experience level helps tailor AI responses"
    ],
    examples: [
      {
        title: "Complete Profile Example",
        description: "Name: Sarah Chen, Role: Frontend Developer, Languages: React, TypeScript, Areas: Web Development, UI/UX"
      }
    ],
    quickActions: [
      {
        title: "Skip for now",
        description: "You can complete your profile later in settings",
        action: "skip"
      }
    ],
    learnMoreLinks: [
      {
        title: "Profile Best Practices",
        url: "#",
        description: "Tips for creating an effective developer profile"
      }
    ]
  },
  'team-creation': {
    title: "Create Your First Team",
    description: "Teams help organize your AI agents around specific projects or goals. You can create multiple teams for different purposes.",
    tips: [
      "Choose a descriptive team name that reflects your project",
      "Add a clear description of your team's purpose",
      "Public teams can be discovered by other users",
      "You can invite members later through team settings"
    ],
    examples: [
      {
        title: "Example Team",
        description: "Team: 'E-commerce Platform', Description: 'Building a modern e-commerce solution with React and Node.js'"
      }
    ],
    quickActions: [
      {
        title: "Use template",
        description: "Start with a pre-configured team template",
        action: "template"
      }
    ],
    learnMoreLinks: [
      {
        title: "Team Management Guide",
        url: "#",
        description: "Learn how to effectively manage development teams"
      }
    ]
  },
  'first-agent': {
    title: "Configure Your First AI Agent",
    description: "AI agents are specialized assistants that help with specific development tasks. Choose an agent type that matches your immediate needs.",
    tips: [
      "Start with a Frontend Developer for UI work",
      "Backend Developers help with APIs and databases",
      "DevOps Engineers assist with deployment and infrastructure",
      "You can create multiple agents for different specializations"
    ],
    examples: [
      {
        title: "Popular Agent Configurations",
        description: "Frontend: React + TypeScript, Backend: Node.js + PostgreSQL, DevOps: Docker + AWS"
      }
    ],
    quickActions: [
      {
        title: "Use template",
        description: "Start with a pre-configured agent template",
        action: "template"
      }
    ],
    learnMoreLinks: [
      {
        title: "Agent Configuration Guide",
        url: "#",
        description: "Advanced agent setup and customization options"
      }
    ]
  },
  'planning-tour': {
    title: "Explore Planning Tools",
    description: "Learn how to use the planning agent to break down projects, assign tasks, and coordinate your development team effectively.",
    tips: [
      "Use natural language to describe your project goals",
      "The planning agent can break down complex features",
      "Tasks are automatically assigned based on agent specializations",
      "Visual workflow helps track project progress"
    ],
    examples: [
      {
        title: "Example Planning Session",
        description: "Input: 'Build a user authentication system' → Output: Database schema, API endpoints, UI components, tests"
      }
    ],
    learnMoreLinks: [
      {
        title: "Planning Best Practices",
        url: "#",
        description: "How to effectively plan and manage development projects"
      },
      {
        title: "Workflow Automation",
        url: "#",
        description: "Setting up automated workflows for your team"
      }
    ]
  },
  completion: {
    title: "Setup Complete! 🎉",
    description: "Congratulations! Your Vibe DevSquad is ready. You now have a configured team with AI agents ready to help with your development projects.",
    tips: [
      "Start by creating your first project in the dashboard",
      "Use the planning agent to break down your project",
      "Invite team members to collaborate",
      "Explore the analytics to track team performance"
    ],
    examples: [
      {
        title: "Next Steps",
        description: "Create a project → Plan features → Assign tasks → Start coding → Deploy"
      }
    ],
    learnMoreLinks: [
      {
        title: "Dashboard Overview",
        url: "#",
        description: "Learn about all the features available in your dashboard"
      },
      {
        title: "Collaboration Features",
        url: "#",
        description: "How to work effectively with your AI development team"
      }
    ]
  }
};

export const getHelpContent = (step: OnboardingStep): HelpContent => {
  return helpContentMap[step];
};
