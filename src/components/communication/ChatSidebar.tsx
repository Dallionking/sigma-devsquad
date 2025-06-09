
import { useState } from "react";
import { Card } from "@/components/ui/card";
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
  X
} from "lucide-react";
import { useAgents } from "@/contexts/AgentContext";
import { ResponsiveText } from "./ResponsiveText";
import { DynamicText, TruncatedText } from "@/components/ui/dynamic-text";
import { cn } from "@/lib/utils";

interface ChatSidebarProps {
  activeView: "chat" | "history" | "tasks";
  setActiveView: (view: "chat" | "history" | "tasks") => void;
  selectedAgent: string | null;
  setSelectedAgent: (agentId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  isMobile: boolean;
}

export const ChatSidebar = ({
  activeView,
  setActiveView,
  selectedAgent,
  setSelectedAgent,
  searchQuery,
  setSearchQuery,
  isSidebarOpen,
  setIsSidebarOpen,
  isMobile
}: ChatSidebarProps) => {
  const { agents } = useAgents();

  const getAvailableAgents = () => {
    return agents.filter(agent => agent.status === "active" || agent.status === "idle");
  };

  return (
    <div className={cn(
      // Base container with proper transitions
      "flex flex-col h-full bg-sidebar-background border-r border-sidebar-border transition-all duration-300 ease-in-out",
      // Mobile: Full overlay when open, hidden when closed
      "absolute inset-0 z-50 transform lg:relative lg:transform-none lg:z-auto",
      // Mobile positioning with smooth animations
      isMobile && !isSidebarOpen && "-translate-x-full",
      isMobile && isSidebarOpen && "translate-x-0",
      // Desktop sizing with responsive widths
      "lg:w-80 xl:w-96 2xl:w-[400px]",
      // Background and borders
      "lg:bg-sidebar-background"
    )}>
      {/* Sidebar Header - Fixed */}
      <div className="flex-shrink-0 p-4 border-b border-sidebar-border bg-sidebar-background/95 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <MessageSquare className="w-5 h-5 flex-shrink-0 text-primary" />
            <DynamicText 
              variant="lg" 
              className="font-semibold text-sidebar-foreground truncate"
              highContrast
            >
              Agent Communication
            </DynamicText>
          </div>
          
          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(false)}
              className="flex-shrink-0 h-10 w-10 p-0 hover:bg-sidebar-accent transition-colors"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
        
        {/* View Toggle Buttons - Enhanced for better spacing */}
        <div className="flex gap-1 mb-4">
          <Button
            variant={activeView === "chat" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveView("chat")}
            className={cn(
              "flex-1 h-10 px-3 transition-all duration-200",
              "hover:scale-[1.02] active:scale-[0.98]",
              activeView === "chat" && "shadow-md"
            )}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            <DynamicText variant="sm" className="font-medium">
              Chat
            </DynamicText>
          </Button>
          <Button
            variant={activeView === "history" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveView("history")}
            className={cn(
              "flex-1 h-10 px-3 transition-all duration-200",
              "hover:scale-[1.02] active:scale-[0.98]",
              activeView === "history" && "shadow-md"
            )}
          >
            <History className="w-4 h-4 mr-2" />
            <DynamicText variant="sm" className="font-medium">
              History
            </DynamicText>
          </Button>
          <Button
            variant={activeView === "tasks" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveView("tasks")}
            className={cn(
              "flex-1 h-10 px-3 transition-all duration-200",
              "hover:scale-[1.02] active:scale-[0.98]",
              activeView === "tasks" && "shadow-md"
            )}
          >
            <Plus className="w-4 h-4 mr-2" />
            <DynamicText variant="sm" className="font-medium">
              Task
            </DynamicText>
          </Button>
        </div>

        {/* Search Bar for History - Improved styling */}
        {activeView === "history" && (
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 bg-background border-border focus:ring-2 focus:ring-primary"
            />
          </div>
        )}
      </div>

      {/* Sidebar Content - Scrollable */}
      <ScrollArea className="flex-1 overflow-hidden">
        <div className="p-4 space-y-3">
          {getAvailableAgents().map(agent => (
            <Card
              key={agent.id}
              className={cn(
                "p-3 cursor-pointer transition-all duration-200 group hover:shadow-md",
                "border border-border hover:border-primary/20",
                "hover:scale-[1.02] active:scale-[0.98]",
                selectedAgent === agent.id 
                  ? "bg-primary/10 border-primary shadow-md ring-1 ring-primary/20" 
                  : "bg-card hover:bg-accent/50"
              )}
              onClick={() => setSelectedAgent(agent.id)}
            >
              <div className="flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <Avatar className="w-10 h-10 ring-2 ring-background">
                    <AvatarImage src={agent.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      <DynamicText variant="sm" className="font-bold">
                        {agent.name.split(' ').map(n => n[0]).join('')}
                      </DynamicText>
                    </AvatarFallback>
                  </Avatar>
                  <div className={cn(
                    "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background transition-all",
                    agent.status === "active" ? "bg-green-500" : "bg-yellow-500"
                  )} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <TruncatedText 
                    lines={1}
                    className="font-semibold text-card-foreground group-hover:text-primary transition-colors"
                  >
                    {agent.name}
                  </TruncatedText>
                  <TruncatedText 
                    lines={1}
                    className="text-muted-foreground mt-1 capitalize"
                  >
                    {agent.specialization.replace(/-/g, ' ')}
                  </TruncatedText>
                </div>
                
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <Badge 
                    variant={agent.status === "active" ? "default" : "secondary"} 
                    className={cn(
                      "text-xs px-2 py-1 transition-all",
                      agent.status === "active" && "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    )}
                  >
                    <DynamicText variant="xs" className="font-medium capitalize">
                      {agent.status}
                    </DynamicText>
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
