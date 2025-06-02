
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
import { ChevronRight, Home, Users, Bot, Package, Brain, Monitor, Cog, Layers, Folder, CreditCard, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigationHierarchy } from '@/contexts/NavigationHierarchyContext';

interface BreadcrumbConfig {
  path: string;
  label: string;
  icon: React.ComponentType<any>;
  parent?: string;
  level: 'primary' | 'secondary' | 'tertiary';
}

const breadcrumbConfig: Record<string, BreadcrumbConfig> = {
  "/": { path: "/", label: "Home", icon: Home, level: 'primary' },
  "/dashboard": { path: "/dashboard", label: "Dashboard", icon: Home, level: 'primary' },
  "/projects": { path: "/projects", label: "Projects", icon: Folder, level: 'primary' },
  "/planning-agent": { path: "/planning-agent", label: "Planning Agent", icon: Layers, level: 'primary' },
  
  // Secondary navigation
  "/agent-configuration": { path: "/agent-configuration", label: "Agent Configuration", icon: Bot, level: 'secondary', parent: "/dashboard" },
  "/mcp-management": { path: "/mcp-management", label: "MCP Management", icon: Package, level: 'secondary', parent: "/dashboard" },
  "/llm-integration": { path: "/llm-integration", label: "LLM Integration", icon: Brain, level: 'secondary', parent: "/dashboard" },
  "/ide-integration": { path: "/ide-integration", label: "IDE Integration", icon: Monitor, level: 'secondary', parent: "/dashboard" },
  
  // Account & Settings - Secondary level
  "/profile": { path: "/profile", label: "Profile", icon: User, level: 'secondary', parent: "/dashboard" },
  "/account": { path: "/account", label: "Account & Billing", icon: CreditCard, level: 'secondary', parent: "/dashboard" },
  "/settings": { path: "/settings", label: "Settings", icon: Cog, level: 'secondary', parent: "/dashboard" },
  
  // Team related - can be tertiary when accessed from specific contexts
  "/teams": { path: "/teams", label: "Teams", icon: Users, level: 'secondary', parent: "/dashboard" },
  "/team-settings": { path: "/team-settings", label: "Team Settings", icon: Users, level: 'tertiary', parent: "/teams" },
};

export const HierarchicalBreadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addNavigationLevel } = useNavigationHierarchy();

  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbConfig[] = [];

    // Always start with Dashboard for authenticated routes
    if (location.pathname !== "/" && !location.pathname.includes("/auth")) {
      const dashboardConfig = breadcrumbConfig["/dashboard"];
      breadcrumbs.push(dashboardConfig);
      addNavigationLevel({
        id: dashboardConfig.path,
        label: dashboardConfig.label,
        path: dashboardConfig.path,
        level: dashboardConfig.level
      });
    }

    // Handle team settings with dynamic team ID
    if (location.pathname.includes("/team-settings/")) {
      const teamId = pathSegments[1];
      const teamsConfig = breadcrumbConfig["/teams"];
      const teamSettingsConfig = {
        path: `/team-settings/${teamId}`,
        label: "Team Settings",
        icon: Cog,
        level: 'tertiary' as const,
        parent: "/teams"
      };
      
      if (!breadcrumbs.some(b => b.path === teamsConfig.path)) {
        breadcrumbs.push(teamsConfig);
        addNavigationLevel({
          id: teamsConfig.path,
          label: teamsConfig.label,
          path: teamsConfig.path,
          level: teamsConfig.level
        });
      }
      
      breadcrumbs.push(teamSettingsConfig);
      addNavigationLevel({
        id: teamSettingsConfig.path,
        label: teamSettingsConfig.label,
        path: teamSettingsConfig.path,
        level: teamSettingsConfig.level,
        parent: teamSettingsConfig.parent
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
            addNavigationLevel({
              id: parentConfig.path,
              label: parentConfig.label,
              path: parentConfig.path,
              level: parentConfig.level
            });
          }
        }
        
        breadcrumbs.push(config);
        addNavigationLevel({
          id: config.path,
          label: config.label,
          path: config.path,
          level: config.level,
          parent: config.parent
        });
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  const getLevelStyles = (level: 'primary' | 'secondary' | 'tertiary', isLast: boolean) => {
    const baseStyles = "flex items-center gap-1.5 transition-colors duration-200";
    
    switch (level) {
      case 'primary':
        return cn(baseStyles, 
          isLast 
            ? "text-lg font-bold text-primary" 
            : "text-base font-semibold text-primary hover:text-primary/80"
        );
      case 'secondary':
        return cn(baseStyles,
          isLast 
            ? "text-base font-semibold text-foreground"
            : "text-sm font-medium text-muted-foreground hover:text-foreground"
        );
      case 'tertiary':
        return cn(baseStyles,
          isLast 
            ? "text-sm font-medium text-foreground"
            : "text-sm text-muted-foreground hover:text-foreground"
        );
      default:
        return baseStyles;
    }
  };

  return (
    <div className="bg-background/80 backdrop-blur-sm border-b border-border/30 px-4 py-3">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((crumb, index) => {
            const Icon = crumb.icon;
            const isLast = index === breadcrumbs.length - 1;
            const iconSize = crumb.level === 'primary' ? 'w-5 h-5' : 'w-4 h-4';
            
            return (
              <React.Fragment key={crumb.path}>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className={getLevelStyles(crumb.level, isLast)}>
                      <Icon className={iconSize} />
                      {crumb.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(crumb.path)}
                        className={cn(
                          "h-auto px-2 py-1",
                          getLevelStyles(crumb.level, isLast)
                        )}
                      >
                        <Icon className={iconSize} />
                        {crumb.label}
                      </Button>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                
                {!isLast && (
                  <BreadcrumbSeparator>
                    <ChevronRight className={cn(
                      crumb.level === 'primary' ? 'w-5 h-5' : 'w-4 h-4',
                      'text-muted-foreground/60'
                    )} />
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
