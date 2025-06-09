
import { useState, useCallback } from 'react';
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

interface DataManagementConfig {
  storageQuota: string;
  compressionLevel: string;
  retentionPeriod: string;
  encryptionEnabled: boolean;
  backupFrequency: string;
  syncPriority: string;
  dataValidation: boolean;
  autoCleanup: boolean;
  indexingStrategy: string;
  cachingPolicy: string;
}

export const useConfigurationSettings = () => {
  const { toast } = useToast();

  // State Management Configuration
  const [stateConfig, setStateConfig] = useState<StateManagementConfig>({
    updateFrequency: 'medium',
    cachingStrategy: 'smart',
    persistenceMode: 'local',
    debugMode: false,
    performanceLevel: 'balanced',
    compressionEnabled: false
  });

  // Collaboration Configuration
  const [collaborationConfig, setCollaborationConfig] = useState<CollaborationConfig>({
    realtimeUpdates: true,
    presenceVisibility: 'team',
    conflictResolution: 'prompt',
    notificationLevel: 'important',
    permissionLevel: 'collaborator',
    activityBroadcast: 'selective'
  });

  // Data Management Configuration
  const [dataConfig, setDataConfig] = useState<DataManagementConfig>({
    storageQuota: '100mb',
    compressionLevel: 'medium',
    retentionPeriod: '1month',
    encryptionEnabled: true,
    backupFrequency: 'daily',
    syncPriority: 'balanced',
    dataValidation: true,
    autoCleanup: true,
    indexingStrategy: 'standard',
    cachingPolicy: 'lru'
  });

  // State Management Functions
  const updateStateConfig = useCallback((updates: Partial<StateManagementConfig>) => {
    setStateConfig(prev => ({ ...prev, ...updates }));
  }, []);

  const saveStateSettings = useCallback(() => {
    localStorage.setItem('stateConfig', JSON.stringify(stateConfig));
    toast({
      title: "Settings Saved",
      description: "State management settings have been saved successfully."
    });
  }, [stateConfig, toast]);

  const resetStateSettings = useCallback(() => {
    setStateConfig({
      updateFrequency: 'medium',
      cachingStrategy: 'smart',
      persistenceMode: 'local',
      debugMode: false,
      performanceLevel: 'balanced',
      compressionEnabled: false
    });
    toast({
      title: "Settings Reset",
      description: "State management settings have been reset to defaults."
    });
  }, [toast]);

  // Collaboration Functions
  const updateCollaborationConfig = useCallback((updates: Partial<CollaborationConfig>) => {
    setCollaborationConfig(prev => ({ ...prev, ...updates }));
  }, []);

  const saveCollaborationSettings = useCallback(() => {
    localStorage.setItem('collaborationConfig', JSON.stringify(collaborationConfig));
    toast({
      title: "Settings Saved",
      description: "Collaboration settings have been saved successfully."
    });
  }, [collaborationConfig, toast]);

  const resetCollaborationSettings = useCallback(() => {
    setCollaborationConfig({
      realtimeUpdates: true,
      presenceVisibility: 'team',
      conflictResolution: 'prompt',
      notificationLevel: 'important',
      permissionLevel: 'collaborator',
      activityBroadcast: 'selective'
    });
    toast({
      title: "Settings Reset",
      description: "Collaboration settings have been reset to defaults."
    });
  }, [toast]);

  // Data Management Functions
  const updateDataConfig = useCallback((updates: Partial<DataManagementConfig>) => {
    setDataConfig(prev => ({ ...prev, ...updates }));
  }, []);

  const saveDataSettings = useCallback(() => {
    localStorage.setItem('dataConfig', JSON.stringify(dataConfig));
    toast({
      title: "Settings Saved",
      description: "Data management settings have been saved successfully."
    });
  }, [dataConfig, toast]);

  const resetDataSettings = useCallback(() => {
    setDataConfig({
      storageQuota: '100mb',
      compressionLevel: 'medium',
      retentionPeriod: '1month',
      encryptionEnabled: true,
      backupFrequency: 'daily',
      syncPriority: 'balanced',
      dataValidation: true,
      autoCleanup: true,
      indexingStrategy: 'standard',
      cachingPolicy: 'lru'
    });
    toast({
      title: "Settings Reset",
      description: "Data management settings have been reset to defaults."
    });
  }, [toast]);

  // Export Configuration
  const exportConfiguration = useCallback(() => {
    const configData = {
      stateManagement: stateConfig,
      collaboration: collaborationConfig,
      dataManagement: dataConfig,
      exportedAt: new Date().toISOString(),
      version: '1.0.0'
    };

    const blob = new Blob([JSON.stringify(configData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `configuration-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Configuration Exported",
      description: "Configuration settings have been exported successfully."
    });
  }, [stateConfig, collaborationConfig, dataConfig, toast]);

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
    
    // Data Management
    dataConfig,
    updateDataConfig,
    saveDataSettings,
    resetDataSettings,
    
    // Utilities
    exportConfiguration
  };
};
