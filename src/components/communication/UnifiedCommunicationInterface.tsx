
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  MessageSquare, 
  Search, 
  Users, 
  Send,
  Paperclip,
  Filter,
  Video,
  Phone
} from "lucide-react";
import { DirectMessagePanel } from "./DirectMessagePanel";
import { CommunicationHistory } from "./CommunicationHistory";
import { TaskSubmissionPanel } from "./TaskSubmissionPanel";
import { useAgents } from "@/contexts/AgentContext";
import { useTeams } from "@/contexts/TeamContext";

export const UnifiedCommunicationInterface = () => {
  const [activeTab, setActiveTab] = useState("messages");
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { agents } = useAgents();
  const { teams } = useTeams();

  const handleAgentSelect = (agentId: string) => {
    setSelectedAgent(agentId);
    setActiveTab("direct");
  };

  const getAvailableAgents = () => {
    return agents.filter(agent => agent.status === "active" || agent.status === "idle");
  };

  const getTeamLeads = () => {
    return teams.flatMap(team => 
      team.members?.filter(member => member.role === "lead") || []
    );
  };

  return (
    <div className="h-full flex flex-col">
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Agent Communication Hub
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <div className="px-4 border-b">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="messages">Messages</TabsTrigger>
                <TabsTrigger value="direct">Direct Chat</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="tasks">Submit Task</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="messages" className="h-[calc(100%-60px)] m-0">
              <div className="flex h-full">
                {/* Agent List */}
                <div className="w-1/3 border-r">
                  <div className="p-4 border-b">
                    <h3 className="font-medium mb-3">Available Agents</h3>
                    <div className="space-y-2">
                      {getAvailableAgents().map(agent => (
                        <div
                          key={agent.id}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                          onClick={() => handleAgentSelect(agent.id)}
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
                            <p className="text-sm text-muted-foreground truncate">
                              {agent.specialization.replace(/-/g, ' ')}
                            </p>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {agent.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-medium mb-3">Team Leads</h3>
                    <div className="space-y-2">
                      {getTeamLeads().map(lead => (
                        <div
                          key={lead.id}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                          onClick={() => handleAgentSelect(lead.id)}
                        >
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={lead.avatar} />
                            <AvatarFallback>
                              {lead.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{lead.name}</p>
                            <p className="text-xs text-muted-foreground">Team Lead</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Communication Overview */}
                <div className="flex-1 p-4">
                  <div className="text-center py-12">
                    <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Select an agent to start communicating</h3>
                    <p className="text-muted-foreground">
                      Choose an agent or team lead from the list to begin a direct conversation
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="direct" className="h-[calc(100%-60px)] m-0">
              {selectedAgent ? (
                <DirectMessagePanel agentId={selectedAgent} />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No agent selected</h3>
                    <p className="text-muted-foreground">
                      Select an agent from the Messages tab to start a direct conversation
                    </p>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="history" className="h-[calc(100%-60px)] m-0">
              <CommunicationHistory searchQuery={searchQuery} />
            </TabsContent>

            <TabsContent value="tasks" className="h-[calc(100%-60px)] m-0">
              <TaskSubmissionPanel />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
