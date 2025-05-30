
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AppearanceSettingsProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export const AppearanceSettings = ({ darkMode, setDarkMode }: AppearanceSettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance Settings</CardTitle>
        <CardDescription>Customize the visual appearance of the interface</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Dark Mode</h4>
            <p className="text-sm text-slate-600">Switch to dark theme</p>
          </div>
          <Switch checked={darkMode} onCheckedChange={setDarkMode} />
        </div>
        
        <Separator />
        
        <div className="space-y-3">
          <label className="font-medium">Interface Scale</label>
          <Select defaultValue="100">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="90">90%</SelectItem>
              <SelectItem value="100">100%</SelectItem>
              <SelectItem value="110">110%</SelectItem>
              <SelectItem value="125">125%</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Separator />
        
        <div className="space-y-3">
          <label className="font-medium">Accent Color</label>
          <div className="flex space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-blue-700 cursor-pointer"></div>
            <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-transparent cursor-pointer"></div>
            <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-transparent cursor-pointer"></div>
            <div className="w-8 h-8 rounded-full bg-orange-500 border-2 border-transparent cursor-pointer"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
