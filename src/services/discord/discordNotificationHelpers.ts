
import { DiscordNotificationPayload } from '@/types/discord';

export class DiscordNotificationHelpers {
  static createAgentStatusNotification(
    agentName: string, 
    oldStatus: string, 
    newStatus: string, 
    userRole?: string
  ): DiscordNotificationPayload {
    return {
      type: 'agent_status',
      title: '🔄 Agent Status Changed',
      message: `${agentName} status changed from "${oldStatus}" to "${newStatus}"`,
      agentName,
      priority: 'medium',
      userRole
    };
  }

  static createTaskCompletionNotification(
    taskId: string, 
    taskTitle: string, 
    agentName?: string, 
    userRole?: string
  ): DiscordNotificationPayload {
    return {
      type: 'task_completion',
      title: '✅ Task Completed',
      message: `Task "${taskTitle}" has been completed successfully`,
      agentName,
      taskId,
      priority: 'medium',
      userRole
    };
  }

  static createSystemErrorNotification(
    error: string, 
    priority: 'high' | 'critical' = 'high'
  ): DiscordNotificationPayload {
    return {
      type: 'system_error',
      title: '🚨 System Error',
      message: error,
      priority
    };
  }

  static createPlanningAgentNotification(
    message: string, 
    userRole?: string
  ): DiscordNotificationPayload {
    return {
      type: 'planning_agent',
      title: '📋 Planning Agent Update',
      message,
      priority: 'medium',
      userRole
    };
  }

  static createTestMessage(message: string): DiscordNotificationPayload {
    return {
      type: 'direct_message',
      title: '🧪 Test Message',
      message: message,
      timestamp: new Date()
    };
  }
}
