
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { IDE } from "./IDEConnectionStatus";

interface ConfigurationTabProps {
  selectedIDE: string;
  ides: IDE[];
}

export const ConfigurationTab = ({ selectedIDE, ides }: ConfigurationTabProps) => {
  const currentIDE = ides.find(ide => ide.id === selectedIDE);

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Connection Settings</CardTitle>
          <CardDescription className="text-muted-foreground">
            Configure connection to {currentIDE?.name || 'selected IDE'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="host">Host</Label>
              <Input 
                id="host" 
                placeholder="localhost" 
                defaultValue="localhost"
                className="bg-background border-border" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="port">Port</Label>
              <Input 
                id="port" 
                placeholder="3000" 
                defaultValue="3000"
                className="bg-background border-border" 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="workspace">Workspace Path</Label>
            <Input 
              id="workspace" 
              placeholder="/path/to/workspace" 
              defaultValue="/Users/dev/projects/my-app"
              className="bg-background border-border" 
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium text-card-foreground">Auto-sync Settings</h4>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-card-foreground">Auto-save sync</p>
                <p className="text-sm text-muted-foreground">Sync files when saved in IDE</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-card-foreground">Real-time collaboration</p>
                <p className="text-sm text-muted-foreground">Enable live editing with team</p>
              </div>
              <Switch />
            </div>
            
            <div className="space-y-2">
              <Label>Sync Frequency</Label>
              <Select defaultValue="medium">
                <SelectTrigger className="bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="low">Low (30s)</SelectItem>
                  <SelectItem value="medium">Medium (10s)</SelectItem>
                  <SelectItem value="high">High (5s)</SelectItem>
                  <SelectItem value="realtime">Real-time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div className="flex justify-end space-x-2">
            <Button variant="outline">Reset</Button>
            <Button>Save Configuration</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
