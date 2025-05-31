
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { 
  CheckCircle, 
  AlertTriangle, 
  RefreshCw, 
  Undo2, 
  Redo2, 
  Loader,
  TrendingUp,
  TrendingDown,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface StateTransitionAnimationsProps {
  children: React.ReactNode;
  isLoading?: boolean;
  hasError?: boolean;
  showSuccess?: boolean;
  enableUndoRedo?: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
}

export const StateTransitionAnimations = ({
  children,
  isLoading = false,
  hasError = false,
  showSuccess = false,
  enableUndoRedo = false,
  onUndo,
  onRedo,
  canUndo = false,
  canRedo = false
}: StateTransitionAnimationsProps) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Smooth loading progress animation
  useEffect(() => {
    if (isLoading) {
      setLoadingProgress(0);
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 15;
        });
      }, 100);

      return () => clearInterval(interval);
    } else {
      setLoadingProgress(100);
      setTimeout(() => setLoadingProgress(0), 500);
    }
  }, [isLoading]);

  // Success animation effect
  useEffect(() => {
    if (showSuccess) {
      setIsTransitioning(true);
      setFeedbackMessage('Operation completed successfully!');
      
      toast({
        title: "Success",
        description: "Memory operation completed successfully",
      });

      setTimeout(() => {
        setIsTransitioning(false);
        setFeedbackMessage(null);
      }, 2000);
    }
  }, [showSuccess, toast]);

  // Error state effect
  useEffect(() => {
    if (hasError) {
      setFeedbackMessage('An error occurred during the operation');
      
      toast({
        title: "Error",
        description: "Memory operation failed",
        variant: "destructive"
      });

      setTimeout(() => {
        setFeedbackMessage(null);
      }, 3000);
    }
  }, [hasError, toast]);

  const handleUndo = () => {
    if (onUndo && canUndo) {
      setIsTransitioning(true);
      onUndo();
      
      toast({
        title: "Undone",
        description: "Previous action has been undone",
      });

      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  const handleRedo = () => {
    if (onRedo && canRedo) {
      setIsTransitioning(true);
      onRedo();
      
      toast({
        title: "Redone",
        description: "Action has been redone",
      });

      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative transition-all duration-300 ease-in-out",
        isTransitioning && "scale-[0.98] opacity-90",
        hasError && "animate-pulse"
      )}
    >
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
          <div className="text-center space-y-4">
            <Loader className="w-8 h-8 animate-spin mx-auto text-primary" />
            <div className="w-48">
              <Progress value={loadingProgress} className="h-2" />
            </div>
            <p className="text-sm text-muted-foreground">Processing memory data...</p>
          </div>
        </div>
      )}

      {/* Error State Overlay */}
      {hasError && (
        <div className="absolute inset-0 bg-destructive/10 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg border-2 border-destructive/20">
          <Alert className="max-w-md bg-background border-destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Failed to load memory data. Please try again.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Success Animation */}
      {showSuccess && (
        <div className="absolute inset-0 bg-green-500/10 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg border-2 border-green-500/20 animate-in fade-in-0 duration-500">
          <div className="text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto animate-in zoom-in-0 duration-300" />
            <p className="text-green-700 font-medium mt-2">Success!</p>
          </div>
        </div>
      )}

      {/* Undo/Redo Controls */}
      {enableUndoRedo && (
        <div className="absolute top-2 right-2 z-20 flex gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={handleUndo}
            disabled={!canUndo}
            className={cn(
              "transition-all duration-200",
              canUndo ? "hover:scale-105" : "opacity-50"
            )}
          >
            <Undo2 className="w-3 h-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRedo}
            disabled={!canRedo}
            className={cn(
              "transition-all duration-200",
              canRedo ? "hover:scale-105" : "opacity-50"
            )}
          >
            <Redo2 className="w-3 h-3" />
          </Button>
        </div>
      )}

      {/* Contextual Feedback */}
      {feedbackMessage && (
        <div className="absolute bottom-2 left-2 right-2 z-20">
          <div className={cn(
            "px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 animate-in slide-in-from-bottom-2",
            showSuccess && "bg-green-100 text-green-800 border border-green-200",
            hasError && "bg-red-100 text-red-800 border border-red-200"
          )}>
            {feedbackMessage}
          </div>
        </div>
      )}

      {/* Main Content with Smooth Transitions */}
      <div className={cn(
        "transition-all duration-300 ease-in-out",
        isLoading && "opacity-50 pointer-events-none",
        hasError && "opacity-75",
        showSuccess && "animate-in fade-in-0 duration-500"
      )}>
        {children}
      </div>
    </div>
  );
};
