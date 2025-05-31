
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { OptimizedStack } from "@/components/layout/SpaceOptimizedContainer";
import { 
  CheckCircle, 
  XCircle, 
  RefreshCw, 
  ExternalLink, 
  Shield, 
  Clock,
  AlertTriangle,
  Info,
  Zap
} from "lucide-react";

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
      new Date(connectionInfo.expiresAt).getTime() - Date.now() < 24 * 60 * 60 * 1000; // 24 hours

    if (isExpiringSoon) {
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Expires Soon</Badge>;
    }

    return <Badge variant="secondary" className="bg-green-100 text-green-800">Connected</Badge>;
  };

  const getConnectionTypeIcon = () => {
    switch (connectionInfo.connectionType) {
      case 'oauth':
        return <Shield className="w-4 h-4 text-green-500" />;
      case 'webhook':
        return <Zap className="w-4 h-4 text-blue-500" />;
      case 'token':
        return <Shield className="w-4 h-4 text-purple-500" />;
      default:
        return null;
    }
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

              <div className="space-y-3">
                {config.methods.map((method) => (
                  <div key={method.type} className="p-3 border rounded-md space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {method.type === 'oauth' && <Shield className="w-4 h-4 text-green-500" />}
                          {method.type === 'webhook' && <Zap className="w-4 h-4 text-blue-500" />}
                          {method.type === 'token' && <Shield className="w-4 h-4 text-purple-500" />}
                          <span className="font-medium">{method.label}</span>
                        </div>
                        <p className="text-xs text-gray-500">{method.description}</p>
                      </div>
                      <Button
                        onClick={() => handleConnect(method.type)}
                        disabled={isConnecting}
                        size="sm"
                      >
                        {isConnecting ? "Connecting..." : "Connect"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

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
              {/* Connection Details */}
              <div className="space-y-3 p-3 bg-green-50 rounded-md">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium text-green-800">Connected to {config.name}</span>
                  {getConnectionTypeIcon()}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  {connectionInfo.userName && (
                    <div>
                      <span className="text-gray-500">User:</span>
                      <span className="ml-2 font-medium">{connectionInfo.userName}</span>
                    </div>
                  )}
                  
                  {connectionInfo.serverName && (
                    <div>
                      <span className="text-gray-500">Server:</span>
                      <span className="ml-2 font-medium">{connectionInfo.serverName}</span>
                    </div>
                  )}
                  
                  {connectionInfo.channelName && (
                    <div>
                      <span className="text-gray-500">Channel:</span>
                      <span className="ml-2 font-medium">#{connectionInfo.channelName}</span>
                    </div>
                  )}
                  
                  {connectionInfo.lastConnected && (
                    <div>
                      <span className="text-gray-500">Connected:</span>
                      <span className="ml-2 font-medium">
                        {connectionInfo.lastConnected.toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                {connectionInfo.permissions && connectionInfo.permissions.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-sm text-gray-500">Permissions:</span>
                    <div className="flex flex-wrap gap-1">
                      {connectionInfo.permissions.map((permission) => (
                        <Badge key={permission} variant="outline" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Expiration Warning */}
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

              {/* Connection Actions */}
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  {isRefreshing ? "Refreshing..." : "Refresh"}
                </Button>
                
                <Button
                  onClick={onDisconnect}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 text-red-600 border-red-200 hover:bg-red-50"
                >
                  <XCircle className="w-4 h-4" />
                  Disconnect
                </Button>
              </div>
            </>
          )}
        </OptimizedStack>
      </CardContent>
    </Card>
  );
};
