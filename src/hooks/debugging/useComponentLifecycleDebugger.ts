
import { useEffect, useCallback } from 'react';
import { useStateDebugger } from './index';

export const useComponentLifecycleDebugger = (componentName: string) => {
  const { log } = useStateDebugger();

  useEffect(() => {
    log(componentName, { action: 'mount' }, 'component-mount');

    return () => {
      log(componentName, { action: 'unmount' }, 'component-unmount');
    };
  }, [componentName, log]);

  const logUpdate = useCallback((updateData: any) => {
    log(componentName, { action: 'update', data: updateData }, 'state-update');
  }, [componentName, log]);

  return { logUpdate };
};
