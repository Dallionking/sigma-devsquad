
import React from 'react';

interface ViewToggleProps {
  showTeamView: boolean;
  onToggleView: (showTeamView: boolean) => void;
}

export const ViewToggle = ({ showTeamView, onToggleView }: ViewToggleProps) => {
  return (
    <div className="bg-background border-b px-4 py-2">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onToggleView(true)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            showTeamView 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          🏢 Team View
        </button>
        <button
          onClick={() => onToggleView(false)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            !showTeamView 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          👤 Individual Agents
        </button>
      </div>
    </div>
  );
};
