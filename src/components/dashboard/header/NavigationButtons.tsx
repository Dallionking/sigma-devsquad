
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate, useLocation } from "react-router-dom";
import { Bot, Package, Brain, Monitor, Cog, Layers, Users, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationButtonsProps {
  onTeamViewToggle?: () => void;
  showTeamView?: boolean;
}

export const NavigationButtons = ({ onTeamViewToggle, showTeamView }: NavigationButtonsProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navigationItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: Home,
      description: "Main dashboard overview",
      isActive: location.pathname === "/dashboard" && !showTeamView,
      onClick: () => navigate("/dashboard")
    },
    {
      path: "/teams",
      label: "Teams",
      icon: Users,
      description: "Team management and collaboration",
      isActive: showTeamView || location.pathname.includes("/team"),
      onClick: onTeamViewToggle,
      showOnDashboard: true
    },
    {
      path: "/planning-agent",
      label: "Planning",
      icon: Layers,
      description: "Project planning and task management",
      isActive: location.pathname === "/planning-agent",
      onClick: () => navigate("/planning-agent")
    },
    {
      path: "/agent-configuration",
      label: "Agents",
      icon: Bot,
      description: "Configure and manage AI agents",
      isActive: location.pathname === "/agent-configuration",
      onClick: () => navigate("/agent-configuration")
    },
    {
      path: "/mcp-management",
      label: "MCP",
      icon: Package,
      description: "Model Context Protocol management",
      isActive: location.pathname === "/mcp-management",
      onClick: () => navigate("/mcp-management")
    },
    {
      path: "/llm-integration",
      label: "LLM",
      icon: Brain,
      description: "Language model integration settings",
      isActive: location.pathname === "/llm-integration",
      onClick: () => navigate("/llm-integration")
    },
    {
      path: "/ide-integration",
      label: "IDE",
      icon: Monitor,
      description: "Integrated development environment setup",
      isActive: location.pathname === "/ide-integration",
      onClick: () => navigate("/ide-integration")
    },
    {
      path: "/settings",
      label: "Settings",
      icon: Cog,
      description: "Application settings and preferences",
      isActive: location.pathname === "/settings",
      onClick: () => navigate("/settings")
    }
  ];

  const isDashboardPage = location.pathname === "/dashboard";

  return (
    <TooltipProvider>
      <div className="hidden lg:flex items-center space-x-1">
        {navigationItems.map((item) => {
          // Show team button only on dashboard page if onTeamViewToggle is provided
          if (item.showOnDashboard && !isDashboardPage && item.onClick === onTeamViewToggle) {
            return null;
          }

          const Icon = item.icon;
          
          return (
            <Tooltip key={item.path} delayDuration={300}>
              <TooltipTrigger asChild>
                <Button
                  variant={item.isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={item.onClick}
                  className={cn(
                    "h-8 px-3 transition-all duration-200 relative",
                    // Active state with enhanced styling
                    item.isActive && [
                      "bg-primary text-primary-foreground shadow-md",
                      "before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2",
                      "before:w-1 before:h-1 before:bg-primary-foreground before:rounded-full"
                    ],
                    // Enhanced hover states
                    !item.isActive && [
                      "hover:bg-accent/80 hover:text-accent-foreground",
                      "hover:scale-105 hover:shadow-sm",
                      "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    ]
                  )}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  <span className="font-medium">{item.label}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="font-medium">
                <p className="text-sm">{item.description}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
};
