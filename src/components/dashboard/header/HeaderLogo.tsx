
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PanelLeft, PanelLeftClose } from 'lucide-react';
import { Logo } from '@/components/branding/Logo';

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
    <div className="flex items-center space-x-3">
      {/* Sidebar Toggle */}
      {onSidebarToggle && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onSidebarToggle}
          className="h-8 w-8 p-0"
        >
          {sidebarCollapsed ? (
            <PanelLeft className="w-4 h-4" />
          ) : (
            <PanelLeftClose className="w-4 h-4" />
          )}
        </Button>
      )}

      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Logo size="sm" variant="full" />
        {isDashboardPage && (
          <Badge variant="outline" className="text-xs ml-2">
            {activeAgents}/{totalAgents} active
          </Badge>
        )}
      </div>
    </div>
  );
};
