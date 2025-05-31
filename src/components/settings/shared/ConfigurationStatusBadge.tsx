
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CheckCircle, AlertCircle, XCircle, Clock } from "lucide-react";

export type ConfigurationStatus = 'configured' | 'partial' | 'unconfigured' | 'pending';

interface ConfigurationStatusBadgeProps {
  status: ConfigurationStatus;
  details?: string[];
  platform?: string;
  showIcon?: boolean;
}

export const ConfigurationStatusBadge = ({ 
  status, 
  details = [], 
  platform = "Integration",
  showIcon = true 
}: ConfigurationStatusBadgeProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'configured':
        return {
          variant: 'default' as const,
          className: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200',
          icon: CheckCircle,
          label: 'Configured',
          description: 'All required settings are configured'
        };
      case 'partial':
        return {
          variant: 'secondary' as const,
          className: 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200',
          icon: AlertCircle,
          label: 'Partial',
          description: 'Some settings need attention'
        };
      case 'unconfigured':
        return {
          variant: 'destructive' as const,
          className: 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200',
          icon: XCircle,
          label: 'Not Configured',
          description: 'Setup required to use this integration'
        };
      case 'pending':
        return {
          variant: 'outline' as const,
          className: 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200',
          icon: Clock,
          label: 'Pending',
          description: 'Configuration in progress'
        };
      default:
        return {
          variant: 'outline' as const,
          className: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: XCircle,
          label: 'Unknown',
          description: 'Status unknown'
        };
    }
  };

  const config = getStatusConfig();
  const StatusIcon = config.icon;

  const tooltipContent = (
    <div className="space-y-2">
      <div className="font-medium">{platform} Status</div>
      <div className="text-sm text-gray-600">{config.description}</div>
      {details.length > 0 && (
        <div className="space-y-1">
          <div className="text-xs font-medium text-gray-500">Details:</div>
          <ul className="text-xs space-y-0.5">
            {details.map((detail, index) => (
              <li key={index} className="flex items-start gap-1">
                <span className="text-gray-400">•</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge 
            variant={config.variant} 
            className={`${config.className} cursor-help transition-colors duration-200`}
          >
            {showIcon && <StatusIcon className="w-3 h-3 mr-1" />}
            {config.label}
          </Badge>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="center" className="max-w-xs">
          {tooltipContent}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
