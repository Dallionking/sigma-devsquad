
import React from 'react';
import { OnboardingStep } from '@/contexts/OnboardingContext';
import { User, Users, Bot, MapPin, Trophy, Home } from 'lucide-react';

export interface HelpContent {
  title: string;
  description: string;
  overview: string;
  keyPoints?: string[];
  tips: string[];
  commonIssues?: {
    problem: string;
    solution: string;
  }[];
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
    overview: "This onboarding process will guide you through setting up your AI development environment step by step.",
    keyPoints: [
      "Complete your developer profile for personalized AI assistance",
      "Create your first team workspace",
      "Configure your initial AI agent",
      "Learn the platform's key features"
    ],
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
    overview: "Your profile helps AI agents understand your development style and provide more targeted assistance.",
    keyPoints: [
      "Profile information personalizes AI responses",
      "Skills selection affects agent recommendations", 
      "Experience level tailors complexity of suggestions",
      "Preferences improve workflow efficiency"
    ],
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
    overview: "Teams provide collaborative workspaces where you and your AI agents work together on projects.",
    keyPoints: [
      "Teams organize agents around specific projects",
      "Multiple teams support different workflows",
      "Team settings control collaboration features",
      "Members can be invited after creation"
    ],
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
    overview: "AI agents provide specialized assistance for different aspects of software development.",
    keyPoints: [
      "Agents specialize in different development areas",
      "Configuration affects agent capabilities",
      "Multiple agents can work together",
      "Agents learn from your preferences over time"
    ],
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
    commonIssues: [
      {
        problem: "Agent responses seem too generic",
        solution: "Provide more specific context about your project and preferences in the agent configuration"
      },
      {
        problem: "Agent suggests unfamiliar technologies",
        solution: "Update your profile skills to reflect your current technology stack"
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
    overview: "Planning tools help you organize projects and coordinate work across your AI development team.",
    keyPoints: [
      "Planning agents break down complex projects",
      "Task assignment considers agent specializations", 
      "Workflow visualization tracks progress",
      "Natural language input simplifies planning"
    ],
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
    commonIssues: [
      {
        problem: "Planning suggestions don't match project architecture",
        solution: "Provide more context about your existing codebase and architectural preferences"
      },
      {
        problem: "Task breakdown is too high-level",
        solution: "Ask for more detailed breakdown or specify the level of granularity you need"
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
    overview: "Your AI development environment is now fully configured and ready for productive work.",
    keyPoints: [
      "Your team and agents are ready to use",
      "All features are now accessible",
      "You can start creating projects immediately",
      "Help and tutorials remain available"
    ],
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
