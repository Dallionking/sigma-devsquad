
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { VideoPlayer } from './VideoPlayer';
import { videoTutorials, VideoTutorial } from './videoTutorialConfig';
import { OnboardingStep } from '@/contexts/OnboardingContext';
import { Play, Search, Clock, CheckCircle, Grid, List } from 'lucide-react';

interface VideoTutorialManagerProps {
  completedSteps?: OnboardingStep[];
  onVideoComplete?: (step: OnboardingStep) => void;
}

export const VideoTutorialManager = ({ 
  completedSteps = [], 
  onVideoComplete 
}: VideoTutorialManagerProps) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoTutorial | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const tutorials = Object.entries(videoTutorials).map(([step, tutorial]) => ({
    ...tutorial,
    step: step as OnboardingStep,
    isCompleted: completedSteps.includes(step as OnboardingStep)
  }));

  const filteredTutorials = tutorials.filter(tutorial =>
    tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tutorial.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleVideoSelect = (tutorial: VideoTutorial & { step: OnboardingStep }) => {
    setSelectedVideo(tutorial);
  };

  const handleVideoComplete = () => {
    if (selectedVideo && 'step' in selectedVideo) {
      const tutorialWithStep = selectedVideo as VideoTutorial & { step: OnboardingStep };
      onVideoComplete?.(tutorialWithStep.step);
    }
  };

  const handleBackToLibrary = () => {
    setSelectedVideo(null);
  };

  if (selectedVideo) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Video Tutorial</h3>
          <Button variant="outline" onClick={handleBackToLibrary}>
            Back to Library
          </Button>
        </div>
        
        <VideoPlayer
          src={selectedVideo.src}
          title={selectedVideo.title}
          captions={selectedVideo.captions}
          onComplete={handleVideoComplete}
          className="w-full aspect-video"
        />
        
        <div className="space-y-2">
          <h4 className="font-medium">{selectedVideo.title}</h4>
          <p className="text-sm text-muted-foreground">{selectedVideo.description}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Video Tutorial Library</h3>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search tutorials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTutorials.map((tutorial) => (
            <Card 
              key={tutorial.id} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleVideoSelect(tutorial)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base">{tutorial.title}</CardTitle>
                  {tutorial.isCompleted && (
                    <Badge className="bg-green-500 text-white">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Done
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {tutorial.thumbnail && (
                  <div className="relative w-full aspect-video bg-muted rounded overflow-hidden">
                    <img 
                      src={tutorial.thumbnail} 
                      alt={`${tutorial.title} thumbnail`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="bg-white/90 rounded-full p-2">
                        <Play className="w-4 h-4 text-gray-800" />
                      </div>
                    </div>
                  </div>
                )}
                <p className="text-sm text-muted-foreground">{tutorial.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {tutorial.duration}s
                  </Badge>
                  <Button size="sm">
                    <Play className="w-3 h-3 mr-1" />
                    Watch
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredTutorials.map((tutorial) => (
            <Card 
              key={tutorial.id}
              className="cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => handleVideoSelect(tutorial)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{tutorial.title}</h4>
                      {tutorial.isCompleted && (
                        <Badge className="bg-green-500 text-white text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Completed
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{tutorial.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {tutorial.duration}s
                    </Badge>
                    <Button size="sm">
                      <Play className="w-3 h-3 mr-1" />
                      Watch
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredTutorials.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No tutorials found matching your search.</p>
        </div>
      )}
    </div>
  );
};
