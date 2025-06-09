
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Upload, Loader, Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MicroProgressIndicatorsProps {
  type: 'upload' | 'processing' | 'success' | 'transition';
  message?: string;
  progress?: number;
  isVisible?: boolean;
  onComplete?: () => void;
  className?: string;
}

export const MicroProgressIndicators = ({
  type,
  message,
  progress = 0,
  isVisible = true,
  onComplete,
  className
}: MicroProgressIndicatorsProps) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  // Animate progress smoothly
  useEffect(() => {
    if (type === 'upload' && progress > animatedProgress) {
      const timer = setTimeout(() => {
        setAnimatedProgress(prev => Math.min(prev + 2, progress));
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [progress, animatedProgress, type]);

  // Handle completion animation
  useEffect(() => {
    if (progress >= 100 && type === 'upload') {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        onComplete?.();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [progress, type, onComplete]);

  if (!isVisible) return null;

  const renderUploadIndicator = () => (
    <Card className={cn("border-blue-200 bg-blue-50 dark:bg-blue-950/30", className)}>
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          {showSuccess ? (
            <CheckCircle className="w-5 h-5 text-green-600 animate-in zoom-in-0 duration-300" />
          ) : (
            <Upload className="w-5 h-5 text-blue-600 animate-pulse" />
          )}
          <div className="flex-1">
            <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
              {showSuccess ? 'Upload Complete!' : message || 'Uploading...'}
            </p>
            <Progress 
              value={showSuccess ? 100 : animatedProgress} 
              className="h-2 mt-2"
            />
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              {showSuccess ? 'Ready to continue' : `${Math.round(animatedProgress)}%`}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderProcessingIndicator = () => (
    <div className={cn("flex items-center space-x-3 py-2", className)}>
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
      </div>
      <span className="text-sm text-muted-foreground animate-pulse">
        {message || 'Processing...'}
      </span>
    </div>
  );

  const renderSuccessIndicator = () => (
    <div className={cn("flex items-center space-x-2 py-2 animate-in slide-in-from-left-2 duration-500", className)}>
      <CheckCircle className="w-4 h-4 text-green-600 animate-in zoom-in-0 duration-300" />
      <span className="text-sm font-medium text-green-700 dark:text-green-400">
        {message || 'Completed!'}
      </span>
      <Sparkles className="w-3 h-3 text-green-500 animate-pulse" />
    </div>
  );

  const renderTransitionIndicator = () => (
    <div className={cn("flex items-center justify-center space-x-3 py-4 animate-in fade-in-0 duration-500", className)}>
      <div className="flex items-center space-x-2 text-primary">
        <span className="text-sm font-medium">{message || 'Moving to next step'}</span>
        <ArrowRight className="w-4 h-4 animate-pulse" />
      </div>
    </div>
  );

  switch (type) {
    case 'upload':
      return renderUploadIndicator();
    case 'processing':
      return renderProcessingIndicator();
    case 'success':
      return renderSuccessIndicator();
    case 'transition':
      return renderTransitionIndicator();
    default:
      return null;
  }
};
