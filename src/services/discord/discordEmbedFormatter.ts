
import { DiscordNotificationPayload } from '@/types/discord';

export class DiscordEmbedFormatter {
  static formatEmbed(payload: DiscordNotificationPayload): any {
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
}
