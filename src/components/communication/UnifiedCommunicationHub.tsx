
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  Activity, 
  UserPlus,
  TrendingUp,
  Settings,
  BarChart3,
  Network,
  Users
} from "lucide-react";
import { ResponsiveUnifiedChatInterface } from "./ResponsiveUnifiedChatInterface";
import { UserActivityTimeline } from "@/components/collaboration/UserActivityTimeline";
import { PresenceAwareness } from "@/components/collaboration/PresenceAwareness";
import { NotificationCenter } from "@/components/collaboration/NotificationCenter";
import { CollaborationInviteSystem } from "@/components/collaboration/CollaborationInviteSystem";
import { CommunicationAnalytics } from "@/components/analytics/CommunicationAnalytics";
import { useAgents } from "@/contexts/AgentContext";
import { cn } from "@/lib/utils";

interface UnifiedCommunicationHubProps {
  className?: string;
  defaultTab?: string;
  projectId?: string;
}

export const UnifiedCommunicationHub = ({ 
  className, 
  defaultTab = "chat",
  projectId = "default-project"
}: UnifiedCommunicationHubProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const { agents } = useAgents();

  return (
    <div className={cn("h-full flex flex-col", className)}>
      {/* Communication Interface */}
      <div className="flex-1 min-h-0">
        <Card className="h-full bg-card/95 backdrop-blur-sm border border-border/30">
          <CardHeader className="pb-3 border-b border-border/20">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#10B981]" />
                Communication Hub
              </CardTitle>
              <div className="flex items-center gap-2">
                <PresenceAwareness 
                  componentId="communication-hub" 
                  showLabels={false}
                  maxVisible={3}
                />
                <NotificationCenter />
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0 flex-1 min-h-0 flex flex-col">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <TabsList className="grid w-full grid-cols-6 m-4 mb-0">
                <TabsTrigger value="chat" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Chat
                </TabsTrigger>
                <TabsTrigger value="activity" className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Activity
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Analytics
                </TabsTrigger>
                <TabsTrigger value="heatmap" className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Heat Map
                </TabsTrigger>
                <TabsTrigger value="network" className="flex items-center gap-2">
                  <Network className="w-4 h-4" />
                  Network
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Settings
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="chat" className="flex-1 min-h-0 m-0">
                <ResponsiveUnifiedChatInterface />
              </TabsContent>
              
              <TabsContent value="activity" className="flex-1 min-h-0 m-4 mt-0">
                <UserActivityTimeline />
              </TabsContent>
              
              <TabsContent value="analytics" className="flex-1 min-h-0 m-4 mt-0 overflow-auto">
                <CommunicationAnalytics agents={agents || []} />
              </TabsContent>
              
              <TabsContent value="heatmap" className="flex-1 min-h-0 m-4 mt-0">
                <AgentHeatMap agents={agents || []} />
              </TabsContent>
              
              <TabsContent value="network" className="flex-1 min-h-0 m-4 mt-0">
                <CommunicationNetworkView agents={agents || []} />
              </TabsContent>
              
              <TabsContent value="settings" className="flex-1 min-h-0 m-4 mt-0">
                <CommunicationSettings />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Agent Heat Map Component
const AgentHeatMap = ({ agents }: { agents: any[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Agent Activity Heat Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
          {agents.map((agent, index) => (
            <div
              key={agent.id || index}
              className={cn(
                "aspect-square rounded-lg border-2 flex items-center justify-center text-xs font-medium transition-all duration-200 hover:scale-110 cursor-pointer",
                agent.status === "working" && "bg-green-500/20 border-green-500 text-green-700",
                agent.status === "idle" && "bg-gray-500/20 border-gray-500 text-gray-700",
                agent.status === "waiting" && "bg-yellow-500/20 border-yellow-500 text-yellow-700",
                agent.status === "error" && "bg-red-500/20 border-red-500 text-red-700"
              )}
              title={`${agent.name} - ${agent.status}`}
            >
              {agent.name?.charAt(0) || 'A'}
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span>Working</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <span>Waiting</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-500 rounded-full" />
            <span>Idle</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <span>Error</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Communication Network View Component
const CommunicationNetworkView = ({ agents }: { agents: any[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Network className="w-5 h-5" />
          Communication Network
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">{agents.length}</div>
              <div className="text-sm text-muted-foreground">Active Agents</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {agents.filter(a => a.status === 'working').length}
              </div>
              <div className="text-sm text-muted-foreground">Working</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">147</div>
              <div className="text-sm text-muted-foreground">Messages Today</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium">Recent Network Activity</h4>
            {agents.slice(0, 5).map((agent, index) => (
              <div key={agent.id || index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-3 h-3 rounded-full",
                    agent.status === "working" && "bg-green-500",
                    agent.status === "idle" && "bg-gray-500",
                    agent.status === "waiting" && "bg-yellow-500",
                    agent.status === "error" && "bg-red-500"
                  )} />
                  <span className="font-medium">{agent.name}</span>
                  <span className="text-sm text-muted-foreground">({agent.type})</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {Math.floor(Math.random() * 20) + 5} msgs
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Communication Settings Component
const CommunicationSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Communication Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium">Notification Preferences</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Real-time notifications</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Agent status updates</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Task completion alerts</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Error notifications</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Display Settings</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Show agent avatars</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Compact message view</span>
                <input type="checkbox" className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Show typing indicators</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Auto-responses</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Enable auto-responses</span>
                <input type="checkbox" className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Smart suggestions</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
