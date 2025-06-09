
import React from 'react';
import { Users, ChevronDown } from 'lucide-react';
import { TeamSwitcher } from '@/components/navigation/TeamSwitcher';
import { useTeams } from '@/contexts/TeamContext';

interface SidebarTeamSectionProps {
  collapsed: boolean;
  showTeamDropdown: boolean;
  onToggleTeamDropdown: () => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
  currentTeamId: string;
  onTeamChange: (teamId: string) => void;
}

export const SidebarTeamSection = ({
  collapsed,
  showTeamDropdown,
  onToggleTeamDropdown,
  dropdownRef,
  currentTeamId,
  onTeamChange
}: SidebarTeamSectionProps) => {
  const { teams } = useTeams();
  const currentTeam = teams.find(team => team.id === currentTeamId) || teams[0];

  if (collapsed) {
    return (
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
    );
  }

  return (
    <div className="sidebar-section team-section" ref={dropdownRef}>
      <div className="sidebar-section-label">TEAM</div>
      <div 
        className="dropdown-trigger"
        onClick={onToggleTeamDropdown}
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
          top: dropdownRef.current?.getBoundingClientRect().top || 0,
          zIndex: 1100
        }}>
          <TeamSwitcher 
            currentTeamId={currentTeamId}
            onTeamChange={onTeamChange}
            compact
          />
        </div>
      )}
    </div>
  );
};
