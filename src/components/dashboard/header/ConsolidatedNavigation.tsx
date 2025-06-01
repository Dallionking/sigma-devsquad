
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Bot, 
  Package, 
  Brain, 
  Monitor, 
  Cog, 
  Layers, 
  ChevronDown,
  Home
} from "lucide-react";
import { ViewMode } from "@/types";
import { cn } from "@/lib/utils";

interface ConsolidatedNavigationProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  notificationCounts: {
    workflow: number;
    communication: number;
    tasks: number;
    messages: number;
  };
}

export const ConsolidatedNavigation = ({ 
  viewMode, 
  onViewModeChange, 
  notificationCounts 
}: ConsolidatedNavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isSettingsPage = location.pathname === "/settings";
  const isLLMPage = location.pathname === "/llm-integration";
  const isAgentConfigPage = location.pathname === "/agent-configuration";
  const isMCPPage = location.pathname === "/mcp-management";
  const isIDEPage = location.pathname === "/ide-integration";
  const isPlanningAgentPage = location.pathname === "/planning-agent";
  const isDashboardPage = location.pathname === "/dashboard";

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const primaryNavItems = [
    { path: "/", label: "Home", icon: Home, active: location.pathname === "/" },
    { path: "/dashboard", label: "Dashboard", icon: Home, active: isDashboardPage },
    { path: "/planning-agent", label: "Planning", icon: Layers, active: isPlanningAgentPage },
  ];

  const configurationItems = [
    { path: "/agent-configuration", label: "Agent Config", icon: Bot, active: isAgentConfigPage },
    { path: "/mcp-management", label: "MCP Management", icon: Package, active: isMCPPage },
    { path: "/llm-integration", label: "LLM Integration", icon: Brain, active: isLLMPage },
    { path: "/ide-integration", label: "IDE Integration", icon: Monitor, active: isIDEPage },
    { path: "/settings", label: "Settings", icon: Cog, active: isSettingsPage },
  ];

  return (
    <div className="flex items-center space-x-1">
      {/* Primary Navigation */}
      <div className="flex items-center space-x-1">
        {primaryNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.path}
              variant={item.active ? "default" : "ghost"}
              size="sm"
              onClick={() => handleNavigation(item.path)}
              className="h-9 px-3"
            >
              <Icon className="w-4 h-4 mr-2" />
              <span className="hidden lg:inline">{item.label}</span>
            </Button>
          );
        })}
      </div>

      {/* Configuration Dropdown */}
      <div className="w-px h-6 bg-border mx-2" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-9 px-3">
            <Cog className="w-4 h-4 mr-2" />
            <span className="hidden lg:inline">Configure</span>
            <ChevronDown className="w-3 h-3 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 bg-background border shadow-lg">
          {configurationItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.path}>
                <DropdownMenuItem
                  onClick={() => handleNavigation(item.path)}
                  className={cn(
                    "flex items-center px-3 py-2 cursor-pointer",
                    item.active && "bg-accent text-accent-foreground"
                  )}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  <span>{item.label}</span>
                </DropdownMenuItem>
                {index === 0 && <DropdownMenuSeparator />}
              </div>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
