
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const GeneralSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
        <CardDescription>Configure basic system preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Auto-save Changes</h4>
            <p className="text-sm text-slate-600">Automatically save configuration changes</p>
          </div>
          <Switch checked={true} />
        </div>
        
        <Separator />
        
        <div className="space-y-3">
          <label className="font-medium">Default Agent Timeout</label>
          <Select defaultValue="300">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="60">1 minute</SelectItem>
              <SelectItem value="300">5 minutes</SelectItem>
              <SelectItem value="600">10 minutes</SelectItem>
              <SelectItem value="1800">30 minutes</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Debug Mode</h4>
            <p className="text-sm text-slate-600">Enable detailed logging and debugging</p>
          </div>
          <Switch />
        </div>
      </CardContent>
    </Card>
  );
};
