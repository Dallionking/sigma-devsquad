
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  Calendar,
  Menu,
  X
} from "lucide-react";
import { useAgents } from "@/contexts/AgentContext";
import { useMessages } from "@/contexts/MessageContext";
import { useTasks } from "@/contexts/TaskContext";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export const ResponsiveUnifiedChatInterface = () => {
  const [activeView, setActiveView] = useState<"chat" | "history" | "tasks">("chat");
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { agents } = useAgents();
  const { messages, addMessage } = useMessages();
  const { addTask } = useTasks();
  const { toast } = useToast();
  const isMobile = useIsMobile();

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

  // Responsive breakpoint classes
  const containerClasses = cn(
    "h-full flex",
    // Mobile breakpoints
    "flex-col xs:flex-col sm-mobile:flex-col lg-mobile:flex-col",
    // Tablet breakpoints  
    "md:flex-row lg:flex-row",
    // Desktop breakpoints
    "xl:flex-row 2xl:flex-row"
  );

  const sidebarClasses = cn(
    // Mobile: Full width when open, hidden when closed
    "w-full h-full absolute inset-0 z-50 bg-background transform transition-transform duration-300",
    !isSidebarOpen && "xs:-translate-x-full sm-mobile:-translate-x-full lg-mobile:-translate-x-full",
    // Tablet: Side panel
    "md:relative md:w-80 md:h-auto md:transform-none md:z-auto",
    "lg:w-80",
    // Desktop: Fixed width sidebar
    "xl:w-96 2xl:w-[400px]",
    "md:border-r md:bg-muted/20"
  );

  const mainContentClasses = cn(
    "flex-1 flex flex-col min-h-0",
    // Adjust for mobile overlay
    isMobile && isSidebarOpen && "hidden",
    // Normal flow for larger screens
    "md:flex"
  );

  const headerClasses = cn(
    "p-3 border-b",
    // Mobile responsive padding
    "xs:p-2 sm-mobile:p-3 lg-mobile:p-4",
    // Tablet and desktop
    "md:p-4 lg:p-4 xl:p-6"
  );

  const messageListClasses = cn(
    "h-full p-3 space-y-3",
    // Mobile spacing adjustments
    "xs:p-2 xs:space-y-2",
    "sm-mobile:p-3 sm-mobile:space-y-3", 
    "lg-mobile:p-4 lg-mobile:space-y-4",
    // Tablet and desktop
    "md:p-4 md:space-y-4",
    "lg:p-4 lg:space-y-4",
    "xl:p-6 xl:space-y-6"
  );

  const inputAreaClasses = cn(
    "p-3 border-t",
    // Mobile responsive padding
    "xs:p-2 sm-mobile:p-3 lg-mobile:p-4",
    // Tablet and desktop  
    "md:p-4 lg:p-4 xl:p-6"
  );

  return (
    <div className={containerClasses}>
      {/* Mobile sidebar backdrop */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Agent Sidebar */}
      <div className={sidebarClasses}>
        <div className={headerClasses}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              <h2 className={cn(
                "font-semibold",
                // Responsive text sizing
                "text-sm xs:text-sm sm-mobile:text-base lg-mobile:text-lg",
                "md:text-base lg:text-lg xl:text-xl"
              )}>
                Agent Communication
              </h2>
            </div>
            
            {isMobile && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen(false)}
                className="touch-target"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          <div className={cn(
            "flex gap-1 mb-4",
            // Stack on very small screens
            "xs:flex-col xs:gap-2",
            "sm-mobile:flex-row sm-mobile:gap-1",
            "md:flex-row"
          )}>
            <Button
              variant={activeView === "chat" ? "default" : "outline"}
              size={isMobile ? "sm" : "default"}
              onClick={() => setActiveView("chat")}
              className={cn(
                "flex-1 text-xs",
                "sm-mobile:text-sm md:text-sm"
              )}
            >
              Chat
            </Button>
            <Button
              variant={activeView === "history" ? "default" : "outline"}
              size={isMobile ? "sm" : "default"}
              onClick={() => setActiveView("history")}
              className={cn(
                "flex-1 text-xs",
                "sm-mobile:text-sm md:text-sm"
              )}
            >
              <History className="w-3 h-3 mr-1 sm-mobile:w-4 sm-mobile:h-4" />
              History
            </Button>
            <Button
              variant={activeView === "tasks" ? "default" : "outline"}
              size={isMobile ? "sm" : "default"}
              onClick={() => setActiveView("tasks")}
              className={cn(
                "flex-1 text-xs",
                "sm-mobile:text-sm md:text-sm"
              )}
            >
              <Plus className="w-3 h-3 mr-1 sm-mobile:w-4 sm-mobile:h-4" />
              Task
            </Button>
          </div>

          {activeView === "history" && (
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  "pl-10",
                  // Responsive input sizing
                  "text-sm xs:text-xs sm-mobile:text-sm",
                  "h-8 xs:h-8 sm-mobile:h-9 md:h-10"
                )}
              />
            </div>
          )}
        </div>

        <ScrollArea className={cn(
          "flex-1",
          // Adjust height calculations for different screen sizes
          "h-[calc(100vh-200px)] xs:h-[calc(100vh-180px)]",
          "md:h-[calc(100vh-220px)] xl:h-[calc(100vh-240px)]"
        )}>
          <div className={cn(
            "p-3 space-y-2",
            "xs:p-2 xs:space-y-1",
            "sm-mobile:p-3 sm-mobile:space-y-2",
            "md:p-4 md:space-y-2"
          )}>
            {getAvailableAgents().map(agent => (
              <div
                key={agent.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors",
                  // Responsive padding and spacing
                  "xs:gap-2 xs:p-2",
                  "sm-mobile:gap-3 sm-mobile:p-3",
                  "md:gap-3 md:p-3",
                  selectedAgent === agent.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                )}
                onClick={() => setSelectedAgent(agent.id)}
              >
                <div className="relative">
                  <Avatar className={cn(
                    "w-10 h-10",
                    "xs:w-8 xs:h-8",
                    "sm-mobile:w-10 sm-mobile:h-10"
                  )}>
                    <AvatarImage src={agent.avatar} />
                    <AvatarFallback className={cn(
                      "text-sm",
                      "xs:text-xs sm-mobile:text-sm"
                    )}>
                      {agent.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "font-medium truncate",
                    "text-sm xs:text-xs sm-mobile:text-sm"
                  )}>
                    {agent.name}
                  </p>
                  <p className={cn(
                    "opacity-70 truncate",
                    "text-xs xs:text-xs sm-mobile:text-xs"
                  )}>
                    {agent.specialization.replace(/-/g, ' ')}
                  </p>
                </div>
                <Badge variant="secondary" className={cn(
                  "text-xs",
                  "xs:text-xs xs:px-1 xs:py-0",
                  "sm-mobile:text-xs"
                )}>
                  {agent.status}
                </Badge>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className={mainContentClasses}>
        {/* Mobile header with menu toggle */}
        {isMobile && !isSidebarOpen && (
          <div className="flex items-center justify-between p-3 border-b">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(true)}
              className="touch-target"
            >
              <Menu className="w-4 h-4" />
            </Button>
            <h1 className="text-lg font-semibold">Communication</h1>
            <div className="w-10" /> {/* Spacer for centering */}
          </div>
        )}

        {selectedAgent ? (
          <>
            {/* Header */}
            <div className={headerClasses}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <Avatar className={cn(
                    "w-10 h-10 flex-shrink-0",
                    "xs:w-8 xs:h-8 sm-mobile:w-10 sm-mobile:h-10"
                  )}>
                    <AvatarImage src={agents.find(a => a.id === selectedAgent)?.avatar} />
                    <AvatarFallback className="text-sm xs:text-xs">
                      {getAgentName(selectedAgent)[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <h3 className={cn(
                      "font-medium truncate",
                      "text-base xs:text-sm sm-mobile:text-base"
                    )}>
                      {getAgentName(selectedAgent)}
                    </h3>
                    <p className={cn(
                      "text-muted-foreground",
                      "text-sm xs:text-xs sm-mobile:text-sm"
                    )}>
                      Online
                    </p>
                  </div>
                </div>
                
                <div className={cn(
                  "flex items-center gap-2 flex-shrink-0",
                  "xs:gap-1 sm-mobile:gap-2"
                )}>
                  <Button variant="outline" size="sm" className="xs:px-2">
                    <Phone className="w-4 h-4 xs:w-3 xs:h-3" />
                  </Button>
                  <Button variant="outline" size="sm" className="xs:px-2">
                    <Video className="w-4 h-4 xs:w-3 xs:h-3" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowTaskForm(!showTaskForm)}
                    className="xs:px-2"
                  >
                    <Plus className="w-4 h-4 xs:w-3 xs:h-3" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages/History/Tasks Content */}
            <div className="flex-1 overflow-hidden">
              {activeView === "chat" && (
                <>
                  <ScrollArea className={cn(
                    "h-[calc(100%-120px)]",
                    "xs:h-[calc(100%-100px)]",
                    "md:h-[calc(100%-140px)]"
                  )}>
                    <div className={messageListClasses}>
                      {getConversation().map((msg) => {
                        const isFromUser = msg.from === "current-user";
                        return (
                          <div
                            key={msg.id}
                            className={cn(
                              "flex gap-3",
                              "xs:gap-2 sm-mobile:gap-3",
                              isFromUser ? "flex-row-reverse" : ""
                            )}
                          >
                            <Avatar className={cn(
                              "w-8 h-8 flex-shrink-0",
                              "xs:w-6 xs:h-6 sm-mobile:w-8 sm-mobile:h-8"
                            )}>
                              <AvatarFallback className={cn(
                                "text-xs",
                                "xs:text-xs sm-mobile:text-xs"
                              )}>
                                {isFromUser ? "U" : getAgentName(selectedAgent)[0]}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div className={cn(
                              "max-w-[70%] min-w-0",
                              // Adjust max width for small screens
                              "xs:max-w-[80%] sm-mobile:max-w-[75%]",
                              isFromUser ? "items-end" : ""
                            )}>
                              <div
                                className={cn(
                                  "rounded-lg px-3 py-2",
                                  // Responsive padding and text
                                  "xs:px-2 xs:py-1 xs:text-xs",
                                  "sm-mobile:px-3 sm-mobile:py-2 sm-mobile:text-sm",
                                  "text-sm md:text-sm",
                                  isFromUser
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-foreground"
                                )}
                              >
                                {msg.type === "task_assignment" ? (
                                  <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 xs:w-3 xs:h-3 flex-shrink-0" />
                                    <span className="min-w-0 break-words">{msg.content}</span>
                                  </div>
                                ) : (
                                  <span className="break-words">{msg.content}</span>
                                )}
                              </div>
                              
                              <div className={cn(
                                "text-muted-foreground mt-1",
                                "text-xs xs:text-xs"
                              )}>
                                {formatTime(msg.timestamp)}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      
                      {isTyping && (
                        <div className={cn(
                          "flex gap-3",
                          "xs:gap-2 sm-mobile:gap-3"
                        )}>
                          <Avatar className={cn(
                            "w-8 h-8 flex-shrink-0",
                            "xs:w-6 xs:h-6 sm-mobile:w-8 sm-mobile:h-8"
                          )}>
                            <AvatarFallback className="text-xs">
                              {getAgentName(selectedAgent)[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className={cn(
                            "bg-muted rounded-lg px-3 py-2",
                            "xs:px-2 xs:py-1 sm-mobile:px-3 sm-mobile:py-2"
                          )}>
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
                  <div className={inputAreaClasses}>
                    <div className={cn(
                      "flex gap-2",
                      "xs:gap-1 sm-mobile:gap-2"
                    )}>
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
                        className={cn(
                          "min-h-[60px] resize-none",
                          "xs:min-h-[50px] xs:text-sm",
                          "sm-mobile:min-h-[60px] sm-mobile:text-sm"
                        )}
                        rows={isMobile ? 2 : 2}
                      />
                      
                      <div className={cn(
                        "flex flex-col gap-2 flex-shrink-0",
                        "xs:gap-1 sm-mobile:gap-2"
                      )}>
                        <Button variant="outline" size="sm" className="xs:px-2">
                          <Paperclip className="w-4 h-4 xs:w-3 xs:h-3" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={handleSendMessage}
                          disabled={!message.trim()}
                          className="xs:px-2"
                        >
                          <Send className="w-4 h-4 xs:w-3 xs:h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* History and Tasks views with similar responsive treatment */}
              {activeView === "history" && (
                <ScrollArea className="h-full">
                  <div className={messageListClasses}>
                    {getFilteredMessages().map((msg) => (
                      <Card key={msg.id} className="hover:shadow-md transition-shadow">
                        <CardContent className={cn(
                          "p-4",
                          "xs:p-3 sm-mobile:p-4"
                        )}>
                          <div className={cn(
                            "flex items-start gap-3",
                            "xs:gap-2 sm-mobile:gap-3"
                          )}>
                            <Avatar className={cn(
                              "w-8 h-8 flex-shrink-0",
                              "xs:w-6 xs:h-6 sm-mobile:w-8 sm-mobile:h-8"
                            )}>
                              <AvatarFallback className="text-xs">
                                {getAgentName(msg.from)[0]}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1 min-w-0">
                              <div className={cn(
                                "flex items-center gap-2 mb-1 flex-wrap",
                                "xs:gap-1 sm-mobile:gap-2"
                              )}>
                                <span className={cn(
                                  "font-medium truncate",
                                  "text-sm xs:text-xs sm-mobile:text-sm"
                                )}>
                                  {getAgentName(msg.from)}
                                </span>
                                <span className="text-muted-foreground">→</span>
                                <span className={cn(
                                  "text-muted-foreground truncate",
                                  "text-sm xs:text-xs sm-mobile:text-sm"
                                )}>
                                  {getAgentName(msg.to)}
                                </span>
                                <span className={cn(
                                  "text-muted-foreground ml-auto flex-shrink-0",
                                  "text-xs xs:text-xs"
                                )}>
                                  {formatDate(msg.timestamp)}
                                </span>
                              </div>
                              
                              <p className={cn(
                                "break-words",
                                "text-sm xs:text-xs sm-mobile:text-sm"
                              )}>
                                {msg.content}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              )}

              {activeView === "tasks" && (
                <div className={cn(
                  "p-4 space-y-4 overflow-y-auto",
                  "xs:p-3 xs:space-y-3",
                  "sm-mobile:p-4 sm-mobile:space-y-4"
                )}>
                  <div className="space-y-4">
                    <div>
                      <label className={cn(
                        "font-medium mb-2 block",
                        "text-sm xs:text-xs sm-mobile:text-sm"
                      )}>
                        Task Title
                      </label>
                      <Input
                        placeholder="Enter task title"
                        value={taskData.title}
                        onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                        className={cn(
                          "text-sm xs:text-xs sm-mobile:text-sm"
                        )}
                      />
                    </div>

                    <div>
                      <label className={cn(
                        "font-medium mb-2 block",
                        "text-sm xs:text-xs sm-mobile:text-sm"
                      )}>
                        Description
                      </label>
                      <Textarea
                        placeholder="Describe the task..."
                        value={taskData.description}
                        onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                        rows={3}
                        className={cn(
                          "text-sm xs:text-xs sm-mobile:text-sm"
                        )}
                      />
                    </div>

                    <div className={cn(
                      "grid grid-cols-2 gap-4",
                      "xs:grid-cols-1 xs:gap-3",
                      "sm-mobile:grid-cols-2 sm-mobile:gap-4"
                    )}>
                      <div>
                        <label className={cn(
                          "font-medium mb-2 block",
                          "text-sm xs:text-xs sm-mobile:text-sm"
                        )}>
                          Priority
                        </label>
                        <Select value={taskData.priority} onValueChange={(value: any) => setTaskData({ ...taskData, priority: value })}>
                          <SelectTrigger className={cn(
                            "text-sm xs:text-xs sm-mobile:text-sm"
                          )}>
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
                        <label className={cn(
                          "font-medium mb-2 block",
                          "text-sm xs:text-xs sm-mobile:text-sm"
                        )}>
                          Due Date
                        </label>
                        <Input
                          type="datetime-local"
                          value={taskData.dueDate}
                          onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
                          className={cn(
                            "text-sm xs:text-xs sm-mobile:text-sm"
                          )}
                        />
                      </div>
                    </div>

                    <div className={cn(
                      "flex gap-2",
                      "xs:flex-col xs:gap-2",
                      "sm-mobile:flex-row sm-mobile:gap-2"
                    )}>
                      <Button onClick={handleSubmitTask} className={cn(
                        "flex-1",
                        "text-sm xs:text-xs sm-mobile:text-sm"
                      )}>
                        <Send className="w-4 h-4 mr-2 xs:w-3 xs:h-3" />
                        Assign Task
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setTaskData({ title: "", description: "", priority: "medium", dueDate: "" })}
                        className={cn(
                          "text-sm xs:text-xs sm-mobile:text-sm"
                        )}
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
          <div className="flex items-center justify-center h-full p-6">
            <div className="text-center max-w-md">
              <MessageSquare className={cn(
                "mx-auto text-muted-foreground mb-4",
                "w-12 h-12 xs:w-8 xs:h-8 sm-mobile:w-12 sm-mobile:h-12"
              )} />
              <h3 className={cn(
                "font-medium mb-2",
                "text-lg xs:text-base sm-mobile:text-lg"
              )}>
                Select an agent to start
              </h3>
              <p className={cn(
                "text-muted-foreground",
                "text-sm xs:text-xs sm-mobile:text-sm"
              )}>
                Choose an agent from the sidebar to begin communicating, view history, or assign tasks
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
