
import { Team, AgentProfile, TeamCommunication, TeamTask } from '@/types/teams';

export const mockTeams: Team[] = [
  {
    id: "team_frontend",
    name: "Frontend Team",
    type: "frontend",
    description: "Responsible for user interface and user experience development",
    leaderId: "agent_frontend_lead",
    memberIds: ["agent_frontend_lead", "agent_ui_designer", "agent_react_dev"],
    color: "#3B82F6",
    status: "active",
    createdAt: "2024-01-15T09:00:00.000Z",
    objectives: [
      "Deliver pixel-perfect UI components",
      "Maintain 98% test coverage",
      "Ensure accessibility compliance"
    ],
    kpis: [
      { id: "kpi_1", name: "Story Points Completed", value: 85, target: 100, unit: "points", trend: "up" },
      { id: "kpi_2", name: "Bug Rate", value: 2, target: 5, unit: "%", trend: "down" },
      { id: "kpi_3", name: "Code Coverage", value: 92, target: 95, unit: "%", trend: "up" }
    ]
  },
  {
    id: "team_backend",
    name: "Backend Team",
    type: "backend",
    description: "Handles server-side logic, APIs, and database management",
    leaderId: "agent_backend_lead",
    memberIds: ["agent_backend_lead", "agent_api_dev", "agent_db_engineer"],
    color: "#10B981",
    status: "active",
    createdAt: "2024-01-15T09:00:00.000Z",
    objectives: [
      "Maintain 99.9% API uptime",
      "Optimize database performance",
      "Implement secure authentication"
    ],
    kpis: [
      { id: "kpi_4", name: "API Response Time", value: 120, target: 200, unit: "ms", trend: "down" },
      { id: "kpi_5", name: "System Uptime", value: 99.95, target: 99.9, unit: "%", trend: "stable" },
      { id: "kpi_6", name: "Security Score", value: 98, target: 95, unit: "%", trend: "up" }
    ]
  },
  {
    id: "team_devops",
    name: "DevOps Team",
    type: "devops",
    description: "Infrastructure, deployment, and system reliability",
    leaderId: "agent_devops_lead",
    memberIds: ["agent_devops_lead", "agent_infra_engineer", "agent_security_expert"],
    color: "#F59E0B",
    status: "active",
    createdAt: "2024-01-15T09:00:00.000Z",
    objectives: [
      "Automate deployment pipeline",
      "Ensure infrastructure security",
      "Monitor system performance"
    ],
    kpis: [
      { id: "kpi_7", name: "Deployment Success Rate", value: 98, target: 95, unit: "%", trend: "up" },
      { id: "kpi_8", name: "Mean Recovery Time", value: 15, target: 30, unit: "min", trend: "down" },
      { id: "kpi_9", name: "Infrastructure Cost", value: 85, target: 100, unit: "$k", trend: "down" }
    ]
  }
];

