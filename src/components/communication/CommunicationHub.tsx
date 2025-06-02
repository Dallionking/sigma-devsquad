
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  Search, 
  Pin,
  Users,
  Hash,
  Bell,
  Settings
} from "lucide-react";
import { DirectMessaging } from "./DirectMessaging";
import { GroupChatRooms } from "./GroupChatRooms";
import { PinnedMessages } from "./PinnedMessages";
import { CommunicationSearch } from "./CommunicationSearch";
import { cn } from "@/lib/utils";

interface UnreadCounts {
  direct: number;
  groups: number;
  channels: number;
}

export const CommunicationHub = () => {
  const [activeTab, setActiveTab] = useState("direct");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [unreadCounts, setUnreadCounts] = useState<UnreadCounts>({
    direct: 3,
    groups: 7,
    channels: 2
  });
  const [notifications, setNotifications] = useState(true);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        setUnreadCounts(prev => ({
          ...prev,
          direct: prev.direct + Math.floor(Math.random() * 2),
          groups: prev.groups + Math.floor(Math.random() * 3)
        }));
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Mark messages as read when switching tabs
    if (value === "direct") {
      setUnreadCounts(prev => ({ ...prev, direct: 0 }));
    } else if (value === "groups") {
      setUnreadCounts(prev => ({ ...prev, groups: 0 }));
    }
  };

  return (
    <div className="h-full flex flex-col">
      <Card className="flex-1">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Communication Hub
              {notifications && (
                <Bell className="w-4 h-4 text-yellow-500 animate-pulse" />
              )}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSearch(!showSearch)}
              >
                <Search className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {showSearch && (
            <div className="mt-3">
              <Input
                placeholder="Search messages, users, or channels..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
          )}
        </CardHeader>

        <CardContent className="flex-1 p-0">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="h-full flex flex-col">
            <div className="px-6 pb-0">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="direct" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Direct
                  {unreadCounts.direct > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {unreadCounts.direct}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="groups" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Groups
                  {unreadCounts.groups > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {unreadCounts.groups}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="channels" className="flex items-center gap-2">
                  <Hash className="w-4 h-4" />
                  Channels
                  {unreadCounts.channels > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {unreadCounts.channels}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="pinned" className="flex items-center gap-2">
                  <Pin className="w-4 h-4" />
                  Pinned
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-hidden">
              <TabsContent value="direct" className="h-full mt-0">
                <DirectMessaging searchQuery={searchQuery} />
              </TabsContent>
              
              <TabsContent value="groups" className="h-full mt-0">
                <GroupChatRooms searchQuery={searchQuery} />
              </TabsContent>
              
              <TabsContent value="channels" className="h-full mt-0">
                <div className="p-6">
                  <div className="text-center text-muted-foreground">
                    <Hash className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">Public Channels</h3>
                    <p>Join public channels to collaborate with your team.</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="pinned" className="h-full mt-0">
                <PinnedMessages searchQuery={searchQuery} />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {showSearch && searchQuery && (
        <CommunicationSearch 
          query={searchQuery} 
          onClose={() => setShowSearch(false)} 
        />
      )}
    </div>
  );
};
