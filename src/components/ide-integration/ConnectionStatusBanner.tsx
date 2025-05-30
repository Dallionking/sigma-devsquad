
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, XCircle, Settings } from "lucide-react";

interface ConnectionStatusBannerProps {
  connectionStatus: string;
}

export const ConnectionStatusBanner = ({ connectionStatus }: ConnectionStatusBannerProps) => {
  const connectionStatuses = {
    connected: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
    connecting: { icon: AlertCircle, color: "text-yellow-600", bg: "bg-yellow-50" },
    disconnected: { icon: XCircle, color: "text-red-600", bg: "bg-red-50" }
  };

  const StatusIcon = connectionStatuses[connectionStatus as keyof typeof connectionStatuses].icon;

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`p-2 rounded-full ${connectionStatuses[connectionStatus as keyof typeof connectionStatuses].bg}`}>
              <StatusIcon className={`w-6 h-6 ${connectionStatuses[connectionStatus as keyof typeof connectionStatuses].color}`} />
            </div>
            <div>
              <h3 className="font-semibold text-lg">VS Code Integration</h3>
              <p className="text-muted-foreground">
                Status: <span className="capitalize font-medium">{connectionStatus}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={connectionStatus === "connected" ? "default" : "secondary"}>
              {connectionStatus === "connected" ? "Active" : "Inactive"}
            </Badge>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Configure
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
