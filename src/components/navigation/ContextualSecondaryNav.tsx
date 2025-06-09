
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useContextualNavigation } from './ContextualNavigationProvider';
import { ChevronRight } from 'lucide-react';

interface ContextualSecondaryNavProps {
  primaryPath: string;
  className?: string;
}

export const ContextualSecondaryNav = ({ primaryPath, className }: ContextualSecondaryNavProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getContextualSecondaryItems } = useContextualNavigation();

  const secondaryItems = getContextualSecondaryItems(primaryPath);

  if (secondaryItems.length === 0) {
    return null;
  }

  return (
    <div className={cn(
      "border-b border-border/50 bg-muted/30 backdrop-blur-sm",
      className
    )}>
      <div className="px-6 py-3">
        <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-3">
          <span className="font-medium">
            {primaryPath.replace('/', '').replace('-', ' ').charAt(0).toUpperCase() + 
             primaryPath.replace('/', '').replace('-', ' ').slice(1)}
          </span>
          <ChevronRight className="w-4 h-4" />
          <span>Navigation</span>
        </div>
        
        <nav className="flex items-center gap-2 overflow-x-auto">
          {secondaryItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex items-center gap-2 whitespace-nowrap transition-all duration-200",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-foreground rounded-full" />
                )}
              </Button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
