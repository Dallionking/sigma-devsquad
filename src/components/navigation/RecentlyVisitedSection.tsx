
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useNavigate } from 'react-router-dom';
import { useContextualNavigation } from './ContextualNavigationProvider';
import { Clock, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface RecentlyVisitedSectionProps {
  isCollapsed?: boolean;
  className?: string;
  maxItems?: number;
}

export const RecentlyVisitedSection = ({ 
  isCollapsed = false, 
  className,
  maxItems = 5
}: RecentlyVisitedSectionProps) => {
  const navigate = useNavigate();
  const { recentlyVisited, clearRecentlyVisited } = useContextualNavigation();

  const recentItems = recentlyVisited.slice(0, maxItems);

  if (recentItems.length === 0) {
    return null;
  }

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    clearRecentlyVisited();
  };

  return (
    <div className={cn("p-3 border-t border-border/50", className)}>
      {!isCollapsed && (
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Recently Visited
          </h3>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
              >
                <X className="w-3 h-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Clear recent history</p>
            </TooltipContent>
          </Tooltip>
        </div>
      )}

      <div className="space-y-1">
        {recentItems.map((item, index) => {
          const timeAgo = formatDistanceToNow(new Date(item.timestamp), { addSuffix: true });
          
          const buttonContent = (
            <Button
              key={`${item.path}-${index}`}
              variant="ghost"
              size="sm"
              onClick={() => handleNavigate(item.path)}
              className={cn(
                "w-full justify-start gap-2 h-8 text-sm transition-all duration-200 hover:bg-accent/50",
                isCollapsed && "justify-center p-2 w-8"
              )}
            >
              <Clock className={cn(
                "flex-shrink-0 w-3 h-3 text-muted-foreground",
                isCollapsed && "w-4 h-4"
              )} />
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <div className="truncate font-medium text-left">{item.label}</div>
                  <div className="text-xs text-muted-foreground truncate">{timeAgo}</div>
                </div>
              )}
            </Button>
          );

          if (isCollapsed) {
            return (
              <Tooltip key={`${item.path}-${index}`}>
                <TooltipTrigger asChild>
                  {buttonContent}
                </TooltipTrigger>
                <TooltipContent side="right">
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{timeAgo}</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          }

          return buttonContent;
        })}
      </div>
    </div>
  );
};
