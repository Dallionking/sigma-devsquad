import { Bell, Users, Activity, MessageSquare, CheckSquare, GitBranch, Brain, Cog, Bot, Package, Monitor, Moon, Sun, Layers, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ViewMode, Agent } from "@/types";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { Logo } from "@/components/branding/Logo";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTasks } from "@/contexts/TaskContext";
import { useMessages } from "@/contexts/MessageContext";

interface HeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  agents: Agent[];
  sidebarCollapsed?: boolean;
  onSidebarToggle?: () => void;
}

export const Header = ({ 
  viewMode, 
  onViewModeChange, 
  agents, 
  sidebarCollapsed = false,
  onSidebarToggle
}: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useTheme();
  const isMobile = useIsMobile();
  const { tasks } = useTasks();
  const { messages } = useMessages();
  
  const activeAgents = agents?.filter(agent => agent.status === "working").length || 0;
  const totalAgents = agents?.length || 0;
  
  // Calculate notification counts for each tab
  const getNotificationCounts = () => {
    const pendingTasks = tasks?.filter(task => task.status === "pending").length || 0;
    const inProgressTasks = tasks?.filter(task => task.status === "in-progress").length || 0;
    const recentMessages = messages?.filter(message => {
      const messageTime = new Date(message.timestamp).getTime();
      const oneHourAgo = Date.now() - (60 * 60 * 1000);
      return messageTime > oneHourAgo;
    }).length || 0;
    
    return {
      workflow: inProgressTasks,
      communication: recentMessages,
      tasks: pendingTasks,
      messages: recentMessages
    };
  };

  const notificationCounts = getNotificationCounts();
  
  const viewModeConfig = {
    workflow: { 
      icon: GitBranch, 
      label: "Workflow",
      description: "Monitor agent activities and processes",
      notifications: notificationCounts.workflow
    },
    communication: { 
      icon: MessageSquare, 
      label: "Communication",
      description: "View agent interactions and messages", 
      notifications: notificationCounts.communication
    },
    tasks: { 
      icon: CheckSquare, 
      label: "Tasks",
      description: "Manage and track task progress",
      notifications: notificationCounts.tasks
    },
    messages: { 
      icon: Activity, 
      label: "Messages",
      description: "Inspect detailed message logs",
      notifications: notificationCounts.messages
    }
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
          {/* Sidebar Toggle Button */}
          {!isMobile && isDashboardPage && onSidebarToggle && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onSidebarToggle}
              className="p-2"
            >
              <Menu className="w-4 h-4" />
            </Button>
          )}
          
          {/* Mobile Navigation */}
          <MobileNavigation activeAgents={activeAgents} totalAgents={totalAgents} />
          
          {/* Logo Navigation */}
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
          
          {/* Enhanced View Mode Selector */}
          {!isMobile && isDashboardPage && (
            <div className="flex items-center space-x-1 bg-muted/50 rounded-xl p-1 border border-border/50">
              {Object.entries(viewModeConfig).map(([mode, config]) => {
                const Icon = config.icon;
                const isActive = viewMode === mode;
                const hasNotifications = config.notifications > 0;
                
                return (
                  <div key={mode} className="relative">
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      onClick={() => onViewModeChange(mode as ViewMode)}
                      className={`
                        h-9 px-4 relative transition-all duration-200 group
                        ${isActive 
                          ? "bg-background shadow-sm border border-border/50 text-foreground" 
                          : "hover:bg-background/50 text-muted-foreground hover:text-foreground"
                        }
                      `}
                      title={config.description}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      <span className="font-medium">{config.label}</span>
                      
                      {/* Notification Badge */}
                      {hasNotifications && (
                        <Badge 
                          variant="destructive" 
                          className="ml-2 px-1.5 py-0.5 text-xs min-w-5 h-5 flex items-center justify-center"
                        >
                          {config.notifications > 99 ? "99+" : config.notifications}
                        </Badge>
                      )}
                    </Button>
                    
                    {/* Active Tab Indicator */}
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Status Badge */}
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
          
          {/* Navigation Buttons */}
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
          
          {/* Action Buttons */}
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
