
import { useState, useRef, useEffect } from 'react';

export const useSidebarState = (collapsed: boolean) => {
  const [currentTeamId, setCurrentTeamId] = useState<string>('');
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);
  const [showTeamDropdown, setShowTeamDropdown] = useState(false);
  
  const projectDropdownRef = useRef<HTMLDivElement>(null);
  const teamDropdownRef = useRef<HTMLDivElement>(null);

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

  const toggleProjectDropdown = () => {
    if (!collapsed) {
      setShowProjectDropdown(!showProjectDropdown);
      setShowTeamDropdown(false);
    }
  };

  const toggleTeamDropdown = () => {
    if (!collapsed) {
      setShowTeamDropdown(!showTeamDropdown);
      setShowProjectDropdown(false);
    }
  };

  return {
    currentTeamId,
    setCurrentTeamId,
    showProjectDropdown,
    setShowProjectDropdown,
    showTeamDropdown,
    setShowTeamDropdown,
    projectDropdownRef,
    teamDropdownRef,
    toggleProjectDropdown,
    toggleTeamDropdown
  };
};
