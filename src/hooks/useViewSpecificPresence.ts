
import { useMemo } from 'react';
import { useWebSocket } from '@/contexts/WebSocketContext';
import { ViewMode } from '@/types';

interface ViewPresenceInfo {
  totalUsers: number;
  currentViewUsers: number;
  viewModeUsers: number;
  componentUsers: number;
  activeComponents: string[];
  usersByComponent: Record<string, number>;
}

export const useViewSpecificPresence = (
  viewMode: ViewMode,
  componentId: string,
  projectId: string = 'current-project'
): ViewPresenceInfo => {
  const { presenceUsers } = useWebSocket();

  return useMemo(() => {
    const totalUsers = presenceUsers.length;
    
    const currentViewUsers = presenceUsers.filter(
      user => user.activeComponent === componentId
    ).length;
    
    const viewModeUsers = presenceUsers.filter(
      user => user.activeComponent?.includes(viewMode)
    ).length;
    
    const componentUsers = presenceUsers.filter(
      user => user.activeComponent === componentId
    ).length;
    
    const activeComponents = Array.from(
      new Set(presenceUsers.map(user => user.activeComponent).filter(Boolean))
    ) as string[];
    
    const usersByComponent = activeComponents.reduce((acc, component) => {
      acc[component] = presenceUsers.filter(
        user => user.activeComponent === component
      ).length;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalUsers,
      currentViewUsers,
      viewModeUsers,
      componentUsers,
      activeComponents,
      usersByComponent
    };
  }, [presenceUsers, viewMode, componentId]);
};
