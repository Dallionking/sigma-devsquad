
import { useState } from "react";
import { SettingsSection } from "./SettingsSection";
import { SettingItem } from "./SettingItem";
import { TelegramIntegration } from "./TelegramIntegration";
import { DiscordIntegration } from "./DiscordIntegration";
import { OptimizedStack } from "@/components/layout/SpaceOptimizedContainer";

interface NotificationSettingsProps {
  notifications: boolean;
  setNotifications: (value: boolean) => void;
  searchQuery?: string;
}

export const NotificationSettings = ({ notifications, setNotifications, searchQuery = "" }: NotificationSettingsProps) => {
  const [agentStatusChanges, setAgentStatusChanges] = useState(true);
  const [taskCompletions, setTaskCompletions] = useState(true);
  const [systemErrors, setSystemErrors] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [notificationSound, setNotificationSound] = useState("default");

  const handleSave = () => {
    console.log("Saving notification settings:", {
      notifications,
      agentStatusChanges,
      taskCompletions,
      systemErrors,
      emailNotifications,
      notificationSound
    });
  };

  const handleReset = () => {
    setNotifications(true);
    setAgentStatusChanges(true);
    setTaskCompletions(true);
    setSystemErrors(true);
    setEmailNotifications(false);
    setNotificationSound("default");
  };

  return (
    <OptimizedStack gap="lg">
      {/* Basic Notification Settings */}
      <SettingsSection
        title="Basic Notifications"
        description="Configure general notification preferences"
        onSave={handleSave}
        onReset={handleReset}
        searchQuery={searchQuery}
      >
        <OptimizedStack gap="sm">
          <SettingItem
            id="enable-notifications"
            type="switch"
            label="Enable Notifications"
            description="Receive system notifications"
            checked={notifications}
            onCheckedChange={setNotifications}
          />

          <SettingItem
            id="agent-status-changes"
            type="switch"
            label="Agent Status Changes"
            description="Notify when agents change status"
            checked={agentStatusChanges}
            onCheckedChange={setAgentStatusChanges}
          />

          <SettingItem
            id="task-completions"
            type="switch"
            label="Task Completions"
            description="Notify when tasks are completed"
            checked={taskCompletions}
            onCheckedChange={setTaskCompletions}
          />

          <SettingItem
            id="system-errors"
            type="switch"
            label="System Errors"
            description="Notify about critical errors"
            checked={systemErrors}
            onCheckedChange={setSystemErrors}
          />

          <SettingItem
            id="email-notifications"
            type="switch"
            label="Email Notifications"
            description="Send notifications via email"
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
          />

          <SettingItem
            id="notification-sound"
            type="select"
            label="Notification Sound"
            description="Choose notification sound"
            value={notificationSound}
            onValueChange={setNotificationSound}
            options={[
              { value: "default", label: "Default" },
              { value: "chime", label: "Chime" },
              { value: "ping", label: "Ping" },
              { value: "none", label: "None" }
            ]}
          />
        </OptimizedStack>
      </SettingsSection>

      {/* Telegram Integration */}
      <TelegramIntegration searchQuery={searchQuery} />

      {/* Discord Integration */}
      <DiscordIntegration searchQuery={searchQuery} />
    </OptimizedStack>
  );
};
