
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Agent } from "@/types";
import { useTeams } from "@/contexts/TeamContext";
import { useMessages } from "@/contexts/MessageContext";
import { 
  MessageSquare, 
  Users, 
  ArrowRight, 
  Filter, 
  Search, 
  Play, 
  Pause,
  RefreshCw,
  TrendingUp,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TeamCommunicationFlowProps {
  agents: Agent[];
}

export const TeamCommunicationFlow = ({ agents }: TeamCommunicationFlowProps) => {
  const { teams, agentProfiles, getTeamCommunications, getTeamMembers } = useTeams();
  const { messages } = useMessages();
  
  const [selectedTeam, setSelectedTeam] = useState<string>("all");
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<string>("24h");
  const [searchTerm, setSearchTerm] = useState("");
  const [isRealTimeActive, setIsRealTimeActive] = useState(true);
  const [messageTypeFilter, setMessageTypeFilter] = useState<string>("all");
  const [filteredCommunications, setFilteredCommunications] = useState<any[]>([]);

  // Real-time update simulation
  useEffect(() => {
    if (!isRealTimeActive) return;

    const interval = setInterval(() => {
      // Simulate real-time updates
      const now = new Date();
      const timeRangeMs = getTimeRangeMs(selectedTimePeriod);
      
      let communications = [];
      
      if (selectedTeam === "all") {
        communications = teams.flatMap(team => getTeamCommunications(team.id));
      } else {
        communications = getTeamCommunications(selectedTeam);
      }

      // Apply time filter
      communications = communications.filter(comm => 
        new Date(comm.timestamp).getTime() > now.getTime() - timeRangeMs
      );

      // Apply message type filter
      if (messageTypeFilter !== "all") {
        communications = communications.filter(comm => comm.type === messageTypeFilter);
      }

      // Apply search filter
      if (searchTerm) {
        communications = communications.filter(comm => 
          comm.content.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredCommunications(communications.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ));
    }, 2000);

    return () => clearInterval(interval);
  }, [isRealTimeActive, selectedTeam, selectedTimePeriod, searchTerm, messageTypeFilter, teams, getTeamCommunications]);

  const getTimeRangeMs = (range: string) => {
    switch (range) {
      case "1h": return 60 * 60 * 1000;
      case "24h": return 24 * 60 * 60 * 1000;
      case "7d": return 7 * 24 * 60 * 60 * 1000;
      case "30d": return 30 * 24 * 60 * 60 * 1000;
      default: return 24 * 60 * 60 * 1000;
    }
  };

  const getCommunicationStats = () => {
    const now = new Date();
    const timeRangeMs = getTimeRangeMs(selectedTimePeriod);
    
    const recentComms = filteredCommunications.filter(comm => 
      new Date(comm.timestamp).getTime() > now.getTime() - timeRangeMs
    );

    return {
      total: recentComms.length,
      taskAssignments: recentComms.filter(c => c.type === "task-assignment").length,
      statusUpdates: recentComms.filter(c => c.type === "status-update").length,
      messages: recentComms.filter(c => c.type === "message").length,
      activeTeams: new Set(recentComms.map(c => c.teamId)).size
    };
  };

  const getAgentName = (agentId: string) => {
    const agent = agentProfiles.find(a => a.id === agentId);
    return agent?.name || "Unknown Agent";
  };

  const getTeamName = (teamId: string) => {
    const team = teams.find(t => t.id === teamId);
    return team?.name || "Unknown Team";
  };

  const stats = getCommunicationStats();

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Enhanced Team Communication Flow
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                Interactive visualization of team communications with real-time updates
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={isRealTimeActive ? "default" : "outline"}
                size="sm"
                onClick={() => setIsRealTimeActive(!isRealTimeActive)}
              >
                {isRealTimeActive ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isRealTimeActive ? "Pause" : "Resume"} Live
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            
            <Select value={selectedTeam} onValueChange={setSelectedTeam}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select Team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teams</SelectItem>
                {teams.map(team => (
                  <SelectItem key={team.id} value={team.id}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedTimePeriod} onValueChange={setSelectedTimePeriod}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Last Hour</SelectItem>
                <SelectItem value="24h">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
              </SelectContent>
            </Select>

            <Select value={messageTypeFilter} onValueChange={setMessageTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Message Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="message">Messages</SelectItem>
                <SelectItem value="task-assignment">Task Assignments</SelectItem>
                <SelectItem value="status-update">Status Updates</SelectItem>
                <SelectItem value="announcement">Announcements</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-48"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Communication Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total Communications</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.messages}</div>
            <div className="text-sm text-muted-foreground">Messages</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.taskAssignments}</div>
            <div className="text-sm text-muted-foreground">Task Assignments</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.statusUpdates}</div>
            <div className="text-sm text-muted-foreground">Status Updates</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.activeTeams}</div>
            <div className="text-sm text-muted-foreground">Active Teams</div>
          </CardContent>
        </Card>
      </div>

      {/* Communication Flow Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Communication Network */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Team Communication Network
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teams.slice(0, 4).map((team) => {
                const teamComms = filteredCommunications.filter(c => c.teamId === team.id);
                const teamMembers = getTeamMembers(team.id);
                
                return (
                  <div key={team.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: team.color }}
                        />
                        <span className="font-medium">{team.name}</span>
                        <Badge variant="secondary">{teamMembers.length} members</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium">{teamComms.length} msgs</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Most active: {teamMembers[0]?.name || "None"}</span>
                      <span>Last activity: {teamComms[0] ? new Date(teamComms[0].timestamp).toLocaleTimeString() : "None"}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Communication Flow */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Recent Communication Flow
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredCommunications.slice(0, 10).map((comm) => (
                <div key={comm.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {getAgentName(comm.fromAgentId)}
                      </Badge>
                      <ArrowRight className="w-3 h-3 text-muted-foreground" />
                      <Badge variant="outline" className="text-xs">
                        {comm.toAgentId ? getAgentName(comm.toAgentId) : getTeamName(comm.teamId)}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="secondary"
                      className={cn(
                        "text-xs",
                        comm.type === "message" && "bg-blue-50 text-blue-700",
                        comm.type === "task-assignment" && "bg-green-50 text-green-700",
                        comm.type === "status-update" && "bg-yellow-50 text-yellow-700",
                        comm.type === "announcement" && "bg-purple-50 text-purple-700"
                      )}
                    >
                      {comm.type}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {new Date(comm.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Message Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Detailed Message Timeline
            {isRealTimeActive && (
              <Badge variant="secondary" className="bg-green-50 text-green-700 ml-2 animate-pulse">
                Live
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCommunications.slice(0, 15).map((comm, index) => (
              <div key={comm.id} className="flex items-start gap-4 p-4 border-l-2 border-muted hover:border-primary transition-colors">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-primary" />
                  </div>
                </div>
                
                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{getAgentName(comm.fromAgentId)}</span>
                      <ArrowRight className="w-3 h-3 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {comm.toAgentId ? getAgentName(comm.toAgentId) : `${getTeamName(comm.teamId)} (Team)`}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="secondary"
                        className={cn(
                          "text-xs",
                          comm.priority === "urgent" && "bg-red-50 text-red-700",
                          comm.priority === "high" && "bg-orange-50 text-orange-700",
                          comm.priority === "medium" && "bg-yellow-50 text-yellow-700",
                          comm.priority === "low" && "bg-green-50 text-green-700"
                        )}
                      >
                        {comm.priority}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(comm.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-foreground mb-2 line-clamp-2">
                    {comm.content}
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {comm.type.replace("-", " ")}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      in {getTeamName(comm.teamId)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
