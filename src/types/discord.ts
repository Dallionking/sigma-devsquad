
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
