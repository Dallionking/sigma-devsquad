
import { Agent, Task, Message } from "@/types";

export const mockAgents: Agent[] = [
  {
    id: "1",
    type: "planning",
    name: "Planning Agent",
    status: "working",
    currentTask: "Analyzing requirements for user authentication module",
    progress: 75,
    lastActive: "2024-05-30T10:30:00Z",
    capabilities: ["requirement-analysis", "project-planning", "roadmap-creation"],
    specialization: "Project Planning & Requirements Analysis",
    background: "Experienced in breaking down complex projects into manageable tasks and creating comprehensive roadmaps.",
    description: "Analyzes requirements and creates detailed project plans with clear timelines and deliverables."
  },
  {
    id: "2",
    type: "frontend",
    name: "Frontend Agent",
    status: "waiting",
    currentTask: "Waiting for API specifications",
    progress: 0,
    lastActive: "2024-05-30T10:25:00Z",
    capabilities: ["react-development", "ui-design", "responsive-design", "component-creation"],
    specialization: "React & Modern Frontend Development",
    background: "Expert in React, TypeScript, and modern frontend frameworks with focus on user experience.",
    description: "Builds responsive user interfaces and interactive components using React and modern web technologies."
  },
  {
    id: "3",
    type: "backend",
    name: "Backend Agent",
    status: "working",
    currentTask: "Implementing authentication endpoints",
    progress: 45,
    lastActive: "2024-05-30T10:32:00Z",
    capabilities: ["api-development", "database-design", "authentication", "security"],
    specialization: "API Development & Database Management",
    background: "Specialized in creating robust backend systems with secure authentication and efficient data handling.",
    description: "Develops server-side logic, APIs, and database systems with focus on security and performance."
  },
  {
    id: "4",
    type: "qa",
    name: "QA Agent",
    status: "idle",
    currentTask: "Ready for testing assignments",
    progress: 0,
    lastActive: "2024-05-30T09:45:00Z",
    capabilities: ["automated-testing", "manual-testing", "bug-detection", "test-planning"],
    specialization: "Quality Assurance & Testing",
    background: "Comprehensive testing expertise including unit tests, integration tests, and end-to-end testing.",
    description: "Ensures code quality through comprehensive testing strategies and bug detection."
  },
  {
    id: "5",
    type: "documentation",
    name: "Documentation Agent",
    status: "working",
    currentTask: "Updating API documentation",
    progress: 60,
    lastActive: "2024-05-30T10:31:00Z",
    capabilities: ["technical-writing", "api-documentation", "user-guides", "knowledge-management"],
    specialization: "Technical Documentation & Knowledge Management",
    background: "Expert in creating clear, comprehensive documentation for both technical and non-technical audiences.",
    description: "Creates and maintains comprehensive documentation including API docs, user guides, and technical specifications."
  },
  {
    id: "6",
    type: "devops",
    name: "DevOps Agent",
    status: "error",
    currentTask: "CI/CD pipeline configuration failed",
    progress: 0,
    lastActive: "2024-05-30T10:15:00Z",
    capabilities: ["ci-cd", "deployment", "infrastructure", "monitoring"],
    specialization: "DevOps & Infrastructure Management",
    background: "Experienced in setting up robust CI/CD pipelines and managing cloud infrastructure.",
    description: "Manages deployment pipelines, infrastructure automation, and system monitoring."
  }
];

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "User Authentication Module",
    description: "Implement complete user authentication with JWT tokens",
    status: "in-progress",
    type: "development",
    assignedAgent: "backend",
    assignedTo: "3",
    priority: "high",
    deadline: "2024-06-05",
    createdAt: "2024-05-28T09:00:00Z"
  },
  {
    id: "2",
    title: "Login UI Components",
    description: "Create responsive login and signup forms",
    status: "pending",
    type: "ui-development",
    assignedAgent: "frontend",
    assignedTo: "2",
    priority: "high",
    deadline: "2024-06-03",
    createdAt: "2024-05-29T14:30:00Z"
  },
  {
    id: "3",
    title: "API Documentation",
    description: "Document authentication endpoints",
    status: "in-progress",
    type: "documentation",
    assignedAgent: "documentation",
    assignedTo: "5",
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
    senderId: "1",
    receiverId: "3",
    content: "Authentication requirements finalized. JWT with refresh tokens, OAuth integration required.",
    timestamp: "2024-05-30T10:30:00Z",
    type: "request",
    status: "delivered"
  },
  {
    id: "2",
    from: "backend",
    to: "planning",
    senderId: "3",
    receiverId: "1",
    content: "Requirements received. Estimated completion: 2 days.",
    timestamp: "2024-05-30T10:32:00Z",
    type: "response",
    status: "delivered"
  },
  {
    id: "3",
    from: "backend",
    to: "frontend",
    senderId: "3",
    receiverId: "2",
    content: "API specifications ready for authentication endpoints.",
    timestamp: "2024-05-30T10:35:00Z",
    type: "notification",
    status: "delivered"
  }
];
