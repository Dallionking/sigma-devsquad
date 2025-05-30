
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { RefreshCw, CheckCircle, AlertTriangle, Clock, Download, Upload } from "lucide-react";
import { IDE } from "./IDEConnectionStatus";

interface SyncTabProps {
  ides: IDE[];
  selectedIDE: string;
}

export const SyncTab = ({ ides, selectedIDE }: SyncTabProps) => {
  const currentIDE = ides.find(ide => ide.id === selectedIDE);

  const syncStatus = {
    isActive: true,
    progress: 75,
    lastSync: "2 minutes ago",
    totalFiles: 247,
    syncedFiles: 185,
    conflicts: 3
  };

  const recentSyncs = [
    {
      id: 1,
      type: "push",
      file: "src/components/Header.tsx",
      status: "completed",
      timestamp: "2 min ago",
      size: "2.4 KB"
    },
    {
      id: 2,
      type: "pull",
      file: "src/pages/Dashboard.tsx",
      status: "completed",
      timestamp: "5 min ago",
      size: "5.2 KB"
    },
    {
      id: 3,
      type: "push",
      file: "src/styles/globals.css",
      status: "conflict",
      timestamp: "8 min ago",
      size: "1.8 KB"
    },
    {
      id: 4,
      type: "push",
      file: "package.json",
      status: "syncing",
      timestamp: "10 min ago",
      size: "3.2 KB"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "conflict":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "syncing":
        return <Clock className="w-4 h-4 text-blue-500" />;
      default:
        return <RefreshCw className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTypeIcon = (type: string) => {
    return type === "push" 
      ? <Upload className="w-3 h-3 text-blue-500" />
      : <Download className="w-3 h-3 text-green-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Sync Status Overview */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Synchronization Status</CardTitle>
          <CardDescription className="text-muted-foreground">
            Monitor sync status with {currentIDE?.name || 'selected IDE'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <RefreshCw className={`w-5 h-5 ${syncStatus.isActive ? 'text-green-500 animate-spin' : 'text-gray-500'}`} />
              <div>
                <p className="font-medium text-card-foreground">
                  {syncStatus.isActive ? 'Synchronizing...' : 'Sync Disabled'}
                </p>
                <p className="text-sm text-muted-foreground">Last sync: {syncStatus.lastSync}</p>
              </div>
            </div>
            <Switch checked={syncStatus.isActive} />
          </div>

          {syncStatus.isActive && (
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="text-card-foreground">{syncStatus.syncedFiles}/{syncStatus.totalFiles} files</span>
              </div>
              <Progress value={syncStatus.progress} className="h-2" />
            </div>
          )}

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-muted/50 rounded-md">
              <div className="text-2xl font-bold text-card-foreground">{syncStatus.totalFiles}</div>
              <div className="text-sm text-muted-foreground">Total Files</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-md">
              <div className="text-2xl font-bold text-green-600">{syncStatus.syncedFiles}</div>
              <div className="text-sm text-muted-foreground">Synced</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-md">
              <div className="text-2xl font-bold text-yellow-600">{syncStatus.conflicts}</div>
              <div className="text-sm text-muted-foreground">Conflicts</div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button className="flex-1">
              <RefreshCw className="w-4 h-4 mr-1" />
              Force Sync
            </Button>
            <Button variant="outline" className="flex-1">
              Resolve Conflicts
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Sync Activity */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Recent Activity</CardTitle>
          <CardDescription className="text-muted-foreground">
            Latest file synchronization events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentSyncs.map((sync) => (
              <div 
                key={sync.id}
                className="flex items-center justify-between p-3 rounded-md border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  {getStatusIcon(sync.status)}
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(sync.type)}
                    <div>
                      <div className="font-medium text-card-foreground">{sync.file}</div>
                      <div className="text-sm text-muted-foreground">{sync.size} • {sync.timestamp}</div>
                    </div>
                  </div>
                </div>
                <Badge 
                  variant="outline" 
                  className={
                    sync.status === "completed" 
                      ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                      : sync.status === "conflict"
                      ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
                      : "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                  }
                >
                  {sync.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
