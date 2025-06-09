
import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface SidebarCollapseSectionProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const SidebarCollapseSection = ({ collapsed, onToggle }: SidebarCollapseSectionProps) => {
  return (
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
  );
};
