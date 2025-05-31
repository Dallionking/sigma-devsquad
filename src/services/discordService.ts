
interface DiscordConfig {
  webhookUrl: string;
  isEnabled: boolean;
  serverName?: string;
  channelName?: string;
}

interface DiscordNotificationPayload {
  type: 'agent_status' | 'task_completion' | 'system_error' | 'planning_agent' | 'direct_message';
  title: string;
  message: string;
  agentName?: string;
  taskId?: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  timestamp?: Date;
  userRole?: string;
}

class DiscordService {
  private config: DiscordConfig | null = null;
  private notificationSettings = {
    agentStatusNotifications: true,
    taskCompletionNotifications: true,
    systemErrorNotifications: true,
    planningAgentNotifications: true,
    directMessaging: true,
    roleBasedNotifications: true,
  };

  configure(config: DiscordConfig) {
    this.config = config;
    console.log('Discord service configured:', { 
      isEnabled: config.isEnabled,
      hasWebhook: !!config.webhookUrl,
      server: config.serverName,
      channel: config.channelName
    });
  }

  updateNotificationSettings(settings: typeof this.notificationSettings) {
    this.notificationSettings = { ...settings };
    console.log('Discord notification settings updated:', settings);
  }

  private async sendWebhookMessage(embed: any): Promise<boolean> {
    if (!this.config || !this.config.isEnabled || !this.config.webhookUrl) {
      console.log('Discord service not configured or disabled');
      return false;
    }

    try {
      const response = await fetch(this.config.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          embeds: [embed],
        }),
      });

      if (!response.ok) {
        throw new Error(`Discord webhook error: ${response.status}`);
      }

      console.log('Discord message sent successfully');
      return true;
    } catch (error) {
      console.error('Failed to send Discord message:', error);
      return false;
    }
  }

  private formatEmbed(payload: DiscordNotificationPayload): any {
    const timestamp = payload.timestamp || new Date();
    
    let color = 0x3498db; // Default blue
    switch (payload.type) {
      case 'agent_status':
        color = 0x9b59b6; // Purple
        break;
      case 'task_completion':
        color = 0x2ecc71; // Green
        break;
      case 'system_error':
        color = 0xe74c3c; // Red
        break;
      case 'planning_agent':
        color = 0xf39c12; // Orange
        break;
      case 'direct_message':
        color = 0x1abc9c; // Teal
        break;
    }

    const fields = [];
    
    if (payload.agentName) {
      fields.push({
        name: '🤖 Agent',
        value: payload.agentName,
        inline: true
      });
    }
    
    if (payload.taskId) {
      fields.push({
        name: '🆔 Task ID',
        value: payload.taskId,
        inline: true
      });
    }
    
    if (payload.priority && payload.priority !== 'low') {
      const priorityEmoji = payload.priority === 'critical' ? '🔴' : payload.priority === 'high' ? '🟠' : '🟡';
      fields.push({
        name: '⚠️ Priority',
        value: `${priorityEmoji} ${payload.priority.toUpperCase()}`,
        inline: true
      });
    }

    if (payload.userRole) {
      fields.push({
        name: '👤 Role',
        value: payload.userRole,
        inline: true
      });
    }

    return {
      title: payload.title,
      description: payload.message,
      color: color,
      fields: fields,
      timestamp: timestamp.toISOString(),
      footer: {
        text: 'Agent Management System'
      }
    };
  }

  async sendNotification(payload: DiscordNotificationPayload): Promise<boolean> {
    // Check if this type of notification is enabled
    switch (payload.type) {
      case 'agent_status':
        if (!this.notificationSettings.agentStatusNotifications) return false;
        break;
      case 'task_completion':
        if (!this.notificationSettings.taskCompletionNotifications) return false;
        break;
      case 'system_error':
        if (!this.notificationSettings.systemErrorNotifications) return false;
        break;
      case 'planning_agent':
        if (!this.notificationSettings.planningAgentNotifications) return false;
        break;
      case 'direct_message':
        if (!this.notificationSettings.directMessaging) return false;
        break;
    }

    const embed = this.formatEmbed(payload);
    return await this.sendWebhookMessage(embed);
  }

  async sendTestMessage(message: string): Promise<boolean> {
    const testPayload: DiscordNotificationPayload = {
      type: 'direct_message',
      title: '🧪 Test Message',
      message: message,
      timestamp: new Date()
    };
    
    return await this.sendNotification(testPayload);
  }

  // Helper methods for common notifications
  async notifyAgentStatusChange(agentName: string, oldStatus: string, newStatus: string, userRole?: string): Promise<boolean> {
    return await this.sendNotification({
      type: 'agent_status',
      title: '🔄 Agent Status Changed',
      message: `${agentName} status changed from "${oldStatus}" to "${newStatus}"`,
      agentName,
      priority: 'medium',
      userRole
    });
  }

  async notifyTaskCompletion(taskId: string, taskTitle: string, agentName?: string, userRole?: string): Promise<boolean> {
    return await this.sendNotification({
      type: 'task_completion',
      title: '✅ Task Completed',
      message: `Task "${taskTitle}" has been completed successfully`,
      agentName,
      taskId,
      priority: 'medium',
      userRole
    });
  }

  async notifySystemError(error: string, priority: 'high' | 'critical' = 'high'): Promise<boolean> {
    return await this.sendNotification({
      type: 'system_error',
      title: '🚨 System Error',
      message: error,
      priority
    });
  }

  async notifyPlanningAgentUpdate(message: string, userRole?: string): Promise<boolean> {
    return await this.sendNotification({
      type: 'planning_agent',
      title: '📋 Planning Agent Update',
      message,
      priority: 'medium',
      userRole
    });
  }
}

export const discordService = new DiscordService();
export type { DiscordNotificationPayload, DiscordConfig };
