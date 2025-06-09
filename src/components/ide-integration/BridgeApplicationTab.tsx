
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  Server, 
  Settings, 
  Play, 
  Square, 
  RotateCcw, 
  Shield, 
  Activity,
  HardDrive,
  Cpu,
  Wifi
} from "lucide-react";
import { useState } from "react";

export const BridgeApplicationTab = () => {
  const [bridgeStatus, setBridgeStatus] = useState("running");
  const [autoStart, setAutoStart] = useState(true);
  const [secureMode, setSecureMode] = useState(true);

  const StatusIndicator = ({ status }: { status: string }) => {
    const statusConfig = {
      running: { color: "text-green-500", label: "Running", pulse: "animate-pulse" },
      stopped: { color: "text-red-500", label: "Stopped", pulse: "" },
      starting: { color: "text-yellow-500", label: "Starting", pulse: "animate-pulse" },
      error: { color: "text-red-500", label: "Error", pulse: "" }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    
    return (
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${config.color.replace('text-', 'bg-')} ${config.pulse}`} />
        <span className={`font-medium ${config.color}`}>{config.label}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Bridge Status Overview */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Server className="w-6 h-6 text-primary" />
              <div>
                <CardTitle className="text-card-foreground">Bridge Application</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Local bridge service for IDE communication
                </CardDescription>
              </div>
            </div>
            <StatusIndicator status={bridgeStatus} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
              <Activity className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-card-foreground">Uptime</p>
                <p className="text-xs text-muted-foreground">2h 34m</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
              <Wifi className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm font-medium text-card-foreground">Port</p>
                <p className="text-xs text-muted-foreground">3421</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
              <Cpu className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-sm font-medium text-card-foreground">CPU</p>
                <p className="text-xs text-muted-foreground">2.1%</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
              <HardDrive className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm font-medium text-card-foreground">Memory</p>
                <p className="text-xs text-muted-foreground">45MB</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bridge Controls */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Bridge Controls
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Start, stop, and manage the bridge application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-3">
            <Button 
              className="gap-2"
              disabled={bridgeStatus === "running"}
            >
              <Play className="w-4 h-4" />
              Start Bridge
            </Button>
            <Button 
              variant="outline" 
              className="gap-2"
              disabled={bridgeStatus === "stopped"}
            >
              <Square className="w-4 h-4" />
              Stop Bridge
            </Button>
            <Button variant="outline" className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Restart
            </Button>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium text-card-foreground">Auto-start on boot</Label>
                <p className="text-sm text-muted-foreground">Start bridge application automatically</p>
              </div>
              <Switch 
                checked={autoStart}
                onCheckedChange={setAutoStart}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium text-card-foreground">Secure mode</Label>
                <p className="text-sm text-muted-foreground">Enable enhanced security features</p>
              </div>
              <Switch 
                checked={secureMode}
                onCheckedChange={setSecureMode}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configuration Settings */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Configuration</CardTitle>
          <CardDescription className="text-muted-foreground">
            Bridge application settings and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="port">Bridge Port</Label>
              <Input 
                id="port" 
                type="number"
                defaultValue="3421"
                className="bg-background border-border" 
              />
              <p className="text-xs text-muted-foreground">Port for IDE communication</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeout">Connection Timeout</Label>
              <Input 
                id="timeout" 
                type="number"
                defaultValue="30"
                className="bg-background border-border" 
              />
              <p className="text-xs text-muted-foreground">Timeout in seconds</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="max-connections">Max Connections</Label>
              <Input 
                id="max-connections" 
                type="number"
                defaultValue="5"
                className="bg-background border-border" 
              />
              <p className="text-xs text-muted-foreground">Maximum concurrent IDE connections</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="log-level">Log Level</Label>
              <select className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm">
                <option value="error">Error</option>
                <option value="warn">Warning</option>
                <option value="info" selected>Info</option>
                <option value="debug">Debug</option>
              </select>
              <p className="text-xs text-muted-foreground">Logging verbosity level</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium text-card-foreground flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Security Settings
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input 
                  id="api-key" 
                  type="password"
                  defaultValue="••••••••••••••••"
                  className="bg-background border-border" 
                />
                <p className="text-xs text-muted-foreground">Secure API key for authentication</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="allowed-hosts">Allowed Hosts</Label>
                <Input 
                  id="allowed-hosts" 
                  defaultValue="localhost,127.0.0.1"
                  className="bg-background border-border" 
                />
                <p className="text-xs text-muted-foreground">Comma-separated list of allowed hosts</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline">Reset to Defaults</Button>
            <Button>Save Configuration</Button>
          </div>
        </CardContent>
      </Card>

      {/* Performance Monitoring */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Performance Monitor</CardTitle>
          <CardDescription className="text-muted-foreground">
            Real-time bridge application performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">CPU Usage</Label>
              <span className="text-sm text-muted-foreground">2.1%</span>
            </div>
            <Progress value={2.1} className="h-2" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Memory Usage</Label>
              <span className="text-sm text-muted-foreground">45MB / 100MB</span>
            </div>
            <Progress value={45} className="h-2" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Network Activity</Label>
              <span className="text-sm text-muted-foreground">12KB/s</span>
            </div>
            <Progress value={30} className="h-2" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <p className="text-xs text-muted-foreground">Requests/min</p>
              <p className="text-lg font-semibold text-card-foreground">24</p>
            </div>
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <p className="text-xs text-muted-foreground">Active Connections</p>
              <p className="text-lg font-semibold text-card-foreground">2</p>
            </div>
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <p className="text-xs text-muted-foreground">Errors (24h)</p>
              <p className="text-lg font-semibold text-card-foreground">0</p>
            </div>
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <p className="text-xs text-muted-foreground">Response Time</p>
              <p className="text-lg font-semibold text-card-foreground">12ms</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
