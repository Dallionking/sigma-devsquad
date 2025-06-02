
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Layers, 
  Folder,
  Bot,
  Package,
  Brain,
  Monitor,
  User,
  Settings,
  CreditCard,
  Star
} from 'lucide-react';

interface SidebarNavigationSectionProps {
  collapsed: boolean;
}

export const SidebarNavigationSection = ({ collapsed }: SidebarNavigationSectionProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const mainNavItems = [
    { path: "/dashboard", label: "Dashboard", icon: Home },
    { path: "/planning-agent", label: "Planning", icon: Layers },
    { path: "/projects", label: "Projects", icon: Folder },
  ];

  const configItems = [
    { path: "/agent-configuration", label: "Agent Config", icon: Bot },
    { path: "/mcp-management", label: "MCP Management", icon: Package },
    { path: "/llm-integration", label: "LLM Integration", icon: Brain },
    { path: "/ide-integration", label: "IDE Integration", icon: Monitor },
  ];

  const accountItems = [
    { path: "/profile", label: "Profile", icon: User },
    { path: "/account", label: "Account", icon: CreditCard },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="sidebar-section main-nav-section px-3 py-2 overflow-y-auto">
      {!collapsed && <div className="sidebar-section-label px-1">MAIN</div>}
      <div className="space-y-1">
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={cn("nav-link", active && "active")}
              title={collapsed ? item.label : undefined}
            >
              <span className="nav-link-icon">
                <Icon className="w-4 h-4" />
              </span>
              {!collapsed && <span className="nav-link-text">{item.label}</span>}
              {collapsed && (
                <div className="sidebar-tooltip">
                  {item.label}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Favorites Section */}
      {!collapsed && (
        <div className="mt-6">
          <div className="sidebar-section-label px-1">FAVORITES</div>
          <div className="text-sm text-sidebar-foreground/50 px-1">
            <Star className="w-4 h-4 inline mr-2" />
            No favorites yet
          </div>
        </div>
      )}

      {/* Configuration Section */}
      <div className="mt-6">
        {!collapsed && <div className="sidebar-section-label px-1">CONFIG</div>}
        <div className="space-y-1">
          {configItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={cn("nav-link", active && "active")}
                style={{ padding: collapsed ? '8px' : '8px 12px', fontSize: '12px' }}
                title={collapsed ? item.label : undefined}
              >
                <span className="nav-link-icon">
                  <Icon className="w-3 h-3" />
                </span>
                {!collapsed && <span className="nav-link-text">{item.label}</span>}
                {collapsed && (
                  <div className="sidebar-tooltip">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Account Section */}
      <div className="mt-6">
        {!collapsed && <div className="sidebar-section-label px-1">ACCOUNT</div>}
        <div className="space-y-1">
          {accountItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={cn("nav-link", active && "active")}
                style={{ padding: collapsed ? '8px' : '8px 12px', fontSize: '12px' }}
                title={collapsed ? item.label : undefined}
              >
                <span className="nav-link-icon">
                  <Icon className="w-3 h-3" />
                </span>
                {!collapsed && <span className="nav-link-text">{item.label}</span>}
                {collapsed && (
                  <div className="sidebar-tooltip">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
