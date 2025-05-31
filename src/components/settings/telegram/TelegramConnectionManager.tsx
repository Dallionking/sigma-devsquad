
import { useToast } from "@/hooks/use-toast";
import { useTelegramSettingsContext } from "./TelegramSettingsProvider";

interface ConnectionInfo {
  isConnected: boolean;
  connectionType?: 'oauth' | 'webhook' | 'token';
  lastConnected?: Date;
  userName: string;
  serverName: string;
  channelName: string;
  permissions: string[];
  expiresAt?: Date;
}

export const useTelegramConnectionManager = () => {
  const { connectionInfo, setConnectionInfo } = useTelegramSettingsContext();
  const { toast } = useToast();

  const handleConnect = async (type: 'oauth' | 'webhook' | 'token') => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockData: ConnectionInfo = {
      isConnected: true,
      connectionType: type,
      lastConnected: new Date(),
      userName: '@VibeDevSquadBot',
      serverName: "",
      channelName: "",
      permissions: ['Send Messages', 'Send Photos', 'Send Documents'],
      expiresAt: undefined
    };
    
    setConnectionInfo(mockData);
  };

  const handleDisconnect = () => {
    setConnectionInfo({
      isConnected: false,
      connectionType: undefined,
      lastConnected: undefined,
      userName: "",
      serverName: "",
      channelName: "",
      permissions: [],
      expiresAt: undefined
    });
  };

  const handleRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return {
    connectionInfo,
    handleConnect,
    handleDisconnect,
    handleRefresh
  };
};
