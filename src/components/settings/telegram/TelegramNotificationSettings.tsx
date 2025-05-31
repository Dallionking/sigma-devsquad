
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ValidatedSettingItem } from "../ValidatedSettingItem";
import { OptimizedStack } from "@/components/layout/SpaceOptimizedContainer";

interface TelegramNotificationSettingsProps {
  agentStatusNotifications: boolean;
  taskCompletionNotifications: boolean;
  systemErrorNotifications: boolean;
  planningAgentNotifications: boolean;
  directMessaging: boolean;
  onAgentStatusChange: (value: boolean) => void;
  onTaskCompletionChange: (value: boolean) => void;
  onSystemErrorChange: (value: boolean) => void;
  onPlanningAgentChange: (value: boolean) => void;
  onDirectMessagingChange: (value: boolean) => void;
}

export const TelegramNotificationSettings = ({
  agentStatusNotifications,
  taskCompletionNotifications,
  systemErrorNotifications,
  planningAgentNotifications,
  directMessaging,
  onAgentStatusChange,
  onTaskCompletionChange,
  onSystemErrorChange,
  onPlanningAgentChange,
  onDirectMessagingChange
}: TelegramNotificationSettingsProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Notification Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <OptimizedStack gap="sm">
          <ValidatedSettingItem
            id="agent-status-telegram"
            type="switch"
            label="Agent Status Changes"
            description="Receive notifications when agents change status"
            checked={agentStatusNotifications}
            onCheckedChange={onAgentStatusChange}
          />

          <ValidatedSettingItem
            id="task-completion-telegram"
            type="switch"
            label="Task Completions"
            description="Receive notifications when tasks are completed"
            checked={taskCompletionNotifications}
            onCheckedChange={onTaskCompletionChange}
          />

          <ValidatedSettingItem
            id="system-error-telegram"
            type="switch"
            label="System Errors"
            description="Receive notifications about critical system errors"
            checked={systemErrorNotifications}
            onCheckedChange={onSystemErrorChange}
          />

          <ValidatedSettingItem
            id="planning-agent-telegram"
            type="switch"
            label="Planning Agent Updates"
            description="Receive notifications from the Planning Agent"
            checked={planningAgentNotifications}
            onCheckedChange={onPlanningAgentChange}
          />

          <ValidatedSettingItem
            id="direct-messaging-telegram"
            type="switch"
            label="Direct Messaging"
            description="Allow sending messages directly to Planning Agent via Telegram"
            checked={directMessaging}
            onCheckedChange={onDirectMessagingChange}
          />
        </OptimizedStack>
      </CardContent>
    </Card>
  );
};
