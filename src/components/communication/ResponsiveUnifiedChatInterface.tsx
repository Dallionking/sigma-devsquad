
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
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useAgents } from "@/contexts/AgentContext";
import { useMessages } from "@/contexts/MessageContext";
import { useTasks } from "@/contexts/TaskContext";
import { useToast } from "@/hooks/use-toast";
import { useResponsiveBreakpoints } from "@/hooks/useResponsiveBreakpoints";
import { ResponsiveText } from "./ResponsiveText";
import { TouchGestureProvider } from "@/components/settings/TouchGestureProvider";
import { cn } from "@/lib/utils";

export const ResponsiveUnifiedChatInterface = () => {
  const [activeView, setActiveView] = useState<"chat" | "history" | "tasks">("chat");
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { agents } = useAgents();
  const { messages, addMessage } = useMessages();
  const { addTask } = useTasks();
  const { toast } = useToast();
  const { isMobile, isTablet, isDesktop, current } = useResponsiveBreakpoints();

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

  // Auto-close sidebar on mobile when agent is selected
  useEffect(() => {
    if (selectedAgent && isMobile) {
      setIsSidebarOpen(false);
    }
  }, [selectedAgent, isMobile]);

  // Touch gesture handlers
  const handleSwipeLeft = () => {
    if (isMobile && !isSidebarOpen) {
      setIsSidebarOpen(true);
    }
  };

  const handleSwipeRight = () => {
    if (isMobile && isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  const handlePullToRefresh = () => {
    // Simulate refresh action
    toast({
      title: "Refreshing",
      description: "Updating conversation...",
    });
  };

  // Enhanced touch handlers for message input
  const handleMessageTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleMessageTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY !== null) {
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      
      // Pull down to refresh (swipe down from top)
      if (deltaY < -50 && touchStartY < 100) {
        handlePullToRefresh();
      }
    }
    setTouchStartY(null);
  };

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

  return (
    <TouchGestureProvider
      onSwipeLeft={handleSwipeLeft}
      onSwipeRight={handleSwipeRight}
      className="h-full"
    >
      <div className="h-full flex flex-col lg:flex-row bg-background">
        {/* Mobile sidebar backdrop */}
        {isMobile && isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 touch-manipulation"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Agent Sidebar */}
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

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Mobile header with menu toggle */}
          {isMobile && !isSidebarOpen && (
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

          {selectedAgent ? (
            <>
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

              {/* Messages/History/Tasks Content */}
              <div className="flex-1 flex flex-col min-h-0">
                {activeView === "chat" && (
                  <>
                    {/* Messages Area with touch enhancements */}
                    <ScrollArea className="flex-1">
                      <div 
                        className="p-3 sm:p-4 space-y-3 sm:space-y-4"
                        onTouchStart={handleMessageTouchStart}
                        onTouchEnd={handleMessageTouchEnd}
                      >
                        {getConversation().map((msg) => {
                          const isFromUser = msg.from === "current-user";
                          return (
                            <div
                              key={msg.id}
                              className={cn(
                                "flex gap-2 sm:gap-3 touch-manipulation",
                                isFromUser ? "flex-row-reverse" : ""
                              )}
                            >
                              <Avatar className="w-6 h-6 sm:w-8 sm:h-8 shrink-0">
                                <AvatarFallback className="text-responsive-xs">
                                  {isFromUser ? "U" : getAgentName(selectedAgent)[0]}
                                </AvatarFallback>
                              </Avatar>
                              
                              <div className={cn(
                                "max-w-[85%] sm:max-w-[75%] min-w-0",
                                isFromUser ? "items-end" : ""
                              )}>
                                <div
                                  className={cn(
                                    "rounded-lg px-3 py-2 break-words-mobile min-h-[44px] flex items-center",
                                    "touch-manipulation active:scale-[0.98] transition-transform duration-100",
                                    isFromUser
                                      ? "bg-primary text-primary-foreground"
                                      : "bg-muted text-foreground"
                                  )}
                                >
                                  {msg.type === "task_assignment" ? (
                                    <div className="flex items-center gap-2">
                                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                                      <ResponsiveText 
                                        variant="small" 
                                        className="min-w-0 contrast-enhanced"
                                      >
                                        {msg.content}
                                      </ResponsiveText>
                                    </div>
                                  ) : (
                                    <ResponsiveText 
                                      variant="small" 
                                      className="contrast-enhanced"
                                    >
                                      {msg.content}
                                    </ResponsiveText>
                                  )}
                                </div>
                                
                                <ResponsiveText 
                                  variant="muted" 
                                  className="mt-1 contrast-enhanced-muted"
                                >
                                  {formatTime(msg.timestamp)}
                                </ResponsiveText>
                              </div>
                            </div>
                          );
                        })}
                        
                        {isTyping && (
                          <div className="flex gap-2 sm:gap-3">
                            <Avatar className="w-6 h-6 sm:w-8 sm:h-8 shrink-0">
                              <AvatarFallback className="text-responsive-xs">
                                {getAgentName(selectedAgent)[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div className="bg-muted rounded-lg px-3 py-2 min-h-[44px] flex items-center">
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

                    {/* Message Input - Enhanced for touch */}
                    <div className="p-3 sm:p-4 border-t bg-background shrink-0 mobile-safe-area">
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
                          className="min-h-[60px] resize-none text-responsive-sm flex-1 no-zoom touch-manipulation"
                          rows={2}
                        />
                        
                        <div className="flex flex-col gap-2 shrink-0">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="px-2 btn-mobile min-h-[44px] min-w-[44px] touch-manipulation active:scale-95"
                          >
                            <Paperclip className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            onClick={handleSendMessage}
                            disabled={!message.trim()}
                            className="px-2 btn-mobile min-h-[44px] min-w-[44px] touch-manipulation active:scale-95 disabled:opacity-50"
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* History View - Enhanced for touch */}
                {activeView === "history" && (
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
                )}

                {/* Task Creation View - Enhanced for touch */}
                {activeView === "tasks" && (
                  <div className="p-3 sm:p-4 space-y-4 overflow-y-auto mobile-safe-area">
                    <div className="space-y-4">
                      <div>
                        <ResponsiveText 
                          variant="default" 
                          className="font-weight-responsive mb-2 block contrast-enhanced"
                        >
                          Task Title
                        </ResponsiveText>
                        <Input
                          placeholder="Enter task title"
                          value={taskData.title}
                          onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                          className="text-responsive-sm no-zoom min-h-[44px] touch-manipulation"
                        />
                      </div>

                      <div>
                        <ResponsiveText 
                          variant="default" 
                          className="font-weight-responsive mb-2 block contrast-enhanced"
                        >
                          Description
                        </ResponsiveText>
                        <Textarea
                          placeholder="Describe the task..."
                          value={taskData.description}
                          onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                          rows={3}
                          className="text-responsive-sm no-zoom min-h-[60px] touch-manipulation"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <ResponsiveText 
                            variant="default" 
                            className="font-weight-responsive mb-2 block contrast-enhanced"
                          >
                            Priority
                          </ResponsiveText>
                          <Select value={taskData.priority} onValueChange={(value: any) => setTaskData({ ...taskData, priority: value })}>
                            <SelectTrigger className="text-responsive-sm min-h-[44px] touch-manipulation">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="z-50 bg-background border shadow-lg">
                              <SelectItem value="low">Low Priority</SelectItem>
                              <SelectItem value="medium">Medium Priority</SelectItem>
                              <SelectItem value="high">High Priority</SelectItem>
                              <SelectItem value="critical">Critical</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <ResponsiveText 
                            variant="default" 
                            className="font-weight-responsive mb-2 block contrast-enhanced"
                          >
                            Due Date
                          </ResponsiveText>
                          <Input
                            type="datetime-local"
                            value={taskData.dueDate}
                            onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
                            className="text-responsive-sm no-zoom min-h-[44px] touch-manipulation"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button 
                          onClick={handleSubmitTask} 
                          className="flex-1 text-responsive-sm btn-mobile min-h-[48px] touch-manipulation active:scale-95"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Assign Task
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setTaskData({ title: "", description: "", priority: "medium", dueDate: "" })}
                          className="text-responsive-sm btn-mobile min-h-[48px] touch-manipulation active:scale-95"
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
                <MessageSquare className="mx-auto text-muted-foreground mb-4 w-8 h-8 sm:w-12 sm:h-12" />
                <ResponsiveText 
                  variant="heading" 
                  className="mb-2 text-high-contrast"
                >
                  Select an agent to start
                </ResponsiveText>
                <ResponsiveText 
                  variant="muted" 
                  className="contrast-enhanced-muted"
                >
                  Choose an agent from the sidebar to begin communicating, view history, or assign tasks
                </ResponsiveText>
                {isMobile && (
                  <Button
                    variant="outline"
                    onClick={() => setIsSidebarOpen(true)}
                    className="mt-4 btn-mobile min-h-[48px] touch-manipulation active:scale-95"
                  >
                    <Menu className="w-4 h-4 mr-2" />
                    Open Agent List
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </TouchGestureProvider>
  );
};
