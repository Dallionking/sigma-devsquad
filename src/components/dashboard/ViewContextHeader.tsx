
import React from 'react';
import { Users, Bot, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ViewContextHeaderProps {
  showTeamView: boolean;
  className?: string;
}

export const ViewContextHeader = ({ showTeamView, className }: ViewContextHeaderProps) => {
  const Icon = showTeamView ? Users : Bot;
  const viewName = showTeamView ? 'Team View' : 'Individual Agents';
  const description = showTeamView 
    ? 'Manage teams and collaborative workflows'
    : 'Configure individual AI agents and tasks';

  return (
    <div className={cn(
      "px-6 py-4 border-b border-border/50 transition-all duration-300",
      showTeamView 
        ? "bg-gradient-to-r from-blue-50 via-blue-50/50 to-transparent dark:from-blue-950/30 dark:via-blue-950/10 dark:to-transparent" 
        : "bg-gradient-to-r from-purple-50 via-purple-50/50 to-transparent dark:from-purple-950/30 dark:via-purple-950/10 dark:to-transparent",
      className
    )}>
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center text-sm text-muted-foreground mb-3">
        <span>Dashboard</span>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className={cn(
          "font-medium transition-colors duration-300",
          showTeamView ? "text-blue-600 dark:text-blue-400" : "text-purple-600 dark:text-purple-400"
        )}>
          {viewName}
        </span>
      </nav>

      {/* View Header */}
      <div className="flex items-center space-x-3">
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300",
          showTeamView 
            ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" 
            : "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
        )}>
          <Icon className="w-5 h-5" />
        </div>
        
        <div className="animate-in fade-in duration-300">
          <h2 className={cn(
            "text-xl font-semibold transition-colors duration-300",
            showTeamView ? "text-blue-900 dark:text-blue-100" : "text-purple-900 dark:text-purple-100"
          )}>
            {viewName}
          </h2>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
