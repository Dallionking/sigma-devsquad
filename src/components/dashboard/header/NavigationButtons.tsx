
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { Bot, Package, Brain, Monitor, Cog, Layers } from "lucide-react";

export const NavigationButtons = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isSettingsPage = location.pathname === "/settings";
  const isLLMPage = location.pathname === "/llm-integration";
  const isAgentConfigPage = location.pathname === "/agent-configuration";
  const isMCPPage = location.pathname === "/mcp-management";
  const isIDEPage = location.pathname === "/ide-integration";
  const isPlanningAgentPage = location.pathname === "/planning-agent";
  const isDashboardPage = location.pathname === "/";

  return (
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
  );
};
