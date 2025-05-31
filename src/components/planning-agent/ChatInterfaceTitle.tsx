
import { CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ChatInterfaceTitleProps {
  title?: string;
  isOnline?: boolean;
}

export const ChatInterfaceTitle = ({ 
  title = "Planning Assistant", 
  isOnline = true 
}: ChatInterfaceTitleProps) => {
  return (
    <div className="flex items-center gap-3 min-w-0">
      <CardTitle className="text-lg font-semibold truncate">
        {title}
      </CardTitle>
      <Badge 
        variant="secondary" 
        className={`text-xs border-green-200 ${
          isOnline 
            ? "bg-green-100 text-green-700" 
            : "bg-gray-100 text-gray-700"
        }`}
      >
        {isOnline ? "Online" : "Offline"}
      </Badge>
    </div>
  );
};
