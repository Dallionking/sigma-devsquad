
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
  tertiaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  illustration?: string;
  tips?: string[];
}

export const EmptyStateCard = ({
  icon: Icon,
  title,
  description,
  action,
  secondaryAction,
  tertiaryAction,
  className,
  size = 'md',
  illustration,
  tips
}: EmptyStateCardProps) => {
  const sizeClasses = {
    sm: 'py-6 px-6',
    md: 'py-8 px-8',
    lg: 'py-12 px-10'
  };

  const iconSizes = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  };

  return (
    <Card className={cn(
      "border-2 border-dashed border-muted-foreground/20 bg-gradient-to-br from-background to-muted/20 shadow-sm hover:shadow-md transition-shadow duration-200",
      className
    )}>
      <CardContent className={cn("text-center", sizeClasses[size])}>
        {/* Illustration or Icon */}
        {illustration ? (
          <div className="mb-6">
            <img 
              src={illustration} 
              alt=""
              className={cn(
                "mx-auto rounded-lg opacity-80 shadow-sm",
                size === 'sm' ? 'w-32 h-24' : size === 'md' ? 'w-48 h-36' : 'w-64 h-48'
              )}
            />
          </div>
        ) : (
          <div className={cn(
            "mx-auto mb-6 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center shadow-sm",
            iconSizes[size]
          )}>
            <Icon className={cn(
              "text-primary",
              size === 'sm' ? 'w-6 h-6' : size === 'md' ? 'w-8 h-8' : 'w-10 h-10'
            )} />
          </div>
        )}
        
        <h3 className={cn(
          "font-semibold text-card-foreground mb-4",
          size === 'sm' ? 'text-lg' : size === 'md' ? 'text-xl' : 'text-2xl'
        )}>
          {title}
        </h3>
        
        <p className={cn(
          "text-muted-foreground mb-6 max-w-md mx-auto leading-relaxed",
          size === 'sm' ? 'text-sm' : 'text-base'
        )}>
          {description}
        </p>

        {/* Quick Tips */}
        {tips && tips.length > 0 && (
          <div className="mb-6 p-4 bg-muted/30 rounded-lg border border-border/50">
            <h4 className="text-sm font-medium text-foreground mb-3">Quick Tips:</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              {tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3 text-left">
                  <span className="text-primary mt-0.5 shrink-0">•</span>
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Action Buttons */}
        {action && (
          <div className="space-y-4">
            <Button
              onClick={action.onClick}
              variant={action.variant || 'default'}
              size={size === 'sm' ? 'sm' : 'default'}
              className="min-w-[140px] shadow-sm hover:shadow-md transition-shadow"
            >
              {action.label}
            </Button>
            
            {(secondaryAction || tertiaryAction) && (
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                {secondaryAction && (
                  <Button
                    onClick={secondaryAction.onClick}
                    variant="outline"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground shadow-sm"
                  >
                    {secondaryAction.label}
                  </Button>
                )}
                
                {tertiaryAction && (
                  <Button
                    onClick={tertiaryAction.onClick}
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {tertiaryAction.label}
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
