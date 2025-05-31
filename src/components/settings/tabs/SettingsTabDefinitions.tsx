
import { Settings, Shield, Bell } from "lucide-react";
import { ConfigurationSettings } from "../ConfigurationSettings";
import { GeneralSettings } from "../GeneralSettings";
import { APIKeySettings } from "../APIKeySettings";
import { AppearanceSettings } from "../AppearanceSettings";
import { PerformanceSettings } from "../PerformanceSettings";
import { SecuritySettings } from "../SecuritySettings";
import { NotificationSettings } from "../NotificationSettings";
import { BackupSettings } from "../BackupSettings";

export const settingsTabDefinitions = [
  {
    id: "general",
    label: "General",
    description: "Basic application settings",
    component: GeneralSettings,
    icon: Settings
  },
  {
    id: "configuration",
    label: "Configuration",
    description: "Advanced state management and collaboration settings",
    component: ConfigurationSettings,
    icon: Settings
  },
  {
    id: "api-keys",
    label: "API Keys",
    description: "Manage API keys and integrations",
    component: APIKeySettings,
    icon: Shield
  },
  {
    id: "appearance",
    label: "Appearance",
    description: "Customize the look and feel",
    component: AppearanceSettings,
    icon: Settings
  },
  {
    id: "performance",
    label: "Performance",
    description: "Performance and optimization settings",
    component: PerformanceSettings,
    icon: Settings
  },
  {
    id: "security",
    label: "Security",
    description: "Security and privacy settings",
    component: SecuritySettings,
    icon: Shield
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Notification preferences",
    component: NotificationSettings,
    icon: Bell
  },
  {
    id: "backup",
    label: "Backup",
    description: "Backup and restore settings",
    component: BackupSettings,
    icon: Settings
  }
];
