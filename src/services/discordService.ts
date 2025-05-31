
export interface DiscordConfig {
  webhookUrl: string;
  isEnabled: boolean;
  serverName?: string;
  channelName?: string;
}

export interface DiscordNotificationPayload {
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  priority?: 'low' | 'normal' | 'high' | 'critical';
  metadata?: Record<string, any>;
}

export interface DiscordNotificationSettings {
  agentStatusNotifications: boolean;
  taskCompletionNotifications: boolean;
  systemErrorNotifications: boolean;
  planningAgentNotifications: boolean;
  directMessaging: boolean;
}

class DiscordService {
  private config: DiscordConfig | null = null;
  private notificationSettings: DiscordNotificationSettings = {
    agentStatusNotifications: true,
    taskCompletionNotifications: true,
    systemErrorNotifications: true,
    planningAgentNotifications: true,
    directMessaging: true
  };

  configure(config: DiscordConfig) {
    this.config = config;
    console.log('Discord service configured:', { isEnabled: config.isEnabled });
  }

  async sendNotification(payload: DiscordNotificationPayload): Promise<boolean> {
    if (!this.config?.isEnabled || !this.config.webhookUrl) {
      console.warn('Discord service not properly configured');
      return false;
    }

    try {
      const embed = this.createEmbed(payload);
      
      const response = await fetch(this.config.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'Vibe DevSquad',
          embeds: [embed]
        })
      });

      if (response.ok) {
        console.log('Discord notification sent successfully');
        return true;
      } else {
        console.error('Failed to send Discord notification:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error sending Discord notification:', error);
      return false;
    }
  }

  async sendTestMessage(message: string): Promise<boolean> {
    return await this.sendNotification({
      message: `🧪 Test Message: ${message}`,
      type: 'info'
    });
  }

  async notifyAgentStatusChange(agentName: string, oldStatus: string, newStatus: string, userRole?: string): Promise<boolean> {
    if (!this.notificationSettings.agentStatusNotifications) return false;
    
    return await this.sendNotification({
      message: `Agent **${agentName}** status changed from ${oldStatus} to ${newStatus}`,
      type: 'info',
      metadata: { agentName, oldStatus, newStatus, userRole }
    });
  }

  async notifyTaskCompletion(taskId: string, taskTitle: string, agentName?: string, userRole?: string): Promise<boolean> {
    if (!this.notificationSettings.taskCompletionNotifications) return false;
    
    return await this.sendNotification({
      message: `Task **${taskTitle}** completed${agentName ? ` by ${agentName}` : ''}`,
      type: 'success',
      metadata: { taskId, taskTitle, agentName, userRole }
    });
  }

  async notifySystemError(error: string, priority: 'high' | 'critical' = 'high'): Promise<boolean> {
    if (!this.notificationSettings.systemErrorNotifications) return false;
    
    return await this.sendNotification({
      message: `System ${priority === 'critical' ? 'Critical' : 'High Priority'} Alert: ${error}`,
      type: 'error',
      priority,
      metadata: { error, priority }
    });
  }

  async notifyPlanningAgentUpdate(message: string, userRole?: string): Promise<boolean> {
    if (!this.notificationSettings.planningAgentNotifications) return false;
    
    return await this.sendNotification({
      message: `Planning Agent Update: ${message}`,
      type: 'info',
      metadata: { source: 'planning-agent', userRole }
    });
  }

  updateNotificationSettings(settings: Partial<DiscordNotificationSettings>) {
    this.notificationSettings = { ...this.notificationSettings, ...settings };
    console.log('Discord notification settings updated:', this.notificationSettings);
  }

  private createEmbed(payload: DiscordNotificationPayload) {
    const colors = {
      info: 0x3B82F6,    // Electric blue
      success: 0x10B981, // Success green
      warning: 0xF59E0B, // Warning amber
      error: 0xEF4444    // Error red
    };

    return {
      title: 'Vibe DevSquad Notification',
      description: payload.message,
      color: colors[payload.type],
      timestamp: new Date().toISOString(),
      footer: {
        text: 'AI Collaboration Hub'
      }
    };
  }
}

export const discordService = new DiscordService();
