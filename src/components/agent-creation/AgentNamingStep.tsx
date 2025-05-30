
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bot, Settings, TestTube, Code, Server, FileText } from "lucide-react";

interface AgentNamingStepProps {
  name: string;
  icon: string;
  onNameChange: (name: string) => void;
  onIconChange: (icon: string) => void;
  description?: string;
  onDescriptionChange?: (description: string) => void;
}

const iconOptions = [
  { value: "Bot", label: "Bot", icon: Bot },
  { value: "Settings", label: "Settings", icon: Settings },
  { value: "TestTube", label: "Test Tube", icon: TestTube },
  { value: "Code", label: "Code", icon: Code },
  { value: "Server", label: "Server", icon: Server },
  { value: "FileText", label: "Document", icon: FileText }
];

export const AgentNamingStep = ({ 
  name, 
  icon, 
  onNameChange, 
  onIconChange,
  description = "",
  onDescriptionChange
}: AgentNamingStepProps) => {
  const selectedIconOption = iconOptions.find(option => option.value === icon);
  const IconComponent = selectedIconOption?.icon || Bot;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Agent Identity</h2>
        <p className="text-muted-foreground">
          Give your agent a name and personality
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Agent Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Agent Preview */}
          <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
              <IconComponent className="w-8 h-8 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{name || "Agent Name"}</h3>
              <p className="text-sm text-muted-foreground">
                {description || "Agent description will appear here"}
              </p>
            </div>
          </div>

          {/* Name Input */}
          <div className="space-y-2">
            <Label htmlFor="agent-name">Agent Name *</Label>
            <Input
              id="agent-name"
              placeholder="Enter a descriptive name for your agent..."
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              className="text-lg"
            />
            <p className="text-xs text-muted-foreground">
              Choose a name that reflects your agent's role and purpose
            </p>
          </div>

          {/* Description Input */}
          {onDescriptionChange && (
            <div className="space-y-2">
              <Label htmlFor="agent-description">Description</Label>
              <Textarea
                id="agent-description"
                placeholder="Describe what makes this agent unique and its primary purpose..."
                value={description}
                onChange={(e) => onDescriptionChange(e.target.value)}
                rows={3}
              />
              <p className="text-xs text-muted-foreground">
                This description will help you and your team understand the agent's purpose
              </p>
            </div>
          )}

          {/* Icon Selection */}
          <div className="space-y-2">
            <Label htmlFor="agent-icon">Icon</Label>
            <Select value={icon} onValueChange={onIconChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose an icon for your agent..." />
              </SelectTrigger>
              <SelectContent className="z-50 bg-popover">
                {iconOptions.map((option) => {
                  const OptionIcon = option.icon;
                  return (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center space-x-2">
                        <OptionIcon className="w-4 h-4" />
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Agent Stats Preview */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">0</div>
              <div className="text-xs text-muted-foreground">Tasks Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">Ready</div>
              <div className="text-xs text-muted-foreground">Status</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">New</div>
              <div className="text-xs text-muted-foreground">Experience</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
