
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
  Menu,
  X
} from "lucide-react";
import { useAgents } from "@/contexts/AgentContext";
import { ResponsiveText } from "./ResponsiveText";
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
      // Mobile: Full overlay when open, hidden when closed
      "absolute inset-0 z-50 bg-background transform transition-transform duration-300 ease-in-out lg:relative lg:transform-none lg:z-auto",
      // Mobile positioning
      isMobile && !isSidebarOpen && "-translate-x-full",
      isMobile && isSidebarOpen && "translate-x-0",
      // Desktop sizing
      "lg:w-80 xl:w-96 2xl:w-[400px]",
      "lg:border-r lg:bg-muted/20"
    )}>
      <div className="h-full flex flex-col">
        {/* Sidebar Header */}
        <div className="p-3 sm:p-4 lg:p-4 xl:p-6 border-b flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <ResponsiveText 
                variant="heading" 
                truncate={true}
                className="text-high-contrast"
              >
                Agent Communication
              </ResponsiveText>
            </div>
            
            {isMobile && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen(false)}
                className="touch-target shrink-0 min-h-[44px] min-w-[44px] p-2"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          {/* View Toggle Buttons - Enhanced for touch */}
          <div className="flex gap-1 mb-4">
            <Button
              variant={activeView === "chat" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveView("chat")}
              className="flex-1 text-responsive-xs px-2 sm:px-3 btn-mobile min-h-[44px] touch-manipulation"
            >
              Chat
            </Button>
            <Button
              variant={activeView === "history" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveView("history")}
              className="flex-1 text-responsive-xs px-2 sm:px-3 btn-mobile min-h-[44px] touch-manipulation"
            >
              <History className="w-3 h-3 mr-1 flex-shrink-0" />
              <span className="hidden xs:inline truncate">History</span>
            </Button>
            <Button
              variant={activeView === "tasks" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveView("tasks")}
              className="flex-1 text-responsive-xs px-2 sm:px-3 btn-mobile min-h-[44px] touch-manipulation"
            >
              <Plus className="w-3 h-3 mr-1 flex-shrink-0" />
              <span className="hidden xs:inline truncate">Task</span>
            </Button>
          </div>

          {/* Search Bar for History */}
          {activeView === "history" && (
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 text-responsive-sm h-11 no-zoom min-h-[44px]"
              />
            </div>
          )}
        </div>

        {/* Sidebar Content */}
        <ScrollArea className="flex-1">
          <div className="p-3 sm:p-4 space-y-2">
            {getAvailableAgents().map(agent => (
              <div
                key={agent.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors touch-target min-h-[60px]",
                  "touch-manipulation active:scale-95 transition-transform duration-150",
                  selectedAgent === agent.id ? "bg-primary text-primary-foreground" : "hover:bg-muted active:bg-muted/80"
                )}
                onClick={() => setSelectedAgent(agent.id)}
              >
                <div className="relative shrink-0">
                  <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                    <AvatarImage src={agent.avatar} />
                    <AvatarFallback className="text-responsive-xs">
                      {agent.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                </div>
                <div className="flex-1 min-w-0">
                  <ResponsiveText 
                    variant="default" 
                    truncate={true}
                    className="font-weight-responsive contrast-enhanced"
                  >
                    {agent.name}
                  </ResponsiveText>
                  <ResponsiveText 
                    variant="muted" 
                    truncate={true}
                    className="contrast-enhanced-muted"
                  >
                    {agent.specialization.replace(/-/g, ' ')}
                  </ResponsiveText>
                </div>
                <Badge variant="secondary" className="text-responsive-xs px-2 py-1 shrink-0">
                  {agent.status}
                </Badge>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
