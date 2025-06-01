
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface LoadingProgressProps {
  isLoading: boolean;
  progress?: number;
  className?: string;
  variant?: 'bar' | 'circle' | 'dots' | 'pulse';
}

export const LoadingProgress = ({ 
  isLoading, 
  progress,
  className,
  variant = 'bar'
}: LoadingProgressProps) => {
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    if (isLoading && progress !== undefined) {
      const timer = setTimeout(() => {
        setDisplayProgress(progress);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading, progress]);

  if (!isLoading) return null;

  const renderLoadingVariant = () => {
    switch (variant) {
      case 'bar':
        return (
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-vibe-primary to-vibe-secondary transition-all duration-500 ease-out"
              style={{ width: `${progress !== undefined ? displayProgress : 100}%` }}
            />
          </div>
        );
      
      case 'circle':
        return (
          <div className="relative w-12 h-12">
            <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-muted stroke-current"
                strokeWidth="3"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-vibe-primary stroke-current transition-all duration-500 ease-out"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                strokeDasharray={`${progress !== undefined ? displayProgress : 100}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            {progress !== undefined && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-medium">{Math.round(displayProgress)}%</span>
              </div>
            )}
          </div>
        );
      
      case 'dots':
        return (
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-vibe-primary rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        );
      
      case 'pulse':
        return (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-vibe-primary rounded-full animate-pulse" />
            <div className="text-sm text-muted-foreground">Loading...</div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      {renderLoadingVariant()}
    </div>
  );
};
