
import { Bell, Settings, Users, Activity, MessageSquare, CheckSquare, GitBranch, Brain, Cog, Bot, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ViewMode, Agent } from "@/pages/Index";
import { useNavigate, useLocation } from "react-router-dom";

interface HeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  agents: Agent[];
}

export const Header = ({ viewMode, onViewModeChange, agents }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeAgents = agents.filter(agent => agent.status === "working").length;
  const totalAgents = agents.length;
  
  const viewModeConfig = {
    workflow: { icon: GitBranch, label: "Workflow" },
    communication: { icon: MessageSquare, label: "Communication" },
    tasks: { icon: CheckSquare, label: "Tasks" },
    messages: { icon: Activity, label: "Messages" }
  };

  const isSettingsPage = location.pathname === "/settings";
  const isLLMPage = location.pathname === "/llm-integration";
  const isAgentConfigPage = location.pathname === "/agent-configuration";
  const isMCPPage = location.pathname === "/mcp-management";

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">AI Development Workforce</h1>
            <p className="text-sm text-slate-500">
              {activeAgents} of {totalAgents} agents active
            </p>
          </div>
          
          {/* Show view mode selector only on the main dashboard */}
          {location.pathname === "/" && (
            <div className="flex items-center space-x-1 bg-slate-100 rounded-lg p-1">
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

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-slate-600">System Healthy</span>
            </div>
            <Badge variant="secondary" className="bg-blue-50 text-blue-700">
              <Users className="w-3 h-3 mr-1" />
              {activeAgents} Active
            </Badge>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex items-center space-x-2">
            <Button 
              variant={location.pathname === "/" ? "default" : "ghost"} 
              size="sm"
              onClick={() => navigate("/")}
            >
              Dashboard
            </Button>
            <Button 
              variant={isAgentConfigPage ? "default" : "ghost"} 
              size="sm"
              onClick={() => navigate("/agent-configuration")}
            >
              <Bot className="w-4 h-4 mr-2" />
              Agent Config
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
              LLM Integration
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
          
          <Button variant="ghost" size="sm">
            <Bell className="w-4 h-4" />
          </Button>
          
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};
