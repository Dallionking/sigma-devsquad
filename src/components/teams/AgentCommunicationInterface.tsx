
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTeams } from "@/contexts/TeamContext";
import { useCurrentUser } from "@/contexts/CurrentUserContext";
import { AgentProfile, TeamCommunication } from "@/types/teams";
import { Send, Paperclip, MoreVertical, Phone, Video } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AgentCommunicationInterfaceProps {
  agent: AgentProfile;
  onClose?: () => void;
}

export const AgentCommunicationInterface = ({ agent, onClose }: AgentCommunicationInterfaceProps) => {
  const { getTeamCommunications, sendMessage, getTeamById } = useTeams();
  const { currentUser } = useCurrentUser();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"message" | "task-assignment">("message");
  
  const team = getTeamById(agent.teamId);
  const communications = getTeamCommunications(agent.teamId)
    .filter(comm => 
      comm.fromAgentId === agent.id || 
      comm.toAgentId === agent.id || 
      (!comm.toAgentId && comm.teamId === agent.teamId) ||
      comm.fromAgentId === currentUser.id
    )
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  const handleSendMessage = () => {
    if (!message.trim()) return;

    sendMessage({
      teamId: agent.teamId,
      fromAgentId: currentUser.id,
      toAgentId: agent.id,
      content: message,
      type: messageType,
      priority: "medium"
    });

    setMessage("");
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available": return "bg-green-500";
      case "busy": return "bg-yellow-500";
      case "offline": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="h-full flex flex-col">
      {/* Header */}
      <CardHeader className="pb-3 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="w-10 h-10">
                <AvatarImage src={agent.avatar} />
                <AvatarFallback>
                  {agent.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className={cn(
                "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background",
                getAvailabilityColor(agent.availability)
              )} />
            </div>
            
            <div>
              <CardTitle className="text-lg">{agent.name}</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {agent.specialization.replace(/-/g, ' ')}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {team?.name}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Video className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* Agent Status */}
      <div className="px-4 py-3 bg-muted/30 border-b">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Status:</span>
            <span className={cn(
              "ml-2 font-medium",
              agent.availability === "available" && "text-green-600",
              agent.availability === "busy" && "text-yellow-600",
              agent.availability === "offline" && "text-gray-600"
            )}>
              {agent.availability}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Performance:</span>
            <span className="ml-2 font-medium">{agent.performanceRating}/5</span>
          </div>
          <div>
            <span className="text-muted-foreground">Experience:</span>
            <span className="ml-2 font-medium">{agent.experience} years</span>
          </div>
          <div>
            <span className="text-muted-foreground">Role:</span>
            <span className="ml-2 font-medium capitalize">{agent.role}</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[400px] p-4">
          <div className="space-y-4">
            {communications.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <p>No messages yet. Start a conversation!</p>
              </div>
            ) : (
              communications.map((comm) => {
                const isFromCurrentUser = comm.fromAgentId === currentUser.id;
                const isTeamMessage = !comm.toAgentId;
                
                return (
                  <div
                    key={comm.id}
                    className={cn(
                      "flex gap-3",
                      isFromCurrentUser && "flex-row-reverse"
                    )}
                  >
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarFallback className="text-xs">
                        {isFromCurrentUser ? currentUser.name[0] : agent.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className={cn(
                      "max-w-[70%] space-y-1",
                      isFromCurrentUser && "items-end"
                    )}>
                      <div className={cn(
                        "rounded-lg px-3 py-2 text-sm",
                        isFromCurrentUser 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted text-foreground"
                      )}>
                        {comm.content}
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{formatTime(comm.timestamp)}</span>
                        {comm.type !== "message" && (
                          <Badge variant="outline" className="text-xs">
                            {comm.type.replace('-', ' ')}
                          </Badge>
                        )}
                        {isTeamMessage && (
                          <Badge variant="outline" className="text-xs">
                            Team
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
      </CardContent>

      {/* Message Input */}
      <div className="p-4 border-t space-y-3">
        <div className="flex gap-2">
          <Button
            variant={messageType === "message" ? "default" : "outline"}
            size="sm"
            onClick={() => setMessageType("message")}
          >
            Message
          </Button>
          <Button
            variant={messageType === "task-assignment" ? "default" : "outline"}
            size="sm"
            onClick={() => setMessageType("task-assignment")}
          >
            Task
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Textarea
            placeholder={
              messageType === "message" 
                ? "Type a message..." 
                : "Assign a task..."
            }
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="min-h-[60px] resize-none"
          />
          
          <div className="flex flex-col gap-2">
            <Button variant="outline" size="sm">
              <Paperclip className="w-4 h-4" />
            </Button>
            <Button 
              size="sm"
              onClick={handleSendMessage}
              disabled={!message.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
