
import { Bell, Users, Activity, MessageSquare, CheckSquare, GitBranch, Brain, Cog, Bot, Package, Monitor, Moon, Sun, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ViewMode, Agent } from "@/types";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { Logo } from "@/components/branding/Logo";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  agents: Agent[];
}

export const Header = ({ viewMode, onViewModeChange, agents }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useTheme();
  const isMobile = useIsMobile();
  
  const activeAgents = agents?.filter(agent => agent.status === "working").length || 0;
  const totalAgents = agents?.length || 0;
  
  const viewModeConfig = {
    workflow: { icon: GitBranch, label: "Workflow" },
    communication: { icon: MessageSquare, label: "Communication" },
    tasks: { icon: CheckSquare, label: "Tasks" },
    messages: { icon: Activity, label: "Messages" }
  };

  // Preserve all existing navigation states
  const isSettingsPage = location.pathname === "/settings";
  const isLLMPage = location.pathname === "/llm-integration";
  const isAgentConfigPage = location.pathname === "/agent-configuration";
  const isMCPPage = location.pathname === "/mcp-management";
  const isIDEPage = location.pathname === "/ide-integration";
  const isPlanningAgentPage = location.pathname === "/planning-agent";
  const isAgentCreationPage = location.pathname === "/agent-creation";
  const isDashboardPage = location.pathname === "/";

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <header className="bg-card border-b border-border px-4 sm:px-6 py-3 sm:py-4 sticky top-0 z-40 backdrop-blur-sm bg-card/95">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 sm:space-x-6">
          {/* Mobile Navigation */}
          <MobileNavigation activeAgents={activeAgents} totalAgents={totalAgents} />
          
          {/* Preserved Logo Navigation */}
          <div 
            onClick={handleLogoClick}
            className="cursor-pointer hover:opacity-80 transition-opacity"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleLogoClick();
              }
            }}
            aria-label="Go to dashboard"
          >
            <Logo 
              size={isMobile ? "sm" : "md"} 
              variant={isMobile ? "icon" : "full"} 
            />
          </div>
          
          {/* Preserved View Mode Selector - MUST MAINTAIN FUNCTIONALITY */}
          {!isMobile && isDashboardPage && (
            <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
              {Object.entries(viewModeConfig).map(([mode, config]) => {
                const Icon = config.icon;
                return (
                  <Button
                    key={mode}
                    variant={viewMode === mode ? "default" : "ghost"}
                    size="sm"
                    onClick={() => onViewModeChange(mode as ViewMode)}
                    className="h-8 px-3"
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {config.label}
                  </Button>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Preserved Status Badge */}
          {!isMobile && (
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground hidden sm:inline">System Healthy</span>
              </div>
              <Badge variant="secondary" className="bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                <Users className="w-3 h-3 mr-1" />
                {activeAgents}/{totalAgents} Active
              </Badge>
            </div>
          )}
          
          {/* Preserved Navigation Buttons - MUST MAINTAIN ALL FUNCTIONALITY */}
          {!isMobile && (
            <div className="hidden lg:flex items-center space-x-2">
              <Button 
                variant={isDashboardPage ? "default" : "ghost"} 
                size="sm"
                onClick={() => navigate("/")}
              >
                Dashboard
              </Button>
              <Button 
                variant={isPlanningAgentPage ? "default" : "ghost"} 
                size="sm"
                onClick={() => navigate("/planning-agent")}
              >
                <Layers className="w-4 h-4 mr-2" />
                Planning
              </Button>
              <Button 
                variant={isAgentConfigPage ? "default" : "ghost"} 
                size="sm"
                onClick={() => navigate("/agent-configuration")}
              >
                <Bot className="w-4 h-4 mr-2" />
                Agents
              </Button>
              <Button 
                variant={isMCPPage ? "default" : "ghost"} 
                size="sm"
                onClick={() => navigate("/mcp-management")}
              >
                <Package className="w-4 h-4 mr-2" />
                MCP
              </Button>
              <Button 
                variant={isLLMPage ? "default" : "ghost"} 
                size="sm"
                onClick={() => navigate("/llm-integration")}
              >
                <Brain className="w-4 h-4 mr-2" />
                LLM
              </Button>
              <Button 
                variant={isIDEPage ? "default" : "ghost"} 
                size="sm"
                onClick={() => navigate("/ide-integration")}
              >
                <Monitor className="w-4 h-4 mr-2" />
                IDE
              </Button>
              <Button 
                variant={isSettingsPage ? "default" : "ghost"} 
                size="sm"
                onClick={() => navigate("/settings")}
              >
                <Cog className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          )}
          
          {/* Preserved Action Buttons */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Button variant="ghost" size="sm" onClick={toggleDarkMode}>
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
