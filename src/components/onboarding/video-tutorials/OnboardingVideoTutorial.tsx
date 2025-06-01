
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { VideoPlayer } from './VideoPlayer';
import { getVideoTutorial } from './videoTutorialConfig';
import { OnboardingStep } from '@/contexts/OnboardingContext';
import { Play, Clock, SkipForward, CheckCircle } from 'lucide-react';

interface OnboardingVideoTutorialProps {
  step: OnboardingStep;
  onComplete: () => void;
  onSkip: () => void;
  autoPlay?: boolean;
}

export const OnboardingVideoTutorial = ({ 
  step, 
  onComplete, 
  onSkip,
  autoPlay = false 
}: OnboardingVideoTutorialProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showVideo, setShowVideo] = useState(autoPlay);
  
  const tutorial = getVideoTutorial(step);

  const handleVideoComplete = () => {
    setIsCompleted(true);
    onComplete();
  };

  const handlePlayClick = () => {
    setShowVideo(true);
    setIsPlaying(true);
  };

  const handleSkip = () => {
    setShowVideo(false);
    onSkip();
  };

  if (!tutorial) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <CardTitle className="text-lg">{tutorial.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{tutorial.description}</p>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                <Clock className="w-3 h-3 mr-1" />
                {tutorial.duration}s
              </Badge>
              {isCompleted && (
                <Badge className="bg-green-500 text-white text-xs">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Completed
                </Badge>
              )}
            </div>
          </div>
          
          {!showVideo && (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleSkip}>
                <SkipForward className="w-4 h-4 mr-2" />
                Skip Video
              </Button>
              <Button onClick={handlePlayClick}>
                <Play className="w-4 h-4 mr-2" />
                Play Tutorial
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      
      {showVideo && (
        <CardContent className="pt-0">
          <VideoPlayer
            src={tutorial.src}
            title={tutorial.title}
            captions={tutorial.captions}
            onComplete={handleVideoComplete}
            onSkip={handleSkip}
            autoPlay={autoPlay}
            className="w-full aspect-video"
          />
          
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              You can replay this tutorial anytime from the help menu
            </p>
          </div>
        </CardContent>
      )}
      
      {!showVideo && tutorial.thumbnail && (
        <CardContent className="pt-0">
          <div 
            className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden cursor-pointer group"
            onClick={handlePlayClick}
          >
            <img 
              src={tutorial.thumbnail} 
              alt={`${tutorial.title} thumbnail`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
              <div className="bg-white/90 rounded-full p-3 group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 text-gray-800" />
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
