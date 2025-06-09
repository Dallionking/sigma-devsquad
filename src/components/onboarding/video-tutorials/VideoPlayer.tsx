
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, SkipForward, RotateCcw, Volume2, VolumeX, Captions } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  duration: string;
  captions?: Array<{
    start: number;
    end: number;
    text: string;
  }>;
  onVideoEnd?: () => void;
  onSkip?: () => void;
  className?: string;
  autoPlay?: boolean;
}

export const VideoPlayer = ({
  videoUrl,
  title,
  duration,
  captions = [],
  onVideoEnd,
  onSkip,
  className,
  autoPlay = false
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true);
  const [currentCaption, setCurrentCaption] = useState<string>('');
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setVideoDuration(video.duration);
    const handleEnd = () => {
      setIsPlaying(false);
      setHasStarted(false);
      if (onVideoEnd) onVideoEnd();
    };

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('ended', handleEnd);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('ended', handleEnd);
    };
  }, [onVideoEnd]);

  useEffect(() => {
    if (captions.length > 0) {
      const caption = captions.find(
        cap => currentTime >= cap.start && currentTime <= cap.end
      );
      setCurrentCaption(caption?.text || '');
    }
  }, [currentTime, captions]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
      setHasStarted(true);
    }
    setIsPlaying(!isPlaying);
  };

  const replay = () => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.play();
    setIsPlaying(true);
    setHasStarted(true);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = videoDuration > 0 ? (currentTime / videoDuration) * 100 : 0;

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="relative bg-black aspect-video">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={videoUrl}
          muted={isMuted}
          autoPlay={autoPlay}
          playsInline
          preload="metadata"
        />
        
        {/* Video overlay controls */}
        {!hasStarted && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Button
              size="lg"
              onClick={togglePlay}
              className="bg-primary/90 hover:bg-primary text-white rounded-full w-16 h-16"
            >
              <Play className="w-8 h-8 ml-1" />
            </Button>
          </div>
        )}

        {/* Captions */}
        {showCaptions && currentCaption && (
          <div className="absolute bottom-16 left-4 right-4">
            <div className="bg-black/80 text-white px-3 py-2 rounded text-sm text-center">
              {currentCaption}
            </div>
          </div>
        )}

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4">
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant="ghost"
              onClick={togglePlay}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>

            <Button
              size="sm"
              variant="ghost"
              onClick={replay}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>

            <div className="flex-1 bg-white/30 rounded-full h-1">
              <div
                className="bg-primary h-full rounded-full transition-all duration-150"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            <span className="text-white text-xs font-mono">
              {formatTime(currentTime)} / {formatTime(videoDuration)}
            </span>

            <Button
              size="sm"
              variant="ghost"
              onClick={toggleMute}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>

            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowCaptions(!showCaptions)}
              className={cn(
                "text-white hover:bg-white/20 h-8 w-8 p-0",
                showCaptions && "bg-white/20"
              )}
            >
              <Captions className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">{title}</h3>
            <Badge variant="secondary" className="mt-1">
              {duration}
            </Badge>
          </div>
          
          {onSkip && (
            <Button
              variant="outline"
              onClick={onSkip}
              className="flex items-center gap-2"
            >
              <SkipForward className="w-4 h-4" />
              Skip Video
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
