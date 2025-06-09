
export interface DiscordConfig {
  webhookUrl: string;
  isEnabled: boolean;
  serverName?: string;
  channelName?: string;
}

export interface DiscordNotificationPayload {
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'agent_status' | 'task_completion' | 'system_error' | 'planning_agent' | 'direct_message';
  priority?: 'low' | 'normal' | 'medium' | 'high' | 'critical';
  metadata?: Record<string, any>;
  title?: string;
  agentName?: string;
  taskId?: string;
  userRole?: string;
  timestamp?: Date;
}

export interface DiscordNotificationSettings {
  agentStatusNotifications: boolean;
  taskCompletionNotifications: boolean;
  systemErrorNotifications: boolean;
  planningAgentNotifications: boolean;
  directMessaging: boolean;
}
