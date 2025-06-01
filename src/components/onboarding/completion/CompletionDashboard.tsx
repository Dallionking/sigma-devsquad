
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Sparkles, Users, Bot, MapPin, Share2, Trophy, ArrowRight } from 'lucide-react';
import { CelebrationAnimation } from './CelebrationAnimation';
import { WhatsNextSuggestions } from './WhatsNextSuggestions';
import { ShareableCompletionCard } from './ShareableCompletionCard';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { cn } from '@/lib/utils';

export const CompletionDashboard = () => {
  const { progress, getStepData, setShowOnboarding } = useOnboarding();
  const [showCelebration, setShowCelebration] = useState(true);
  const [showShareCard, setShowShareCard] = useState(false);

  const profileData = getStepData('profile-setup');
  const teamData = getStepData('team-creation');
  const agentData = getStepData('first-agent');

  // Auto-hide celebration after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCelebration(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const completedSteps = [
    { 
      id: 'profile-setup', 
      title: 'Profile Setup', 
      icon: Users, 
      description: 'Personal information and preferences',
      data: profileData 
    },
    { 
      id: 'team-creation', 
      title: 'Team Creation', 
      icon: Users, 
      description: `Created "${teamData?.teamName || 'your team'}"`,
      data: teamData 
    },
    { 
      id: 'first-agent', 
      title: 'Agent Configuration', 
      icon: Bot, 
      description: `Configured "${agentData?.name || 'your agent'}"`,
      data: agentData 
    },
    { 
      id: 'planning-tour', 
      title: 'Planning Tour', 
      icon: MapPin, 
      description: 'Explored planning features',
      data: getStepData('planning-tour') 
    }
  ];

  const handleGetStarted = () => {
    setShowOnboarding(false);
    // Navigate to main dashboard
    window.location.href = '/dashboard';
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 overflow-hidden">
      {/* Celebration Animation Overlay */}
      {showCelebration && (
        <CelebrationAnimation onComplete={() => setShowCelebration(false)} />
      )}

      <div className="container mx-auto px-6 py-12 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Trophy className="w-16 h-16 text-yellow-500" />
              {showCelebration && (
                <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
              )}
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            🎉 Setup Complete!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Congratulations! You've successfully configured your AI development team and you're ready to start building amazing projects.
          </p>
        </div>

        {/* Completion Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {completedSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={step.id} className={cn(
                "relative overflow-hidden transition-all duration-500 hover:shadow-lg",
                "animate-scale-in",
                showCelebration && "animate-pulse-gentle"
              )} style={{ animationDelay: `${index * 150}ms` }}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Icon className="w-8 h-8 text-primary" />
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                  <Badge variant="secondary" className="mt-2">
                    Completed
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* What's Next Suggestions */}
          <div className="lg:col-span-2">
            <WhatsNextSuggestions 
              profileData={profileData}
              teamData={teamData}
              agentData={agentData}
            />
          </div>

          {/* Quick Actions & Share */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={handleGetStarted}
                  className="w-full justify-between group"
                >
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => setShowShareCard(true)}
                  className="w-full justify-between"
                >
                  Share Achievement
                  <Share2 className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Team Summary */}
            {teamData && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Your Team</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-medium">{teamData.teamName}</p>
                    <p className="text-sm text-muted-foreground">{teamData.description}</p>
                    <Badge variant="outline">{teamData.category}</Badge>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Agent Summary */}
            {agentData && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Your First Agent</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-medium">{agentData.name}</p>
                    <p className="text-sm text-muted-foreground">{agentData.specialization}</p>
                    {agentData.capabilities && (
                      <div className="flex flex-wrap gap-1">
                        {agentData.capabilities.slice(0, 3).map((capability: string) => (
                          <Badge key={capability} variant="secondary" className="text-xs">
                            {capability}
                          </Badge>
                        ))}
                        {agentData.capabilities.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{agentData.capabilities.length - 3} more
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Shareable Completion Card Modal */}
      {showShareCard && (
        <ShareableCompletionCard
          profileData={profileData}
          teamData={teamData}
          agentData={agentData}
          onClose={() => setShowShareCard(false)}
        />
      )}
    </div>
  );
};
