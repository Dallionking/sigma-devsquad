
import { useCallback } from 'react';
import { useSessionManager } from './useSessionManager';
import { useDataSync } from './useDataSync';

interface ViewContext {
  selectedAgentId?: string;
  selectedTaskId?: string;
  selectedMessageId?: string;
  selectedTeamId?: string;
  selectedAgentProfileId?: string;
  viewMode: string;
  showTeamView: boolean;
  sidebarCollapsed: boolean;
  scrollPosition?: number;
  filters?: Record<string, any>;
}

export const useViewContextManager = () => {
  const { sessionData, updateWorkspaceState, setActiveView } = useSessionManager();
  const { addToSyncQueue } = useDataSync({
    syncInterval: 30000, // 30 seconds
    retryAttempts: 3,
    offlineMode: false
  });

  // Save view context
  const saveViewContext = useCallback((view: string, context: ViewContext) => {
    updateWorkspaceState(`viewContext_${view}`, context);
    setActiveView(view);
    
    // Add to sync queue for cloud backup
    addToSyncQueue({
      type: 'viewContext',
      view,
      context,
      userId: sessionData.userId
    }, 'update');
  }, [updateWorkspaceState, setActiveView, addToSyncQueue, sessionData.userId]);

  // Load view context
  const loadViewContext = useCallback((view: string): ViewContext | null => {
    return sessionData.workspaceState[`viewContext_${view}`] || null;
  }, [sessionData.workspaceState]);

  // Clear view context
  const clearViewContext = useCallback((view: string) => {
    updateWorkspaceState(`viewContext_${view}`, null);
  }, [updateWorkspaceState]);

  // Get all saved contexts
  const getAllViewContexts = useCallback(() => {
    const contexts: Record<string, ViewContext> = {};
    Object.keys(sessionData.workspaceState).forEach(key => {
      if (key.startsWith('viewContext_')) {
        const view = key.replace('viewContext_', '');
        contexts[view] = sessionData.workspaceState[key];
      }
    });
    return contexts;
  }, [sessionData.workspaceState]);

  return {
    saveViewContext,
    loadViewContext,
    clearViewContext,
    getAllViewContexts,
    currentView: sessionData.activeView
  };
};
