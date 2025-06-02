
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { CommunicationHeader } from "./layout/CommunicationHeader";
import { CommunicationTabs } from "./layout/CommunicationTabs";
import { DirectMessaging } from "./DirectMessaging";
import { GroupChatRooms } from "./GroupChatRooms";
import { PinnedMessages } from "./PinnedMessages";
import { ThreadedDiscussions } from "./threads/ThreadedDiscussions";
import { ExternalIntegrations } from "./integrations/ExternalIntegrations";

export const ComprehensiveCommunicationHub = () => {
  const [activeTab, setActiveTab] = useState("direct");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState<string>("general");
  const [isLoading, setIsLoading] = useState(false);

  // Debug logging
  console.log('🎯 ComprehensiveCommunicationHub rendering with activeTab:', activeTab);

  const handleTabChange = (value: string) => {
    console.log('📋 Tab changed to:', value);
    setActiveTab(value);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  if (isLoading) {
    return <LoadingSpinner size="lg" text="Loading communication hub..." />;
  }

  return (
    <ErrorBoundary>
      <div className="h-full flex flex-col bg-background">
        <CommunicationHeader 
          searchQuery={searchQuery}
          onSearch={handleSearch}
        />
        
        <div className="flex-1 overflow-hidden">
          <Card className="h-full border-0 shadow-none">
            <CardContent className="p-0 h-full">
              <Tabs 
                value={activeTab} 
                onValueChange={handleTabChange}
                className="h-full flex flex-col"
              >
                <CommunicationTabs activeTab={activeTab} />
                
                <div className="flex-1 overflow-hidden">
                  <TabsContent value="direct" className="h-full mt-0">
                    <DirectMessaging searchQuery={searchQuery} />
                  </TabsContent>
                  
                  <TabsContent value="groups" className="h-full mt-0">
                    <GroupChatRooms searchQuery={searchQuery} />
                  </TabsContent>
                  
                  <TabsContent value="pinned" className="h-full mt-0">
                    <PinnedMessages />
                  </TabsContent>
                  
                  <TabsContent value="threads" className="h-full mt-0">
                    <ThreadedDiscussions 
                      roomId={selectedRoomId}
                      currentUserId="current-user-id"
                    />
                  </TabsContent>
                  
                  <TabsContent value="integrations" className="h-full mt-0">
                    <ExternalIntegrations roomId={selectedRoomId} />
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </ErrorBoundary>
  );
};
