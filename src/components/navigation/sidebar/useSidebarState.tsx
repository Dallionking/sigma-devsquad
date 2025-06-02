
import { useState, useRef, useEffect } from 'react';
import { useTeams } from '@/contexts/TeamContext';

export const useSidebarState = (collapsed: boolean) => {
  const { teams } = useTeams();
  const [currentTeamId, setCurrentTeamId] = useState<string>(teams[0]?.id || "");
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);
  const [showTeamDropdown, setShowTeamDropdown] = useState(false);
  
  const projectDropdownRef = useRef<HTMLDivElement>(null);
  const teamDropdownRef = useRef<HTMLDivElement>(null);

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
