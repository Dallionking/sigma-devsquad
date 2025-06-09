
import { ResearchResult } from "./types";

export const mockResults: ResearchResult[] = [
  {
    id: "1",
    title: "AI Agent Architecture Best Practices - Comprehensive Guide",
    url: "https://ai-development.guide/agent-architecture",
    snippet: "Learn the fundamental principles of building scalable AI agent systems with proper separation of concerns, event-driven architecture, and robust error handling.",
    domain: "ai-development.guide",
    timestamp: new Date("2024-05-28"),
    relevanceScore: 95,
    type: "documentation"
  },
  {
    id: "2",
    title: "Research: Multi-Agent Communication Patterns",
    url: "https://arxiv.org/papers/multi-agent-communication",
    snippet: "Academic paper exploring various communication patterns between autonomous agents in distributed systems.",
    domain: "arxiv.org",
    timestamp: new Date("2024-05-27"),
    relevanceScore: 88,
    type: "academic"
  },
  {
    id: "3",
    title: "Planning Agent Implementation in Modern Software",
    url: "https://techblog.example.com/planning-agents",
    snippet: "Industry case study on implementing planning agents for workflow automation and task management in enterprise software.",
    domain: "techblog.example.com",
    timestamp: new Date("2024-05-26"),
    relevanceScore: 82,
    type: "web"
  },
  {
    id: "4",
    title: "Breaking: New Advances in AI Agent Coordination",
    url: "https://technews.com/ai-agent-coordination",
    snippet: "Latest developments in AI agent coordination technologies and their impact on software development workflows.",
    domain: "technews.com",
    timestamp: new Date("2024-05-25"),
    relevanceScore: 76,
    type: "news"
  }
];
