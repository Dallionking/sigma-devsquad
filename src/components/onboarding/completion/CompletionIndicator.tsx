
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertCircle, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CompletionIndicatorProps {
  isRequired: boolean;
  isCompleted: boolean;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const CompletionIndicator = ({
  isRequired,
  isCompleted,
  size = 'md',
  showLabel = true,
  className
}: CompletionIndicatorProps) => {
  const getIcon = () => {
    if (isCompleted) {
      return <CheckCircle className={cn(
        "text-green-600",
        size === 'sm' && "w-3 h-3",
        size === 'md' && "w-4 h-4",
        size === 'lg' && "w-5 h-5"
      )} />;
    }
    
    if (isRequired) {
      return <AlertCircle className={cn(
        "text-orange-500",
        size === 'sm' && "w-3 h-3",
        size === 'md' && "w-4 h-4",
        size === 'lg' && "w-5 h-5"
      )} />;
    }
    
    return <Circle className={cn(
      "text-muted-foreground",
      size === 'sm' && "w-3 h-3",
      size === 'md' && "w-4 h-4",
      size === 'lg' && "w-5 h-5"
    )} />;
  };

  const getBadgeVariant = () => {
    if (isCompleted) return 'default';
    if (isRequired) return 'destructive';
    return 'secondary';
  };

  const getBadgeText = () => {
    if (isCompleted) return 'Complete';
    if (isRequired) return 'Required';
    return 'Optional';
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      {getIcon()}
      {showLabel && (
        <Badge variant={getBadgeVariant()} className={cn(
          size === 'sm' && "text-xs px-1.5 py-0.5",
          size === 'md' && "text-xs",
          size === 'lg' && "text-sm"
        )}>
          {getBadgeText()}
        </Badge>
      )}
    </div>
  );
};
