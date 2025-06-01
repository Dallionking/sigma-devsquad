
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PanelLeft, PanelLeftClose, Bot } from 'lucide-react';

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
        <Bot className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-xl font-bold">Vibe DevSquad</h1>
          {isDashboardPage && (
            <Badge variant="outline" className="text-xs">
              {activeAgents}/{totalAgents} active
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};
