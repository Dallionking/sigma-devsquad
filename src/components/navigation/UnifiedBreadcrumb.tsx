
import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUnifiedNavigation } from '@/contexts/UnifiedNavigationContext';
import { cn } from '@/lib/utils';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

interface UnifiedBreadcrumbProps {
  className?: string;
  showHome?: boolean;
  maxItems?: number;
}

export const UnifiedBreadcrumb = ({ 
  className, 
  showHome = true,
  maxItems = 5 
}: UnifiedBreadcrumbProps) => {
  const { breadcrumbs, navigate } = useUnifiedNavigation();

  // Limit breadcrumbs if too many
  const displayBreadcrumbs = breadcrumbs.length > maxItems 
    ? [
        breadcrumbs[0], // Always show first (Dashboard)
        { label: '...', path: undefined }, // Ellipsis
        ...breadcrumbs.slice(-2) // Show last 2
      ]
    : breadcrumbs;

  if (breadcrumbs.length <= 1) {
    return null; // Don't show breadcrumbs on home page
  }

  return (
    <div className={cn(
      "flex items-center space-x-1 text-sm bg-background/80 backdrop-blur-sm border-b px-6 py-3",
      className
    )}>
      <Breadcrumb>
        <BreadcrumbList>
          {displayBreadcrumbs.map((item, index) => {
            const isLast = index === displayBreadcrumbs.length - 1;
            const isEllipsis = item.label === '...';
            const Icon = item.icon;

            return (
              <React.Fragment key={`${item.path}-${index}`}>
                <BreadcrumbItem>
                  {isEllipsis ? (
                    <span className="text-muted-foreground">...</span>
                  ) : isLast || !item.path ? (
                    <BreadcrumbPage className="flex items-center gap-2">
                      {Icon && <Icon className="w-4 h-4" />}
                      {showHome && index === 0 && <Home className="w-4 h-4" />}
                      <span className="font-medium">{item.label}</span>
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(item.path!)}
                        className="h-auto p-1 font-normal text-muted-foreground hover:text-foreground"
                      >
                        <div className="flex items-center gap-2">
                          {Icon && <Icon className="w-4 h-4" />}
                          {showHome && index === 0 && <Home className="w-4 h-4" />}
                          <span>{item.label}</span>
                        </div>
                      </Button>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
