
import { createContext, useContext, ReactNode } from "react";
import { useTelegramSettings } from "./useTelegramSettings";

interface TelegramSettingsContextType {
  connectionInfo: any;
  webhookConfig: any;
  availableChannels: any[];
  selectedChannels: Record<string, string>;
  messageTemplates: any[];
  selectedTemplate: string;
  notificationSettings: {
    agentStatus: boolean;
    taskCompletion: boolean;
    systemError: boolean;
    planningAgent: boolean;
    directMessaging: boolean;
  };
  setConnectionInfo: (info: any) => void;
  setWebhookConfig: (config: any) => void;
  setSelectedChannels: (channels: Record<string, string>) => void;
  setSelectedTemplate: (template: string) => void;
  setNotificationSettings: (settings: any) => void;
}

const TelegramSettingsContext = createContext<TelegramSettingsContextType | undefined>(undefined);

export const useTelegramSettingsContext = () => {
  const context = useContext(TelegramSettingsContext);
  if (context === undefined) {
    throw new Error('useTelegramSettingsContext must be used within a TelegramSettingsProvider');
  }
  return context;
};

export const TelegramSettingsProvider = ({ children }: { children: ReactNode }) => {
  const telegramSettings = useTelegramSettings();

  return (
    <TelegramSettingsContext.Provider value={telegramSettings}>
      {children}
    </TelegramSettingsContext.Provider>
  );
};
