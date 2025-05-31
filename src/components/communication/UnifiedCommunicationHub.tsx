
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  Activity, 
  UserPlus
} from "lucide-react";
import { ResponsiveUnifiedChatInterface } from "./ResponsiveUnifiedChatInterface";
import { UserActivityTimeline } from "@/components/collaboration/UserActivityTimeline";
import { PresenceAwareness } from "@/components/collaboration/PresenceAwareness";
import { NotificationCenter } from "@/components/collaboration/NotificationCenter";
import { CollaborationInviteSystem } from "@/components/collaboration/CollaborationInviteSystem";
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
              <TabsList className="grid w-full grid-cols-3 m-4 mb-0">
                <TabsTrigger value="chat" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Team Chat
                </TabsTrigger>
                <TabsTrigger value="activity" className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Activity
                </TabsTrigger>
                <TabsTrigger value="invite" className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Collaborate
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="chat" className="flex-1 min-h-0 m-0">
                <ResponsiveUnifiedChatInterface />
              </TabsContent>
              
              <TabsContent value="activity" className="flex-1 min-h-0 m-4 mt-0">
                <UserActivityTimeline />
              </TabsContent>
              
              <TabsContent value="invite" className="flex-1 min-h-0 m-4 mt-0">
                <CollaborationInviteSystem projectId={projectId} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
