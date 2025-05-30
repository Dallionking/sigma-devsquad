
import { Badge } from "@/components/ui/badge";
import { Activity } from "lucide-react";

export const SettingsHeader = () => {
  return (
    <header className="text-center lg:text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="heading-primary mb-4">
            Settings & Configuration
          </h1>
          <p className="text-muted-enhanced max-w-3xl">
            Manage system preferences and configuration options
          </p>
        </div>
        <Badge variant="secondary" className="status-success flex items-center gap-2 self-start sm:self-center">
          <Activity className="w-3 h-3" />
          System Healthy
        </Badge>
      </div>
    </header>
  );
};
