
import React from 'react';
import { Logo } from '@/components/branding/Logo';

interface SidebarLogoSectionProps {
  collapsed: boolean;
}

export const SidebarLogoSection = ({ collapsed }: SidebarLogoSectionProps) => {
  return (
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
  );
};
