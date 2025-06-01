import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Users, Bot, MapPin, Sparkles, ArrowRight, X, Star, Code2, Globe, Database } from 'lucide-react';
import { useOnboarding, type OnboardingStep } from '@/contexts/OnboardingContext';
import { useProjectTemplates } from '@/contexts/ProjectTemplateContext';
import { ProfileSetupForm } from './ProfileSetupForm';
import { cn } from '@/lib/utils';

const stepContent = {
  welcome: {
    title: 'Welcome to Vibe DevSquad! 🚀',
    description: 'Your AI-powered development team is ready to help you build amazing projects.',
    icon: Sparkles,
    content: (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-primary mb-2">Let\'s get you started!</h3>
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
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Teams are collections of AI agents that work together on specific projects or domains.
        </p>
        <div className="bg-accent/50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Team Ideas:</h4>
          <ul className="space-y-1 text-sm">
            <li>• Frontend Development Team</li>
            <li>• Backend & API Team</li>
            <li>• Design & UX Team</li>
            <li>• DevOps & Infrastructure Team</li>
          </ul>
        </div>
      </div>
    )
  },
  'first-agent': {
    title: 'Configure Your First Agent',
    description: 'Create an AI agent specialized for your development needs.',
    icon: Bot,
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground">
          AI agents are your specialized team members, each with unique skills and capabilities.
        </p>
        <div className="bg-accent/50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Popular Agent Types:</h4>
          <ul className="space-y-1 text-sm">
            <li>• React Developer - Frontend specialist</li>
            <li>• API Developer - Backend services</li>
            <li>• Code Reviewer - Quality assurance</li>
            <li>• Documentation Writer - Technical docs</li>
          </ul>
        </div>
      </div>
    )
  },
  'planning-tour': {
    title: 'Discover Planning Agent',
    description: 'Learn how AI can help you plan and manage your projects.',
    icon: MapPin,
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground">
          The Planning Agent helps break down complex projects into manageable tasks.
        </p>
        <div className="bg-accent/50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Planning Features:</h4>
          <ul className="space-y-1 text-sm">
            <li>• Project breakdown and estimation</li>
            <li>• Task dependency mapping</li>
            <li>• Timeline and milestone planning</li>
            <li>• Resource allocation suggestions</li>
          </ul>
        </div>
      </div>
    )
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

// Template selection content for the 'first-agent' step
const TemplateSelectionContent = () => {
  const { getPopularTemplates, createProjectFromTemplate } = useProjectTemplates();
  const popularTemplates = getPopularTemplates();

  const iconMap = {
    'todo-app': Code2,
    'ecommerce': Database,
    'portfolio': Globe
  };

  const handleSelectTemplate = async (templateId: string) => {
    await createProjectFromTemplate(templateId);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h4 className="font-semibold mb-2">Start with a Template</h4>
        <p className="text-sm text-muted-foreground">
          Choose a project template to get started quickly with pre-configured agents and tasks.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {popularTemplates.slice(0, 3).map((template) => {
          const Icon = iconMap[template.id as keyof typeof iconMap] || Code2;
          return (
            <Card 
              key={template.id} 
              className="p-3 hover:bg-accent/50 cursor-pointer transition-colors"
              onClick={() => handleSelectTemplate(template.id)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h5 className="font-medium text-sm">{template.title}</h5>
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  </div>
                  <p className="text-xs text-muted-foreground">{template.description}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {template.difficulty}
                </Badge>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

const stepOrder: OnboardingStep[] = ['welcome', 'profile-setup', 'team-creation', 'first-agent', 'planning-tour', 'completion'];

export const OnboardingModal = () => {
  const { progress, showOnboarding, completeStep, skipOnboarding, setShowOnboarding } = useOnboarding();

  if (!showOnboarding) return null;

  const currentStepIndex = stepOrder.indexOf(progress.currentStep);
  const totalSteps = stepOrder.length - 1; // Exclude completion step from count
  const progressPercentage = (currentStepIndex / totalSteps) * 100;

  const currentContent = stepContent[progress.currentStep];
  const Icon = currentContent.icon;

  const handleNext = () => {
    completeStep(progress.currentStep);
  };

  const handleSkip = () => {
    skipOnboarding();
  };

  const handleProfileSetupComplete = (profileData: any) => {
    // Save profile data to localStorage or context
    localStorage.setItem('onboarding-profile', JSON.stringify(profileData));
    completeStep('profile-setup');
  };

  const handleProfileSetupSkip = () => {
    completeStep('profile-setup');
  };

  // Show template selection for first-agent step
  const showTemplateSelection = progress.currentStep === 'first-agent';
  const showProfileSetup = progress.currentStep === 'profile-setup';

  return (
    <Dialog open={showOnboarding} onOpenChange={setShowOnboarding}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{currentContent.title}</h2>
                <p className="text-muted-foreground text-sm">{currentContent.description}</p>
              </div>
            </div>
            
            {progress.currentStep !== 'completion' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSkip}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Progress */}
          {progress.currentStep !== 'completion' && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Step {currentStepIndex + 1} of {totalSteps}
                </span>
                <span className="text-muted-foreground">
                  {Math.round(progressPercentage)}% complete
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          )}

          {/* Content */}
          <div className="py-6">
            {showProfileSetup ? (
              <ProfileSetupForm 
                onComplete={handleProfileSetupComplete}
                onSkip={handleProfileSetupSkip}
              />
            ) : showTemplateSelection ? (
              <TemplateSelectionContent />
            ) : (
              currentContent.content
            )}
          </div>

          {/* Actions - Only show for non-profile steps */}
          {!showProfileSetup && (
            <div className="flex justify-between">
              {progress.currentStep !== 'completion' ? (
                <>
                  <Button
                    variant="outline"
                    onClick={handleSkip}
                  >
                    Skip Tour
                  </Button>
                  <Button onClick={handleNext} className="flex items-center space-x-2">
                    <span>{progress.currentStep === 'planning-tour' ? 'Finish' : 'Continue'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </>
              ) : (
                <div className="w-full flex justify-center">
                  <Button onClick={() => setShowOnboarding(false)} size="lg">
                    Start Building! 🚀
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Step indicators */}
          {progress.currentStep !== 'completion' && (
            <div className="flex justify-center space-x-2">
              {stepOrder.slice(0, -1).map((step, index) => (
                <div
                  key={step}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    index <= currentStepIndex ? "bg-primary" : "bg-muted",
                    index === currentStepIndex && "ring-2 ring-primary ring-offset-2"
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
