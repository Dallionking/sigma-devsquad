
import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ViewToggleProps {
  showTeamView: boolean;
  onToggleView: (showTeamView: boolean) => void;
}

export const ViewToggle = ({ showTeamView, onToggleView }: ViewToggleProps) => {
  return (
    <div className="bg-background border-b px-4 py-3 transition-all duration-300">
      <div className="flex items-center justify-center">
        <div className="inline-flex bg-gray-800 rounded-lg p-1 gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleView(true)}
            className={cn(
              "relative h-12 px-4 rounded-md transition-all duration-300 font-medium",
              "flex items-center gap-3 min-w-[140px] justify-center",
              showTeamView 
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-sm" 
                : "bg-transparent text-gray-300 hover:bg-gray-700/50 hover:text-white"
            )}
          >
            <Users className="w-4 h-4" />
            <span>Team View</span>
            {showTeamView && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-blue-400 rounded-full animate-in fade-in duration-300" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleView(false)}
            className={cn(
              "relative h-12 px-4 rounded-md transition-all duration-300 font-medium",
              "flex items-center gap-3 min-w-[140px] justify-center",
              !showTeamView 
                ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-sm" 
                : "bg-transparent text-gray-300 hover:bg-gray-700/50 hover:text-white"
            )}
          >
            <Bot className="w-4 h-4" />
            <span>Individual Agents</span>
            {!showTeamView && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-purple-400 rounded-full animate-in fade-in duration-300" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
