
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Phone, 
  Video, 
  Plus,
  Menu
} from "lucide-react";
import { useAgents } from "@/contexts/AgentContext";
import { ResponsiveText } from "./ResponsiveText";

interface ChatHeaderProps {
  selectedAgent: string;
  showTaskForm: boolean;
  setShowTaskForm: (show: boolean) => void;
  isMobile: boolean;
  setIsSidebarOpen?: (open: boolean) => void;
}

export const ChatHeader = ({
  selectedAgent,
  showTaskForm,
  setShowTaskForm,
  isMobile,
  setIsSidebarOpen
}: ChatHeaderProps) => {
  const { agents } = useAgents();

  const getAgentName = (agentId: string) => {
    if (agentId === "current-user") return "You";
    const agent = agents.find(a => a.id === agentId);
    return agent?.name || agentId;
  };

  return (
    <>
      {/* Mobile header with menu toggle */}
      {isMobile && setIsSidebarOpen && (
        <div className="flex items-center justify-between p-3 border-b bg-background shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSidebarOpen(true)}
            className="touch-target min-h-[44px] min-w-[44px] p-2"
          >
            <Menu className="w-4 h-4" />
          </Button>
          <ResponsiveText variant="heading" className="text-high-contrast">
            Communication
          </ResponsiveText>
          <div className="w-10" />
        </div>
      )}

      {/* Chat Header */}
      <div className="p-3 sm:p-4 lg:p-4 xl:p-6 border-b bg-background shrink-0">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <Avatar className="w-8 h-8 sm:w-10 sm:h-10 shrink-0">
              <AvatarImage src={agents.find(a => a.id === selectedAgent)?.avatar} />
              <AvatarFallback className="text-responsive-xs">
                {getAgentName(selectedAgent)[0]}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <ResponsiveText 
                variant="heading" 
                truncate={true}
                className="text-high-contrast"
              >
                {getAgentName(selectedAgent)}
              </ResponsiveText>
              <ResponsiveText variant="muted">
                Online
              </ResponsiveText>
            </div>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <Button 
              variant="outline" 
              size="sm" 
              className="px-2 sm:px-3 btn-mobile min-h-[44px] min-w-[44px] touch-manipulation active:scale-95"
            >
              <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="px-2 sm:px-3 btn-mobile min-h-[44px] min-w-[44px] touch-manipulation active:scale-95"
            >
              <Video className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowTaskForm(!showTaskForm)}
              className="px-2 sm:px-3 btn-mobile min-h-[44px] min-w-[44px] touch-manipulation active:scale-95"
            >
              <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
