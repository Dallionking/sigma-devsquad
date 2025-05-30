
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Code, 
  Palette, 
  Zap, 
  FileText, 
  Sparkles, 
  Monitor,
  Keyboard,
  Paintbrush
} from "lucide-react";
import { useState } from "react";

export const EditorPreferencesTab = () => {
  const [autoFormat, setAutoFormat] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [liveSync, setLiveSync] = useState(false);
  const [intelliSense, setIntelliSense] = useState(true);

  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Settings className="w-6 h-6 text-primary" />
            <div>
              <CardTitle className="text-card-foreground">Editor Preferences</CardTitle>
              <CardDescription className="text-muted-foreground">
                Customize your IDE experience with Lovable integration
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
              <Code className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-card-foreground">Code Style</p>
                <p className="text-xs text-muted-foreground">Formatting & linting</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
              <Palette className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm font-medium text-card-foreground">Appearance</p>
                <p className="text-xs text-muted-foreground">Themes & colors</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
              <Zap className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-sm font-medium text-card-foreground">Performance</p>
                <p className="text-xs text-muted-foreground">Speed & efficiency</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
              <Keyboard className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm font-medium text-card-foreground">Shortcuts</p>
                <p className="text-xs text-muted-foreground">Key bindings</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preference Categories */}
      <Tabs defaultValue="code-style" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="code-style" className="gap-2">
            <Code className="w-4 h-4" />
            <span className="hidden sm:inline">Code Style</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Paintbrush className="w-4 h-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="behavior" className="gap-2">
            <Zap className="w-4 h-4" />
            <span className="hidden sm:inline">Behavior</span>
          </TabsTrigger>
          <TabsTrigger value="integration" className="gap-2">
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">Integration</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="code-style" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <Code className="w-5 h-5" />
                Code Formatting & Linting
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Configure code style and formatting preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium text-card-foreground">Auto-format on save</Label>
                      <p className="text-sm text-muted-foreground">Format code automatically when saving</p>
                    </div>
                    <Switch 
                      checked={autoFormat}
                      onCheckedChange={setAutoFormat}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Code formatter</Label>
                    <Select defaultValue="prettier">
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        <SelectItem value="prettier">Prettier</SelectItem>
                        <SelectItem value="eslint">ESLint</SelectItem>
                        <SelectItem value="biome">Biome</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Indentation</Label>
                    <div className="flex gap-2">
                      <Select defaultValue="spaces">
                        <SelectTrigger className="bg-background border-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-border">
                          <SelectItem value="spaces">Spaces</SelectItem>
                          <SelectItem value="tabs">Tabs</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input 
                        type="number" 
                        defaultValue="2" 
                        className="w-20 bg-background border-border"
                        placeholder="Size"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Line length limit</Label>
                    <Input 
                      type="number" 
                      defaultValue="80" 
                      className="bg-background border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Quote style</Label>
                    <Select defaultValue="single">
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        <SelectItem value="single">Single quotes</SelectItem>
                        <SelectItem value="double">Double quotes</SelectItem>
                        <SelectItem value="auto">Auto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Semicolons</Label>
                    <Select defaultValue="always">
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        <SelectItem value="always">Always</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                        <SelectItem value="auto">Auto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium text-card-foreground">ESLint Configuration</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>ESLint preset</Label>
                    <Select defaultValue="recommended">
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        <SelectItem value="recommended">Recommended</SelectItem>
                        <SelectItem value="airbnb">Airbnb</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>TypeScript support</Label>
                    <Select defaultValue="enabled">
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        <SelectItem value="enabled">Enabled</SelectItem>
                        <SelectItem value="disabled">Disabled</SelectItem>
                        <SelectItem value="strict">Strict mode</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <Paintbrush className="w-5 h-5" />
                Editor Appearance
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Customize the visual appearance of your editor
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Color theme</Label>
                    <Select defaultValue="dark">
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="auto">Auto</SelectItem>
                        <SelectItem value="high-contrast">High contrast</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Font family</Label>
                    <Select defaultValue="fira-code">
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        <SelectItem value="fira-code">Fira Code</SelectItem>
                        <SelectItem value="jetbrains-mono">JetBrains Mono</SelectItem>
                        <SelectItem value="source-code-pro">Source Code Pro</SelectItem>
                        <SelectItem value="consolas">Consolas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Font size</Label>
                    <Input 
                      type="number" 
                      defaultValue="14" 
                      className="bg-background border-border"
                      min="10"
                      max="24"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Line height</Label>
                    <Input 
                      type="number" 
                      defaultValue="1.5" 
                      step="0.1"
                      className="bg-background border-border"
                      min="1.0"
                      max="3.0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Cursor style</Label>
                    <Select defaultValue="line">
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        <SelectItem value="line">Line</SelectItem>
                        <SelectItem value="block">Block</SelectItem>
                        <SelectItem value="underline">Underline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Tab size display</Label>
                    <Input 
                      type="number" 
                      defaultValue="4" 
                      className="bg-background border-border"
                      min="1"
                      max="8"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium text-card-foreground">Visual Indicators</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Line numbers</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Indent guides</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Whitespace</Label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Word wrap</Label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Minimap</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Bracket matching</Label>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Editor Behavior
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Configure how the editor behaves during development
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium text-card-foreground">Auto-save</Label>
                    <p className="text-sm text-muted-foreground">Save files automatically after changes</p>
                  </div>
                  <Switch 
                    checked={autoSave}
                    onCheckedChange={setAutoSave}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium text-card-foreground">IntelliSense</Label>
                    <p className="text-sm text-muted-foreground">Enable intelligent code completion</p>
                  </div>
                  <Switch 
                    checked={intelliSense}
                    onCheckedChange={setIntelliSense}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium text-card-foreground">Live error checking</Label>
                    <p className="text-sm text-muted-foreground">Show errors and warnings in real-time</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium text-card-foreground">Auto-complete suggestions</Label>
                    <p className="text-sm text-muted-foreground">Show code completion suggestions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-card-foreground">Performance Settings</h4>
                  
                  <div className="space-y-2">
                    <Label>Auto-save delay (ms)</Label>
                    <Input 
                      type="number" 
                      defaultValue="1000" 
                      className="bg-background border-border"
                      min="100"
                      max="5000"
                      step="100"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Suggestion delay (ms)</Label>
                    <Input 
                      type="number" 
                      defaultValue="300" 
                      className="bg-background border-border"
                      min="0"
                      max="2000"
                      step="50"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-card-foreground">File Handling</h4>
                  
                  <div className="space-y-2">
                    <Label>Max file size (MB)</Label>
                    <Input 
                      type="number" 
                      defaultValue="50" 
                      className="bg-background border-border"
                      min="1"
                      max="100"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Recent files limit</Label>
                    <Input 
                      type="number" 
                      defaultValue="20" 
                      className="bg-background border-border"
                      min="5"
                      max="100"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integration" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Lovable Integration
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Configure Lovable-specific features and behaviors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium text-card-foreground">Live sync mode</Label>
                    <p className="text-sm text-muted-foreground">Real-time synchronization with Lovable</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={liveSync}
                      onCheckedChange={setLiveSync}
                    />
                    {liveSync && <Badge className="text-xs">Beta</Badge>}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium text-card-foreground">AI suggestions</Label>
                    <p className="text-sm text-muted-foreground">Enable AI-powered code suggestions</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium text-card-foreground">Auto-deploy preview</Label>
                    <p className="text-sm text-muted-foreground">Automatically deploy changes to preview</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium text-card-foreground">Component detection</Label>
                    <p className="text-sm text-muted-foreground">Automatically detect React components</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-card-foreground">Sync Settings</h4>
                  
                  <div className="space-y-2">
                    <Label>Sync frequency</Label>
                    <Select defaultValue="auto">
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        <SelectItem value="realtime">Real-time</SelectItem>
                        <SelectItem value="auto">Auto (5s)</SelectItem>
                        <SelectItem value="manual">Manual only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Conflict resolution</Label>
                    <Select defaultValue="prompt">
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        <SelectItem value="prompt">Prompt user</SelectItem>
                        <SelectItem value="local">Prefer local</SelectItem>
                        <SelectItem value="remote">Prefer remote</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-card-foreground">Notifications</h4>
                  
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Sync status</Label>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Error alerts</Label>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Update notifications</Label>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Actions */}
      <div className="flex justify-end space-x-2">
        <Button variant="outline">Reset to Defaults</Button>
        <Button>Save Preferences</Button>
      </div>
    </div>
  );
};
