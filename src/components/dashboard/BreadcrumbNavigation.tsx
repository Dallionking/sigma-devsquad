
import React from 'react';
import { ChevronRight, Home, Users, Bot } from 'lucide-react';
import { ViewMode } from '@/types';
import { cn } from '@/lib/utils';

interface BreadcrumbNavigationProps {
  viewMode: ViewMode;
  showTeamView: boolean;
  className?: string;
}

export const BreadcrumbNavigation = ({ viewMode, showTeamView, className }: BreadcrumbNavigationProps) => {
  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard', icon: Home },
    { 
      label: showTeamView ? 'Team View' : 'Individual Agents', 
      icon: showTeamView ? Users : Bot,
      current: true,
      color: showTeamView ? 'blue' : 'purple'
    },
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
    <nav className={cn("flex items-center space-x-1 text-sm text-muted-foreground px-6 py-2 bg-background/80", className)}>
      {breadcrumbs.map((breadcrumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        const Icon = breadcrumb.icon;
        const isViewContext = index === 1; // The Team/Individual view breadcrumb
        
        return (
          <div key={breadcrumb.label} className="flex items-center">
            <div className="flex items-center space-x-1">
              {Icon && <Icon className="w-4 h-4" />}
              <span className={cn(
                "transition-colors duration-300",
                isLast || isViewContext 
                  ? "text-foreground font-medium" 
                  : "hover:text-foreground cursor-pointer",
                isViewContext && breadcrumb.color === 'blue' && "text-blue-600 dark:text-blue-400",
                isViewContext && breadcrumb.color === 'purple' && "text-purple-600 dark:text-purple-400"
              )}>
                {breadcrumb.label}
              </span>
            </div>
            {!isLast && <ChevronRight className="w-4 h-4 mx-2" />}
          </div>
        );
      })}
    </nav>
  );
};
