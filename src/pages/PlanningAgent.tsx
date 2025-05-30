
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Search, 
  Brain, 
  FileText, 
  Layers, 
  BarChart3,
  Send,
  Paperclip,
  Bot,
  User
} from "lucide-react";
import { ContextPanel } from "@/components/planning-agent/ContextPanel";
import { FeatureBreakdown } from "@/components/planning-agent/FeatureBreakdown";
import { PatternAnalysisDashboard } from "@/components/planning-agent/PatternAnalysisDashboard";
import { mockMessages, mockAgents } from "@/data/mockData";

const PlanningAgent = () => {
  const [selectedProject, setSelectedProject] = useState("ai-workforce");
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      type: "assistant",
      content: "Hello! I'm your Planning Agent. I can help you break down requirements, create project plans, and generate PRDs. What would you like to work on today?",
      timestamp: new Date().toISOString()
    }
  ]);

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    const userMessage = {
      id: chatHistory.length + 1,
      type: "user",
      content: chatMessage,
      timestamp: new Date().toISOString()
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    setChatMessage("");
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: chatHistory.length + 2,
        type: "assistant", 
        content: "I understand you want to work on that feature. Let me analyze the requirements and create a detailed breakdown for you.",
        timestamp: new Date().toISOString()
      };
      setChatHistory(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Planning Agent</h1>
          <p className="text-muted-foreground">
            Intelligent project planning and requirement analysis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Context Panel - Fixed on the right */}
          <div className="lg:col-span-1 order-2 lg:order-2">
            <ContextPanel selectedProject={selectedProject} />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 order-1 lg:order-1">
            <Tabs defaultValue="chat" className="space-y-6">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="chat" className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat</span>
                </TabsTrigger>
                <TabsTrigger value="research" className="flex items-center space-x-2">
                  <Search className="w-4 h-4" />
                  <span>Research</span>
                </TabsTrigger>
                <TabsTrigger value="prd" className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>PRD</span>
                </TabsTrigger>
                <TabsTrigger value="breakdown" className="flex items-center space-x-2">
                  <Layers className="w-4 h-4" />
                  <span>Breakdown</span>
                </TabsTrigger>
                <TabsTrigger value="workflow" className="flex items-center space-x-2">
                  <Brain className="w-4 h-4" />
                  <span>Workflow</span>
                </TabsTrigger>
                <TabsTrigger value="analysis" className="flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4" />
                  <span>Analysis</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="space-y-6">
                <Card className="h-[600px] flex flex-col">
                  <CardHeader className="border-b">
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5" />
                      Planning Assistant
                      <Badge variant="secondary" className="ml-auto">Online</Badge>
                    </CardTitle>
                  </CardHeader>
                  
                  {/* Chat Messages */}
                  <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                    {chatHistory.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.type === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <div className="flex items-start space-x-2">
                            {message.type === "assistant" && (
                              <Bot className="w-4 h-4 mt-1 flex-shrink-0" />
                            )}
                            {message.type === "user" && (
                              <User className="w-4 h-4 mt-1 flex-shrink-0" />
                            )}
                            <div>
                              <p className="text-sm">{message.content}</p>
                              <p className="text-xs opacity-70 mt-1">
                                {new Date(message.timestamp).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  
                  {/* Chat Input */}
                  <div className="border-t p-4">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Type your message..."
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button variant="outline" size="sm">
                        <Paperclip className="w-4 h-4" />
                      </Button>
                      <Button onClick={handleSendMessage} size="sm">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="research" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Search className="w-5 h-5" />
                      Research Integration
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Input placeholder="Search for market trends, competitors, best practices..." />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="p-4">
                          <h4 className="font-medium mb-2">Market Research</h4>
                          <p className="text-sm text-muted-foreground">
                            Latest trends in AI development workflows
                          </p>
                        </Card>
                        <Card className="p-4">
                          <h4 className="font-medium mb-2">Competitor Analysis</h4>
                          <p className="text-sm text-muted-foreground">
                            Similar tools and their feature sets
                          </p>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="prd" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      PRD Generation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {["Technical Spec", "User Stories", "Feature Requirements"].map((template) => (
                          <Card key={template} className="p-4 hover:shadow-md cursor-pointer transition-shadow">
                            <h4 className="font-medium">{template}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Generate {template.toLowerCase()} document
                            </p>
                          </Card>
                        ))}
                      </div>
                      <Button>Generate PRD</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="breakdown" className="space-y-6">
                <div className="relative">
                  <FeatureBreakdown />
                </div>
              </TabsContent>

              <TabsContent value="workflow" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="w-5 h-5" />
                      Workflow Visualization
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Interactive workflow graph with timeline and decision points
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analysis" className="space-y-6">
                <PatternAnalysisDashboard messages={mockMessages} agents={mockAgents} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanningAgent;
