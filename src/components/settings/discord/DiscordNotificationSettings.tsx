
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ValidatedSettingItem } from "../ValidatedSettingItem";
import { OptimizedStack } from "@/components/layout/SpaceOptimizedContainer";

interface DiscordNotificationSettingsProps {
  agentStatusNotifications: boolean;
  taskCompletionNotifications: boolean;
  systemErrorNotifications: boolean;
  planningAgentNotifications: boolean;
  directMessaging: boolean;
  roleBasedNotifications: boolean;
  onAgentStatusChange: (value: boolean) => void;
  onTaskCompletionChange: (value: boolean) => void;
  onSystemErrorChange: (value: boolean) => void;
  onPlanningAgentChange: (value: boolean) => void;
  onDirectMessagingChange: (value: boolean) => void;
  onRoleBasedNotificationsChange: (value: boolean) => void;
}

export const DiscordNotificationSettings = ({
  agentStatusNotifications,
  taskCompletionNotifications,
  systemErrorNotifications,
  planningAgentNotifications,
  directMessaging,
  roleBasedNotifications,
  onAgentStatusChange,
  onTaskCompletionChange,
  onSystemErrorChange,
  onPlanningAgentChange,
  onDirectMessagingChange,
  onRoleBasedNotificationsChange
}: DiscordNotificationSettingsProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Notification Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <OptimizedStack gap="sm">
          <ValidatedSettingItem
            id="agent-status-discord"
            type="switch"
            label="Agent Status Changes"
            description="Receive notifications when agents change status"
            checked={agentStatusNotifications}
            onCheckedChange={onAgentStatusChange}
          />

          <ValidatedSettingItem
            id="task-completion-discord"
            type="switch"
            label="Task Completions"
            description="Receive notifications when tasks are completed"
            checked={taskCompletionNotifications}
            onCheckedChange={onTaskCompletionChange}
          />

          <ValidatedSettingItem
            id="system-error-discord"
            type="switch"
            label="System Errors"
            description="Receive notifications about critical system errors"
            checked={systemErrorNotifications}
            onCheckedChange={onSystemErrorChange}
          />

          <ValidatedSettingItem
            id="planning-agent-discord"
            type="switch"
            label="Planning Agent Updates"
            description="Receive notifications from the Planning Agent"
            checked={planningAgentNotifications}
            onCheckedChange={onPlanningAgentChange}
          />

          <ValidatedSettingItem
            id="direct-messaging-discord"
            type="switch"
            label="Direct Messaging"
            description="Allow sending messages directly to Planning Agent via Discord"
            checked={directMessaging}
            onCheckedChange={onDirectMessagingChange}
          />

          <ValidatedSettingItem
            id="role-based-notifications"
            type="switch"
            label="Role-Based Notifications"
            description="Include user roles in notifications for team context"
            checked={roleBasedNotifications}
            onCheckedChange={onRoleBasedNotificationsChange}
          />
        </OptimizedStack>
      </CardContent>
    </Card>
  );
};
