
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NavigationButtons } from "@/components/dashboard/header/NavigationButtons";
import { Sidebar, Activity, Zap } from "lucide-react";

interface StreamlinedHeaderProps {
  activeAgents: number;
  totalAgents: number;
  onSidebarToggle: () => void;
  sidebarCollapsed: boolean;
  onTeamViewToggle?: () => void;
  showTeamView?: boolean;
}

export const StreamlinedHeader = ({ 
  activeAgents, 
  totalAgents, 
  onSidebarToggle, 
  sidebarCollapsed,
  onTeamViewToggle,
  showTeamView
}: StreamlinedHeaderProps) => {
  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left Section - Logo and Navigation */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary via-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold vibe-gradient-text">Vibe</h1>
              <p className="text-xs text-muted-foreground">AI Workforce</p>
            </div>
          </div>
          
          <NavigationButtons 
            onTeamViewToggle={onTeamViewToggle}
            showTeamView={showTeamView}
          />
        </div>

        {/* Center Section - Status */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm">
            <Activity className="w-4 h-4 text-green-500" />
            <span className="text-muted-foreground">Active:</span>
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              {activeAgents}/{totalAgents}
            </Badge>
          </div>
        </div>

        {/* Right Section - Controls */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onSidebarToggle}
            className="lg:hidden"
          >
            <Sidebar className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};
