import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  PanelLeft, 
  PanelLeftClose,
  Home,
  Layers,
  Code2,
  Folder,
  Presentation,
  Bot,
  Package,
  Brain,
  Monitor,
  Settings,
  User,
  CreditCard,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCollapsibleSidebar } from '@/hooks/useCollapsibleSidebar.tsx';
import { useResponsiveNavigation } from '@/hooks/useResponsiveNavigation';
import { TouchOptimizedNavItem } from './TouchOptimizedNavItem';
import { MobileHamburgerMenu } from './MobileHamburgerMenu';
import { RecentlyVisitedSection } from './RecentlyVisitedSection';
import { FavoritesSection } from './FavoritesSection';
import { RoleBasedNavigationPresets } from './RoleBasedNavigationPresets';
import { useContextualNavigation } from './ContextualNavigationProvider';

interface EnhancedUnifiedSidebarProps {
  className?: string;
}

interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: React.ComponentType<any>;
  level: 'primary' | 'secondary';
  category?: string;
}

const navigationItems: NavItem[] = [
  // Primary navigation
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: Home, level: 'primary' },
  { id: 'planning', label: 'Planning Agent', path: '/planning-agent', icon: Layers, level: 'primary' },
  { id: 'workspace', label: 'Workspace', path: '/workspace', icon: Code2, level: 'primary' },
  { id: 'projects', label: 'Projects', path: '/projects', icon: Folder, level: 'primary' },
  { id: 'presentations', label: 'Presentations', path: '/presentations', icon: Presentation, level: 'primary' },
  
  // Configuration section
  { id: 'agent-config', label: 'Agent Config', path: '/agent-configuration', icon: Bot, level: 'secondary', category: 'Configuration' },
  { id: 'mcp', label: 'MCP Management', path: '/mcp-management', icon: Package, level: 'secondary', category: 'Configuration' },
  { id: 'llm', label: 'LLM Integration', path: '/llm-integration', icon: Brain, level: 'secondary', category: 'Configuration' },
  { id: 'ide', label: 'IDE Integration', path: '/ide-integration', icon: Monitor, level: 'secondary', category: 'Configuration' },
  
  // Account section
  { id: 'profile', label: 'Profile', path: '/profile', icon: User, level: 'secondary', category: 'Account' },
  { id: 'account', label: 'Account & Billing', path: '/account', icon: CreditCard, level: 'secondary', category: 'Account' },
  { id: 'teams', label: 'Teams', path: '/teams', icon: Users, level: 'secondary', category: 'Account' },
  { id: 'settings', label: 'Settings', path: '/settings', icon: Settings, level: 'secondary', category: 'Account' },
];

export const EnhancedUnifiedSidebar = ({ className }: EnhancedUnifiedSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentPreset, getFilteredNavigationItems } = useContextualNavigation();
  const { showHamburger, isMobile } = useResponsiveNavigation();
  
  const { isCollapsed, toggleSidebar } = useCollapsibleSidebar({
    defaultCollapsed: false,
    keyboardShortcut: 'b',
    storageKey: 'enhanced-unified-sidebar-collapsed',
    autoCollapseOnMobile: true
  });

  // Get filtered items based on current preset
  const filteredItems = getFilteredNavigationItems();
  const primaryItems = filteredItems.length > 0 ? filteredItems : navigationItems.filter(item => item.level === 'primary');
  const secondaryItems = navigationItems.filter(item => item.level === 'secondary');
  
  // Group secondary items by category
  const groupedSecondaryItems = secondaryItems.reduce((acc, item) => {
    const category = item.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {} as Record<string, NavItem[]>);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const sidebarContent = (
    <div className={cn(
      "bg-sidebar-background border-r border-sidebar-border transition-all duration-300 ease-in-out h-full flex flex-col shadow-sm",
      !showHamburger && (isCollapsed ? "w-16" : "w-80"),
      showHamburger && "w-full border-r-0"
    )}>
      {/* Header with toggle - hide toggle on mobile hamburger menu */}
      <div className={cn(
        "flex-shrink-0 p-3 border-b border-sidebar-border bg-sidebar-background/95 backdrop-blur-sm",
        showHamburger && "border-b-0 p-4"
      )}>
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-semibold text-sidebar-foreground animate-in fade-in-50 duration-200">
                Navigation
              </h2>
              {currentPreset && (
                <p className="text-xs text-muted-foreground">
                  {currentPreset.name} preset
                </p>
              )}
            </div>
          )}
          
          {!showHamburger && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={toggleSidebar}
                  className="touch-target min-h-[44px] min-w-[44px] p-1.5 flex-shrink-0 hover:bg-sidebar-accent rounded-md transition-colors"
                >
                  {isCollapsed ? (
                    <PanelLeft className="w-4 h-4" />
                  ) : (
                    <PanelLeftClose className="w-4 h-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="font-medium">
                <p className="text-sm">
                  {isCollapsed ? "Expand" : "Collapse"} sidebar (Ctrl+B)
                </p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto scroll-area-enhanced">
        {/* Primary Navigation */}
        <div className={cn("p-3 space-y-1", showHamburger && "px-4")}>
          {!isCollapsed && (
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 animate-in fade-in-50 duration-200">
              Main
            </h3>
          )}
          {primaryItems.map((item) => (
            <TouchOptimizedNavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              isActive={location.pathname === item.path}
              isCollapsed={isCollapsed && !showHamburger}
              onClick={() => handleNavigation(item.path)}
              variant="primary"
            />
          ))}
        </div>

        {/* Favorites Section */}
        <FavoritesSection isCollapsed={isCollapsed && !showHamburger} />

        {/* Recently Visited Section */}
        <RecentlyVisitedSection isCollapsed={isCollapsed && !showHamburger} />

        {/* Secondary Navigation - Grouped by Category */}
        {Object.entries(groupedSecondaryItems).map(([category, items]) => (
          <div key={category} className={cn("p-3 border-t border-sidebar-border/50", showHamburger && "px-4")}>
            {!isCollapsed && (
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 animate-in fade-in-50 duration-200">
                {category}
              </h3>
            )}
            <div className="space-y-1">
              {items.map((item) => (
                <TouchOptimizedNavItem
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  isActive={location.pathname === item.path}
                  isCollapsed={isCollapsed && !showHamburger}
                  onClick={() => handleNavigation(item.path)}
                  variant="secondary"
                />
              ))}
            </div>
          </div>
        ))}

        {/* Role-based Navigation Presets */}
        <RoleBasedNavigationPresets />
      </div>

      {/* Footer - hide on mobile hamburger menu */}
      {!isCollapsed && !showHamburger && (
        <div className="flex-shrink-0 border-t border-sidebar-border p-3 animate-in fade-in-50 duration-200">
          <div className="text-xs text-muted-foreground text-center">
            <kbd className="px-1.5 py-0.5 bg-muted rounded border text-xs">Ctrl+B</kbd> to toggle
          </div>
        </div>
      )}
    </div>
  );

  // Render mobile hamburger menu or desktop sidebar
  if (showHamburger) {
    return (
      <MobileHamburgerMenu className={className}>
        {sidebarContent}
      </MobileHamburgerMenu>
    );
  }

  return (
    <TooltipProvider delayDuration={300}>
      <div className={className}>
        {sidebarContent}
      </div>
    </TooltipProvider>
  );
};
