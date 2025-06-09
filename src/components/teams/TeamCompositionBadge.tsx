
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { TeamComposition } from '@/types/teams';
import { 
  getTeamCompositionIcon, 
  getTeamCompositionColor, 
  getTeamCompositionLabel,
  getTeamCompositionEmoji 
} from '@/utils/teamVisualUtils';
import { cn } from '@/lib/utils';

interface TeamCompositionBadgeProps {
  composition: TeamComposition;
  variant?: 'default' | 'icon-only' | 'label-only' | 'emoji';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const TeamCompositionBadge = ({ 
  composition, 
  variant = 'default', 
  size = 'md',
  className 
}: TeamCompositionBadgeProps) => {
  const Icon = getTeamCompositionIcon(composition);
  const colors = getTeamCompositionColor(composition);
  const label = getTeamCompositionLabel(composition);
  const emoji = getTeamCompositionEmoji(composition);

  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-xs px-2 py-1',
    lg: 'text-sm px-3 py-1.5'
  };

  if (variant === 'icon-only') {
    return (
      <div className={cn(
        'inline-flex items-center justify-center rounded-full p-1',
        colors.light,
        className
      )}>
        <Icon className="w-3 h-3" />
      </div>
    );
  }

  if (variant === 'label-only') {
    return (
      <Badge 
        variant="secondary"
        className={cn(
          colors.light,
          sizeClasses[size],
          className
        )}
      >
        {label}
      </Badge>
    );
  }

  if (variant === 'emoji') {
    return (
      <span className={cn('text-lg', className)}>
        {emoji}
      </span>
    );
  }

  return (
    <Badge 
      variant="secondary"
      className={cn(
        'flex items-center gap-1',
        colors.light,
        sizeClasses[size],
        className
      )}
    >
      <Icon className="w-3 h-3" />
      <span>{label}</span>
    </Badge>
  );
};
