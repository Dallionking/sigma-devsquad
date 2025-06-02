
import React from 'react';

interface SidebarFooterProps {
  isCollapsed: boolean;
  showHamburger: boolean;
}

export const SidebarFooter = ({ isCollapsed, showHamburger }: SidebarFooterProps) => {
  if (isCollapsed || showHamburger) {
    return null;
  }

  return (
    <div className="flex-shrink-0 border-t border-sidebar-border p-3 animate-in fade-in-50 duration-200">
      <div className="text-xs text-muted-foreground text-center">
        <kbd className="px-1.5 py-0.5 bg-muted rounded border text-xs">Ctrl+B</kbd> to toggle
      </div>
    </div>
  );
};
