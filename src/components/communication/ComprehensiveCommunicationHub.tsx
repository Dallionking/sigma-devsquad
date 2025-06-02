
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Users, 
  Share, 
  MessageCircle, 
  Zap,
  Search,
  Pin,
  Settings,
  Bell
} from "lucide-react";
import { RealTimeChatInterface } from "./chat/RealTimeChatInterface";
import { FileSharing } from "./files/FileSharing";
import { ThreadedDiscussions } from "./threads/ThreadedDiscussions";
import { ExternalIntegrations } from "./integrations/ExternalIntegrations";
import { DirectMessaging } from "./DirectMessaging";
import { GroupChatRooms } from "./GroupChatRooms";
import { PinnedMessages } from "./PinnedMessages";

export const ComprehensiveCommunicationHub = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [unreadCounts, setUnreadCounts] = useState({
    chat: 5,
    direct: 3,
    groups: 7,
    discussions: 2,
    files: 0,
    integrations: 0
  });

  const currentUserId = "current-user";
  const roomId = "main-room";

  const tabs = [
    { 
      id: "chat", 
      label: "Real-time Chat", 
      icon: MessageSquare,
      description: "Live chat with real-time updates",
      count: unreadCounts.chat
    },
    { 
      id: "direct", 
      label: "Direct Messages", 
      icon: MessageSquare,
      description: "Private conversations with team members",
      count: unreadCounts.direct
    },
    { 
      id: "groups", 
      label: "Group Chats", 
      icon: Users,
      description: "Team channels and group discussions",
      count: unreadCounts.groups
    },
    { 
      id: "discussions", 
      label: "Discussions", 
      icon: MessageCircle,
      description: "Threaded discussions and Q&A",
      count: unreadCounts.discussions
    },
    { 
      id: "files", 
      label: "File Sharing", 
      icon: Share,
      description: "Upload and share files with version control",
      count: unreadCounts.files
    },
    { 
      id: "integrations", 
      label: "Integrations", 
      icon: Zap,
      description: "Connect with Discord, Telegram, and more",
      count: unreadCounts.integrations
    }
  ];

  const getTotalUnreadCount = () => {
    return Object.values(unreadCounts).reduce((sum, count) => sum + count, 0);
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    // Mark as read when switching tabs
    setUnreadCounts(prev => ({
      ...prev,
      [tabId]: 0
    }));
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <Card className="flex-1">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Communication Hub
                {getTotalUnreadCount() > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {getTotalUnreadCount()}
                  </Badge>
                )}
              </CardTitle>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSearch(!showSearch)}
              >
                <Search className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Pin className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {showSearch && (
            <div className="mt-3">
              <Input
                placeholder="Search across all communications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
          )}
        </CardHeader>

        <CardContent className="flex-1 p-0">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="h-full flex flex-col">
            <div className="px-6 pb-0 border-b">
              <TabsList className="grid w-full grid-cols-6 h-auto p-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <TabsTrigger 
                      key={tab.id} 
                      value={tab.id} 
                      className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      title={tab.description}
                    >
                      <div className="relative">
                        <Icon className="w-4 h-4" />
                        {tab.count > 0 && (
                          <Badge 
                            variant="destructive" 
                            className="absolute -top-2 -right-2 h-4 w-4 p-0 text-xs flex items-center justify-center"
                          >
                            {tab.count > 9 ? "9+" : tab.count}
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs font-medium">{tab.label}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            <div className="flex-1 overflow-hidden">
              <TabsContent value="chat" className="h-full mt-0 p-6">
                <RealTimeChatInterface 
                  roomId={roomId}
                  currentUserId={currentUserId}
                  onFileUpload={(files) => {
                    console.log("Files uploaded:", files);
                    // Handle file upload
                  }}
                />
              </TabsContent>
              
              <TabsContent value="direct" className="h-full mt-0">
                <DirectMessaging searchQuery={searchQuery} />
              </TabsContent>
              
              <TabsContent value="groups" className="h-full mt-0">
                <GroupChatRooms searchQuery={searchQuery} />
              </TabsContent>
              
              <TabsContent value="discussions" className="h-full mt-0 p-6">
                <ThreadedDiscussions 
                  roomId={roomId}
                  currentUserId={currentUserId}
                />
              </TabsContent>
              
              <TabsContent value="files" className="h-full mt-0 p-6">
                <FileSharing 
                  roomId={roomId}
                  currentUserId={currentUserId}
                />
              </TabsContent>
              
              <TabsContent value="integrations" className="h-full mt-0 p-6">
                <ExternalIntegrations roomId={roomId} />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
