
import { Settings as SettingsIcon, Monitor, Shield, Bell, Database, Palette, Key } from "lucide-react";
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
    icon: SettingsIcon, 
    component: GeneralSettings 
  },
  { 
    id: "api-keys", 
    label: "API Keys", 
    icon: Key, 
    component: APIKeySettings 
  },
  { 
    id: "appearance", 
    label: "Appearance", 
    icon: Palette, 
    component: AppearanceSettings 
  },
  { 
    id: "performance", 
    label: "Performance", 
    icon: Monitor, 
    component: PerformanceSettings 
  },
  { 
    id: "security", 
    label: "Security", 
    icon: Shield, 
    component: SecuritySettings 
  },
  { 
    id: "notifications", 
    label: "Notifications", 
    icon: Bell, 
    component: NotificationSettings 
  },
  { 
    id: "backup", 
    label: "Backup", 
    icon: Database, 
    component: BackupSettings 
  }
];
