
interface TelegramConfig {
  botToken: string;
  chatId: string;
  isEnabled: boolean;
}

interface NotificationPayload {
  type: 'agent_status' | 'task_completion' | 'system_error' | 'planning_agent' | 'direct_message';
  title: string;
  message: string;
  agentName?: string;
  taskId?: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  timestamp?: Date;
}

class TelegramService {
  private config: TelegramConfig | null = null;
  private notificationSettings = {
    agentStatusNotifications: true,
    taskCompletionNotifications: true,
    systemErrorNotifications: true,
    planningAgentNotifications: true,
    directMessaging: true,
  };

  configure(config: TelegramConfig) {
    this.config = config;
    console.log('Telegram service configured:', { isEnabled: config.isEnabled });
  }

  updateNotificationSettings(settings: typeof this.notificationSettings) {
    this.notificationSettings = { ...settings };
    console.log('Telegram notification settings updated:', settings);
  }

  private async sendMessage(text: string): Promise<boolean> {
    if (!this.config || !this.config.isEnabled) {
      console.log('Telegram service not configured or disabled');
      return false;
    }

    try {
      const url = `https://api.telegram.org/bot${this.config.botToken}/sendMessage`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: this.config.chatId,
          text: text,
          parse_mode: 'Markdown',
        }),
      });

      if (!response.ok) {
        throw new Error(`Telegram API error: ${response.status}`);
      }

      console.log('Telegram message sent successfully');
      return true;
    } catch (error) {
      console.error('Failed to send Telegram message:', error);
      return false;
    }
  }

  private formatMessage(payload: NotificationPayload): string {
    const timestamp = payload.timestamp || new Date();
    const timeStr = timestamp.toLocaleTimeString();
    
    let emoji = '📢';
    switch (payload.type) {
      case 'agent_status':
        emoji = '🤖';
        break;
      case 'task_completion':
        emoji = '✅';
        break;
      case 'system_error':
        emoji = '🚨';
        break;
      case 'planning_agent':
        emoji = '📋';
        break;
      case 'direct_message':
        emoji = '💬';
        break;
    }

    let message = `${emoji} *${payload.title}*\n\n${payload.message}`;
    
    if (payload.agentName) {
      message += `\n👤 Agent: ${payload.agentName}`;
    }
    
    if (payload.taskId) {
      message += `\n🆔 Task: ${payload.taskId}`;
    }
    
    if (payload.priority && payload.priority !== 'low') {
      const priorityEmoji = payload.priority === 'critical' ? '🔴' : payload.priority === 'high' ? '🟠' : '🟡';
      message += `\n${priorityEmoji} Priority: ${payload.priority.toUpperCase()}`;
    }
    
    message += `\n⏰ ${timeStr}`;
    
    return message;
  }

  async sendNotification(payload: NotificationPayload): Promise<boolean> {
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

    const formattedMessage = this.formatMessage(payload);
    return await this.sendMessage(formattedMessage);
  }

  async sendTestMessage(message: string): Promise<boolean> {
    const testPayload: NotificationPayload = {
      type: 'direct_message',
      title: 'Test Message',
      message: message,
      timestamp: new Date()
    };
    
    return await this.sendNotification(testPayload);
  }

  // Helper methods for common notifications
  async notifyAgentStatusChange(agentName: string, oldStatus: string, newStatus: string): Promise<boolean> {
    return await this.sendNotification({
      type: 'agent_status',
      title: 'Agent Status Changed',
      message: `${agentName} status changed from "${oldStatus}" to "${newStatus}"`,
      agentName,
      priority: 'medium'
    });
  }

  async notifyTaskCompletion(taskId: string, taskTitle: string, agentName?: string): Promise<boolean> {
    return await this.sendNotification({
      type: 'task_completion',
      title: 'Task Completed',
      message: `Task "${taskTitle}" has been completed successfully`,
      agentName,
      taskId,
      priority: 'medium'
    });
  }

  async notifySystemError(error: string, priority: 'high' | 'critical' = 'high'): Promise<boolean> {
    return await this.sendNotification({
      type: 'system_error',
      title: 'System Error',
      message: error,
      priority
    });
  }

  async notifyPlanningAgentUpdate(message: string): Promise<boolean> {
    return await this.sendNotification({
      type: 'planning_agent',
      title: 'Planning Agent Update',
      message,
      priority: 'medium'
    });
  }
}

export const telegramService = new TelegramService();
export type { NotificationPayload, TelegramConfig };
