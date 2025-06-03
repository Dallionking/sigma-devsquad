
import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface EnhancedSettingsCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  category?: string;
  status?: "active" | "inactive" | "warning" | "error";
  isNew?: boolean;
  className?: string;
}

export const EnhancedSettingsCard = ({
  title,
  description,
  children,
  category,
  status,
  isNew,
  className
}: EnhancedSettingsCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 border-green-200";
      case "warning": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "error": return "bg-red-100 text-red-800 border-red-200";
      case "inactive": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  return (
    <Card className={cn(
      "relative transition-all duration-200 hover:shadow-md hover:scale-[1.01] border-l-4",
      status === "active" && "border-l-green-500",
      status === "warning" && "border-l-yellow-500",
      status === "error" && "border-l-red-500",
      status === "inactive" && "border-l-gray-400",
      !status && "border-l-blue-500",
      className
    )}>
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              {title}
              {isNew && (
                <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                  New
                </Badge>
              )}
            </CardTitle>
            {description && (
              <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </CardDescription>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {category && (
              <Badge variant="outline" className="text-xs">
                {category}
              </Badge>
            )}
            {status && (
              <Badge className={cn("text-xs border", getStatusColor(status))}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {children}
      </CardContent>
    </Card>
  );
};
