
import React from 'react';
import { Users, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ViewToggleProps {
  showTeamView: boolean;
  onToggleView: (showTeamView: boolean) => void;
}

export const ViewToggle = ({ showTeamView, onToggleView }: ViewToggleProps) => {
  return (
    <div className="bg-background border-b border-border px-6 py-4 transition-all duration-300">
      <div className="flex items-center justify-center">
        {/* Tab Container */}
        <div className="inline-flex bg-muted rounded-lg p-1 relative">
          {/* Team View Tab */}
          <button
            onClick={() => onToggleView(true)}
            className={cn(
              "relative px-6 py-3 rounded-md transition-all duration-300 font-medium text-sm",
              "flex items-center gap-2 min-w-[160px] justify-center",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              showTeamView 
                ? "bg-background text-foreground shadow-sm border border-border/50" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted-foreground/5"
            )}
            aria-label="Switch to Team View (Alt+T)"
            title="Switch to Team View (Alt+T)"
          >
            <Users className="w-4 h-4" />
            <span>Team View</span>
            {/* Active indicator */}
            {showTeamView && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
            )}
          </button>
          
          {/* Individual Agents Tab */}
          <button
            onClick={() => onToggleView(false)}
            className={cn(
              "relative px-6 py-3 rounded-md transition-all duration-300 font-medium text-sm",
              "flex items-center gap-2 min-w-[160px] justify-center",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              !showTeamView 
                ? "bg-background text-foreground shadow-sm border border-border/50" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted-foreground/5"
            )}
            aria-label="Switch to Individual Agents View (Alt+I)"
            title="Switch to Individual Agents View (Alt+I)"
          >
            <Bot className="w-4 h-4" />
            <span>Individual Agents</span>
            {/* Active indicator */}
            {!showTeamView && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
