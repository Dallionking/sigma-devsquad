
import React, { useRef } from 'react';
import { Folder, ChevronDown } from 'lucide-react';
import { ProjectSwitcher } from '@/components/projects/ProjectSwitcher';
import { useProjects } from '@/contexts/ProjectContext';

interface SidebarProjectSectionProps {
  collapsed: boolean;
  showProjectDropdown: boolean;
  onToggleProjectDropdown: () => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
}

export const SidebarProjectSection = ({
  collapsed,
  showProjectDropdown,
  onToggleProjectDropdown,
  dropdownRef
}: SidebarProjectSectionProps) => {
  const { currentProject } = useProjects();

  if (collapsed) {
    return (
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
    );
  }

  return (
    <div className="sidebar-section project-section" ref={dropdownRef}>
      <div className="sidebar-section-label">PROJECT</div>
      <div 
        className="dropdown-trigger"
        onClick={onToggleProjectDropdown}
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
          top: dropdownRef.current?.getBoundingClientRect().top || 0,
          zIndex: 1100
        }}>
          <ProjectSwitcher />
        </div>
      )}
    </div>
  );
};
