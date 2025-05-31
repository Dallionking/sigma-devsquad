
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MessageSquare, 
  Search, 
  Send, 
  Paperclip, 
  Phone, 
  Video, 
  Plus,
  History,
  Filter,
  File,
  Image as ImageIcon,
  Download,
  Calendar
} from "lucide-react";
import { useAgents } from "@/contexts/AgentContext";
import { useMessages } from "@/contexts/MessageContext";
import { useTasks } from "@/contexts/TaskContext";
import { useToast } from "@/hooks/use-toast";

export const UnifiedChatInterface = () => {
  const [activeView, setActiveView] = useState<"chat" | "history" | "tasks">("chat");
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { agents } = useAgents();
  const { messages, addMessage } = useMessages();
  const { addTask } = useTasks();
  const { toast } = useToast();

  // Task form state
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "medium" as "low" | "medium" | "high" | "critical",
    dueDate: ""
  });

  const getAvailableAgents = () => {
    return agents.filter(agent => agent.status === "active" || agent.status === "idle");
  };

  const getConversation = () => {
    if (!selectedAgent) return [];
    return messages.filter(msg => 
      (msg.from === selectedAgent && msg.to === "current-user") ||
      (msg.from === "current-user" && msg.to === selectedAgent)
    ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  };

  const getFilteredMessages = () => {
    return messages.filter(msg => {
      if (searchQuery && !msg.content.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      return true;
    }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [getConversation()]);

  const handleSendMessage = () => {
    if (!message.trim() || !selectedAgent) return;

    addMessage({
      from: "current-user",
      to: selectedAgent,
      content: message,
      type: "direct"
    });

    setMessage("");
    
    // Simulate agent response
    setIsTyping(true);
    setTimeout(() => {
      addMessage({
        from: selectedAgent,
        to: "current-user",
        content: `Thanks for your message! I'll help you with that right away.`,
        type: "direct"
      });
      setIsTyping(false);
    }, 2000);
  };

  const handleSubmitTask = () => {
    if (!taskData.title || !selectedAgent) {
      toast({
        title: "Missing Information",
        description: "Please fill in the title and select an agent",
        variant: "destructive"
      });
      return;
    }

    addTask({
      title: taskData.title,
      description: taskData.description,
      assignedAgent: selectedAgent,
      priority: taskData.priority,
      status: "pending",
      deadline: taskData.dueDate,
      dueDate: taskData.dueDate,
      category: "general"
    });

    // Send message about task assignment
    addMessage({
      from: "current-user",
      to: selectedAgent,
      content: `New task assigned: ${taskData.title}`,
      type: "task_assignment",
      metadata: { taskId: `task_${Date.now()}` }
    });

    toast({
      title: "Task Assigned",
      description: `Task "${taskData.title}" has been assigned to ${getAgentName(selectedAgent)}`,
    });

    setTaskData({ title: "", description: "", priority: "medium", dueDate: "" });
    setShowTaskForm(false);
    setActiveView("chat");
  };

  const getAgentName = (agentId: string) => {
    if (agentId === "current-user") return "You";
    const agent = agents.find(a => a.id === agentId);
    return agent?.name || agentId;
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
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

  const getMessageTypeIcon = (type: string) => {
    switch (type) {
      case "file_share":
        return <File className="w-4 h-4" />;
      case "task_assignment":
        return <Calendar className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  return (
    <div className="h-full flex">
      {/* Agent Sidebar */}
      <div className="w-80 border-r bg-muted/20">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5" />
            <h2 className="font-semibold">Agent Communication</h2>
          </div>
          
          <div className="flex gap-1 mb-4">
            <Button
              variant={activeView === "chat" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveView("chat")}
              className="flex-1"
            >
              Chat
            </Button>
            <Button
              variant={activeView === "history" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveView("history")}
              className="flex-1"
            >
              <History className="w-4 h-4 mr-1" />
              History
            </Button>
            <Button
              variant={activeView === "tasks" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveView("tasks")}
              className="flex-1"
            >
              <Plus className="w-4 h-4 mr-1" />
              Task
            </Button>
          </div>

          {activeView === "history" && (
            <div className="relative mb-4">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          )}
        </div>

        <ScrollArea className="h-[calc(100%-140px)]">
          <div className="p-4 space-y-2">
            {getAvailableAgents().map(agent => (
              <div
                key={agent.id}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedAgent === agent.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
                onClick={() => setSelectedAgent(agent.id)}
              >
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={agent.avatar} />
                    <AvatarFallback>
                      {agent.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{agent.name}</p>
                  <p className="text-sm opacity-70 truncate">
                    {agent.specialization.replace(/-/g, ' ')}
                  </p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {agent.status}
                </Badge>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {selectedAgent ? (
          <>
            {/* Header */}
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={agents.find(a => a.id === selectedAgent)?.avatar} />
                    <AvatarFallback>
                      {getAgentName(selectedAgent)[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{getAgentName(selectedAgent)}</h3>
                    <p className="text-sm text-muted-foreground">Online</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowTaskForm(!showTaskForm)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages/History/Tasks Content */}
            <div className="flex-1 overflow-hidden">
              {activeView === "chat" && (
                <>
                  <ScrollArea className="h-[calc(100%-140px)] p-4">
                    <div className="space-y-4">
                      {getConversation().map((msg) => {
                        const isFromUser = msg.from === "current-user";
                        return (
                          <div
                            key={msg.id}
                            className={`flex gap-3 ${isFromUser ? "flex-row-reverse" : ""}`}
                          >
                            <Avatar className="w-8 h-8 flex-shrink-0">
                              <AvatarFallback className="text-xs">
                                {isFromUser ? "U" : getAgentName(selectedAgent)[0]}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div className={`max-w-[70%] ${isFromUser ? "items-end" : ""}`}>
                              <div
                                className={`rounded-lg px-3 py-2 text-sm ${
                                  isFromUser
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-foreground"
                                }`}
                              >
                                {msg.type === "task_assignment" ? (
                                  <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{msg.content}</span>
                                  </div>
                                ) : (
                                  msg.content
                                )}
                              </div>
                              
                              <div className="text-xs text-muted-foreground mt-1">
                                {formatTime(msg.timestamp)}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      
                      {isTyping && (
                        <div className="flex gap-3">
                          <Avatar className="w-8 h-8 flex-shrink-0">
                            <AvatarFallback className="text-xs">{getAgentName(selectedAgent)[0]}</AvatarFallback>
                          </Avatar>
                          <div className="bg-muted rounded-lg px-3 py-2 text-sm">
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  {/* Message Input */}
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Textarea
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        className="min-h-[60px] resize-none"
                        rows={2}
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
                </>
              )}

              {activeView === "history" && (
                <ScrollArea className="h-full p-4">
                  <div className="space-y-4">
                    {getFilteredMessages().map((msg) => (
                      <Card key={msg.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="text-xs">
                                {getAgentName(msg.from)[0]}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-sm">
                                  {getAgentName(msg.from)}
                                </span>
                                <span className="text-muted-foreground">→</span>
                                <span className="text-muted-foreground text-sm">
                                  {getAgentName(msg.to)}
                                </span>
                                <span className="text-xs text-muted-foreground ml-auto">
                                  {formatDate(msg.timestamp)}
                                </span>
                              </div>
                              
                              <div className="flex items-start gap-2">
                                {getMessageTypeIcon(msg.type)}
                                <p className="text-sm">{msg.content}</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              )}

              {activeView === "tasks" && (
                <div className="p-4 space-y-4">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Task Title</label>
                      <Input
                        placeholder="Enter task title"
                        value={taskData.title}
                        onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Description</label>
                      <Textarea
                        placeholder="Describe the task..."
                        value={taskData.description}
                        onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Priority</label>
                        <Select value={taskData.priority} onValueChange={(value: any) => setTaskData({ ...taskData, priority: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low Priority</SelectItem>
                            <SelectItem value="medium">Medium Priority</SelectItem>
                            <SelectItem value="high">High Priority</SelectItem>
                            <SelectItem value="critical">Critical</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Due Date</label>
                        <Input
                          type="datetime-local"
                          value={taskData.dueDate}
                          onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={handleSubmitTask} className="flex-1">
                        <Send className="w-4 h-4 mr-2" />
                        Assign Task
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setTaskData({ title: "", description: "", priority: "medium", dueDate: "" })}
                      >
                        Clear
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Select an agent to start</h3>
              <p className="text-muted-foreground">
                Choose an agent from the sidebar to begin communicating, view history, or assign tasks
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
