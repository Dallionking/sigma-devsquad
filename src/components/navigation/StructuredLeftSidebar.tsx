import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  PanelLeft, 
  PanelLeftClose, 
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
  Activity,
  Star,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Users
} from 'lucide-react';
import { Logo } from '@/components/branding/Logo';
import { ProjectSwitcher } from '@/components/projects/ProjectSwitcher';
import { TeamSwitcher } from '@/components/navigation/TeamSwitcher';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTeams } from '@/contexts/TeamContext';
import { useProjects } from '@/contexts/ProjectContext';
import { cn } from '@/lib/utils';
import '@/styles/sidebar/index.css';

interface StructuredLeftSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  activeAgents: number;
  totalAgents: number;
}

export const StructuredLeftSidebar = ({
  collapsed,
  onToggle,
  activeAgents,
  totalAgents
}: StructuredLeftSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { teams } = useTeams();
  const { currentProject } = useProjects();
  const [currentTeamId, setCurrentTeamId] = useState<string>(teams[0]?.id || "");
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);
  const [showTeamDropdown, setShowTeamDropdown] = useState(false);
  
  const projectDropdownRef = useRef<HTMLDivElement>(null);
  const teamDropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => location.pathname === path;

  // Get current team
  const currentTeam = teams.find(team => team.id === currentTeamId) || teams[0];

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

  const toggleProjectDropdown = () => {
    if (collapsed) return; // Don't open dropdowns when collapsed
    setShowProjectDropdown(!showProjectDropdown);
    setShowTeamDropdown(false);
  };

  const toggleTeamDropdown = () => {
    if (collapsed) return; // Don't open dropdowns when collapsed
    setShowTeamDropdown(!showTeamDropdown);
    setShowProjectDropdown(false);
  };

  // Keyboard shortcut for sidebar toggle (Ctrl+B)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        onToggle();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onToggle]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (projectDropdownRef.current && !projectDropdownRef.current.contains(event.target as Node)) {
        setShowProjectDropdown(false);
      }
      if (teamDropdownRef.current && !teamDropdownRef.current.contains(event.target as Node)) {
        setShowTeamDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdowns when sidebar collapses
  useEffect(() => {
    if (collapsed) {
      setShowProjectDropdown(false);
      setShowTeamDropdown(false);
    }
  }, [collapsed]);

  return (
    <div className={cn(
      "left-sidebar-container bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out flex flex-col h-screen fixed top-0 left-0 z-50",
      collapsed ? "collapsed w-16" : "w-64"
    )}>
      {/* Logo Section */}
      <div className="sidebar-section logo-section">
        <div className="logo-icon">
          <Logo size="sm" variant="icon" />
        </div>
        {!collapsed && (
          <div className="logo-text">
            Vibe DevSquad
          </div>
        )}
      </div>

      {/* Project Section */}
      {!collapsed && (
        <div className="sidebar-section project-section" ref={projectDropdownRef}>
          <div className="sidebar-section-label">PROJECT</div>
          <div 
            className="dropdown-trigger"
            onClick={toggleProjectDropdown}
            aria-expanded={showProjectDropdown}
            role="button"
            tabIndex={0}
          >
            <span className="dropdown-trigger-icon">
              <Folder className="w-4 h-4" />
            </span>
            <span className="dropdown-trigger-text">
              {currentProject?.name || "Select Project"}
            </span>
            <span className="dropdown-trigger-arrow">
              <ChevronDown className="w-3 h-3" />
            </span>
          </div>
          {showProjectDropdown && (
            <div className="dropdown-panel" style={{ 
              position: 'fixed',
              left: '264px',
              top: projectDropdownRef.current?.getBoundingClientRect().top || 0,
              zIndex: 1100
            }}>
              <ProjectSwitcher />
            </div>
          )}
        </div>
      )}

      {/* Collapsed Project Icon */}
      {collapsed && (
        <div className="sidebar-section project-section">
          <div 
            className="dropdown-trigger"
            title={currentProject?.name || "Select Project"}
          >
            <span className="dropdown-trigger-icon">
              <Folder className="w-4 h-4" />
            </span>
            <div className="sidebar-tooltip">
              {currentProject?.name || "Select Project"}
            </div>
          </div>
        </div>
      )}

      {/* Team Section */}
      {!collapsed && (
        <div className="sidebar-section team-section" ref={teamDropdownRef}>
          <div className="sidebar-section-label">TEAM</div>
          <div 
            className="dropdown-trigger"
            onClick={toggleTeamDropdown}
            aria-expanded={showTeamDropdown}
            role="button"
            tabIndex={0}
          >
            <span className="dropdown-trigger-icon">
              <Users className="w-4 h-4" />
            </span>
            <span className="dropdown-trigger-text">
              {currentTeam?.name || "Select Team"}
            </span>
            <span className="dropdown-trigger-arrow">
              <ChevronDown className="w-3 h-3" />
            </span>
          </div>
          {showTeamDropdown && (
            <div className="dropdown-panel" style={{ 
              position: 'fixed',
              left: '264px',
              top: teamDropdownRef.current?.getBoundingClientRect().top || 0,
              zIndex: 1100
            }}>
              <TeamSwitcher 
                currentTeamId={currentTeamId}
                onTeamChange={setCurrentTeamId}
                compact
              />
            </div>
          )}
        </div>
      )}

      {/* Collapsed Team Icon */}
      {collapsed && (
        <div className="sidebar-section team-section">
          <div 
            className="dropdown-trigger"
            title={currentTeam?.name || "Select Team"}
          >
            <span className="dropdown-trigger-icon">
              <Users className="w-4 h-4" />
            </span>
            <div className="sidebar-tooltip">
              {currentTeam?.name || "Select Team"}
            </div>
          </div>
        </div>
      )}

      <Separator className="mx-3" />

      {/* Main Navigation Section */}
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

      {/* Status Section */}
      <div className="sidebar-section status-section px-3 py-2 mt-auto">
        {!collapsed ? (
          <div className="bg-sidebar-accent/30 rounded-lg p-3">
            <div className="text-xs font-medium text-sidebar-foreground mb-2 flex items-center gap-2">
              <Activity className="w-3 h-3" />
              System Status
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-sidebar-foreground/70">Active Agents</span>
                <Badge variant="secondary" className="text-xs px-1">
                  {activeAgents}/{totalAgents}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sidebar-foreground/70">Status</span>
                <span className="text-green-500 flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Online
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center" title="System Status: Online">
            <div className="w-8 h-8 bg-sidebar-accent/30 rounded-lg flex items-center justify-center">
              <Activity className="w-4 h-4 text-green-500" />
            </div>
          </div>
        )}
      </div>

      {/* Collapse Section */}
      <div className="sidebar-section collapse-section px-3 py-2">
        <button
          className="sidebar-collapse-toggle"
          onClick={onToggle}
          title={collapsed ? "Expand sidebar (Ctrl+B)" : "Collapse sidebar (Ctrl+B)"}
        >
          <span className="toggle-icon">
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </span>
          {!collapsed && <span className="ml-2 text-xs">Collapse</span>}
        </button>
      </div>
    </div>
  );
};
