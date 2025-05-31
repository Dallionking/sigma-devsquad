
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
    <div className="h-full flex flex-col bg-background dark:bg-background">
      {/* Compact Header */}
      <div className="p-4 border-b border-border dark:border-border bg-card dark:bg-card">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground dark:text-foreground">
            Communication Center
          </h2>
          <Button variant="outline" size="sm" className="text-xs">
            <Settings className="w-3 h-3 mr-1" />
            Settings
          </Button>
        </div>
        
        {/* Compact Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search messages, files, or tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 text-sm bg-background dark:bg-background border-border dark:border-border text-foreground dark:text-foreground"
          />
        </div>
      </div>

      {/* Compact View Tabs */}
      <Tabs value={activeView} onValueChange={setActiveView} className="flex-1 flex flex-col">
        <div className="border-b border-border dark:border-border bg-card dark:bg-card px-4 pt-2">
          <TabsList className="grid w-full grid-cols-3 h-8">
            {views.map((view) => {
              const Icon = view.icon;
              return (
                <TabsTrigger 
                  key={view.id} 
                  value={view.id} 
                  className="flex items-center gap-1 text-xs py-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Icon className="w-3 h-3" />
                  <span className="hidden sm:inline">{view.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>

        <div className="flex-1 overflow-hidden bg-background dark:bg-background">
          <TabsContent value="history" className="h-full mt-0 p-4">
            <div className="h-full bg-card dark:bg-card rounded-lg border border-border dark:border-border">
              <CommunicationHistory 
                messages={messages}
                selectedMessage={selectedMessage}
                onMessageSelect={setSelectedMessage}
                searchQuery={searchQuery} 
              />
            </div>
          </TabsContent>

          <TabsContent value="direct" className="h-full mt-0 p-4">
            <div className="h-full bg-card dark:bg-card rounded-lg border border-border dark:border-border">
              <DirectMessagePanel agentId={selectedAgentId} />
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="h-full mt-0 p-4">
            <div className="h-full bg-card dark:bg-card rounded-lg border border-border dark:border-border">
              <TaskCreationView 
                taskData={taskData}
                setTaskData={setTaskData}
                onSubmitTask={handleSubmitTask}
              />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
