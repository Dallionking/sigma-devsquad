
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Users, 
  MessageSquare, 
  Settings, 
  Database,
  FileText,
  BarChart3
} from "lucide-react";

interface CapabilityStatus {
  feature: string;
  icon: React.ComponentType<any>;
  status: 'available' | 'limited' | 'unavailable';
  description: string;
  limitations?: string[];
}

export const OfflineCapabilityIndicators = () => {
  const capabilities: CapabilityStatus[] = [
    {
      feature: 'Agent Management',
      icon: Users,
      status: 'available',
      description: 'Create, edit, and configure agents offline',
      limitations: ['Changes sync when online']
    },
    {
      feature: 'Task Management',
      icon: FileText,
      status: 'available',
      description: 'Create and manage tasks locally',
      limitations: ['Task assignments may be limited']
    },
    {
      feature: 'Message History',
      icon: MessageSquare,
      status: 'limited',
      description: 'View cached messages only',
      limitations: ['New messages unavailable', 'Search limited to cache']
    },
    {
      feature: 'Settings',
      icon: Settings,
      status: 'available',
      description: 'All local settings can be modified',
    },
    {
      feature: 'Analytics',
      icon: BarChart3,
      status: 'limited',
      description: 'View cached analytics data',
      limitations: ['Real-time data unavailable', 'Limited date range']
    },
    {
      feature: 'Data Export',
      icon: Database,
      status: 'unavailable',
      description: 'Requires server connection',
      limitations: ['Export functionality disabled offline']
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return CheckCircle;
      case 'limited': return AlertTriangle;
      case 'unavailable': return XCircle;
      default: return XCircle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-50 dark:bg-green-950';
      case 'limited': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950';
      case 'unavailable': return 'text-red-600 bg-red-50 dark:bg-red-950';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-950';
    }
  };

  const getBadgeColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
      case 'limited': return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300';
      case 'unavailable': return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300';
      default: return 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300';
    }
  };

  const statusCounts = capabilities.reduce((acc, cap) => {
    acc[cap.status] = (acc[cap.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Offline Capabilities</CardTitle>
          <div className="flex items-center space-x-2">
            <Badge className={getBadgeColor('available')}>
              {statusCounts.available || 0} Available
            </Badge>
            <Badge className={getBadgeColor('limited')}>
              {statusCounts.limited || 0} Limited
            </Badge>
            <Badge className={getBadgeColor('unavailable')}>
              {statusCounts.unavailable || 0} Disabled
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {capabilities.map((capability) => {
            const StatusIcon = getStatusIcon(capability.status);
            const FeatureIcon = capability.icon;
            
            return (
              <Tooltip key={capability.feature}>
                <TooltipTrigger asChild>
                  <div className={`p-3 rounded-lg border transition-colors cursor-help ${getStatusColor(capability.status)}`}>
                    <div className="flex items-center space-x-3">
                      <FeatureIcon className="w-5 h-5" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{capability.feature}</span>
                          <StatusIcon className="w-4 h-4" />
                        </div>
                        <p className="text-xs opacity-80 mt-1">
                          {capability.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="max-w-64">
                    <p className="font-medium mb-1">{capability.feature}</p>
                    <p className="text-sm mb-2">{capability.description}</p>
                    {capability.limitations && (
                      <div>
                        <p className="text-xs font-medium mb-1">Limitations:</p>
                        <ul className="text-xs space-y-1">
                          {capability.limitations.map((limitation, index) => (
                            <li key={index}>• {limitation}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
