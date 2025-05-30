
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ModelsTabProps {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  temperature: number[];
  setTemperature: (temp: number[]) => void;
  maxTokens: number[];
  setMaxTokens: (tokens: number[]) => void;
}

export const ModelsTab = ({
  selectedModel,
  setSelectedModel,
  temperature,
  setTemperature,
  maxTokens,
  setMaxTokens
}: ModelsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Configuration</CardTitle>
        <CardDescription>Configure model parameters and preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Default Model</Label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                  <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                  <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Temperature: {temperature[0]}</Label>
              <Slider 
                value={temperature} 
                onValueChange={setTemperature}
                max={2} 
                min={0} 
                step={0.1}
                className="w-full"
              />
              <div className="text-xs text-muted-foreground">
                Controls randomness in responses
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Max Tokens: {maxTokens[0]}</Label>
              <Slider 
                value={maxTokens} 
                onValueChange={setMaxTokens}
                max={4096} 
                min={100} 
                step={100}
                className="w-full"
              />
              <div className="text-xs text-muted-foreground">
                Maximum response length
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>System Prompt Template</Label>
              <Textarea 
                placeholder="You are a helpful AI assistant working as part of a development team..."
                className="h-32"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Enable Streaming</Label>
                <p className="text-xs text-muted-foreground">Stream responses in real-time</p>
              </div>
              <Switch checked={true} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-retry on Failure</Label>
                <p className="text-xs text-muted-foreground">Retry failed requests automatically</p>
              </div>
              <Switch checked={true} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