export const mockAgentProfiles: AgentProfile[] = [
  {
    id: "agent_frontend_lead",
    name: "Sarah Chen",
    teamId: "team_frontend",
    role: "lead",
    specialization: "react-specialist",
    skills: [
      { name: "React", level: 5, category: "technical" },
      { name: "TypeScript", level: 5, category: "technical" },
      { name: "Team Leadership", level: 4, category: "soft" },
      { name: "UI/UX Design", level: 4, category: "domain" }
    ],
    frameworks: ["React", "Next.js", "Tailwind CSS", "Storybook"],
    experience: 8,
    availability: "available",
    performanceRating: 4.8,
    communicationPreference: "direct",
    avatar: "/avatars/sarah.jpg",
    bio: "Frontend team lead with 8 years of experience in modern web development. Specializes in React ecosystem and component architecture."
  },
  {
    id: "agent_ui_designer",
    name: "Alex Rodriguez",
    teamId: "team_frontend",
    role: "senior",
    specialization: "ui-ux-designer",
    skills: [
      { name: "Figma", level: 5, category: "technical" },
      { name: "Design Systems", level: 5, category: "domain" },
      { name: "User Research", level: 4, category: "domain" },
      { name: "Prototyping", level: 4, category: "technical" }
    ],
    frameworks: ["Figma", "Adobe Creative Suite", "Principle", "Framer"],
    experience: 6,
    availability: "busy",
    performanceRating: 4.6,
    communicationPreference: "mediated",
    avatar: "/avatars/alex.jpg",
    bio: "Senior UI/UX designer focused on creating intuitive and accessible user experiences. Expert in design systems and component libraries."
  },
  {
    id: "agent_react_dev",
    name: "Jordan Kim",
    teamId: "team_frontend",
    role: "mid",
    specialization: "component-developer",
    skills: [
      { name: "React", level: 4, category: "technical" },
      { name: "JavaScript", level: 4, category: "technical" },
      { name: "CSS", level: 4, category: "technical" },
      { name: "Testing", level: 3, category: "technical" }
    ],
    frameworks: ["React", "Vue.js", "SCSS", "Jest"],
    experience: 4,
    availability: "available",
    performanceRating: 4.2,
    communicationPreference: "direct",
    avatar: "/avatars/jordan.jpg",
    bio: "Mid-level frontend developer specializing in reusable component development and modern JavaScript frameworks."
  },
  {
    id: "agent_backend_lead",
    name: "Marcus Thompson",
    teamId: "team_backend",
    role: "lead",
    specialization: "system-architect",
    skills: [
      { name: "Node.js", level: 5, category: "technical" },
      { name: "System Design", level: 5, category: "domain" },
      { name: "Database Design", level: 4, category: "technical" },
      { name: "Team Management", level: 4, category: "soft" }
    ],
    frameworks: ["Node.js", "Express", "PostgreSQL", "Docker"],
    experience: 10,
    availability: "available",
    performanceRating: 4.9,
    communicationPreference: "direct",
    avatar: "/avatars/marcus.jpg",
    bio: "Backend team lead and system architect with extensive experience in scalable system design and team leadership."
  }
];

export const mockTeamCommunications: TeamCommunication[] = [
  {
    id: "msg_1",
    teamId: "team_frontend",
    fromAgentId: "agent_frontend_lead",
    content: "Team standup in 15 minutes. Please have your updates ready!",
    type: "announcement",
    timestamp: "2024-05-30T09:45:00.000Z",
    isRead: false,
    priority: "medium"
  },
  {
    id: "msg_2",
    teamId: "team_frontend",
    fromAgentId: "agent_ui_designer",
    toAgentId: "agent_react_dev",
    content: "Hey Jordan, I've updated the design system with new button variants. Can you implement them?",
    type: "task-assignment",
    timestamp: "2024-05-30T10:30:00.000Z",
    isRead: true,
    priority: "high"
  },
  {
    id: "msg_3",
    teamId: "team_backend",
    fromAgentId: "agent_backend_lead",
    content: "API performance optimization is complete. Response times improved by 40%.",
    type: "status-update",
    timestamp: "2024-05-30T11:15:00.000Z",
    isRead: false,
    priority: "low"
  }
];

export const mockTeamTasks: TeamTask[] = [
  {
    id: "task_1",
    title: "Implement New Dashboard Components",
    description: "Create responsive dashboard components based on the latest design specifications",
    teamId: "team_frontend",
    assignedAgentId: "agent_react_dev",
    status: "in-progress",
    priority: "high",
    deadline: "2024-06-05T17:00:00.000Z",
    createdAt: "2024-05-28T09:00:00.000Z",
    estimatedHours: 16,
    actualHours: 8,
    dependencies: [],
    tags: ["dashboard", "components", "react"]
  },
  {
    id: "task_2",
    title: "API Endpoint Optimization",
    description: "Optimize user data retrieval endpoints for better performance",
    teamId: "team_backend",
    assignedAgentId: "agent_backend_lead",
    status: "completed",
    priority: "medium",
    deadline: "2024-06-01T17:00:00.000Z",
    createdAt: "2024-05-25T09:00:00.000Z",
    estimatedHours: 12,
    actualHours: 10,
    dependencies: [],
    tags: ["api", "optimization", "performance"]
  },
  {
    id: "task_3",
    title: "Design System Updates",
    description: "Update design system with new color palette and typography",
    teamId: "team_frontend",
    assignedAgentId: "agent_ui_designer",
    status: "review",
    priority: "medium",
    deadline: "2024-06-03T17:00:00.000Z",
    createdAt: "2024-05-27T09:00:00.000Z",
    estimatedHours: 8,
    actualHours: 7,
    dependencies: [],
    tags: ["design-system", "ui", "branding"]
  }
];
