
import { useState, useCallback } from 'react';

interface PanelContext {
  type: 'agent' | 'task' | 'message' | 'agentProfile' | null;
  data: any;
  isVisible: boolean;
}

export const useContextAwarePanel = () => {
  const [panelContext, setPanelContext] = useState<PanelContext>({
    type: null,
    data: null,
    isVisible: false
  });

  const showPanel = useCallback((type: PanelContext['type'], data: any) => {
    setPanelContext({
      type,
      data,
      isVisible: true
    });
  }, []);

  const hidePanel = useCallback(() => {
    setPanelContext(prev => ({
      ...prev,
      isVisible: false
    }));
  }, []);

  return {
    panelContext,
    showPanel,
    hidePanel
  };
};
