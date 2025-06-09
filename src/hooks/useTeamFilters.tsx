
import { useState, useCallback, useMemo } from 'react';
import { Team, TeamComposition, TeamType } from '@/types/teams';

interface UseTeamFiltersReturn {
  selectedCompositions: TeamComposition[];
  selectedTypes: TeamType[];
  filteredTeams: Team[];
  activeFilterCount: number;
  setCompositions: (compositions: TeamComposition[]) => void;
  setTypes: (types: TeamType[]) => void;
  clearAllFilters: () => void;
  applyPreset: (compositions: TeamComposition[], types: TeamType[]) => void;
}

export const useTeamFilters = (teams: Team[]): UseTeamFiltersReturn => {
  const [selectedCompositions, setSelectedCompositions] = useState<TeamComposition[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<TeamType[]>([]);

  const filteredTeams = useMemo(() => {
    return teams.filter(team => {
      // Filter by composition
      if (selectedCompositions.length > 0 && !selectedCompositions.includes(team.composition)) {
        return false;
      }

      // Filter by type
      if (selectedTypes.length > 0 && !selectedTypes.includes(team.type)) {
        return false;
      }

      return true;
    });
  }, [teams, selectedCompositions, selectedTypes]);

  const activeFilterCount = selectedCompositions.length + selectedTypes.length;

  const setCompositions = useCallback((compositions: TeamComposition[]) => {
    setSelectedCompositions(compositions);
  }, []);

  const setTypes = useCallback((types: TeamType[]) => {
    setSelectedTypes(types);
  }, []);

  const clearAllFilters = useCallback(() => {
    setSelectedCompositions([]);
    setSelectedTypes([]);
  }, []);

  const applyPreset = useCallback((compositions: TeamComposition[], types: TeamType[]) => {
    setSelectedCompositions(compositions);
    setSelectedTypes(types);
  }, []);

  return {
    selectedCompositions,
    selectedTypes,
    filteredTeams,
    activeFilterCount,
    setCompositions,
    setTypes,
    clearAllFilters,
    applyPreset
  };
};
