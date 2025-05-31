
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CheckCircle, AlertCircle, XCircle, Info } from "lucide-react";

interface SettingsStatusBadgeProps {
  status: 'configured' | 'partial' | 'unconfigured' | 'info';
  label: string;
  details?: string;
}

export const SettingsStatusBadge = ({ status, label, details }: SettingsStatusBadgeProps) => {
  const statusConfig = {
    configured: {
      icon: CheckCircle,
      className: "bg-green-100 text-green-800 border-green-200",
      text: "Configured"
    },
    partial: {
      icon: AlertCircle,
      className: "bg-yellow-100 text-yellow-800 border-yellow-200",
      text: "Partial"
    },
    unconfigured: {
      icon: XCircle,
      className: "bg-red-100 text-red-800 border-red-200",
      text: "Not Configured"
    },
    info: {
      icon: Info,
      className: "bg-blue-100 text-blue-800 border-blue-200",
      text: "Info"
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  const badge = (
    <Badge variant="secondary" className={`flex items-center gap-1 ${config.className}`}>
      <Icon className="w-3 h-3" />
      {label || config.text}
    </Badge>
  );

  if (details) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {badge}
          </TooltipTrigger>
          <TooltipContent>
            <p>{details}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return badge;
};
