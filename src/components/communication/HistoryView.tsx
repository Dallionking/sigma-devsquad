
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAgents } from "@/contexts/AgentContext";
import { useMessages } from "@/contexts/MessageContext";
import { ResponsiveText } from "./ResponsiveText";

interface HistoryViewProps {
  searchQuery: string;
}

export const HistoryView = ({ searchQuery }: HistoryViewProps) => {
  const { agents } = useAgents();
  const { messages } = useMessages();

  const getAgentName = (agentId: string) => {
    if (agentId === "current-user") return "You";
    const agent = agents.find(a => a.id === agentId);
    return agent?.name || agentId;
  };

  const getFilteredMessages = () => {
    return messages.filter(msg => {
      if (searchQuery && !msg.content.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      return true;
    }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays === 1) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };

  return (
    <ScrollArea className="flex-1">
      <div className="p-3 sm:p-4 space-y-3">
        {getFilteredMessages().map((msg) => (
          <Card 
            key={msg.id} 
            className="hover:shadow-md transition-shadow touch-manipulation active:scale-[0.98] cursor-pointer"
          >
            <CardContent className="p-3 sm:p-4 min-h-[60px]">
              <div className="flex items-start gap-3">
                <Avatar className="w-6 h-6 sm:w-8 sm:h-8 shrink-0">
                  <AvatarFallback className="text-responsive-xs">
                    {getAgentName(msg.from)[0]}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <ResponsiveText 
                      variant="default" 
                      truncate={true}
                      className="font-weight-responsive contrast-enhanced"
                    >
                      {getAgentName(msg.from)}
                    </ResponsiveText>
                    <span className="text-muted-foreground text-responsive-xs">→</span>
                    <ResponsiveText 
                      variant="muted" 
                      truncate={true}
                      className="contrast-enhanced-muted"
                    >
                      {getAgentName(msg.to)}
                    </ResponsiveText>
                    <ResponsiveText 
                      variant="muted" 
                      className="ml-auto shrink-0 contrast-enhanced-muted"
                    >
                      {formatDate(msg.timestamp)}
                    </ResponsiveText>
                  </div>
                  
                  <ResponsiveText 
                    variant="small" 
                    className="break-words-mobile contrast-enhanced"
                  >
                    {msg.content}
                  </ResponsiveText>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};
