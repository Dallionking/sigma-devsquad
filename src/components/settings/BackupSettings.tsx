
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface BackupSettingsProps {
  autoBackup: boolean;
  setAutoBackup: (value: boolean) => void;
}

export const BackupSettings = ({ autoBackup, setAutoBackup }: BackupSettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Backup & Restore</CardTitle>
        <CardDescription>Manage system backups and restore points</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Auto Backup</h4>
            <p className="text-sm text-slate-600">Automatically backup configuration</p>
          </div>
          <Switch checked={autoBackup} onCheckedChange={setAutoBackup} />
        </div>
        
        <Separator />
        
        <div className="space-y-3">
          <label className="font-medium">Backup Frequency</label>
          <Select defaultValue="daily">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hourly">Hourly</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Separator />
        
        <div className="flex space-x-4">
          <Button>Create Backup</Button>
          <Button variant="outline">Restore from Backup</Button>
          <Button variant="outline">Export Configuration</Button>
        </div>
      </CardContent>
    </Card>
  );
};
