
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PanelLeft, PanelLeftClose } from 'lucide-react';
import { Logo } from '@/components/branding/Logo';
import { cn } from '@/lib/utils';

interface HeaderLogoProps {
  isDashboardPage: boolean;
  sidebarCollapsed?: boolean;
  onSidebarToggle?: () => void;
  activeAgents: number;
  totalAgents: number;
}

export const HeaderLogo = ({
  isDashboardPage,
  sidebarCollapsed,
  onSidebarToggle,
  activeAgents,
  totalAgents
}: HeaderLogoProps) => {
  return (
    <div className="flex items-center space-x-2 min-w-0">
      {/* Sidebar Toggle */}
      {onSidebarToggle && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onSidebarToggle}
          className="h-8 w-8 p-0 flex-shrink-0"
        >
          {sidebarCollapsed ? (
            <PanelLeft className="w-4 h-4" />
          ) : (
            <PanelLeftClose className="w-4 h-4" />
          )}
        </Button>
      )}

      {/* Logo Container */}
      <div className="flex items-center min-w-0 max-w-48">
        <Logo size="sm" variant={sidebarCollapsed ? "icon" : "full"} />
      </div>

      {/* Status Badge - Only show when not collapsed */}
      {isDashboardPage && !sidebarCollapsed && (
        <Badge variant="outline" className="text-xs flex-shrink-0">
          {activeAgents}/{totalAgents} active
        </Badge>
      )}
    </div>
  );
};
