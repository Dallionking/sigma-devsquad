
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
import { cn } from "@/lib/utils";

export const UnifiedCommunicationInterface = () => {
  const [activeView, setActiveView] = useState("history");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedAgentId, setSelectedAgentId] = useState("agent-1");
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "medium" as "low" | "medium" | "high" | "critical",
    dueDate: ""
  });
  
  const { messages } = useMessages();

  const views = [
    { id: "history", label: "History", icon: MessageSquare },
    { id: "direct", label: "Direct", icon: FileText },
    { id: "tasks", label: "Tasks", icon: Calendar },
  ];

  const handleSubmitTask = () => {
    console.log("Submitting task:", taskData);
    setTaskData({
      title: "",
      description: "",
      priority: "medium",
      dueDate: ""
    });
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Enhanced Header */}
      <div className="p-6 border-b border-border/60 bg-card/20 dark:bg-card/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Communication Center
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Monitor and manage all agent communications
            </p>
          </div>
          <Button variant="outline" size="sm" className="text-xs hover:bg-primary/10">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
        
        {/* Enhanced Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search messages, files, or tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 text-sm bg-background/80 border-border/60 text-foreground"
          />
        </div>
      </div>

      {/* Enhanced View Tabs */}
      <Tabs value={activeView} onValueChange={setActiveView} className="flex-1 flex flex-col">
        <div className="border-b border-border/60 bg-card/10 dark:bg-card/10 px-6 pt-4">
          <TabsList className="grid w-full max-w-md grid-cols-3 h-10">
            {views.map((view) => {
              const Icon = view.icon;
              return (
                <TabsTrigger 
                  key={view.id} 
                  value={view.id} 
                  className="flex items-center gap-2 text-sm py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Icon className="w-4 h-4" />
                  <span>{view.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>

        <div className="flex-1 overflow-hidden bg-background">
          <TabsContent value="history" className="h-full mt-0 p-6">
            <Card className="h-full border-border/60 bg-card/30 dark:bg-card/30">
              <CardContent className="p-0 h-full">
                <CommunicationHistory 
                  messages={messages}
                  selectedMessage={selectedMessage}
                  onMessageSelect={setSelectedMessage}
                  searchQuery={searchQuery} 
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="direct" className="h-full mt-0 p-6">
            <Card className="h-full border-border/60 bg-card/30 dark:bg-card/30">
              <CardContent className="p-0 h-full">
                <DirectMessagePanel agentId={selectedAgentId} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="h-full mt-0 p-6">
            <Card className="h-full border-border/60 bg-card/30 dark:bg-card/30">
              <CardContent className="p-6 h-full">
                <TaskCreationView 
                  taskData={taskData}
                  setTaskData={setTaskData}
                  onSubmitTask={handleSubmitTask}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
