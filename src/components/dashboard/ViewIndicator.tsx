
import React from 'react';
import { Users, Bot, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ViewIndicatorProps {
  showTeamView: boolean;
  className?: string;
}

export const ViewIndicator = ({ showTeamView, className }: ViewIndicatorProps) => {
  const Icon = showTeamView ? Users : Bot;
  const viewName = showTeamView ? 'Team View' : 'Individual Agents';
  const description = showTeamView 
    ? 'Managing collaborative teams and workflows'
    : 'Monitoring individual AI agents and tasks';

  return (
    <div className={cn(
      "flex items-center space-x-3 px-4 py-2 rounded-lg border",
      showTeamView 
        ? "bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800" 
        : "bg-purple-50 border-purple-200 dark:bg-purple-950/30 dark:border-purple-800",
      className
    )}>
      <div className={cn(
        "p-1.5 rounded-md",
        showTeamView 
          ? "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
          : "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400"
      )}>
        <Eye className="w-4 h-4" />
      </div>
      
      <div className="flex items-center space-x-2">
        <Icon className={cn(
          "w-4 h-4",
          showTeamView ? "text-blue-600 dark:text-blue-400" : "text-purple-600 dark:text-purple-400"
        )} />
        <div>
          <span className={cn(
            "font-medium text-sm",
            showTeamView ? "text-blue-900 dark:text-blue-100" : "text-purple-900 dark:text-purple-100"
          )}>
            You are viewing: {viewName}
          </span>
          <p className="text-xs text-muted-foreground hidden md:block">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
