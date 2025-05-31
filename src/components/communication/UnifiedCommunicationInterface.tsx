
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Search, 
  MessageSquare, 
  FileText, 
  Calendar,
  Settings,
  Filter
} from "lucide-react";
import { CommunicationHistory } from "./CommunicationHistory";
import { DirectMessagePanel } from "./DirectMessagePanel";
import { TaskCreationView } from "./TaskCreationView";
import { useMessages } from "@/contexts/MessageContext";

export const UnifiedCommunicationInterface = () => {
  const [activeView, setActiveView] = useState("history");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  
  const { messages } = useMessages();

  const views = [
    { id: "history", label: "History", icon: MessageSquare },
    { id: "direct", label: "Direct Messages", icon: FileText },
    { id: "tasks", label: "Task Creation", icon: Calendar },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Communication Center</h2>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search messages, files, or tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* View Tabs */}
      <Tabs value={activeView} onValueChange={setActiveView} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-3 mx-4 mt-4">
          {views.map((view) => {
            const Icon = view.icon;
            return (
              <TabsTrigger key={view.id} value={view.id} className="flex items-center gap-2">
                <Icon className="w-4 h-4" />
                {view.label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="history" className="h-full mt-4">
            <CommunicationHistory 
              messages={messages}
              selectedMessage={selectedMessage}
              onMessageSelect={setSelectedMessage}
              searchQuery={searchQuery} 
            />
          </TabsContent>

          <TabsContent value="direct" className="h-full mt-4">
            <DirectMessagePanel searchQuery={searchQuery} />
          </TabsContent>

          <TabsContent value="tasks" className="h-full mt-4">
            <TaskCreationView />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
