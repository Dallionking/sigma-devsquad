
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageCircle, 
  Plus, 
  Reply, 
  ChevronDown, 
  ChevronRight,
  Pin,
  CheckCircle,
  Eye,
  EyeOff,
  Star,
  Clock,
  User,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ThreadReply {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: Date;
  edited?: boolean;
}

interface Discussion {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: Date;
  replies: ThreadReply[];
  isResolved: boolean;
  isPinned: boolean;
  isFollowing: boolean;
  views: number;
  tags: string[];
  summary?: string;
}

interface ThreadedDiscussionsProps {
  roomId: string;
  currentUserId: string;
}

export const ThreadedDiscussions = ({ roomId, currentUserId }: ThreadedDiscussionsProps) => {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [expandedThreads, setExpandedThreads] = useState<Set<string>>(new Set());
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const [newThreadTitle, setNewThreadTitle] = useState("");
  const [newThreadContent, setNewThreadContent] = useState("");
  const [showNewThread, setShowNewThread] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [newReply, setNewReply] = useState("");
  const [filter, setFilter] = useState<"all" | "following" | "unresolved" | "pinned">("all");

  // Mock data
  useState(() => {
    const mockDiscussions: Discussion[] = [
      {
        id: "1",
        title: "API Rate Limiting Implementation",
        content: "We need to discuss the best approach for implementing rate limiting in our API. What are your thoughts on using Redis vs in-memory solutions?",
        author: { id: "user1", name: "Alice Johnson", avatar: "/placeholder.svg" },
        timestamp: new Date(Date.now() - 7200000),
        isResolved: false,
        isPinned: true,
        isFollowing: true,
        views: 24,
        tags: ["api", "performance", "backend"],
        replies: [
          {
            id: "r1",
            content: "I think Redis would be better for scalability. We can share the rate limiting state across multiple server instances.",
            author: { id: "user2", name: "Bob Smith", avatar: "/placeholder.svg" },
            timestamp: new Date(Date.now() - 3600000)
          },
          {
            id: "r2", 
            content: "Good point about Redis. We should also consider the latency implications though. For high-frequency APIs, in-memory might be faster.",
            author: { id: "user3", name: "Carol Wilson", avatar: "/placeholder.svg" },
            timestamp: new Date(Date.now() - 1800000)
          }
        ],
        summary: "Discussion about Redis vs in-memory solutions for API rate limiting, focusing on scalability and latency trade-offs."
      },
      {
        id: "2",
        title: "UI Component Library Standards",
        content: "Let's establish some guidelines for our component library. We need consistency in naming, props, and documentation.",
        author: { id: "user2", name: "Bob Smith", avatar: "/placeholder.svg" },
        timestamp: new Date(Date.now() - 5400000),
        isResolved: true,
        isPinned: false,
        isFollowing: false,
        views: 18,
        tags: ["ui", "frontend", "standards"],
        replies: [
          {
            id: "r3",
            content: "I suggest we follow the Material Design principles but adapt them to our brand guidelines.",
            author: { id: "user1", name: "Alice Johnson", avatar: "/placeholder.svg" },
            timestamp: new Date(Date.now() - 3000000)
          }
        ]
      },
      {
        id: "3",
        title: "Database Migration Strategy",
        content: "We need to plan our database migration for the next release. Should we use blue-green deployment or rolling updates?",
        author: { id: "user3", name: "Carol Wilson", avatar: "/placeholder.svg" },
        timestamp: new Date(Date.now() - 3600000),
        isResolved: false,
        isPinned: false,
        isFollowing: true,
        views: 12,
        tags: ["database", "deployment", "migration"],
        replies: []
      }
    ];
    setDiscussions(mockDiscussions);
  });

  const filteredDiscussions = discussions.filter(discussion => {
    switch (filter) {
      case "following": return discussion.isFollowing;
      case "unresolved": return !discussion.isResolved;
      case "pinned": return discussion.isPinned;
      default: return true;
    }
  });

  const toggleThread = (threadId: string) => {
    setExpandedThreads(prev => {
      const newSet = new Set(prev);
      if (newSet.has(threadId)) {
        newSet.delete(threadId);
      } else {
        newSet.add(threadId);
      }
      return newSet;
    });
  };

  const toggleFollowing = (threadId: string) => {
    setDiscussions(prev => prev.map(discussion =>
      discussion.id === threadId
        ? { ...discussion, isFollowing: !discussion.isFollowing }
        : discussion
    ));
  };

  const toggleResolved = (threadId: string) => {
    setDiscussions(prev => prev.map(discussion =>
      discussion.id === threadId
        ? { ...discussion, isResolved: !discussion.isResolved }
        : discussion
    ));
  };

  const togglePinned = (threadId: string) => {
    setDiscussions(prev => prev.map(discussion =>
      discussion.id === threadId
        ? { ...discussion, isPinned: !discussion.isPinned }
        : discussion
    ));
  };

  const createNewThread = () => {
    if (!newThreadTitle.trim() || !newThreadContent.trim()) return;

    const newThread: Discussion = {
      id: Date.now().toString(),
      title: newThreadTitle,
      content: newThreadContent,
      author: { id: currentUserId, name: "You" },
      timestamp: new Date(),
      replies: [],
      isResolved: false,
      isPinned: false,
      isFollowing: true,
      views: 1,
      tags: []
    };

    setDiscussions(prev => [newThread, ...prev]);
    setNewThreadTitle("");
    setNewThreadContent("");
    setShowNewThread(false);
  };

  const addReply = (threadId: string) => {
    if (!newReply.trim()) return;

    const reply: ThreadReply = {
      id: Date.now().toString(),
      content: newReply,
      author: { id: currentUserId, name: "You" },
      timestamp: new Date()
    };

    setDiscussions(prev => prev.map(discussion =>
      discussion.id === threadId
        ? { ...discussion, replies: [...discussion.replies, reply] }
        : discussion
    ));

    setNewReply("");
    setReplyingTo(null);
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    return timestamp.toLocaleDateString();
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Header with filters and new thread button */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Discussions</h2>
            <Button onClick={() => setShowNewThread(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Discussion
            </Button>
          </div>
          
          <div className="flex gap-2">
            {[
              { key: "all", label: "All" },
              { key: "following", label: "Following" },
              { key: "unresolved", label: "Unresolved" },
              { key: "pinned", label: "Pinned" }
            ].map(({ key, label }) => (
              <Button
                key={key}
                variant={filter === key ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(key as any)}
              >
                {label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* New Thread Form */}
      {showNewThread && (
        <Card>
          <CardHeader>
            <CardTitle>Start New Discussion</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Discussion title..."
              value={newThreadTitle}
              onChange={(e) => setNewThreadTitle(e.target.value)}
            />
            <Textarea
              placeholder="What would you like to discuss?"
              value={newThreadContent}
              onChange={(e) => setNewThreadContent(e.target.value)}
              rows={4}
            />
            <div className="flex gap-2">
              <Button onClick={createNewThread}>Create Discussion</Button>
              <Button variant="outline" onClick={() => setShowNewThread(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Discussions List */}
      <Card className="flex-1">
        <CardContent className="p-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-4">
              {filteredDiscussions.map((discussion) => (
                <div key={discussion.id} className="border rounded-lg overflow-hidden">
                  {/* Thread Header */}
                  <div className="p-4 bg-muted/30">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={discussion.author.avatar} />
                        <AvatarFallback>{discussion.author.name[0]}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{discussion.title}</h3>
                          {discussion.isPinned && (
                            <Pin className="w-4 h-4 text-orange-500" />
                          )}
                          {discussion.isResolved && (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {discussion.author.name}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTime(discussion.timestamp)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {discussion.views} views
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            {discussion.replies.length} replies
                          </span>
                        </div>
                        
                        {discussion.tags.length > 0 && (
                          <div className="flex gap-1 mb-2">
                            {discussion.tags.map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                        
                        <p className="text-sm text-muted-foreground">
                          {discussion.content}
                        </p>
                        
                        {discussion.summary && (
                          <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-800">
                            <strong>Summary:</strong> {discussion.summary}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFollowing(discussion.id)}
                          className={cn(
                            discussion.isFollowing && "text-blue-600"
                          )}
                        >
                          {discussion.isFollowing ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => togglePinned(discussion.id)}
                        >
                          <Pin className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleResolved(discussion.id)}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleThread(discussion.id)}
                        >
                          {expandedThreads.has(discussion.id) ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Thread Replies */}
                  {expandedThreads.has(discussion.id) && (
                    <div className="border-t">
                      {discussion.replies.map((reply) => (
                        <div key={reply.id} className="p-4 border-b last:border-b-0 bg-background">
                          <div className="flex gap-3">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={reply.author.avatar} />
                              <AvatarFallback className="text-xs">{reply.author.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-sm">{reply.author.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  {formatTime(reply.timestamp)}
                                </span>
                                {reply.edited && (
                                  <Badge variant="outline" className="text-xs">edited</Badge>
                                )}
                              </div>
                              <p className="text-sm">{reply.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Reply Form */}
                      <div className="p-4 bg-muted/30">
                        {replyingTo === discussion.id ? (
                          <div className="space-y-2">
                            <Textarea
                              placeholder="Write your reply..."
                              value={newReply}
                              onChange={(e) => setNewReply(e.target.value)}
                              rows={3}
                            />
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => addReply(discussion.id)}>
                                Post Reply
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setReplyingTo(null)}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setReplyingTo(discussion.id)}
                          >
                            <Reply className="w-4 h-4 mr-2" />
                            Reply
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {filteredDiscussions.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No discussions found</h3>
                  <p>Start a new discussion to get the conversation going.</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
