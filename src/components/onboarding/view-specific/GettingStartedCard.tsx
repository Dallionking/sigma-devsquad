
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Play, BookOpen, Users, Bot, CheckCircle } from 'lucide-react';
import { ViewMode } from '@/types';
import { cn } from '@/lib/utils';

interface GettingStartedCardProps {
  showTeamView: boolean;
  viewMode: ViewMode;
  onStartTour: () => void;
  onDismiss: () => void;
  isTourCompleted: boolean;
}

export const GettingStartedCard = ({
  showTeamView,
  viewMode,
  onStartTour,
  onDismiss,
  isTourCompleted
}: GettingStartedCardProps) => {
  const viewName = showTeamView ? 'Team View' : 'Individual Agents';
  const Icon = showTeamView ? Users : Bot;
  
  const getViewModeLabel = (mode: ViewMode) => {
    switch (mode) {
      case 'workflow': return 'Workflow';
      case 'communication': return 'Communication';
      case 'tasks': return 'Tasks';
      case 'messages': return 'Messages';
      default: return mode;
    }
  };

  const getGettingStartedContent = () => {
    if (showTeamView) {
      switch (viewMode) {
        case 'workflow':
          return {
            title: 'Getting Started with Team Workflow',
            description: 'Learn how to manage collaborative teams, coordinate projects, and track team performance.',
            features: [
              'Create and manage development teams',
              'Set up collaborative projects',
              'Monitor team performance metrics',
              'Coordinate cross-team workflows'
            ]
          };
        case 'communication':
          return {
            title: 'Getting Started with Team Communication',
            description: 'Master team communication tools, channels, and collaborative discussions.',
            features: [
              'Create team communication channels',
              'Manage team discussions',
              'Share files and resources',
              'Coordinate team announcements'
            ]
          };
        case 'tasks':
          return {
            title: 'Getting Started with Team Tasks',
            description: 'Learn to assign, track, and manage tasks across your development teams.',
            features: [
              'Create team task boards',
              'Assign tasks to team members',
              'Track collective progress',
              'Set team deadlines and milestones'
            ]
          };
        case 'messages':
          return {
            title: 'Getting Started with Team Messages',
            description: 'Stay updated with team communications and important announcements.',
            features: [
              'View team announcements',
              'Track important messages',
              'Manage notification preferences',
              'Search team communications'
            ]
          };
        default:
          return {
            title: 'Getting Started with Team View',
            description: 'Learn the basics of team collaboration and management.',
            features: ['Basic team features', 'Collaboration tools']
          };
      }
    } else {
      switch (viewMode) {
        case 'workflow':
          return {
            title: 'Getting Started with Individual Agents',
            description: 'Learn how to create, configure, and orchestrate your personal AI development team.',
            features: [
              'Create specialized AI agents',
              'Configure agent capabilities',
              'Build complex workflows',
              'Monitor agent performance'
            ]
          };
        case 'communication':
          return {
            title: 'Getting Started with Agent Communication',
            description: 'Master communication with your AI agents and review their work.',
            features: [
              'Chat with AI agents',
              'Give clear instructions',
              'Review agent responses',
              'Manage conversation history'
            ]
          };
        case 'tasks':
          return {
            title: 'Getting Started with Personal Tasks',
            description: 'Learn to manage your individual tasks and assign them to AI agents.',
            features: [
              'Create personal task boards',
              'Assign tasks to specific agents',
              'Track task progress',
              'Set priorities and deadlines'
            ]
          };
        case 'messages':
          return {
            title: 'Getting Started with Agent Messages',
            description: 'Stay updated with your AI agents\' work and communications.',
            features: [
              'View agent status updates',
              'Track completed work',
              'Manage agent notifications',
              'Review conversation history'
            ]
          };
        default:
          return {
            title: 'Getting Started with Individual View',
            description: 'Learn the basics of managing your personal AI agents.',
            features: ['Basic agent features', 'Personal workflows']
          };
      }
    }
  };

  const content = getGettingStartedContent();

  return (
    <Card className="border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="space-y-4 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <div className="space-y-3 flex-1">
              <CardTitle className="text-xl font-semibold leading-tight text-foreground">
                {content.title}
              </CardTitle>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="bg-background/80 text-foreground border-border">
                  {viewName}
                </Badge>
                <Badge variant="secondary" className="bg-muted text-muted-foreground">
                  {getViewModeLabel(viewMode)}
                </Badge>
                {isTourCompleted && (
                  <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground shrink-0"
            title="Dismiss getting started card"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <p className="text-muted-foreground leading-relaxed">
          {content.description}
        </p>
        
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">What you'll learn:</h4>
          <ul className="space-y-2">
            {content.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                <span className="leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex items-center gap-3 pt-2 border-t border-border/50">
          <Button 
            onClick={onStartTour} 
            className="flex items-center gap-2 shadow-sm hover:shadow-md transition-shadow"
          >
            <Play className="w-4 h-4" />
            <span>{isTourCompleted ? 'Retake Tour' : 'Start Guided Tour'}</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2 shadow-sm">
            <BookOpen className="w-4 h-4" />
            View Docs
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
