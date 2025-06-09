
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
    const baseStyles = "flex items-center gap-2 transition-all duration-300 hover:scale-105";
    
    switch (level) {
      case 'primary':
        return cn(baseStyles, 
          isLast 
            ? "text-2xl font-black text-blue-700 dark:text-blue-300 drop-shadow-lg" 
            : "text-xl font-bold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 shadow-md hover:shadow-lg"
        );
      case 'secondary':
        return cn(baseStyles,
          isLast 
            ? "text-lg font-bold text-purple-600 dark:text-purple-300 drop-shadow-md"
            : "text-base font-semibold text-purple-500 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-200 shadow-sm hover:shadow-md"
        );
      case 'tertiary':
        return cn(baseStyles,
          isLast 
            ? "text-base font-semibold text-green-600 dark:text-green-300 drop-shadow-sm"
            : "text-sm font-medium text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-200 hover:shadow-sm"
        );
      default:
        return baseStyles;
    }
  };

  const getBackgroundStyles = (level: 'primary' | 'secondary' | 'tertiary') => {
    switch (level) {
      case 'primary':
        return "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 border-blue-200 dark:border-blue-800";
      case 'secondary':
        return "bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 border-purple-200 dark:border-purple-800";
      case 'tertiary':
        return "bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 border-green-200 dark:border-green-800";
      default:
        return "bg-background border-border";
    }
  };

  const currentLevel = breadcrumbs[breadcrumbs.length - 1]?.level || 'primary';

  return (
    <div className={cn(
      "backdrop-blur-sm border-b-2 px-6 py-4 transition-all duration-300",
      getBackgroundStyles(currentLevel)
    )}>
      <Breadcrumb>
        <BreadcrumbList className="gap-3">
          {breadcrumbs.map((crumb, index) => {
            const Icon = crumb.icon;
            const isLast = index === breadcrumbs.length - 1;
            const iconSize = crumb.level === 'primary' ? 'w-6 h-6' : crumb.level === 'secondary' ? 'w-5 h-5' : 'w-4 h-4';
            
            return (
              <React.Fragment key={crumb.path}>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className={getLevelStyles(crumb.level, isLast)}>
                      <Icon className={cn(iconSize, "drop-shadow-sm")} />
                      <span className="font-inherit">{crumb.label}</span>
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(crumb.path)}
                        className={cn(
                          "h-auto px-3 py-2 rounded-lg border transition-all duration-200",
                          getLevelStyles(crumb.level, isLast),
                          "hover:bg-white/50 dark:hover:bg-black/20 border-current/20 hover:border-current/40"
                        )}
                      >
                        <Icon className={cn(iconSize, "drop-shadow-sm")} />
                        <span className="font-inherit">{crumb.label}</span>
                      </Button>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                
                {!isLast && (
                  <BreadcrumbSeparator>
                    <ChevronRight className={cn(
                      crumb.level === 'primary' ? 'w-6 h-6' : crumb.level === 'secondary' ? 'w-5 h-5' : 'w-4 h-4',
                      'text-muted-foreground/60 drop-shadow-sm'
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
