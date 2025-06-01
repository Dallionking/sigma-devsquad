
import React from 'react';
import { EnhancedCard } from '@/components/ui/enhanced-card';
import { AnimatedIcon } from '@/components/ui/animated-icon';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { LucideIcon, TrendingDown, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProblemSolutionCardProps {
  type: 'problem' | 'solution';
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  icon: LucideIcon;
  className?: string;
}

export const ProblemSolutionCard = ({
  type,
  title,
  description,
  metric,
  metricLabel,
  icon,
  className
}: ProblemSolutionCardProps) => {
  const isProblem = type === 'problem';
  
  return (
    <EnhancedCard 
      hoverEffect="lift" 
      className={cn(
        'p-6 h-full relative overflow-hidden',
        isProblem 
          ? 'bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 border-red-200/50 dark:border-red-800/50'
          : 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200/50 dark:border-green-800/50',
        className
      )}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none" />
      
      <div className="relative z-10">
        {/* Header with icon and trend */}
        <div className="flex items-center justify-between mb-4">
          <div className={cn(
            'w-12 h-12 rounded-lg flex items-center justify-center',
            isProblem 
              ? 'bg-red-100 dark:bg-red-900/40' 
              : 'bg-green-100 dark:bg-green-900/40'
          )}>
            <AnimatedIcon 
              icon={icon} 
              size={24}
              color={isProblem ? '#ef4444' : '#10b981'}
              hoverAnimation="scale"
            />
          </div>
          
          <div className="flex items-center space-x-1">
            {isProblem ? (
              <TrendingDown className="w-4 h-4 text-red-500" />
            ) : (
              <TrendingUp className="w-4 h-4 text-green-500" />
            )}
            <span className={cn(
              'text-xs font-medium',
              isProblem ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
            )}>
              {isProblem ? 'Problem' : 'Solution'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold leading-tight">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          
          {/* Metric */}
          <div className="pt-2 border-t border-border/50">
            <div className={cn(
              'text-2xl font-bold',
              isProblem ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
            )}>
              <AnimatedCounter value={metric} />
            </div>
            <div className="text-xs text-muted-foreground">{metricLabel}</div>
          </div>
        </div>
      </div>
    </EnhancedCard>
  );
};
