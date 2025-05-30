
import { CheckCircle, Play, AlertTriangle, Clock } from "lucide-react";

interface TaskCardHeaderProps {
  status: string;
  title: string;
  description: string;
  compact?: boolean;
}

export const TaskCardHeader = ({ status, title, description, compact }: TaskCardHeaderProps) => {
  const getStatusIcon = () => {
    switch (status) {
      case "completed": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "in-progress": return <Play className="w-4 h-4 text-blue-600" />;
      case "blocked": return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="flex-1">
      <div className="flex items-center space-x-2 mb-1">
        {getStatusIcon()}
        <h3 className="font-semibold text-sm line-clamp-1">{title}</h3>
      </div>
      <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
    </div>
  );
};
