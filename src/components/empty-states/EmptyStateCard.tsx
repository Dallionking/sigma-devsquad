
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'default' | 'outline' | 'secondary';
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const EmptyStateCard = ({
  icon: Icon,
  title,
  description,
  action,
  secondaryAction,
  className,
  size = 'md'
}: EmptyStateCardProps) => {
  const sizeClasses = {
    sm: 'py-8 px-6',
    md: 'py-12 px-8',
    lg: 'py-16 px-10'
  };

  const iconSizes = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  };

  return (
    <Card className={cn("border-dashed border-2 border-muted-foreground/20", className)}>
      <CardContent className={cn("text-center", sizeClasses[size])}>
        <div className={cn(
          "mx-auto mb-4 bg-muted rounded-full flex items-center justify-center",
          iconSizes[size]
        )}>
          <Icon className={cn(
            "text-muted-foreground",
            size === 'sm' ? 'w-6 h-6' : size === 'md' ? 'w-8 h-8' : 'w-10 h-10'
          )} />
        </div>
        
        <h3 className={cn(
          "font-semibold text-card-foreground mb-2",
          size === 'sm' ? 'text-base' : size === 'md' ? 'text-lg' : 'text-xl'
        )}>
          {title}
        </h3>
        
        <p className={cn(
          "text-muted-foreground mb-6 max-w-sm mx-auto",
          size === 'sm' ? 'text-sm' : 'text-base'
        )}>
          {description}
        </p>
        
        {action && (
          <div className="space-y-3">
            <Button
              onClick={action.onClick}
              variant={action.variant || 'default'}
              size={size === 'sm' ? 'sm' : 'default'}
              className="min-w-[120px]"
            >
              {action.label}
            </Button>
            
            {secondaryAction && (
              <div>
                <Button
                  onClick={secondaryAction.onClick}
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                >
                  {secondaryAction.label}
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
