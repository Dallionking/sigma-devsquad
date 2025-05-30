
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const SecuritySettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>Configure security and privacy options</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">API Key Encryption</h4>
            <p className="text-sm text-slate-600">Encrypt stored API keys</p>
          </div>
          <Switch checked={true} />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Audit Logging</h4>
            <p className="text-sm text-slate-600">Log all system activities</p>
          </div>
          <Switch checked={true} />
        </div>
        
        <Separator />
        
        <div className="space-y-3">
          <label className="font-medium">Session Timeout</label>
          <Select defaultValue="3600">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1800">30 minutes</SelectItem>
              <SelectItem value="3600">1 hour</SelectItem>
              <SelectItem value="7200">2 hours</SelectItem>
              <SelectItem value="86400">24 hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
