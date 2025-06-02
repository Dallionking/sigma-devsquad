
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
  Settings,
  Home,
  Folder,
  CreditCard,
  User
} from "lucide-react";
import { ViewMode } from "@/types";
import { cn } from "@/lib/utils";
import { ProjectSwitcher } from "@/components/projects/ProjectSwitcher";
import { TeamSwitcher } from "@/components/navigation/TeamSwitcher";
import { useTeams } from "@/contexts/TeamContext";
import { useState } from "react";

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
  const { teams } = useTeams();
  const [currentTeamId, setCurrentTeamId] = useState<string>(teams[0]?.id || "");
  
  const isLLMPage = location.pathname === "/llm-integration";
  const isAgentConfigPage = location.pathname === "/agent-configuration";
  const isMCPPage = location.pathname === "/mcp-management";
  const isIDEPage = location.pathname === "/ide-integration";
  const isPlanningAgentPage = location.pathname === "/planning-agent";
  const isDashboardPage = location.pathname === "/dashboard";
  const isProjectsPage = location.pathname === "/projects";
  const isAccountPage = location.pathname === "/account";
  const isProfilePage = location.pathname === "/profile";
  const isSettingsPage = location.pathname === "/settings";

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // PRIMARY LEVEL - Large, prominent, with enhanced visual effects
  const primaryNavItems = [
    { path: "/dashboard", label: "Dashboard", icon: Home, active: isDashboardPage },
    { path: "/planning-agent", label: "Planning", icon: Layers, active: isPlanningAgentPage },
    { path: "/projects", label: "Projects", icon: Folder, active: isProjectsPage },
  ];

  // SECONDARY LEVEL - Medium size, distinct styling
  const configurationItems = [
    { path: "/agent-configuration", label: "Agent Configuration", icon: Bot, active: isAgentConfigPage },
    { path: "/mcp-management", label: "MCP Management", icon: Package, active: isMCPPage },
    { path: "/llm-integration", label: "LLM Integration", icon: Brain, active: isLLMPage },
    { path: "/ide-integration", label: "IDE Integration", icon: Monitor, active: isIDEPage },
  ];

  // SECONDARY LEVEL - Account items
  const accountItems = [
    { path: "/profile", label: "Profile", icon: User, active: isProfilePage },
    { path: "/account", label: "Account & Billing", icon: CreditCard, active: isAccountPage },
    { path: "/settings", label: "Settings", icon: Settings, active: isSettingsPage },
  ];

  return (
    <div className="flex items-center justify-between w-full">
      {/* Left: Project and Team Context */}
      <div className="flex items-center space-x-4">
        <div className="hidden lg:block">
          <ProjectSwitcher />
        </div>
        <div className="hidden lg:block">
          <TeamSwitcher 
            currentTeamId={currentTeamId}
            onTeamChange={setCurrentTeamId}
            compact
          />
        </div>
      </div>

      {/* Center: PRIMARY NAVIGATION - Enhanced with dramatic visual hierarchy */}
      <nav className="flex items-center" style={{ gap: '32px' }}>
        {primaryNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.path}
              variant={item.active ? "default" : "ghost"}
              size="lg"
              onClick={() => handleNavigation(item.path)}
              className={cn(
                "h-14 px-8 font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110",
                item.active 
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-blue-500/30 scale-110 ring-2 ring-blue-300 ring-offset-2" 
                  : "text-muted-foreground hover:text-foreground hover:bg-gradient-to-r hover:from-accent/50 hover:to-accent/30 hover:shadow-lg border-2 border-transparent hover:border-primary/20"
              )}
            >
              <Icon className="w-6 h-6 mr-3 drop-shadow-sm" />
              <span className="hidden sm:inline font-bold tracking-wide">{item.label}</span>
              {item.active && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
              )}
            </Button>
          );
        })}

        {/* SECONDARY LEVEL - Configuration Dropdown with distinct styling */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="default" 
              className="h-10 px-5 font-semibold text-base text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-950/30 hover:border-purple-300 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Bot className="w-5 h-5 mr-2" />
              <span className="hidden sm:inline">Configure</span>
              <ChevronDown className="w-4 h-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 bg-gradient-to-b from-purple-50 to-white dark:from-purple-950/30 dark:to-background border-purple-200 dark:border-purple-800 shadow-xl z-50">
            {configurationItems.map((item) => {
              const Icon = item.icon;
              return (
                <DropdownMenuItem
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={cn(
                    "flex items-center px-4 py-3 cursor-pointer transition-all duration-200 text-base font-medium",
                    item.active && "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 border-l-4 border-purple-500"
                  )}
                >
                  <Icon className="w-5 h-5 mr-3 text-purple-600 dark:text-purple-400" />
                  <span>{item.label}</span>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>

      {/* Right: SECONDARY LEVEL - Account & Settings Dropdown */}
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="default"
              className="h-10 px-5 font-semibold text-base text-green-600 dark:text-green-400 border-green-200 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-950/30 hover:border-green-300 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <User className="w-5 h-5 mr-2" />
              <span className="hidden sm:inline">Account</span>
              <ChevronDown className="w-4 h-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 bg-gradient-to-b from-green-50 to-white dark:from-green-950/30 dark:to-background border-green-200 dark:border-green-800 shadow-xl">
            {accountItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.path}>
                  <DropdownMenuItem
                    onClick={() => handleNavigation(item.path)}
                    className={cn(
                      "flex items-center px-4 py-3 cursor-pointer transition-all duration-200 text-base font-medium",
                      item.active && "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-l-4 border-green-500"
                    )}
                  >
                    <Icon className="w-5 h-5 mr-3 text-green-600 dark:text-green-400" />
                    <span>{item.label}</span>
                  </DropdownMenuItem>
                  {index === 0 && <DropdownMenuSeparator />}
                </div>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
