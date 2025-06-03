
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { OnboardingStep } from '@/contexts/OnboardingContext';
import { VideoPlayer } from './VideoPlayer';
import { getVideoTutorial } from './videoTutorialConfig';

interface OnboardingVideoTutorialProps {
  currentStep: OnboardingStep;
  onVideoComplete?: () => void;
  onSkipVideo?: () => void;
  onContinue: () => void;
  showVideo: boolean;
  onToggleVideo: () => void;
}

export const OnboardingVideoTutorial = ({
  currentStep,
  onVideoComplete,
  onSkipVideo,
  onContinue,
  showVideo,
  onToggleVideo
}: OnboardingVideoTutorialProps) => {
  const [hasWatchedVideo, setHasWatchedVideo] = useState(false);
  const tutorial = getVideoTutorial(currentStep);

  const handleVideoEnd = () => {
    setHasWatchedVideo(true);
    if (onVideoComplete) {
      onVideoComplete();
    }
  };

  const handleSkip = () => {
    if (onSkipVideo) {
      onSkipVideo();
    }
    onToggleVideo();
  };

  if (!showVideo) {
    return (
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Play className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                  {tutorial.title}
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  {tutorial.description}
                </p>
                <Badge variant="secondary" className="mt-2">
                  {tutorial.duration} tutorial
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={onToggleVideo}
                className="flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                Watch Tutorial
              </Button>
              <Button onClick={onContinue}>
                Continue Without Video
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <VideoPlayer
        videoUrl={tutorial.videoUrl}
        title={tutorial.title}
        duration={tutorial.duration}
        captions={tutorial.captions}
        onVideoEnd={handleVideoEnd}
        onSkip={handleSkip}
        autoPlay={true}
      />
      
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {hasWatchedVideo && (
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
              Video Complete
            </Badge>
          )}
          <span className="text-sm text-muted-foreground">
            You can rewatch this tutorial anytime from the help menu
          </span>
        </div>
        
        <Button 
          onClick={onContinue}
          className="flex items-center gap-2"
        >
          Continue
          <SkipForward className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
