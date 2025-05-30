
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PerformanceSettingsProps {
  performanceMode: string;
  setPerformanceMode: (value: string) => void;
}

export const PerformanceSettings = ({ performanceMode, setPerformanceMode }: PerformanceSettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Settings</CardTitle>
        <CardDescription>Optimize system performance and resource usage</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <label className="font-medium">Performance Mode</label>
          <Select value={performanceMode} onValueChange={setPerformanceMode}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="power-saver">Power Saver</SelectItem>
              <SelectItem value="balanced">Balanced</SelectItem>
              <SelectItem value="performance">High Performance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Real-time Updates</h4>
            <p className="text-sm text-slate-600">Enable live updates for agent status</p>
          </div>
          <Switch checked={true} />
        </div>
        
        <Separator />
        
        <div className="space-y-3">
          <label className="font-medium">Max Concurrent Agents</label>
          <Select defaultValue="6">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">3 agents</SelectItem>
              <SelectItem value="6">6 agents</SelectItem>
              <SelectItem value="10">10 agents</SelectItem>
              <SelectItem value="unlimited">Unlimited</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
