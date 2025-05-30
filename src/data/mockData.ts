
import { Agent, Task, Message } from "@/types";

export const mockAgents: Agent[] = [
  {
    id: "1",
    type: "planning",
    name: "Planning Agent",
    status: "working",
    currentTask: "Analyzing requirements for user authentication module",
    progress: 75,
    lastActive: "2024-05-30T10:30:00Z"
  },
  {
    id: "2",
    type: "frontend",
    name: "Frontend Agent",
    status: "waiting",
    currentTask: "Waiting for API specifications",
    progress: 0,
    lastActive: "2024-05-30T10:25:00Z"
  },
  {
    id: "3",
    type: "backend",
    name: "Backend Agent",
    status: "working",
    currentTask: "Implementing authentication endpoints",
    progress: 45,
    lastActive: "2024-05-30T10:32:00Z"
  },
  {
    id: "4",
    type: "qa",
    name: "QA Agent",
    status: "idle",
    currentTask: "Ready for testing assignments",
    progress: 0,
    lastActive: "2024-05-30T09:45:00Z"
  },
  {
    id: "5",
    type: "documentation",
    name: "Documentation Agent",
    status: "working",
    currentTask: "Updating API documentation",
    progress: 60,
    lastActive: "2024-05-30T10:31:00Z"
  },
  {
    id: "6",
    type: "devops",
    name: "DevOps Agent",
    status: "error",
    currentTask: "CI/CD pipeline configuration failed",
    progress: 0,
    lastActive: "2024-05-30T10:15:00Z"
  }
];

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "User Authentication Module",
    description: "Implement complete user authentication with JWT tokens",
    status: "in-progress",
    assignedAgent: "backend",
    priority: "high",
    deadline: "2024-06-05",
    createdAt: "2024-05-28T09:00:00Z"
  },
  {
    id: "2",
    title: "Login UI Components",
    description: "Create responsive login and signup forms",
    status: "pending",
    assignedAgent: "frontend",
    priority: "high",
    deadline: "2024-06-03",
    createdAt: "2024-05-29T14:30:00Z"
  },
  {
    id: "3",
    title: "API Documentation",
    description: "Document authentication endpoints",
    status: "in-progress",
    assignedAgent: "documentation",
    priority: "medium",
    deadline: "2024-06-07",
    createdAt: "2024-05-29T16:00:00Z"
  }
];

export const mockMessages: Message[] = [
  {
    id: "1",
    from: "planning",
    to: "backend",
    content: "Authentication requirements finalized. JWT with refresh tokens, OAuth integration required.",
    timestamp: "2024-05-30T10:30:00Z",
    type: "request"
  },
  {
    id: "2",
    from: "backend",
    to: "planning",
    content: "Requirements received. Estimated completion: 2 days.",
    timestamp: "2024-05-30T10:32:00Z",
    type: "response"
  },
  {
    id: "3",
    from: "backend",
    to: "frontend",
    content: "API specifications ready for authentication endpoints.",
    timestamp: "2024-05-30T10:35:00Z",
    type: "notification"
  }
];
