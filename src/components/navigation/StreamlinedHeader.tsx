
import React from 'react';
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
  Home,
  Menu,
  Zap
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CompactSyncStatus } from "../dashboard/header/CompactSyncStatus";
import { cn } from "@/lib/utils";

interface StreamlinedHeaderProps {
  activeAgents: number;
  totalAgents: number;
  onSidebarToggle?: () => void;
  sidebarCollapsed?: boolean;
}

export const StreamlinedHeader = ({ 
  activeAgents, 
  totalAgents, 
  onSidebarToggle, 
  sidebarCollapsed 
}: StreamlinedHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isSettingsPage = location.pathname === "/settings";
  const isLLMPage = location.pathname === "/llm-integration";
  const isAgentConfigPage = location.pathname === "/agent-configuration";
  const isMCPPage = location.pathname === "/mcp-management";
  const isIDEPage = location.pathname === "/ide-integration";
  const isPlanningAgentPage = location.pathname === "/planning-agent";
  const isDashboardPage = location.pathname === "/";

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const primaryNavItems = [
    { path: "/", label: "Dashboard", icon: Home, active: isDashboardPage },
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
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      {/* Vibe DevSquad brand accent line */}
      <div className="h-1 bg-gradient-to-r from-primary via-blue-500 to-purple-500 vibe-flow" />
      
      <div className="flex h-14 items-center justify-between px-4 lg:px-6">
        {/* Left Section: Brand and Sidebar Toggle */}
        <div className="flex items-center space-x-4">
          {onSidebarToggle && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onSidebarToggle}
              className="lg:hidden p-2"
            >
              <Menu className="w-4 h-4" />
            </Button>
          )}
          
          {/* Vibe DevSquad Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-8 h-8 rounded-lg vibe-gradient-primary flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div className="absolute inset-0 w-8 h-8 rounded-lg vibe-gradient-primary animate-ping opacity-30" />
            </div>
            
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold vibe-gradient-text leading-none">
                Vibe DevSquad
              </h1>
              <div className="text-xs text-muted-foreground font-medium">
                {activeAgents}/{totalAgents} agents active
              </div>
            </div>
          </div>
        </div>
        
        {/* Center Section: Navigation */}
        <div className="flex-1 flex justify-center">
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
                    className={cn(
                      "h-9 px-3 transition-all duration-200",
                      item.active && "vibe-btn-primary shadow-lg"
                    )}
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
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={cn(
                    "h-9 px-3 transition-all duration-200",
                    (isSettingsPage || isAgentConfigPage || isMCPPage || isLLMPage || isIDEPage) && 
                    "bg-primary/10 text-primary"
                  )}
                >
                  <Cog className="w-4 h-4 mr-2" />
                  <span className="hidden lg:inline">Configure</span>
                  <ChevronDown className="w-3 h-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-48 bg-background/95 backdrop-blur-sm border shadow-2xl"
              >
                {configurationItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.path}>
                      <DropdownMenuItem
                        onClick={() => handleNavigation(item.path)}
                        className={cn(
                          "flex items-center px-3 py-2 cursor-pointer transition-colors",
                          item.active && "bg-primary/10 text-primary font-medium"
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
        </div>
        
        {/* Right Section: Status and Sync */}
        <div className="flex items-center space-x-3">
          <Badge 
            variant="secondary" 
            className="vibe-status-active hidden sm:flex"
          >
            <Zap className="w-3 h-3 mr-1" />
            Squad Synced
          </Badge>
          
          <div className="w-px h-6 bg-border/50" />
          <CompactSyncStatus />
        </div>
      </div>
    </header>
  );
};
