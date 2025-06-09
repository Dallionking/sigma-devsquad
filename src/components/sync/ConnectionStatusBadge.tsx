
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Wifi, WifiOff, AlertTriangle, CheckCircle } from "lucide-react";

interface ConnectionStatusBadgeProps {
  status: 'connected' | 'disconnected' | 'connecting' | 'error';
  label?: string;
  showIcon?: boolean;
}

export const ConnectionStatusBadge = ({ 
  status, 
  label, 
  showIcon = true 
}: ConnectionStatusBadgeProps) => {
  const statusConfig = {
    connected: {
      icon: CheckCircle,
      className: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800',
      text: label || 'Connected'
    },
    disconnected: {
      icon: WifiOff,
      className: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800',
      text: label || 'Disconnected'
    },
    connecting: {
      icon: Wifi,
      className: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800',
      text: label || 'Connecting...'
    },
    error: {
      icon: AlertTriangle,
      className: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800',
      text: label || 'Error'
    }
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <Badge variant="outline" className={config.className}>
      {showIcon && (
        <StatusIcon className={`w-3 h-3 mr-1 ${status === 'connecting' ? 'animate-spin' : ''}`} />
      )}
      {config.text}
    </Badge>
  );
};
