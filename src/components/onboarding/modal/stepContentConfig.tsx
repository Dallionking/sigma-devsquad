
import React from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle, Users, Bot, MapPin, Sparkles } from 'lucide-react';
import { OnboardingStep } from '@/contexts/OnboardingContext';

export const stepContent = {
  welcome: {
    title: 'Welcome to Vibe DevSquad! 🚀',
    description: 'Your AI-powered development team is ready to help you build amazing projects.',
    icon: Sparkles,
    content: (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-primary mb-2">Let's get you started!</h3>
          <p className="text-muted-foreground">
            We'll guide you through setting up your first AI development team in just a few steps.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="text-center p-4">
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <h4 className="font-semibold">Create Teams</h4>
            <p className="text-sm text-muted-foreground">Organize your AI agents</p>
          </Card>
          <Card className="text-center p-4">
            <Bot className="w-8 h-8 text-primary mx-auto mb-2" />
            <h4 className="font-semibold">Configure Agents</h4>
            <p className="text-sm text-muted-foreground">Specialized AI assistants</p>
          </Card>
          <Card className="text-center p-4">
            <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
            <h4 className="font-semibold">Plan Projects</h4>
            <p className="text-sm text-muted-foreground">AI-powered planning</p>
          </Card>
        </div>
      </div>
    )
  },
  'profile-setup': {
    title: 'Complete Your Profile',
    description: 'Tell us a bit about yourself to personalize your experience.',
    icon: Users,
    content: null // Will be replaced with ProfileSetupForm
  },
  'team-creation': {
    title: 'Create Your First Team',
    description: 'Teams help organize your agents and projects effectively.',
    icon: Users,
    content: null // Will be replaced with TeamCreationForm
  },
  'first-agent': {
    title: 'Configure Your First Agent',
    description: 'Create an AI agent specialized for your development needs.',
    icon: Bot,
    content: null // Will be replaced with FirstAgentForm
  },
  'planning-tour': {
    title: 'Discover Planning Agent',
    description: 'Learn how AI can help you plan and manage your projects.',
    icon: MapPin,
    content: null // Will be replaced with PlanningTourForm
  },
  completion: {
    title: 'You\'re All Set! 🎉',
    description: 'Your AI development team is ready to help you build amazing projects.',
    icon: CheckCircle,
    content: (
      <div className="space-y-6 text-center">
        <div className="text-green-600 dark:text-green-400">
          <CheckCircle className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-xl font-bold">Onboarding Complete!</h3>
        </div>
        
        <div className="space-y-4">
          <p className="text-muted-foreground">
            You now have access to all the powerful features of Vibe DevSquad.
          </p>
          
          <div className="bg-accent/50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">What's Next?</h4>
            <ul className="space-y-1 text-sm text-left">
              <li>• Explore the dashboard and different views</li>
              <li>• Try creating your first project from a template</li>
              <li>• Connect with your AI agents</li>
              <li>• Check out sample projects for inspiration</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
};

export const stepOrder: OnboardingStep[] = ['welcome', 'profile-setup', 'team-creation', 'first-agent', 'planning-tour', 'completion'];
