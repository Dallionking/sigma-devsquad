import React from 'react';
import { Users, Bot, MapPin, Sparkles, CheckCircle } from 'lucide-react';
import { OnboardingStep } from '@/contexts/OnboardingContext';

export const stepOrder: OnboardingStep[] = [
  'welcome',
  'profile-setup', 
  'team-creation',
  'first-agent',
  'planning-tour',
  'completion'
];

export const stepContent: Record<OnboardingStep, {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  content: React.ReactNode;
}> = {
  welcome: {
    title: 'Welcome to Vibe DevSquad! 🚀',
    description: 'Your AI-powered development team is ready to help you build amazing projects.',
    icon: Sparkles,
    content: (
      <div className="text-center space-y-8">
        {/* Video Tutorial Section */}
        <div className="tutorial-section rounded-xl p-6 border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">Welcome to Vibe DevSquad</h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">Get introduced to your AI-powered development team</p>
              </div>
            </div>
            <button className="limitless-cta-secondary px-4 py-2 rounded-lg text-blue-600 dark:text-blue-400 text-sm font-medium">
              Watch Tutorial
            </button>
          </div>
          <p className="text-xs text-blue-600 dark:text-blue-400">45s tutorial</p>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              Let's get you started!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We'll guide you through setting up your first AI development team in just a few steps.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="feature-card p-6 rounded-xl border transition-all duration-200 hover:shadow-md btn-enhanced">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Create Teams</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Organize your AI agents</p>
            </div>

            <div className="feature-card p-6 rounded-xl border transition-all duration-200 hover:shadow-md btn-enhanced">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                <Bot className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Configure Agents</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Specialized AI assistants</p>
            </div>

            <div className="feature-card p-6 rounded-xl border transition-all duration-200 hover:shadow-md btn-enhanced">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Plan Projects</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">AI-powered planning</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'profile-setup': {
    title: 'Complete Your Profile',
    description: 'Tell us a bit about yourself to personalize your experience.',
    icon: Users,
    content: null // This will be replaced by ProfileSetupForm component
  },
  'team-creation': {
    title: 'Create Your Team',
    description: 'Set up your first development team with AI agents.',
    icon: Users,
    content: null // This will be replaced by TeamCreationForm component
  },
  'first-agent': {
    title: 'Configure Your First Agent',
    description: 'Create your first AI agent to help with development tasks.',
    icon: Bot,
    content: null // This will be replaced by FirstAgentForm component
  },
  'planning-tour': {
    title: 'Planning Tour',
    description: 'Explore the planning and project management features.',
    icon: MapPin,
    content: null // This will be replaced by PlanningTourForm component
  },
  completion: {
    title: 'Setup Complete! 🎉',
    description: 'You\'re all set to start building with your AI development team.',
    icon: CheckCircle,
    content: (
      <div className="text-center space-y-6">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Welcome to Vibe DevSquad!
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Your AI development team is ready. Start creating amazing projects with your new AI assistants.
          </p>
        </div>
        <div className="tutorial-section rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Next Steps:</h4>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Explore your dashboard and agent overview</li>
            <li>• Create your first project or task</li>
            <li>• Start collaborating with your AI team</li>
          </ul>
        </div>
      </div>
    )
  }
};
