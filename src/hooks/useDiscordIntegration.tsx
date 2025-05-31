
import { useState, useCallback } from 'react';
import { discordService, DiscordConfig, DiscordNotificationPayload } from '@/services/discordService';
import { useToast } from '@/hooks/use-toast';

interface DiscordIntegrationState {
  isConnected: boolean;
  isConfigured: boolean;
  lastMessageSent: Date | null;
  messageCount: number;
  serverName?: string;
  channelName?: string;
}

export const useDiscordIntegration = () => {
  const [state, setState] = useState<DiscordIntegrationState>({
    isConnected: false,
    isConfigured: false,
    lastMessageSent: null,
    messageCount: 0
  });

  const { toast } = useToast();

  const configure = useCallback((config: DiscordConfig) => {
    discordService.configure(config);
    setState(prev => ({
      ...prev,
      isConnected: config.isEnabled,
      isConfigured: true,
      serverName: config.serverName,
      channelName: config.channelName
    }));
  }, []);

  const sendNotification = useCallback(async (payload: DiscordNotificationPayload): Promise<boolean> => {
    try {
      const success = await discordService.sendNotification(payload);
      
      if (success) {
        setState(prev => ({
          ...prev,
          lastMessageSent: new Date(),
          messageCount: prev.messageCount + 1
        }));
      }
      
      return success;
    } catch (error) {
      console.error('Failed to send Discord notification:', error);
      toast({
        title: "Notification Failed",
        description: "Failed to send Discord notification",
        variant: "destructive",
      });
      return false;
    }
  }, [toast]);

  const sendTestMessage = useCallback(async (message: string): Promise<boolean> => {
    return await discordService.sendTestMessage(message);
  }, []);

  // Helper methods for specific notification types
  const notifyAgentStatusChange = useCallback(async (agentName: string, oldStatus: string, newStatus: string, userRole?: string) => {
    return await discordService.notifyAgentStatusChange(agentName, oldStatus, newStatus, userRole);
  }, []);

  const notifyTaskCompletion = useCallback(async (taskId: string, taskTitle: string, agentName?: string, userRole?: string) => {
    return await discordService.notifyTaskCompletion(taskId, taskTitle, agentName, userRole);
  }, []);

  const notifySystemError = useCallback(async (error: string, priority: 'high' | 'critical' = 'high') => {
    return await discordService.notifySystemError(error, priority);
  }, []);

  const notifyPlanningAgentUpdate = useCallback(async (message: string, userRole?: string) => {
    return await discordService.notifyPlanningAgentUpdate(message, userRole);
  }, []);

  const updateNotificationSettings = useCallback((settings: {
    agentStatusNotifications: boolean;
    taskCompletionNotifications: boolean;
    systemErrorNotifications: boolean;
    planningAgentNotifications: boolean;
    directMessaging: boolean;
    roleBasedNotifications: boolean;
  }) => {
    discordService.updateNotificationSettings(settings);
  }, []);

  return {
    state,
    configure,
    sendNotification,
    sendTestMessage,
    notifyAgentStatusChange,
    notifyTaskCompletion,
    notifySystemError,
    notifyPlanningAgentUpdate,
    updateNotificationSettings
  };
};
