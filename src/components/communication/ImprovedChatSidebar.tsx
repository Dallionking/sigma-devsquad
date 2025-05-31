
import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageSquare, 
  Search, 
  History,
  Plus,
  Filter,
  X
} from "lucide-react";
import { useAgents } from "@/contexts/AgentContext";
import { cn } from "@/lib/utils";

interface ImprovedChatSidebarProps {
  activeView: "chat" | "history" | "tasks";
  setActiveView: (view: "chat" | "history" | "tasks") => void;
  selectedAgent: string | null;
  setSelectedAgent: (agentId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  className?: string;
}

export const ImprovedChatSidebar = ({
  activeView,
  setActiveView,
  selectedAgent,
  setSelectedAgent,
  searchQuery,
  setSearchQuery,
  className
}: ImprovedChatSidebarProps) => {
  const { agents } = useAgents();
  const [filterOpen, setFilterOpen] = useState(false);

  const getAvailableAgents = () => {
    return agents.filter(agent => agent.status === "active" || agent.status === "idle");
  };

  return (
    <Card className={cn("h-full flex flex-col bg-card dark:bg-card border-r", className)}>
      <CardHeader className="pb-3 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground dark:text-foreground">
              Communication
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <Filter className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Compact View Toggle Buttons */}
        <div className="flex gap-1">
          <Button
            variant={activeView === "chat" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveView("chat")}
            className="flex-1 text-xs px-2 py-2"
          >
            <MessageSquare className="w-3 h-3 mr-1" />
            Chat
          </Button>
          <Button
            variant={activeView === "history" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveView("history")}
            className="flex-1 text-xs px-2 py-2"
          >
            <History className="w-3 h-3 mr-1" />
            History
          </Button>
          <Button
            variant={activeView === "tasks" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveView("tasks")}
            className="flex-1 text-xs px-2 py-2"
          >
            <Plus className="w-3 h-3 mr-1" />
            Tasks
          </Button>
        </div>

        {/* Search Bar */}
        {activeView === "history" && (
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 text-sm bg-background dark:bg-background border-border dark:border-border text-foreground dark:text-foreground"
            />
          </div>
        )}
      </CardHeader>

      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-3 space-y-2">
            {getAvailableAgents().map(agent => (
              <div
                key={agent.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200",
                  "bg-background dark:bg-background hover:bg-muted dark:hover:bg-muted",
                  "border border-transparent hover:border-border dark:hover:border-border",
                  selectedAgent === agent.id && "bg-primary/10 dark:bg-primary/10 border-primary dark:border-primary"
                )}
                onClick={() => setSelectedAgent(agent.id)}
              >
                <div className="relative shrink-0">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={agent.avatar} />
                    <AvatarFallback className="text-xs bg-muted dark:bg-muted text-foreground dark:text-foreground">
                      {agent.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background dark:border-background" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground dark:text-foreground truncate">
                    {agent.name}
                  </div>
                  <div className="text-xs text-muted-foreground dark:text-muted-foreground truncate">
                    {agent.specialization.replace(/-/g, ' ')}
                  </div>
                </div>
                <Badge 
                  variant="secondary" 
                  className="text-xs px-2 py-1 shrink-0 bg-muted dark:bg-muted text-muted-foreground dark:text-muted-foreground"
                >
                  {agent.status}
                </Badge>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
