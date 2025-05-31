
import { useState, useEffect, useCallback } from 'react';
import { Agent, Task, Message } from '@/types';
import { AgentProfile } from '@/types/teams';

interface PanelContext {
  type: 'agent' | 'task' | 'message' | 'agentProfile' | null;
  data: Agent | Task | Message | AgentProfile | null;
  isVisible: boolean;
  previousType: string | null;
}

export const useContextAwarePanel = () => {
  const [panelContext, setPanelContext] = useState<PanelContext>({
    type: null,
    data: null,
    isVisible: false,
    previousType: null
  });

  const showPanel = useCallback((type: PanelContext['type'], data: PanelContext['data']) => {
    setPanelContext(prev => ({
      type,
      data,
      isVisible: true,
      previousType: prev.type
    }));
  }, []);

  const hidePanel = useCallback(() => {
    setPanelContext(prev => ({
      ...prev,
      isVisible: false
    }));
    
    // Clear data after animation completes
    setTimeout(() => {
      setPanelContext(prev => ({
        type: null,
        data: null,
        isVisible: false,
        previousType: prev.type
      }));
    }, 300);
  }, []);

  const togglePanel = useCallback(() => {
    if (panelContext.isVisible) {
      hidePanel();
    }
  }, [panelContext.isVisible, hidePanel]);

  // Auto-hide when no selection
  useEffect(() => {
    if (!panelContext.data && panelContext.isVisible) {
      hidePanel();
    }
  }, [panelContext.data, panelContext.isVisible, hidePanel]);

  return {
    panelContext,
    showPanel,
    hidePanel,
    togglePanel
  };
};
