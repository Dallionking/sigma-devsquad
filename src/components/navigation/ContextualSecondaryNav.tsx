
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContextualSecondaryNavProps {
  primaryPath: string;
}

export const ContextualSecondaryNav = ({ primaryPath }: ContextualSecondaryNavProps) => {
  // Mock secondary navigation items based on primary path
  const getSecondaryItems = (path: string) => {
    switch (path) {
      case '/dashboard':
        return [
          { label: 'Overview', path: '/dashboard' },
          { label: 'Analytics', path: '/dashboard/analytics' },
          { label: 'Reports', path: '/dashboard/reports' }
        ];
      case '/projects':
        return [
          { label: 'All Projects', path: '/projects' },
          { label: 'Templates', path: '/projects/templates' },
          { label: 'Archive', path: '/projects/archive' }
        ];
      default:
        return [];
    }
  };

  const secondaryItems = getSecondaryItems(primaryPath);

  if (secondaryItems.length === 0) {
    return null;
  }

  return (
    <div className="border-b border-border/50 bg-background/95 backdrop-blur-sm">
      <div className="flex items-center gap-2 px-4 py-2">
        {secondaryItems.map((item, index) => (
          <React.Fragment key={item.path}>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "text-sm",
                item.path === primaryPath && "bg-accent text-accent-foreground"
              )}
            >
              {item.label}
            </Button>
            {index < secondaryItems.length - 1 && (
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
