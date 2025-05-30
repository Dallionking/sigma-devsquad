
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bot, Settings, TestTube, Code, Server, FileText } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className={`font-bold ${isMobile ? 'text-xl' : 'text-2xl'}`}>Agent Identity</h2>
        <p className={`text-muted-foreground ${isMobile ? 'text-sm' : 'text-base'}`}>
          Give your agent a name and personality
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader className={isMobile ? 'p-4' : 'p-6'}>
          <CardTitle className={isMobile ? 'text-lg' : 'text-xl'}>Agent Details</CardTitle>
        </CardHeader>
        <CardContent className={`space-y-6 ${isMobile ? 'p-4 pt-0' : 'p-6 pt-0'}`}>
          {/* Agent Preview */}
          <div className={`flex items-center bg-muted/50 rounded-lg ${isMobile ? 'space-x-3 p-3' : 'space-x-4 p-4'}`}>
            <div className={`bg-gradient-to-br from-primary via-blue-600 to-purple-600 rounded-xl flex items-center justify-center ${isMobile ? 'w-12 h-12' : 'w-16 h-16'}`}>
              <IconComponent className={`text-white ${isMobile ? 'w-6 h-6' : 'w-8 h-8'}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className={`font-semibold truncate ${isMobile ? 'text-base' : 'text-lg'}`}>
                {name || "Agent Name"}
              </h3>
              <p className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-sm'} line-clamp-2`}>
                {description || "Agent description will appear here"}
              </p>
            </div>
          </div>

          {/* Name Input */}
          <div className="space-y-2">
            <Label htmlFor="agent-name" className={isMobile ? 'text-sm' : 'text-base'}>
              Agent Name *
            </Label>
            <Input
              id="agent-name"
              placeholder="Enter a descriptive name for your agent..."
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              className={isMobile ? 'text-base' : 'text-lg'}
            />
            <p className="text-xs text-muted-foreground">
              Choose a name that reflects your agent's role and purpose
            </p>
          </div>

          {/* Description Input */}
          {onDescriptionChange && (
            <div className="space-y-2">
              <Label htmlFor="agent-description" className={isMobile ? 'text-sm' : 'text-base'}>
                Description
              </Label>
              <Textarea
                id="agent-description"
                placeholder="Describe what makes this agent unique and its primary purpose..."
                value={description}
                onChange={(e) => onDescriptionChange(e.target.value)}
                rows={isMobile ? 2 : 3}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                This description will help you and your team understand the agent's purpose
              </p>
            </div>
          )}

          {/* Icon Selection */}
          <div className="space-y-2">
            <Label htmlFor="agent-icon" className={isMobile ? 'text-sm' : 'text-base'}>Icon</Label>
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
          <div className={`grid grid-cols-3 gap-4 bg-muted/30 rounded-lg ${isMobile ? 'p-3' : 'p-4'}`}>
            <div className="text-center">
              <div className={`font-bold text-primary ${isMobile ? 'text-lg' : 'text-2xl'}`}>0</div>
              <div className="text-xs text-muted-foreground">Tasks Completed</div>
            </div>
            <div className="text-center">
              <div className={`font-bold text-green-600 ${isMobile ? 'text-lg' : 'text-2xl'}`}>Ready</div>
              <div className="text-xs text-muted-foreground">Status</div>
            </div>
            <div className="text-center">
              <div className={`font-bold text-blue-600 ${isMobile ? 'text-lg' : 'text-2xl'}`}>New</div>
              <div className="text-xs text-muted-foreground">Experience</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
