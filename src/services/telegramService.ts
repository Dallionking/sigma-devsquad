
export interface TelegramConfig {
  botToken: string;
  chatId: string;
  isEnabled: boolean;
}

export interface NotificationPayload {
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  priority?: 'low' | 'normal' | 'medium' | 'high' | 'critical';
  metadata?: Record<string, any>;
}

class TelegramService {
  private config: TelegramConfig | null = null;
  private notificationSettings = {
    agentStatusNotifications: true,
    taskCompletionNotifications: true,
    systemErrorNotifications: true,
    planningAgentNotifications: true,
    directMessaging: true
  };

  configure(config: TelegramConfig) {
    this.config = config;
    console.log('Telegram service configured:', { isEnabled: config.isEnabled });
  }

  async sendNotification(payload: NotificationPayload): Promise<boolean> {
    if (!this.config?.isEnabled || !this.config.botToken || !this.config.chatId) {
      console.warn('Telegram service not properly configured');
      return false;
    }

    try {
      const message = this.formatMessage(payload);
      const url = `https://api.telegram.org/bot${this.config.botToken}/sendMessage`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: this.config.chatId,
          text: message,
          parse_mode: 'Markdown'
        })
      });

      if (response.ok) {
        console.log('Telegram notification sent successfully');
        return true;
      } else {
        console.error('Failed to send Telegram notification:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error sending Telegram notification:', error);
      return false;
    }
  }

  async sendTestMessage(message: string): Promise<boolean> {
    return await this.sendNotification({
      message: `🧪 Test Message: ${message}`,
      type: 'info'
    });
  }

  async notifyAgentStatusChange(agentName: string, oldStatus: string, newStatus: string): Promise<boolean> {
    if (!this.notificationSettings.agentStatusNotifications) return false;
    
    return await this.sendNotification({
      message: `🤖 Agent Status Update\n*${agentName}*: ${oldStatus} → ${newStatus}`,
      type: 'info',
      metadata: { agentName, oldStatus, newStatus }
    });
  }

  async notifyTaskCompletion(taskId: string, taskTitle: string, agentName?: string): Promise<boolean> {
    if (!this.notificationSettings.taskCompletionNotifications) return false;
    
    return await this.sendNotification({
      message: `✅ Task Completed\n*${taskTitle}*${agentName ? `\nBy: ${agentName}` : ''}`,
      type: 'success',
      metadata: { taskId, taskTitle, agentName }
    });
  }

  async notifySystemError(error: string, priority: 'high' | 'critical' = 'high'): Promise<boolean> {
    if (!this.notificationSettings.systemErrorNotifications) return false;
    
    const emoji = priority === 'critical' ? '🚨' : '⚠️';
    return await this.sendNotification({
      message: `${emoji} System Alert\n${error}`,
      type: 'error',
      priority,
      metadata: { error, priority }
    });
  }

  async notifyPlanningAgentUpdate(message: string): Promise<boolean> {
    if (!this.notificationSettings.planningAgentNotifications) return false;
    
    return await this.sendNotification({
      message: `🧠 Planning Agent\n${message}`,
      type: 'info',
      metadata: { source: 'planning-agent' }
    });
  }

  updateNotificationSettings(settings: Partial<typeof this.notificationSettings>) {
    this.notificationSettings = { ...this.notificationSettings, ...settings };
    console.log('Telegram notification settings updated:', this.notificationSettings);
  }

  private formatMessage(payload: NotificationPayload): string {
    const timestamp = new Date().toLocaleTimeString();
    const typeEmoji = {
      info: 'ℹ️',
      success: '✅', 
      warning: '⚠️',
      error: '❌'
    };

    return `${typeEmoji[payload.type]} *Vibe DevSquad*\n${payload.message}\n\n_${timestamp}_`;
  }
}

export const telegramService = new TelegramService();
