
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ChevronRight, Home, Users, Bot, Package, Brain, Monitor, Cog, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbConfig {
  path: string;
  label: string;
  icon: React.ComponentType<any>;
  parent?: string;
}

const breadcrumbConfig: Record<string, BreadcrumbConfig> = {
  "/": { path: "/", label: "Home", icon: Home },
  "/dashboard": { path: "/dashboard", label: "Dashboard", icon: Home },
  "/teams": { path: "/teams", label: "Teams", icon: Users },
  "/team-settings": { path: "/team-settings", label: "Team Settings", icon: Users, parent: "/teams" },
  "/planning-agent": { path: "/planning-agent", label: "Planning Agent", icon: Layers },
  "/agent-configuration": { path: "/agent-configuration", label: "Agent Configuration", icon: Bot },
  "/mcp-management": { path: "/mcp-management", label: "MCP Management", icon: Package },
  "/llm-integration": { path: "/llm-integration", label: "LLM Integration", icon: Brain },
  "/ide-integration": { path: "/ide-integration", label: "IDE Integration", icon: Monitor },
  "/settings": { path: "/settings", label: "Settings", icon: Cog },
  "/profile": { path: "/profile", label: "Profile", icon: Users, parent: "/settings" },
};

export const EnhancedBreadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbConfig[] = [];

    // Always start with Dashboard for authenticated routes
    if (location.pathname !== "/" && !location.pathname.includes("/auth")) {
      breadcrumbs.push(breadcrumbConfig["/dashboard"]);
    }

    // Handle team settings with dynamic team ID
    if (location.pathname.includes("/team-settings/")) {
      const teamId = pathSegments[1];
      breadcrumbs.push(breadcrumbConfig["/teams"]);
      breadcrumbs.push({
        path: `/team-settings/${teamId}`,
        label: "Team Settings",
        icon: Cog
      });
      return breadcrumbs;
    }

    // Build breadcrumbs based on current path
    let currentPath = "";
    for (const segment of pathSegments) {
      currentPath += `/${segment}`;
      const config = breadcrumbConfig[currentPath];
      
      if (config && !breadcrumbs.some(b => b.path === config.path)) {
        // Add parent if it exists and isn't already in breadcrumbs
        if (config.parent && !breadcrumbs.some(b => b.path === config.parent)) {
          const parentConfig = breadcrumbConfig[config.parent];
          if (parentConfig) {
            breadcrumbs.push(parentConfig);
          }
        }
        breadcrumbs.push(config);
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <div className="bg-background/80 backdrop-blur-sm border-b border-border/30 px-4 py-2">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((crumb, index) => {
            const Icon = crumb.icon;
            const isLast = index === breadcrumbs.length - 1;
            
            return (
              <React.Fragment key={crumb.path}>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="flex items-center gap-1.5 font-medium text-foreground">
                      <Icon className="w-4 h-4" />
                      {crumb.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(crumb.path)}
                        className={cn(
                          "h-8 px-2 text-muted-foreground hover:text-foreground",
                          "transition-colors duration-200 gap-1.5"
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        {crumb.label}
                      </Button>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                
                {!isLast && (
                  <BreadcrumbSeparator>
                    <ChevronRight className="w-4 h-4" />
                  </BreadcrumbSeparator>
                )}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
