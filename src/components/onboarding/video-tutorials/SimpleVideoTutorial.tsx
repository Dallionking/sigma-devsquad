
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, SkipForward } from 'lucide-react';
import { OnboardingStep } from '@/contexts/OnboardingContext';
import { useVideoTutorial } from '@/hooks/useVideoTutorial';
import { AnimatedActionButton } from '../visual-cues/AnimatedActionButton';

interface SimpleVideoTutorialProps {
  currentStep: OnboardingStep;
  onVideoComplete?: () => void;
  onSkip?: () => void;
  className?: string;
}

export const SimpleVideoTutorial = ({
  currentStep,
  onVideoComplete,
  onSkip,
  className
}: SimpleVideoTutorialProps) => {
  const { tutorial, isWatching, hasWatched, startWatching, stopWatching, markAsWatched } = useVideoTutorial(currentStep);

  const handleVideoEnd = () => {
    markAsWatched();
    if (onVideoComplete) {
      onVideoComplete();
    }
  };

  const handleSkip = () => {
    stopWatching();
    if (onSkip) {
      onSkip();
    }
  };

  if (!tutorial.available) {
    return null;
  }

  if (isWatching) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="aspect-video bg-black rounded-lg mb-6 flex items-center justify-center">
            <div className="text-white text-center">
              <Play className="w-16 h-16 mx-auto mb-2" />
              <p className="text-lg font-medium">{tutorial.title}</p>
              <p className="text-sm opacity-70">{tutorial.duration} tutorial</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              {hasWatched && (
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  Complete
                </Badge>
              )}
              <span className="text-sm text-muted-foreground">
                {tutorial.description}
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                onClick={handleSkip}
                className="h-9 px-4 text-sm"
              >
                <SkipForward className="w-4 h-4 mr-1" />
                Skip
              </Button>
              <AnimatedActionButton 
                onClick={handleVideoEnd}
                isPrimary={true}
                className="h-9 px-6"
              >
                Continue
              </AnimatedActionButton>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center space-x-4 flex-1">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
              <Play className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
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
          <div className="flex items-center gap-3 flex-shrink-0">
            <AnimatedActionButton
              isSecondary={true}
              onClick={startWatching}
              className="flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              Watch Tutorial
            </AnimatedActionButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
