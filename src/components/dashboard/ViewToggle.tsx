
import React from 'react';
import { Users, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ViewToggleProps {
  showTeamView: boolean;
  onToggleView: (showTeamView: boolean) => void;
}

export const ViewToggle = ({ showTeamView, onToggleView }: ViewToggleProps) => {
  return (
    <div className="bg-background border-b border-border px-4 py-2 transition-all duration-300">
      <div className="flex items-center justify-center">
        {/* Compact Tab Container */}
        <div className="inline-flex bg-muted/30 rounded-md p-0.5 relative">
          {/* Team View Tab */}
          <button
            onClick={() => onToggleView(true)}
            className={cn(
              "relative px-4 py-1.5 rounded-sm transition-all duration-300 font-medium text-sm",
              "flex items-center gap-1.5 min-w-[120px] justify-center",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              showTeamView 
                ? "bg-background text-foreground shadow-sm border border-border/50" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted-foreground/5"
            )}
            aria-label="Switch to Team View (Alt+T)"
            title="Switch to Team View (Alt+T)"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Team View</span>
          </button>
          
          {/* Individual Agents Tab */}
          <button
            onClick={() => onToggleView(false)}
            className={cn(
              "relative px-4 py-1.5 rounded-sm transition-all duration-300 font-medium text-sm",
              "flex items-center gap-1.5 min-w-[120px] justify-center",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              !showTeamView 
                ? "bg-background text-foreground shadow-sm border border-border/50" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted-foreground/5"
            )}
            aria-label="Switch to Individual Agents View (Alt+I)"
            title="Switch to Individual Agents View (Alt+I)"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Individual</span>
          </button>
        </div>
      </div>
    </div>
  );
};
