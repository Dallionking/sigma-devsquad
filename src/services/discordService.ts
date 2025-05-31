
import { DiscordConfig, DiscordNotificationPayload, DiscordNotificationSettings } from '@/types/discord';
import { DiscordWebhookClient } from './discord/discordWebhookClient';
import { DiscordEmbedFormatter } from './discord/discordEmbedFormatter';
import { DiscordNotificationHelpers } from './discord/discordNotificationHelpers';

class DiscordService {
  private webhookClient = new DiscordWebhookClient();
  private notificationSettings: DiscordNotificationSettings = {
    agentStatusNotifications: true,
    taskCompletionNotifications: true,
    systemErrorNotifications: true,
    planningAgentNotifications: true,
    directMessaging: true,
    roleBasedNotifications: true,
  };

  configure(config: DiscordConfig) {
    this.webhookClient.configure(config);
  }

  updateNotificationSettings(settings: DiscordNotificationSettings) {
    this.notificationSettings = { ...settings };
    console.log('Discord notification settings updated:', settings);
  }

  private isNotificationTypeEnabled(type: DiscordNotificationPayload['type']): boolean {
    switch (type) {
      case 'agent_status':
        return this.notificationSettings.agentStatusNotifications;
      case 'task_completion':
        return this.notificationSettings.taskCompletionNotifications;
      case 'system_error':
        return this.notificationSettings.systemErrorNotifications;
      case 'planning_agent':
        return this.notificationSettings.planningAgentNotifications;
      case 'direct_message':
        return this.notificationSettings.directMessaging;
      default:
        return false;
    }
  }

  async sendNotification(payload: DiscordNotificationPayload): Promise<boolean> {
    if (!this.isNotificationTypeEnabled(payload.type)) {
      return false;
    }

    const embed = DiscordEmbedFormatter.formatEmbed(payload);
    return await this.webhookClient.sendMessage(embed);
  }

  async sendTestMessage(message: string): Promise<boolean> {
    const testPayload = DiscordNotificationHelpers.createTestMessage(message);
    return await this.sendNotification(testPayload);
  }

  // Helper methods for common notifications
  async notifyAgentStatusChange(agentName: string, oldStatus: string, newStatus: string, userRole?: string): Promise<boolean> {
    const payload = DiscordNotificationHelpers.createAgentStatusNotification(agentName, oldStatus, newStatus, userRole);
    return await this.sendNotification(payload);
  }

  async notifyTaskCompletion(taskId: string, taskTitle: string, agentName?: string, userRole?: string): Promise<boolean> {
    const payload = DiscordNotificationHelpers.createTaskCompletionNotification(taskId, taskTitle, agentName, userRole);
    return await this.sendNotification(payload);
  }

  async notifySystemError(error: string, priority: 'high' | 'critical' = 'high'): Promise<boolean> {
    const payload = DiscordNotificationHelpers.createSystemErrorNotification(error, priority);
    return await this.sendNotification(payload);
  }

  async notifyPlanningAgentUpdate(message: string, userRole?: string): Promise<boolean> {
    const payload = DiscordNotificationHelpers.createPlanningAgentNotification(message, userRole);
    return await this.sendNotification(payload);
  }
}

export const discordService = new DiscordService();
export type { DiscordNotificationPayload, DiscordConfig };
