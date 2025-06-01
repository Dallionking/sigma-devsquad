
import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { ViewMode } from '@/types';
import { cn } from '@/lib/utils';

interface BreadcrumbNavigationProps {
  viewMode: ViewMode;
  className?: string;
}

export const BreadcrumbNavigation = ({ viewMode, className }: BreadcrumbNavigationProps) => {
  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard', icon: Home },
    { label: getViewModeLabel(viewMode), current: true }
  ];

  function getViewModeLabel(mode: ViewMode): string {
    switch (mode) {
      case 'workflow': return 'Workflow';
      case 'communication': return 'Communication';
      case 'tasks': return 'Tasks'; 
      case 'messages': return 'Messages';
      default: return 'Agents';
    }
  }

  return (
    <nav className={cn("flex items-center space-x-1 text-sm text-muted-foreground", className)}>
      {breadcrumbs.map((breadcrumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        const Icon = breadcrumb.icon;
        
        return (
          <div key={breadcrumb.label} className="flex items-center">
            {Icon && <Icon className="w-4 h-4 mr-1" />}
            <span className={cn(
              isLast ? "text-foreground font-medium" : "hover:text-foreground cursor-pointer"
            )}>
              {breadcrumb.label}
            </span>
            {!isLast && <ChevronRight className="w-4 h-4 mx-2" />}
          </div>
        );
      })}
    </nav>
  );
};
