
import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Agent, Message } from "@/types";
import { Calendar, Filter, Search, Download, ArrowRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineEvent {
  id: string;
  timestamp: string;
  type: "message" | "status_change" | "decision" | "intervention";
  fromAgent?: string;
  toAgent?: string;
  content: string;
  metadata: any;
  priority: "low" | "medium" | "high";
}

interface HistoricalTimelineViewProps {
  agents: Agent[];
  messages: Message[];
  timeRange: string;
  onTimeRangeChange: (range: string) => void;
  filterSettings: any;
  onFilterChange: (settings: any) => void;
}

export const HistoricalTimelineView = ({
  agents,
  messages,
  timeRange,
  onTimeRangeChange,
  filterSettings,
  onFilterChange
}: HistoricalTimelineViewProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEventType, setSelectedEventType] = useState("all");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Generate timeline events from messages and agent status changes
  const timelineEvents = useMemo(() => {
    const events: TimelineEvent[] = [];

    // Add message events
    messages.forEach(message => {
      events.push({
        id: `msg-${message.id}`,
        timestamp: message.timestamp,
        type: "message",
        fromAgent: message.from,
        toAgent: message.to,
        content: message.content,
        metadata: { messageType: message.type },
        priority: message.type === "request" ? "medium" : "low"
      });
    });

    // Add mock status change events
    agents.forEach(agent => {
      const statusChangeTime = new Date(Date.now() - Math.random() * 3600000).toISOString();
      events.push({
        id: `status-${agent.id}`,
        timestamp: statusChangeTime,
        type: "status_change",
        fromAgent: agent.type,
        content: `Agent status changed to ${agent.status}`,
        metadata: { previousStatus: "idle", newStatus: agent.status },
        priority: agent.status === "error" ? "high" : "low"
      });
    });

    // Add mock decision events
    const mockDecisions = [
      {
        id: "decision-1",
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        content: "Architecture decision made for component structure",
        fromAgent: "planning",
        priority: "high" as const
      },
      {
        id: "decision-2",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        content: "Resource allocation approved for backend optimization",
        fromAgent: "devops",
        priority: "medium" as const
      }
    ];

    mockDecisions.forEach(decision => {
      events.push({
        id: decision.id,
        timestamp: decision.timestamp,
        type: "decision",
        fromAgent: decision.fromAgent,
        content: decision.content,
        metadata: { decisionType: "approval" },
        priority: decision.priority
      });
    });

    return events
      .filter(event => {
        // Apply time range filter
        const eventTime = new Date(event.timestamp).getTime();
        const now = Date.now();
        const rangeMs = {
          "1h": 3600000,
          "6h": 21600000,
          "24h": 86400000,
          "7d": 604800000,
          "30d": 2592000000
        }[timeRange] || 86400000;
        
        if (eventTime < now - rangeMs) return false;

        // Apply search filter
        if (searchQuery && !event.content.toLowerCase().includes(searchQuery.toLowerCase())) {
          return false;
        }

        // Apply event type filter
        if (selectedEventType !== "all" && event.type !== selectedEventType) {
          return false;
        }

        return true;
      })
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [messages, agents, timeRange, searchQuery, selectedEventType]);

  const getEventIcon = (type: string) => {
    switch (type) {
      case "message": return "💬";
      case "status_change": return "🔄";
      case "decision": return "⚡";
      case "intervention": return "🛠️";
      default: return "📋";
    }
  };

  const getEventColor = (type: string, priority: string) => {
    if (priority === "high") return "border-l-red-500 bg-red-50";
    if (priority === "medium") return "border-l-yellow-500 bg-yellow-50";
    return "border-l-blue-500 bg-blue-50";
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high": return <Badge variant="destructive">High</Badge>;
      case "medium": return <Badge variant="secondary">Medium</Badge>;
      case "low": return <Badge variant="outline">Low</Badge>;
      default: return null;
    }
  };

  const exportTimeline = () => {
    const exportData = timelineEvents.map(event => ({
      timestamp: event.timestamp,
      type: event.type,
      from: event.fromAgent || '',
      to: event.toAgent || '',
      content: event.content,
      priority: event.priority
    }));
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `timeline-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium">Historical Timeline View</h3>
            <p className="text-sm text-muted-foreground">
              Comprehensive timeline of all agent interactions and system events
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">
              {timelineEvents.length} Events
            </Badge>
            <Button variant="outline" size="sm" onClick={exportTimeline}>
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="space-y-1">
            <label className="text-sm font-medium">Search Events</label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search timeline..."
                className="pl-9"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Time Range</label>
            <Select value={timeRange} onValueChange={onTimeRangeChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Last Hour</SelectItem>
                <SelectItem value="6h">Last 6 Hours</SelectItem>
                <SelectItem value="24h">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Event Type</label>
            <Select value={selectedEventType} onValueChange={setSelectedEventType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="message">Messages</SelectItem>
                <SelectItem value="status_change">Status Changes</SelectItem>
                <SelectItem value="decision">Decisions</SelectItem>
                <SelectItem value="intervention">Interventions</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Date</label>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {timelineEvents.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="w-8 h-8 mx-auto mb-2" />
              <p>No events found for the selected filters</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Timeline connector line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />
              
              {timelineEvents.map((event, index) => (
                <div key={event.id} className="relative flex items-start space-x-4">
                  {/* Timeline dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-4 h-4 bg-background border-2 border-blue-500 rounded-full" />
                  </div>
                  
                  {/* Event card */}
                  <Card className={cn(
                    "flex-1 p-4 border-l-4",
                    getEventColor(event.type, event.priority)
                  )}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{getEventIcon(event.type)}</span>
                        <span className="font-medium capitalize">{event.type.replace('_', ' ')}</span>
                        {getPriorityBadge(event.priority)}
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {new Date(event.timestamp).toLocaleString()}
                      </div>
                    </div>
                    
                    {/* Agent flow */}
                    {event.fromAgent && (
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {agents.find(a => a.type === event.fromAgent)?.name || event.fromAgent}
                        </Badge>
                        {event.toAgent && (
                          <>
                            <ArrowRight className="w-3 h-3 text-muted-foreground" />
                            <Badge variant="outline" className="text-xs">
                              {agents.find(a => a.type === event.toAgent)?.name || event.toAgent}
                            </Badge>
                          </>
                        )}
                      </div>
                    )}
                    
                    {/* Event content */}
                    <p className="text-sm text-foreground">{event.content}</p>
                    
                    {/* Metadata */}
                    {event.metadata && Object.keys(event.metadata).length > 0 && (
                      <div className="mt-2 pt-2 border-t border-border">
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(event.metadata).map(([key, value]) => (
                            <Badge key={key} variant="secondary" className="text-xs">
                              {key}: {String(value)}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary Statistics */}
        <Card className="p-4 mt-6 bg-muted/20">
          <h4 className="font-medium mb-3">Timeline Summary</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["message", "status_change", "decision", "intervention"].map(type => {
              const count = timelineEvents.filter(e => e.type === type).length;
              return (
                <div key={type} className="text-center">
                  <div className="text-2xl font-bold">{count}</div>
                  <div className="text-sm text-muted-foreground capitalize">
                    {type.replace('_', ' ')}s
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </Card>
    </div>
  );
};
