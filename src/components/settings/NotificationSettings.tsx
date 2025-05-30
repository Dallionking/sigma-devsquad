
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface NotificationSettingsProps {
  notifications: boolean;
  setNotifications: (value: boolean) => void;
}

export const NotificationSettings = ({ notifications, setNotifications }: NotificationSettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>Manage notification preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Enable Notifications</h4>
            <p className="text-sm text-slate-600">Receive system notifications</p>
          </div>
          <Switch checked={notifications} onCheckedChange={setNotifications} />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Agent Status Changes</h4>
            <p className="text-sm text-slate-600">Notify when agents change status</p>
          </div>
          <Switch checked={true} />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Task Completions</h4>
            <p className="text-sm text-slate-600">Notify when tasks are completed</p>
          </div>
          <Switch checked={true} />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">System Errors</h4>
            <p className="text-sm text-slate-600">Notify about critical errors</p>
          </div>
          <Switch checked={true} />
        </div>
      </CardContent>
    </Card>
  );
};
