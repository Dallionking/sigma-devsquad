
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Clock } from 'lucide-react';
import { SimpleVideoTutorial } from '../onboarding/video-tutorials/SimpleVideoTutorial';
import { getAllVideoTutorials } from '@/hooks/useVideoTutorial';
import { OnboardingStep } from '@/contexts/OnboardingContext';

export const VideoTutorialsSection = () => {
  const [selectedVideo, setSelectedVideo] = useState<OnboardingStep | null>(null);
  const videoTutorials = getAllVideoTutorials();

  const handleVideoSelect = (step: OnboardingStep) => {
    setSelectedVideo(step);
  };

  const stepOrder: OnboardingStep[] = [
    'welcome', 
    'profile-setup', 
    'team-creation', 
    'first-agent', 
    'planning-tour',
    'completion'
  ];

  if (selectedVideo) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-md font-medium">Video Tutorial</h4>
          <Button
            variant="outline"
            onClick={() => setSelectedVideo(null)}
          >
            Back to Tutorials
          </Button>
        </div>
        
        <SimpleVideoTutorial currentStep={selectedVideo} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Video Tutorials</h3>
        <p className="text-muted-foreground">
          Watch step-by-step video guides to master Vibe DevSquad features.
        </p>
      </div>

      <div className="grid gap-4">
        {stepOrder.map((step) => {
          const tutorial = videoTutorials.find(v => v.id.includes(step.replace('-', '')));
          if (!tutorial) return null;

          return (
            <Card key={step} className="cursor-pointer hover:bg-accent/50 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <Play className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-base">{tutorial.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {tutorial.description}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleVideoSelect(step)}
                  >
                    <Play className="w-4 h-4 mr-1" />
                    Watch
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {tutorial.duration}
                  </Badge>
                  <Badge variant="outline">
                    {step.replace('-', ' ')}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
