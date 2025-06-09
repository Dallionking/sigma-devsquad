
import { useState, useCallback } from 'react';
import { useDataPersistence } from '@/contexts/DataPersistenceContext';
import { useToast } from '@/hooks/use-toast';

interface StateManagementConfig {
  updateFrequency: string;
  cachingStrategy: string;
  persistenceMode: string;
  debugMode: boolean;
  performanceLevel: string;
  compressionEnabled: boolean;
}

interface CollaborationConfig {
  realtimeUpdates: boolean;
  presenceVisibility: string;
  conflictResolution: string;
  notificationLevel: string;
  permissionLevel: string;
  activityBroadcast: string;
}

export const useConfigurationSettings = () => {
  const { debugger: stateDebugger } = useDataPersistence();
  const { toast } = useToast();

  // State Management Settings
  const [stateConfig, setStateConfig] = useState<StateManagementConfig>({
    updateFrequency: "medium",
    cachingStrategy: "smart",
    persistenceMode: "session",
    debugMode: false,
    performanceLevel: "balanced",
    compressionEnabled: false
  });

  // Collaboration Settings
  const [collaborationConfig, setCollaborationConfig] = useState<CollaborationConfig>({
    realtimeUpdates: true,
    presenceVisibility: "team",
    conflictResolution: "merge",
    notificationLevel: "important",
    permissionLevel: "collaborator",
    activityBroadcast: "selective"
  });

  const updateStateConfig = useCallback((updates: Partial<StateManagementConfig>) => {
    setStateConfig(prev => {
      const newConfig = { ...prev, ...updates };
      
      // Apply debug mode changes immediately
      if ('debugMode' in updates) {
        stateDebugger.setIsCapturing(updates.debugMode!);
      }
      
      return newConfig;
    });
  }, [stateDebugger]);

  const updateCollaborationConfig = useCallback((updates: Partial<CollaborationConfig>) => {
    setCollaborationConfig(prev => ({ ...prev, ...updates }));
  }, []);

  const saveStateSettings = useCallback(() => {
    console.log("Saving state management settings:", stateConfig);
    toast({
      title: "State Settings Saved",
      description: "State management configuration has been updated"
    });
  }, [stateConfig, toast]);

  const saveCollaborationSettings = useCallback(() => {
    console.log("Saving collaboration settings:", collaborationConfig);
    toast({
      title: "Collaboration Settings Saved",
      description: "Collaboration preferences have been updated"
    });
  }, [collaborationConfig, toast]);

  const resetStateSettings = useCallback(() => {
    const defaultConfig: StateManagementConfig = {
      updateFrequency: "medium",
      cachingStrategy: "smart",
      persistenceMode: "session",
      debugMode: false,
      performanceLevel: "balanced",
      compressionEnabled: false
    };
    
    setStateConfig(defaultConfig);
    stateDebugger.setIsCapturing(false);
    
    toast({
      title: "State Settings Reset",
      description: "State management settings have been reset to defaults"
    });
  }, [stateDebugger, toast]);

  const resetCollaborationSettings = useCallback(() => {
    const defaultConfig: CollaborationConfig = {
      realtimeUpdates: true,
      presenceVisibility: "team",
      conflictResolution: "merge",
      notificationLevel: "important",
      permissionLevel: "collaborator",
      activityBroadcast: "selective"
    };
    
    setCollaborationConfig(defaultConfig);
    
    toast({
      title: "Collaboration Settings Reset",
      description: "Collaboration settings have been reset to defaults"
    });
  }, [toast]);

  const exportConfiguration = useCallback(() => {
    const fullConfig = {
      stateManagement: stateConfig,
      collaboration: collaborationConfig,
      exportedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(fullConfig, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `configuration-settings-${Date.now()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Configuration Exported",
      description: "Settings have been exported to a JSON file"
    });
  }, [stateConfig, collaborationConfig, toast]);

  return {
    // State Management
    stateConfig,
    updateStateConfig,
    saveStateSettings,
    resetStateSettings,
    
    // Collaboration
    collaborationConfig,
    updateCollaborationConfig,
    saveCollaborationSettings,
    resetCollaborationSettings,
    
    // Utilities
    exportConfiguration
  };
};
