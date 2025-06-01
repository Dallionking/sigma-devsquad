
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate, useLocation } from "react-router-dom";
import { Bot, Package, Brain, Monitor, Cog, Layers, Users, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface EnhancedNavigationButtonsProps {
  onTeamViewToggle?: () => void;
  showTeamView?: boolean;
}

export const EnhancedNavigationButtons = ({ onTeamViewToggle, showTeamView }: EnhancedNavigationButtonsProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navigationItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: Home,
      description: "Main dashboard overview",
      isActive: location.pathname === "/dashboard" && !showTeamView
    },
    {
      path: "/teams",
      label: "Teams",
      icon: Users,
      description: "Team management and collaboration",
      isActive: showTeamView || location.pathname.includes("/team"),
      onClick: onTeamViewToggle
    },
    {
      path: "/planning-agent",
      label: "Planning",
      icon: Layers,
      description: "Project planning and task management",
      isActive: location.pathname === "/planning-agent"
    },
    {
      path: "/agent-configuration",
      label: "Agents",
      icon: Bot,
      description: "Configure and manage AI agents",
      isActive: location.pathname === "/agent-configuration"
    },
    {
      path: "/mcp-management",
      label: "MCP",
      icon: Package,
      description: "Model Context Protocol management",
      isActive: location.pathname === "/mcp-management"
    },
    {
      path: "/llm-integration",
      label: "LLM",
      icon: Brain,
      description: "Language model integration settings",
      isActive: location.pathname === "/llm-integration"
    },
    {
      path: "/ide-integration",
      label: "IDE",
      icon: Monitor,
      description: "Integrated development environment setup",
      isActive: location.pathname === "/ide-integration"
    },
    {
      path: "/settings",
      label: "Settings",
      icon: Cog,
      description: "Application settings and preferences",
      isActive: location.pathname === "/settings"
    }
  ];

  const handleNavigation = (item: typeof navigationItems[0]) => {
    if (item.onClick) {
      item.onClick();
    } else {
      navigate(item.path);
    }
  };

  return (
    <TooltipProvider>
      <div className="hidden lg:flex items-center space-x-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          
          return (
            <Tooltip key={item.path} delayDuration={300}>
              <TooltipTrigger asChild>
                <Button
                  variant={item.isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleNavigation(item)}
                  className={cn(
                    "h-9 px-3 transition-all duration-200 relative",
                    // Active state with enhanced styling
                    item.isActive && [
                      "bg-primary text-primary-foreground shadow-md",
                      "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2",
                      "after:w-1 after:h-1 after:bg-primary-foreground after:rounded-full"
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
                  
                  {/* Active indicator dot */}
                  {item.isActive && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary-foreground rounded-full" />
                  )}
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
