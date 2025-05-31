
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { Bot, Package, Brain, Monitor, Cog, Layers, Users } from "lucide-react";

interface NavigationButtonsProps {
  onTeamViewToggle?: () => void;
  showTeamView?: boolean;
}

export const NavigationButtons = ({ onTeamViewToggle, showTeamView }: NavigationButtonsProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isSettingsPage = location.pathname === "/settings";
  const isLLMPage = location.pathname === "/llm";
  const isAgentConfigPage = location.pathname === "/agents/config";
  const isMCPPage = location.pathname === "/mcp";
  const isIDEPage = location.pathname === "/ide";
  const isPlanningAgentPage = location.pathname === "/planning";
  const isDashboardPage = location.pathname === "/dashboard";

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleTeamToggle = () => {
    if (onTeamViewToggle) {
      onTeamViewToggle();
    }
  };

  return (
    <div className="hidden lg:flex items-center space-x-1">
      <Button 
        variant={isDashboardPage && !showTeamView ? "default" : "ghost"} 
        size="sm"
        onClick={() => handleNavigation("/dashboard")}
        className="h-8"
      >
        Dashboard
      </Button>
      {isDashboardPage && onTeamViewToggle && (
        <Button 
          variant={showTeamView ? "default" : "ghost"} 
          size="sm"
          onClick={handleTeamToggle}
          className="h-8"
        >
          <Users className="w-4 h-4 mr-2" />
          Teams
        </Button>
      )}
      <Button 
        variant={isPlanningAgentPage ? "default" : "ghost"} 
        size="sm"
        onClick={() => handleNavigation("/planning")}
        className="h-8"
      >
        <Layers className="w-4 h-4 mr-2" />
        Planning
      </Button>
      <Button 
        variant={isAgentConfigPage ? "default" : "ghost"} 
        size="sm"
        onClick={() => handleNavigation("/agents/config")}
        className="h-8"
      >
        <Bot className="w-4 h-4 mr-2" />
        Agents
      </Button>
      <Button 
        variant={isMCPPage ? "default" : "ghost"} 
        size="sm"
        onClick={() => handleNavigation("/mcp")}
        className="h-8"
      >
        <Package className="w-4 h-4 mr-2" />
        MCP
      </Button>
      <Button 
        variant={isLLMPage ? "default" : "ghost"} 
        size="sm"
        onClick={() => handleNavigation("/llm")}
        className="h-8"
      >
        <Brain className="w-4 h-4 mr-2" />
        LLM
      </Button>
      <Button 
        variant={isIDEPage ? "default" : "ghost"} 
        size="sm"
        onClick={() => handleNavigation("/ide")}
        className="h-8"
      >
        <Monitor className="w-4 h-4 mr-2" />
        IDE
      </Button>
      <Button 
        variant={isSettingsPage ? "default" : "ghost"} 
        size="sm"
        onClick={() => handleNavigation("/settings")}
        className="h-8"
      >
        <Cog className="w-4 h-4 mr-2" />
        Settings
      </Button>
    </div>
  );
};
