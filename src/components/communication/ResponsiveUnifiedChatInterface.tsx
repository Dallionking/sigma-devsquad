
import { useState, useEffect } from "react";
import { useAgents } from "@/contexts/AgentContext";
import { useMessages } from "@/contexts/MessageContext";
import { useTasks } from "@/contexts/TaskContext";
import { useToast } from "@/hooks/use-toast";
import { useResponsiveBreakpoints } from "@/hooks/useResponsiveBreakpoints";
import { TouchGestureProvider } from "@/components/settings/TouchGestureProvider";
import { ChatSidebar } from "./ChatSidebar";
import { ChatHeader } from "./ChatHeader";
import { MessagesList } from "./MessagesList";
import { MessageInput } from "./MessageInput";
import { HistoryView } from "./HistoryView";
import { TaskCreationView } from "./TaskCreationView";
import { EmptyState } from "./EmptyState";

export const ResponsiveUnifiedChatInterface = () => {
  const [activeView, setActiveView] = useState<"chat" | "history" | "tasks">("chat");
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  
  const { agents } = useAgents();
  const { addMessage } = useMessages();
  const { addTask } = useTasks();
  const { toast } = useToast();
  const { isMobile } = useResponsiveBreakpoints();

  // Task form state
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "medium" as "low" | "medium" | "high" | "critical",
    dueDate: ""
  });

  const getAgentName = (agentId: string) => {
    if (agentId === "current-user") return "You";
    const agent = agents.find(a => a.id === agentId);
    return agent?.name || agentId;
  };

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
        <ChatSidebar
          activeView={activeView}
          setActiveView={setActiveView}
          selectedAgent={selectedAgent}
          setSelectedAgent={setSelectedAgent}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          isMobile={isMobile}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-0">
          {selectedAgent ? (
            <>
              <ChatHeader
                selectedAgent={selectedAgent}
                showTaskForm={showTaskForm}
                setShowTaskForm={setShowTaskForm}
                isMobile={isMobile}
                setIsSidebarOpen={!isSidebarOpen ? setIsSidebarOpen : undefined}
              />

              {/* Messages/History/Tasks Content */}
              <div className="flex-1 flex flex-col min-h-0">
                {activeView === "chat" && (
                  <>
                    <MessagesList
                      selectedAgent={selectedAgent}
                      isTyping={isTyping}
                      onTouchStart={handleMessageTouchStart}
                      onTouchEnd={handleMessageTouchEnd}
                    />
                    <MessageInput
                      message={message}
                      setMessage={setMessage}
                      onSendMessage={handleSendMessage}
                    />
                  </>
                )}

                {activeView === "history" && (
                  <HistoryView searchQuery={searchQuery} />
                )}

                {activeView === "tasks" && (
                  <TaskCreationView
                    taskData={taskData}
                    setTaskData={setTaskData}
                    onSubmitTask={handleSubmitTask}
                  />
                )}
              </div>
            </>
          ) : (
            <EmptyState 
              isMobile={isMobile} 
              onOpenSidebar={() => setIsSidebarOpen(true)}
            />
          )}
        </div>
      </div>
    </TouchGestureProvider>
  );
};
