
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { OptimizedStack } from "@/components/layout/SpaceOptimizedContainer";
import { ExternalLink, Clock, Info } from "lucide-react";
import { ConnectionDetails } from "./connection/ConnectionDetails";
import { ConnectionMethods } from "./connection/ConnectionMethods";
import { ConnectionActions } from "./connection/ConnectionActions";

interface ConnectionInfo {
  isConnected: boolean;
  connectionType?: 'oauth' | 'webhook' | 'token';
  lastConnected?: Date;
  userName?: string;
  serverName?: string;
  channelName?: string;
  permissions?: string[];
  expiresAt?: Date;
}

interface EnhancedConnectionStatusProps {
  platform: 'discord' | 'telegram';
  connectionInfo: ConnectionInfo;
  onConnect: (type: 'oauth' | 'webhook' | 'token') => Promise<void>;
  onDisconnect: () => void;
  onRefresh: () => Promise<void>;
}

export const EnhancedConnectionStatus = ({
  platform,
  connectionInfo,
  onConnect,
  onDisconnect,
  onRefresh
}: EnhancedConnectionStatusProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const platformConfig = {
    discord: {
      name: 'Discord',
      color: 'text-indigo-500',
      icon: '🎮',
      oauthUrl: 'https://discord.com/developers/applications',
      methods: [
        { type: 'oauth' as const, label: 'OAuth (Recommended)', description: 'Full access with user permissions' },
        { type: 'webhook' as const, label: 'Webhook Only', description: 'Send-only notifications' }
      ]
    },
    telegram: {
      name: 'Telegram',
      color: 'text-blue-500',
      icon: '✈️',
      oauthUrl: 'https://core.telegram.org/bots',
      methods: [
        { type: 'token' as const, label: 'Bot Token', description: 'Bot-based integration' }
      ]
    }
  };

  const config = platformConfig[platform];

  const handleConnect = async (type: 'oauth' | 'webhook' | 'token') => {
    setIsConnecting(true);
    try {
      await onConnect(type);
      toast({
        title: "Connection Successful",
        description: `Successfully connected to ${config.name}`,
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: `Failed to connect to ${config.name}`,
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
      toast({
        title: "Connection Refreshed",
        description: `${config.name} connection has been refreshed`,
      });
    } catch (error) {
      toast({
        title: "Refresh Failed",
        description: `Failed to refresh ${config.name} connection`,
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const getConnectionStatusBadge = () => {
    if (!connectionInfo.isConnected) {
      return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Disconnected</Badge>;
    }

    const isExpiringSoon = connectionInfo.expiresAt && 
      new Date(connectionInfo.expiresAt).getTime() - Date.now() < 24 * 60 * 60 * 1000;

    if (isExpiringSoon) {
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Expires Soon</Badge>;
    }

    return <Badge variant="secondary" className="bg-green-100 text-green-800">Connected</Badge>;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <span className="text-2xl">{config.icon}</span>
          <span className={config.color}>{config.name} Connection</span>
          {getConnectionStatusBadge()}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <OptimizedStack gap="sm">
          {!connectionInfo.isConnected ? (
            <>
              <Alert>
                <Info className="w-4 h-4" />
                <AlertDescription>
                  Choose how you'd like to connect to {config.name}. Each method provides different capabilities.
                </AlertDescription>
              </Alert>

              <ConnectionMethods
                methods={config.methods}
                onConnect={handleConnect}
                isConnecting={isConnecting}
              />

              <div className="text-center">
                <Button variant="link" size="sm" asChild>
                  <a href={config.oauthUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                    <ExternalLink className="w-3 h-3" />
                    {platform === 'discord' ? 'Discord Developer Portal' : 'Create Telegram Bot'}
                  </a>
                </Button>
              </div>
            </>
          ) : (
            <>
              <ConnectionDetails
                connectionInfo={connectionInfo}
                platformName={config.name}
              />

              {connectionInfo.expiresAt && (
                <Alert variant={
                  new Date(connectionInfo.expiresAt).getTime() - Date.now() < 24 * 60 * 60 * 1000 
                    ? "destructive" 
                    : "default"
                }>
                  <Clock className="w-4 h-4" />
                  <AlertDescription>
                    Connection expires on {connectionInfo.expiresAt.toLocaleDateString()}
                    {new Date(connectionInfo.expiresAt).getTime() - Date.now() < 24 * 60 * 60 * 1000 && 
                      " - Please refresh your connection soon"}
                  </AlertDescription>
                </Alert>
              )}

              <ConnectionActions
                onRefresh={handleRefresh}
                onDisconnect={onDisconnect}
                isRefreshing={isRefreshing}
              />
            </>
          )}
        </OptimizedStack>
      </CardContent>
    </Card>
  );
};
