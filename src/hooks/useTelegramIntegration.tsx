
import { useState, useCallback, useEffect } from 'react';
import { telegramService, TelegramConfig, NotificationPayload } from '@/services/telegramService';
import { useToast } from '@/hooks/use-toast';

interface TelegramIntegrationState {
  isConnected: boolean;
  isConfigured: boolean;
  lastMessageSent: Date | null;
  messageCount: number;
}

export const useTelegramIntegration = () => {
  const [state, setState] = useState<TelegramIntegrationState>({
    isConnected: false,
    isConfigured: false,
    lastMessageSent: null,
    messageCount: 0
  });

  const { toast } = useToast();

  const configure = useCallback((config: TelegramConfig) => {
    telegramService.configure(config);
    setState(prev => ({
      ...prev,
      isConnected: config.isEnabled,
      isConfigured: true
    }));
  }, []);

  const sendNotification = useCallback(async (payload: NotificationPayload): Promise<boolean> => {
    try {
      const success = await telegramService.sendNotification(payload);
      
      if (success) {
        setState(prev => ({
          ...prev,
          lastMessageSent: new Date(),
          messageCount: prev.messageCount + 1
        }));
      }
      
      return success;
    } catch (error) {
      console.error('Failed to send Telegram notification:', error);
      toast({
        title: "Notification Failed",
        description: "Failed to send Telegram notification",
        variant: "destructive",
      });
      return false;
    }
  }, [toast]);

  const sendTestMessage = useCallback(async (message: string): Promise<boolean> => {
    return await telegramService.sendTestMessage(message);
  }, []);

  // Helper methods for specific notification types
  const notifyAgentStatusChange = useCallback(async (agentName: string, oldStatus: string, newStatus: string) => {
    return await telegramService.notifyAgentStatusChange(agentName, oldStatus, newStatus);
  }, []);

  const notifyTaskCompletion = useCallback(async (taskId: string, taskTitle: string, agentName?: string) => {
    return await telegramService.notifyTaskCompletion(taskId, taskTitle, agentName);
  }, []);

  const notifySystemError = useCallback(async (error: string, priority: 'high' | 'critical' = 'high') => {
    return await telegramService.notifySystemError(error, priority);
  }, []);

  const notifyPlanningAgentUpdate = useCallback(async (message: string) => {
    return await telegramService.notifyPlanningAgentUpdate(message);
  }, []);

  const updateNotificationSettings = useCallback((settings: {
    agentStatusNotifications: boolean;
    taskCompletionNotifications: boolean;
    systemErrorNotifications: boolean;
    planningAgentNotifications: boolean;
    directMessaging: boolean;
  }) => {
    telegramService.updateNotificationSettings(settings);
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
