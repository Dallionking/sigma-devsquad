
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Bot, Package, Brain, Monitor, Cog, Layers, Users, Home, ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUnifiedNavigation } from "@/hooks/useUnifiedNavigation";
import { useNavigationHistory } from "@/hooks/useNavigationHistory";
import { useNavigationShortcuts } from "@/hooks/useNavigationShortcuts";
import { ResponsiveNavigationWrapper } from "./ResponsiveNavigationWrapper";

interface EnhancedNavigationButtonsProps {
  onTeamViewToggle?: () => void;
  showTeamView?: boolean;
  showHistoryControls?: boolean;
}

export const EnhancedNavigationButtons = ({ 
  onTeamViewToggle, 
  showTeamView,
  showHistoryControls = true 
}: EnhancedNavigationButtonsProps) => {
  
  const navigationItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: Home,
      description: "Main dashboard overview",
      shortcut: "h",
      showOnMobile: true
    },
    {
      path: "/teams",
      label: "Teams",
      icon: Users,
      description: "Team management and collaboration",
      shortcut: "t",
      onClick: onTeamViewToggle,
      showOnMobile: true
    },
    {
      path: "/planning-agent",
      label: "Planning",
      icon: Layers,
      description: "Project planning and task management",
      shortcut: "p",
      showOnMobile: true
    },
    {
      path: "/agent-configuration",
      label: "Agents",
      icon: Bot,
      description: "Configure and manage AI agents",
      shortcut: "a",
      showOnMobile: true
    },
    {
      path: "/mcp-management",
      label: "MCP",
      icon: Package,
      description: "Model Context Protocol management",
      shortcut: "m",
      showOnMobile: false
    },
    {
      path: "/llm-integration",
      label: "LLM",
      icon: Brain,
      description: "Language model integration settings",
      shortcut: "l",
      showOnMobile: false
    },
    {
      path: "/ide-integration",
      label: "IDE",
      icon: Monitor,
      description: "Integrated development environment setup",
      shortcut: "i",
      showOnMobile: false
    },
    {
      path: "/settings",
      label: "Settings",
      icon: Cog,
      description: "Application settings and preferences",
      shortcut: ",",
      showOnMobile: true
    }
  ];

  const { items, handleNavigation, isNavigating, isMobile } = useUnifiedNavigation({
    items: navigationItems,
    enableKeyboardShortcuts: true
  });

  const { 
    canGoBack, 
    canGoForward, 
    goBack, 
    goForward 
  } = useNavigationHistory({
    enableKeyboardShortcuts: true
  });

  const { getShortcutText } = useNavigationShortcuts();

  const renderNavigationItems = () => (
    <>
      {/* History Controls */}
      {showHistoryControls && !isMobile && (
        <div className="flex items-center space-x-1 mr-2 border-r border-border/30 pr-2">
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={goBack}
                disabled={!canGoBack}
                className="h-8 w-8 p-0 hover:bg-accent/80 disabled:opacity-50"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="text-sm">Go back (Alt + ←)</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={goForward}
                disabled={!canGoForward}
                className="h-8 w-8 p-0 hover:bg-accent/80 disabled:opacity-50"
              >
                <ArrowRight className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="text-sm">Go forward (Alt + →)</p>
            </TooltipContent>
          </Tooltip>
        </div>
      )}

      {/* Navigation Items */}
      {items.map((item) => {
        const Icon = item.icon;
        const shortcutText = getShortcutText({
          key: item.shortcut || '',
          path: item.path,
          description: item.description || '',
          modifiers: { ctrl: true }
        });
        
        return (
          <Tooltip key={item.path} delayDuration={300}>
            <TooltipTrigger asChild>
              <Button
                variant={item.isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => handleNavigation(item)}
                disabled={isNavigating}
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
                  ],
                  // Mobile specific styles
                  isMobile && "w-full justify-start h-12 text-left"
                )}
              >
                <Icon className={cn("w-4 h-4", isMobile ? "mr-3" : "mr-2")} />
                <span className="font-medium">{item.label}</span>
                
                {/* Active indicator dot */}
                {item.isActive && !isMobile && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary-foreground rounded-full" />
                )}
                
                {/* Keyboard shortcut badge for mobile */}
                {isMobile && item.shortcut && (
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {shortcutText}
                  </Badge>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="font-medium">
              <div className="text-center">
                <p className="text-sm">{item.description}</p>
                {item.shortcut && !isMobile && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Press {shortcutText}
                  </p>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </>
  );

  return (
    <TooltipProvider>
      <ResponsiveNavigationWrapper
        triggerLabel="Open navigation menu"
        collapsible={false}
        className="hidden lg:flex items-center space-x-1"
        mobileContent={
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground mb-4">
              Navigation • Use keyboard shortcuts for quick access
            </div>
            {renderNavigationItems()}
          </div>
        }
      >
        {renderNavigationItems()}
      </ResponsiveNavigationWrapper>
    </TooltipProvider>
  );
};
