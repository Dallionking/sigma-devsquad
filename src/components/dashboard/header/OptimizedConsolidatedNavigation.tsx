
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
  Layers, 
  ChevronDown,
  FolderOpen,
  Settings
} from "lucide-react";
import { ViewMode } from "@/types";
import { cn } from "@/lib/utils";
import { ProjectSwitcher } from "@/components/projects/ProjectSwitcher";

interface OptimizedConsolidatedNavigationProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  notificationCounts: {
    workflow: number;
    communication: number;
    tasks: number;
    messages: number;
  };
}

export const OptimizedConsolidatedNavigation = ({ 
  viewMode, 
  onViewModeChange, 
  notificationCounts 
}: OptimizedConsolidatedNavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isSettingsPage = location.pathname === "/settings";
  const isLLMPage = location.pathname === "/llm-integration";
  const isAgentConfigPage = location.pathname === "/agent-configuration";
  const isMCPPage = location.pathname === "/mcp-management";
  const isIDEPage = location.pathname === "/ide-integration";
  const isPlanningAgentPage = location.pathname === "/planning-agent";
  const isDashboardPage = location.pathname === "/dashboard";
  const isProjectsPage = location.pathname === "/projects";

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const primaryNavItems = [
    { path: "/projects", label: "Projects", icon: FolderOpen, active: isProjectsPage },
    { path: "/dashboard", label: "Dashboard", icon: null, active: isDashboardPage },
    { path: "/planning-agent", label: "Planning", icon: Layers, active: isPlanningAgentPage },
  ];

  const configurationItems = [
    { path: "/agent-configuration", label: "Agent Config", icon: Bot, active: isAgentConfigPage },
    { path: "/mcp-management", label: "MCP Management", icon: Package, active: isMCPPage },
    { path: "/llm-integration", label: "LLM Integration", icon: Brain, active: isLLMPage },
    { path: "/ide-integration", label: "IDE Integration", icon: Monitor, active: isIDEPage },
    { path: "/settings", label: "Settings", icon: Settings, active: isSettingsPage },
  ];

  return (
    <div className="flex items-center space-x-6">
      {/* Project Switcher */}
      <div className="hidden lg:block">
        <ProjectSwitcher />
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-border/30 hidden lg:block" />

      {/* Primary Navigation - Modern FANG style spacing */}
      <nav className="flex items-center space-x-1">
        {primaryNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.path}
              variant={item.active ? "default" : "ghost"}
              size="sm"
              onClick={() => handleNavigation(item.path)}
              className={cn(
                "h-9 px-4 font-medium transition-all duration-200",
                item.active 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
            >
              {Icon && <Icon className="w-4 h-4 mr-2" />}
              <span className="hidden sm:inline">{item.label}</span>
            </Button>
          );
        })}
      </nav>

      {/* Configuration Dropdown */}
      <div className="w-px h-6 bg-border/30" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-9 px-4 font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-200"
          >
            <Bot className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Configure</span>
            <ChevronDown className="w-3 h-3 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52 bg-background/95 backdrop-blur-sm border shadow-lg">
          {configurationItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.path}>
                <DropdownMenuItem
                  onClick={() => handleNavigation(item.path)}
                  className={cn(
                    "flex items-center px-3 py-2.5 cursor-pointer transition-colors",
                    item.active && "bg-accent text-accent-foreground"
                  )}
                >
                  <Icon className="w-4 h-4 mr-3 text-muted-foreground" />
                  <span className="font-medium">{item.label}</span>
                </DropdownMenuItem>
                {index === 3 && <DropdownMenuSeparator />}
              </div>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
