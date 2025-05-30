import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Brain, Key, TestTube, BarChart3, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import { Header } from "@/components/dashboard/Header";

export const LLMIntegration = () => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [temperature, setTemperature] = useState([0.7]);
  const [maxTokens, setMaxTokens] = useState([2048]);
  const [selectedModel, setSelectedModel] = useState("gpt-4");

  // Mock data for header - in a real app this would come from props or context
  const mockAgents = [
    { id: "1", name: "Agent 1", status: "working" as const },
    { id: "2", name: "Agent 2", status: "idle" as const },
    { id: "3", name: "Agent 3", status: "working" as const }
  ];

  const providers = [
    {
      name: "OpenAI",
      status: "connected",
      models: ["gpt-4", "gpt-4-turbo", "gpt-3.5-turbo"],
      usage: 75,
      limit: 100000,
      cost: "$45.20"
    },
    {
      name: "Anthropic",
      status: "disconnected",
      models: ["claude-3-opus", "claude-3-sonnet", "claude-3-haiku"],
      usage: 0,
      limit: 50000,
      cost: "$0.00"
    },
    {
      name: "Google",
      status: "connected",
      models: ["gemini-pro", "gemini-pro-vision"],
      usage: 30,
      limit: 75000,
      cost: "$12.45"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header 
        viewMode="workflow" 
        onViewModeChange={() => {}} 
        agents={mockAgents} 
      />
      
      <div className="p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">LLM API Integration</h1>
              <p className="text-muted-foreground mt-2">Manage connections to AI language model providers</p>
            </div>
            <Badge variant="secondary" className="bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
              <Brain className="w-3 h-3 mr-1" />
              3 Providers Connected
            </Badge>
          </div>

          <Tabs defaultValue="providers" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="providers" className="flex items-center space-x-2">
                <Key className="w-4 h-4" />
                <span>Providers</span>
              </TabsTrigger>
              <TabsTrigger value="models" className="flex items-center space-x-2">
                <Brain className="w-4 h-4" />
                <span>Models</span>
              </TabsTrigger>
              <TabsTrigger value="usage" className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span>Usage</span>
              </TabsTrigger>
              <TabsTrigger value="testing" className="flex items-center space-x-2">
                <TestTube className="w-4 h-4" />
                <span>Testing</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="providers" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {providers.map((provider) => (
                  <Card key={provider.name} className="relative">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center space-x-2">
                          <span>{provider.name}</span>
                          {provider.status === "connected" ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-muted-foreground" />
                          )}
                        </CardTitle>
                        <Badge 
                          variant={provider.status === "connected" ? "default" : "secondary"}
                          className={provider.status === "connected" ? "bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300" : ""}
                        >
                          {provider.status}
                        </Badge>
                      </div>
                      <CardDescription>
                        {provider.models.length} models available
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>API Key</Label>
                        <div className="flex space-x-2">
                          <Input 
                            type={showApiKey ? "text" : "password"}
                            placeholder={provider.status === "connected" ? "••••••••••••" : "Enter API key"}
                            className="flex-1"
                          />
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => setShowApiKey(!showApiKey)}
                          >
                            {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                      
                      {provider.status === "connected" && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Usage this month</span>
                            <span>{provider.cost}</span>
                          </div>
                          <Progress value={provider.usage} className="h-2" />
                          <div className="text-xs text-muted-foreground">
                            {provider.usage}% of {provider.limit.toLocaleString()} tokens
                          </div>
                        </div>
                      )}
                      
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant={provider.status === "connected" ? "outline" : "default"}
                          className="flex-1"
                        >
                          {provider.status === "connected" ? "Update" : "Connect"}
                        </Button>
                        {provider.status === "connected" && (
                          <Button size="sm" variant="outline">Test</Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="models" className="space-y-6">
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
            </TabsContent>

            <TabsContent value="usage" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Total Usage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">$57.65</div>
                    <div className="text-sm text-muted-foreground">This month</div>
                  </CardContent>
                </Card>
              
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Requests Made</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">2,847</div>
                    <div className="text-sm text-muted-foreground">Last 30 days</div>
                  </CardContent>
                </Card>
              
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Avg. Response Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">1.2s</div>
                    <div className="text-sm text-muted-foreground">Across all models</div>
                  </CardContent>
                </Card>
              </div>
            
              <Card>
                <CardHeader>
                  <CardTitle>Usage by Provider</CardTitle>
                  <CardDescription>Detailed breakdown of API usage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {providers.map((provider) => (
                      <div key={provider.name} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          <div>
                            <div className="font-medium">{provider.name}</div>
                            <div className="text-sm text-muted-foreground">{provider.usage}% of limit</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{provider.cost}</div>
                          <div className="text-sm text-muted-foreground">This month</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="testing" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Model Testing Interface</CardTitle>
                  <CardDescription>Test your models and prompt configurations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Test Prompt</Label>
                        <Textarea 
                          placeholder="Enter your test prompt here..."
                          className="h-32"
                        />
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button className="flex-1">Send Test</Button>
                        <Button variant="outline">Clear</Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Response</Label>
                        <div className="h-32 p-3 border rounded-md bg-slate-50 text-sm text-slate-600">
                          Response will appear here...
                        </div>
                      </div>
                      
                      <div className="text-sm text-muted-foreground">
                        Response time: 1.24s • Tokens: 156 • Cost: $0.002
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-4">
            <Button variant="outline">Export Configuration</Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LLMIntegration;
