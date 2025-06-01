import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, Bot, Folder, MessageSquare, Settings, Code, 
  Lightbulb, Rocket, Target, ArrowRight, Clock 
} from 'lucide-react';

interface WhatsNextSuggestionsProps {
  profileData: any;
  teamData: any;
  agentData: any;
}

export const WhatsNextSuggestions = ({ profileData, teamData, agentData }: WhatsNextSuggestionsProps) => {
  // Generate personalized suggestions based on user data
  const generateSuggestions = () => {
    const suggestions = [];

    // Based on experience level
    if (profileData?.experience === 'beginner') {
      suggestions.push({
        id: 'explore-templates',
        title: 'Explore Project Templates',
        description: 'Start with beginner-friendly project templates to get familiar with the platform',
        icon: Folder,
        priority: 'high',
        estimatedTime: '10 minutes',
        category: 'Getting Started'
      });
    } else {
      suggestions.push({
        id: 'create-custom-project',
        title: 'Create Custom Project',
        description: 'Build a project from scratch using your expertise',
        icon: Code,
        priority: 'medium',
        estimatedTime: '30 minutes',
        category: 'Advanced'
      });
    }

    // Based on programming languages
    if (profileData?.preferredLanguages?.includes('React')) {
      suggestions.push({
        id: 'react-agent',
        title: 'Configure React Specialist Agent',
        description: 'Create an agent specialized in React development',
        icon: Bot,
        priority: 'high',
        estimatedTime: '15 minutes',
        category: 'Agents'
      });
    }

    // Based on team setup
    if (teamData?.category === 'startup') {
      suggestions.push({
        id: 'mvp-planning',
        title: 'Plan Your MVP',
        description: 'Use AI-powered planning to define your minimum viable product',
        icon: Target,
        priority: 'high',
        estimatedTime: '45 minutes',
        category: 'Planning'
      });
    }

    // Always include these general suggestions
    suggestions.push(
      {
        id: 'invite-team',
        title: 'Invite Team Members',
        description: 'Collaborate with others by inviting them to your team',
        icon: Users,
        priority: 'medium',
        estimatedTime: '5 minutes',
        category: 'Collaboration'
      },
      {
        id: 'chat-agent',
        title: 'Start Chatting with Your Agent',
        description: `Begin a conversation with ${agentData?.name || 'your agent'} to explore its capabilities`,
        icon: MessageSquare,
        priority: 'high',
        estimatedTime: '5 minutes',
        category: 'Getting Started'
      },
      {
        id: 'customize-workspace',
        title: 'Customize Your Workspace',
        description: 'Personalize your dashboard and configure preferences',
        icon: Settings,
        priority: 'low',
        estimatedTime: '10 minutes',
        category: 'Customization'
      }
    );

    return suggestions.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder];
    });
  };

  const suggestions = generateSuggestions();
  const highPrioritySuggestions = suggestions.filter(s => s.priority === 'high');
  const otherSuggestions = suggestions.filter(s => s.priority !== 'high');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5" />
          What's Next?
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Personalized suggestions based on your setup
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* High Priority Suggestions */}
        {highPrioritySuggestions.length > 0 && (
          <div>
            <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
              <Rocket className="w-4 h-4" />
              Recommended First Steps
            </h4>
            <div className="space-y-3">
              {highPrioritySuggestions.map((suggestion) => {
                const Icon = suggestion.icon;
                return (
                  <div
                    key={suggestion.id}
                    className="flex items-start gap-3 p-3 rounded-lg border bg-primary/5 hover:bg-primary/10 transition-colors group cursor-pointer"
                  >
                    <Icon className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h5 className="font-medium text-gray-900 dark:text-gray-100">
                          {suggestion.title}
                        </h5>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {suggestion.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className={getPriorityColor(suggestion.priority)}>
                          {suggestion.priority}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {suggestion.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {suggestion.estimatedTime}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Other Suggestions */}
        {otherSuggestions.length > 0 && (
          <div>
            <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-3">
              Additional Suggestions
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {otherSuggestions.map((suggestion) => {
                const Icon = suggestion.icon;
                return (
                  <div
                    key={suggestion.id}
                    className="flex items-start gap-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors group cursor-pointer"
                  >
                    <Icon className="w-4 h-4 text-muted-foreground mt-1 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-sm text-gray-900 dark:text-gray-100">
                        {suggestion.title}
                      </h5>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {suggestion.description}
                      </p>
                      <div className="flex items-center gap-1 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {suggestion.estimatedTime}
                        </Badge>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="pt-4 border-t">
          <Button className="w-full" size="lg">
            Start Your First Project
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
