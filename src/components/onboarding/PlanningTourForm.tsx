
import React, { useState, useEffect } from 'react';
import { PlanningTourOverlay } from './planning-tour/PlanningTourOverlay';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, MessageSquare, Target, BarChart3, Users, Zap, Brain, CheckCircle } from 'lucide-react';

interface PlanningTourFormProps {
  onComplete: () => void;
  onSkip: () => void;
}

export const PlanningTourForm = ({ onComplete, onSkip }: PlanningTourFormProps) => {
  const [showTour, setShowTour] = useState(false);

  // Mock planning interface elements for the tour
  useEffect(() => {
    // Add tour target classes to mock elements
    const mockElements = [
      { class: 'planning-overview', element: document.querySelector('.planning-preview') },
      { class: 'chat-interface', element: document.querySelector('.chat-preview') },
      { class: 'task-breakdown', element: document.querySelector('.task-preview') },
      { class: 'progress-tracking', element: document.querySelector('.progress-preview') },
      { class: 'completion-area', element: document.querySelector('.completion-preview') }
    ];

    mockElements.forEach(({ class: className, element }) => {
      if (element) {
        element.classList.add(className);
      }
    });
  }, []);

  const handleStartTour = () => {
    setShowTour(true);
  };

  const handleTourComplete = () => {
    setShowTour(false);
    onComplete();
  };

  const handleTourSkip = () => {
    setShowTour(false);
    onSkip();
  };

  return (
    <div className="space-y-6">
      {/* Planning Overview */}
      <Card className="planning-preview">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-primary" />
            <span>AI-Powered Project Planning</span>
            <Badge variant="secondary">Interactive Tour</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Discover how AI can transform your project planning workflow with intelligent task breakdown, 
            dependency mapping, and automated coordination between your AI agents.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Chat Interface Preview */}
            <Card className="chat-preview">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  <h4 className="font-medium">Planning Chat</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="bg-muted p-2 rounded text-xs">
                    "I need to build a React dashboard with user authentication..."
                  </div>
                  <div className="bg-primary/10 p-2 rounded text-xs">
                    I'll break this down into: 1) Auth system, 2) Dashboard layout, 3) Data components...
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Task Breakdown Preview */}
            <Card className="task-preview">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Target className="w-4 h-4 text-primary" />
                  <h4 className="font-medium">Task Breakdown</h4>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Setup Authentication (2 days)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>Build Dashboard Layout (1 day)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Create Data Components (3 days)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Tracking Preview */}
          <Card className="progress-preview mb-4">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-3">
                <BarChart3 className="w-4 h-4 text-primary" />
                <h4 className="font-medium">Real-time Progress</h4>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">73%</div>
                  <div className="text-xs text-muted-foreground">Complete</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">5</div>
                  <div className="text-xs text-muted-foreground">Active Tasks</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">3</div>
                  <div className="text-xs text-muted-foreground">Agents Working</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="flex items-center space-x-2 p-2 bg-accent/50 rounded">
              <Brain className="w-4 h-4 text-primary" />
              <span className="text-xs">Smart Planning</span>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-accent/50 rounded">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-xs">Team Coordination</span>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-accent/50 rounded">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-xs">Auto-Assignment</span>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-accent/50 rounded">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span className="text-xs">Progress Tracking</span>
            </div>
          </div>

          {/* Completion Area */}
          <div className="completion-preview text-center">
            <Button 
              onClick={handleStartTour} 
              size="lg"
              className="flex items-center space-x-2"
            >
              <MapPin className="w-5 h-5" />
              <span>Start Interactive Tour</span>
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Take a guided tour to see planning features in action
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Alternative actions */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onSkip}>
          Skip Planning Tour
        </Button>
        <Button 
          variant="outline" 
          onClick={handleStartTour}
          className="flex items-center space-x-2"
        >
          <span>Experience Planning</span>
        </Button>
      </div>

      {/* Tour Overlay */}
      {showTour && (
        <PlanningTourOverlay
          onComplete={handleTourComplete}
          onSkip={handleTourSkip}
        />
      )}
    </div>
  );
};
