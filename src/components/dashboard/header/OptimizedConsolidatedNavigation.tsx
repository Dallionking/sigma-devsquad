
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
  User,
  MoreVertical
} from "lucide-react";
import { ViewMode } from "@/types";
import { cn } from "@/lib/utils";

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

  // PRIMARY LEVEL - Main navigation items
  const primaryNavItems = [
    { path: "/dashboard", label: "Dashboard", icon: Home, active: isDashboardPage, priority: 1 },
    { path: "/planning-agent", label: "Planning", icon: Layers, active: isPlanningAgentPage, priority: 2 },
    { path: "/projects", label: "Projects", icon: Folder, active: isProjectsPage, priority: 3 },
  ];

  // SECONDARY LEVEL - Configuration items
  const configurationItems = [
    { path: "/agent-configuration", label: "Agent Config", icon: Bot, active: isAgentConfigPage },
    { path: "/mcp-management", label: "MCP Management", icon: Package, active: isMCPPage },
    { path: "/llm-integration", label: "LLM Integration", icon: Brain, active: isLLMPage },
    { path: "/ide-integration", label: "IDE Integration", icon: Monitor, active: isIDEPage },
  ];

  // SECONDARY LEVEL - Account items
  const accountItems = [
    { path: "/profile", label: "Profile", icon: User, active: isProfilePage },
    { path: "/account", label: "Account", icon: CreditCard, active: isAccountPage },
    { path: "/settings", label: "Settings", icon: Settings, active: isSettingsPage },
  ];

  return (
    <div className="flex items-center justify-center w-full max-w-full h-8 box-border overflow-hidden">
      {/* Center Section: PRIMARY NAVIGATION - Full width centered */}
      <div className="flex-1 flex justify-center items-center min-w-0 max-w-2xl">
        <nav className="flex items-center gap-0.5 bg-muted/20 rounded-md p-0.5">
          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.path}
                variant={item.active ? "default" : "ghost"}
                size="sm"
                onClick={() => handleNavigation(item.path)}
                className={cn(
                  "h-6 px-2 text-xs font-medium transition-all duration-200 min-w-0",
                  item.active 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                <Icon className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="hidden sm:inline truncate max-w-16">{item.label}</span>
              </Button>
            );
          })}
        </nav>
      </div>

      {/* Right Section: Secondary Actions - Compact */}
      <div className="flex items-center gap-0.5 flex-shrink-0 ml-2">
        {/* Configuration Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-6 px-2 text-xs font-medium border-border/50 hover:bg-accent/50 transition-all duration-200 min-w-0"
            >
              <Bot className="w-3 h-3 mr-1 flex-shrink-0" />
              <span className="hidden md:inline max-w-12 truncate">Config</span>
              <ChevronDown className="w-2 h-2 ml-1 flex-shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="center" 
            className="w-40 bg-background/95 backdrop-blur-sm border shadow-lg z-[100]"
          >
            {configurationItems.map((item) => {
              const Icon = item.icon;
              return (
                <DropdownMenuItem
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={cn(
                    "flex items-center px-2 py-1.5 cursor-pointer transition-all duration-200 text-xs",
                    item.active && "bg-accent text-accent-foreground"
                  )}
                >
                  <Icon className="w-3 h-3 mr-2 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Account Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-6 px-2 text-xs font-medium border-border/50 hover:bg-accent/50 transition-all duration-200 min-w-0"
            >
              <User className="w-3 h-3 mr-1 flex-shrink-0" />
              <span className="hidden md:inline max-w-12 truncate">Account</span>
              <ChevronDown className="w-2 h-2 ml-1 flex-shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="w-40 bg-background/95 backdrop-blur-sm border shadow-lg z-[100]"
          >
            {accountItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.path}>
                  <DropdownMenuItem
                    onClick={() => handleNavigation(item.path)}
                    className={cn(
                      "flex items-center px-2 py-1.5 cursor-pointer transition-all duration-200 text-xs",
                      item.active && "bg-accent text-accent-foreground"
                    )}
                  >
                    <Icon className="w-3 h-3 mr-2 flex-shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </DropdownMenuItem>
                  {index === 0 && <DropdownMenuSeparator />}
                </div>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Overflow Menu for Mobile */}
        <div className="block sm:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-6 w-6 p-0"
              >
                <MoreVertical className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-48 bg-background/95 backdrop-blur-sm border shadow-lg z-[100]"
            >
              <div className="py-1">
                <div className="px-2 py-1 text-xs font-medium text-muted-foreground">Navigation</div>
                {primaryNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <DropdownMenuItem
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      className={cn(
                        "flex items-center px-2 py-1.5 cursor-pointer text-xs",
                        item.active && "bg-accent text-accent-foreground"
                      )}
                    >
                      <Icon className="w-3 h-3 mr-2" />
                      <span>{item.label}</span>
                    </DropdownMenuItem>
                  );
                })}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
