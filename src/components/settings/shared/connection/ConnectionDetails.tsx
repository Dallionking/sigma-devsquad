
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Shield, Zap } from "lucide-react";

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

interface ConnectionDetailsProps {
  connectionInfo: ConnectionInfo;
  platformName: string;
}

export const ConnectionDetails = ({ connectionInfo, platformName }: ConnectionDetailsProps) => {
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
    <div className="space-y-3 p-3 bg-green-50 rounded-md">
      <div className="flex items-center gap-2">
        <CheckCircle className="w-5 h-5 text-green-500" />
        <span className="font-medium text-green-800">Connected to {platformName}</span>
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
  );
};
