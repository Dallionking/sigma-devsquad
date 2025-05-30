
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Bot, Brain, Cpu, Zap, Target, Shield, Rocket, Star, 
  Diamond, Heart, Lightbulb, Wrench, Code, Server, Upload, X 
} from "lucide-react";
import { useState } from "react";

interface AgentNamingStepProps {
  name: string;
  icon: string;
  onNameChange: (name: string) => void;
  onIconChange: (icon: string) => void;
}

const iconOptions = [
  { name: 'Bot', icon: Bot, color: 'bg-blue-500' },
  { name: 'Brain', icon: Brain, color: 'bg-purple-500' },
  { name: 'Cpu', icon: Cpu, color: 'bg-green-500' },
  { name: 'Zap', icon: Zap, color: 'bg-yellow-500' },
  { name: 'Target', icon: Target, color: 'bg-red-500' },
  { name: 'Shield', icon: Shield, color: 'bg-indigo-500' },
  { name: 'Rocket', icon: Rocket, color: 'bg-orange-500' },
  { name: 'Star', icon: Star, color: 'bg-pink-500' },
  { name: 'Diamond', icon: Diamond, color: 'bg-cyan-500' },
  { name: 'Heart', icon: Heart, color: 'bg-rose-500' },
  { name: 'Lightbulb', icon: Lightbulb, color: 'bg-amber-500' },
  { name: 'Wrench', icon: Wrench, color: 'bg-gray-500' },
  { name: 'Code', icon: Code, color: 'bg-emerald-500' },
  { name: 'Server', icon: Server, color: 'bg-slate-500' }
];

export const AgentNamingStep = ({ name, icon, onNameChange, onIconChange }: AgentNamingStepProps) => {
  const [customIcon, setCustomIcon] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  
  const isCustomIcon = icon.startsWith('data:') || icon.startsWith('http') || icon.startsWith('/');
  const selectedIconData = iconOptions.find(opt => opt.name === icon) || iconOptions[0];
  const SelectedIcon = selectedIconData.icon;

  const handleFileUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setCustomIcon(result);
        onIconChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const removeCustomIcon = () => {
    setCustomIcon(null);
    onIconChange('Bot'); // Reset to default
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Agent Identity</h2>
        <p className="text-muted-foreground">
          Give your agent a name and choose an icon to represent it
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Agent Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
              <Avatar className="w-16 h-16">
                {isCustomIcon ? (
                  <AvatarImage src={icon} alt="Custom agent icon" />
                ) : (
                  <AvatarFallback className={`${selectedIconData.color} text-white`}>
                    <SelectedIcon className="w-8 h-8" />
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">{name || 'Unnamed Agent'}</h3>
                <p className="text-muted-foreground text-sm">Ready to assist with your tasks</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Name Input */}
        <Card>
          <CardHeader>
            <CardTitle>Agent Name</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="agent-name">Name</Label>
              <Input
                id="agent-name"
                placeholder="Enter a name for your agent..."
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Choose a memorable name that reflects your agent's role and personality.
            </p>
          </CardContent>
        </Card>

        {/* Icon Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Agent Icon</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Custom Icon Upload */}
            <div className="space-y-4">
              <Label>Upload Custom Icon</Label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  dragOver 
                    ? 'border-primary bg-primary/5' 
                    : 'border-muted-foreground/25 hover:border-muted-foreground/50'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drag and drop an image here, or click to select
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="icon-upload"
                />
                <Button variant="outline" asChild>
                  <label htmlFor="icon-upload" className="cursor-pointer">
                    Choose File
                  </label>
                </Button>
              </div>
              
              {customIcon && (
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={customIcon} alt="Custom icon preview" />
                    </Avatar>
                    <span className="text-sm">Custom icon uploaded</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={removeCustomIcon}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
              
              <p className="text-xs text-muted-foreground">
                Supported formats: PNG, JPG, GIF. Recommended size: 64x64px or larger.
              </p>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or choose from presets
                </span>
              </div>
            </div>

            {/* Preset Icons */}
            <div className="space-y-4">
              <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
                {iconOptions.map((iconOption) => {
                  const IconComponent = iconOption.icon;
                  const isSelected = icon === iconOption.name && !isCustomIcon;
                  
                  return (
                    <Button
                      key={iconOption.name}
                      variant="outline"
                      size="icon"
                      className={`h-12 w-12 ${
                        isSelected 
                          ? `ring-2 ring-primary ${iconOption.color} text-white` 
                          : `hover:${iconOption.color} hover:text-white`
                      }`}
                      onClick={() => {
                        setCustomIcon(null);
                        onIconChange(iconOption.name);
                      }}
                    >
                      <IconComponent className="w-6 h-6" />
                    </Button>
                  );
                })}
              </div>
              <p className="text-xs text-muted-foreground">
                Select an icon that best represents your agent's functionality.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
