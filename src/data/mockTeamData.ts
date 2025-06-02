import { Team, AgentProfile, TeamCommunication, TeamTask } from '@/types/teams';

export const mockTeams: Team[] = [
  {
    id: 'team_1',
    name: 'Frontend Development',
    type: 'frontend',
    composition: 'ai', // AI team
    description: 'Responsible for user interface development and user experience',
    leaderId: 'agent_1',
    memberIds: ['agent_1', 'agent_2', 'agent_3'],
    color: '#3B82F6',
    status: 'active',
    createdAt: '2024-01-15T00:00:00Z',
    objectives: [
      'Develop responsive web interfaces',
      'Implement design system components',
      'Optimize application performance'
    ],
    kpis: [
      {
        id: 'kpi_1',
        name: 'Component Coverage',
        value: 85,
        target: 95,
        unit: '%',
        trend: 'up'
      },
      {
        id: 'kpi_2',
        name: 'Page Load Time',
        value: 2.1,
        target: 2.0,
        unit: 's',
        trend: 'down'
      }
    ]
  },
  {
    id: 'team_2',
    name: 'Backend Services',
    type: 'backend',
    composition: 'ai', // AI team
    description: 'API development, database management, and server infrastructure',
    leaderId: 'agent_4',
    memberIds: ['agent_4', 'agent_5'],
    color: '#10B981',
    status: 'active',
    createdAt: '2024-01-16T00:00:00Z',
    objectives: [
      'Build scalable REST APIs',
      'Implement microservices architecture',
      'Ensure data security and compliance'
    ],
    kpis: [
      {
        id: 'kpi_3',
        name: 'API Response Time',
        value: 150,
        target: 200,
        unit: 'ms',
        trend: 'stable'
      },
      {
        id: 'kpi_4',
        name: 'System Uptime',
        value: 99.8,
        target: 99.9,
        unit: '%',
        trend: 'up'
      }
    ]
  },
  {
    id: 'team_3',
    name: 'Human Resources',
    type: 'product',
    composition: 'human', // Human team
    description: 'Human resource management and organizational development',
    leaderId: 'human_1',
    memberIds: ['human_1', 'human_2'],
    color: '#8B5CF6',
    status: 'active',
    createdAt: '2024-01-17T00:00:00Z',
    objectives: [
      'Manage team coordination',
      'Handle strategic planning',
      'Oversee compliance and policies'
    ],
    kpis: [
      {
        id: 'kpi_5',
        name: 'Team Satisfaction',
        value: 4.2,
        target: 4.5,
        unit: '/5',
        trend: 'up'
      }
    ]
  },
  {
    id: 'team_4',
    name: 'Innovation Lab',
    type: 'design',
    composition: 'hybrid', // Hybrid team
    description: 'Mixed human-AI team for experimental projects and innovation',
    leaderId: 'human_3',
    memberIds: ['human_3', 'agent_6', 'agent_7'],
    color: '#F59E0B',
    status: 'active',
    createdAt: '2024-01-18T00:00:00Z',
    objectives: [
      'Explore emerging technologies',
      'Prototype innovative solutions',
      'Foster human-AI collaboration'
    ],
    kpis: [
      {
        id: 'kpi_6',
        name: 'Innovation Index',
        value: 78,
        target: 85,
        unit: '%',
        trend: 'up'
      }
    ]
  }
];

export const mockAgentProfiles: AgentProfile[] = [
  {
    id: 'agent_1',
    name: 'Alex Frontend',
    teamId: 'team_1',
    role: 'lead',
    specialization: 'react-specialist',
    skills: [
      { name: 'React', level: 5, category: 'technical' },
      { name: 'TypeScript', level: 4, category: 'technical' },
      { name: 'UI/UX Design', level: 4, category: 'technical' },
      { name: 'Leadership', level: 4, category: 'soft' }
    ],
    frameworks: ['React', 'Next.js', 'Tailwind CSS'],
    experience: 5,
    availability: 'available',
    performanceRating: 4.8,
    communicationPreference: 'direct',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Senior AI agent specializing in React development and frontend architecture.'
  },
  {
    id: 'agent_2',
    name: 'Jordan UI',
    teamId: 'team_1',
    role: 'mid',
    specialization: 'ui-ux-designer',
    skills: [
      { name: 'Figma', level: 5, category: 'technical' },
      { name: 'Design Systems', level: 4, category: 'technical' },
      { name: 'Prototyping', level: 4, category: 'technical' }
    ],
    frameworks: ['Figma', 'Adobe XD', 'Sketch'],
    experience: 3,
    availability: 'busy',
    performanceRating: 4.5,
    communicationPreference: 'mediated',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'Creative AI agent focused on user interface design and user experience optimization.'
  },
  {
    id: 'agent_3',
    name: 'Casey Component',
    teamId: 'team_1',
    role: 'junior',
    specialization: 'component-developer',
    skills: [
      { name: 'HTML/CSS', level: 4, category: 'technical' },
      { name: 'JavaScript', level: 3, category: 'technical' },
      { name: 'Component Libraries', level: 3, category: 'technical' }
    ],
    frameworks: ['React', 'Vue', 'Angular'],
    experience: 1,
    availability: 'available',
    performanceRating: 4.0,
    communicationPreference: 'direct',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Junior AI agent learning component development and frontend best practices.'
  },
  {
    id: 'agent_4',
    name: 'Morgan Backend',
    teamId: 'team_2',
    role: 'lead',
    specialization: 'system-architect',
    skills: [
      { name: 'Node.js', level: 5, category: 'technical' },
      { name: 'Database Design', level: 5, category: 'technical' },
      { name: 'System Architecture', level: 5, category: 'technical' },
      { name: 'Team Management', level: 4, category: 'soft' }
    ],
    frameworks: ['Express.js', 'PostgreSQL', 'Redis'],
    experience: 6,
    availability: 'available',
    performanceRating: 4.9,
    communicationPreference: 'direct',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    bio: 'Lead AI agent specializing in backend architecture and system design.'
  },
  {
    id: 'agent_5',
    name: 'Riley API',
    teamId: 'team_2',
    role: 'senior',
    specialization: 'api-developer',
    skills: [
      { name: 'REST APIs', level: 4, category: 'technical' },
      { name: 'GraphQL', level: 3, category: 'technical' },
      { name: 'Authentication', level: 4, category: 'technical' }
    ],
    frameworks: ['FastAPI', 'Django', 'Flask'],
    experience: 4,
    availability: 'offline',
    performanceRating: 4.6,
    communicationPreference: 'mediated',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
    bio: 'Senior AI agent focused on API development and integration services.'
  },
  {
    id: 'human_1',
    name: 'Sam Rodriguez',
    teamId: 'team_3',
    role: 'lead',
    specialization: 'product-manager',
    skills: [
      { name: 'Product Strategy', level: 5, category: 'domain' },
      { name: 'Stakeholder Management', level: 5, category: 'soft' },
      { name: 'Analytics', level: 4, category: 'technical' }
    ],
    frameworks: ['Jira', 'Confluence', 'Figma'],
    experience: 8,
    availability: 'available',
    performanceRating: 4.7,
    communicationPreference: 'direct',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face',
    bio: 'Experienced human product manager leading cross-functional initiatives.'
  },
  {
    id: 'human_2',
    name: 'Taylor Kim',
    teamId: 'team_3',
    role: 'mid',
    specialization: 'business-analyst',
    skills: [
      { name: 'Business Analysis', level: 4, category: 'domain' },
      { name: 'Process Optimization', level: 4, category: 'domain' },
      { name: 'Communication', level: 5, category: 'soft' }
    ],
    frameworks: ['Excel', 'PowerBI', 'Tableau'],
    experience: 5,
    availability: 'busy',
    performanceRating: 4.4,
    communicationPreference: 'direct',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'Human business analyst specializing in process improvement and data analysis.'
  },
  {
    id: 'human_3',
    name: 'Dr. Elena Vasquez',
    teamId: 'team_4',
    role: 'lead',
    specialization: 'product-designer',
    skills: [
      { name: 'Design Research', level: 5, category: 'domain' },
      { name: 'Innovation Management', level: 5, category: 'soft' },
      { name: 'AI Collaboration', level: 4, category: 'technical' }
    ],
    frameworks: ['Design Thinking', 'Lean Startup', 'Agile'],
    experience: 12,
    availability: 'available',
    performanceRating: 4.9,
    communicationPreference: 'direct',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
    bio: 'Human innovation lead specializing in human-AI collaboration and design research.'
  },
  {
    id: 'agent_6',
    name: 'Avery Research',
    teamId: 'team_4',
    role: 'senior',
    specialization: 'data-scientist',
    skills: [
      { name: 'Machine Learning', level: 5, category: 'technical' },
      { name: 'Data Analysis', level: 5, category: 'technical' },
      { name: 'Research Methods', level: 4, category: 'domain' }
    ],
    frameworks: ['Python', 'TensorFlow', 'PyTorch'],
    experience: 4,
    availability: 'available',
    performanceRating: 4.8,
    communicationPreference: 'mediated',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'AI data scientist specializing in machine learning research and experimental analysis.'
  },
  {
    id: 'agent_7',
    name: 'Quinn Innovation',
    teamId: 'team_4',
    role: 'mid',
    specialization: 'technical-writer',
    skills: [
      { name: 'Technical Documentation', level: 4, category: 'technical' },
      { name: 'Research Synthesis', level: 4, category: 'domain' },
      { name: 'Knowledge Management', level: 4, category: 'soft' }
    ],
    frameworks: ['Markdown', 'GitBook', 'Notion'],
    experience: 3,
    availability: 'available',
    performanceRating: 4.3,
    communicationPreference: 'direct',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'AI technical writer focused on documenting innovation processes and research findings.'
  }
];

export const mockTeamCommunications: TeamCommunication[] = [
  {
    id: 'comm_1',
    teamId: 'team_1',
    fromAgentId: 'agent_1',
    toAgentId: 'agent_2',
    content: 'Can you review the new component designs for the dashboard?',
    type: 'task-assignment',
    timestamp: '2024-05-30T10:30:00Z',
    isRead: false,
    priority: 'medium'
  },
  {
    id: 'comm_2',
    teamId: 'team_2',
    fromAgentId: 'agent_4',
    content: 'Database optimization completed. Performance improved by 30%.',
    type: 'status-update',
    timestamp: '2024-05-30T14:15:00Z',
    isRead: true,
    priority: 'high'
  },
  {
    id: 'comm_3',
    teamId: 'team_3',
    fromAgentId: 'human_1',
    content: 'Team meeting scheduled for tomorrow at 2 PM to discuss Q2 goals.',
    type: 'announcement',
    timestamp: '2024-05-30T16:00:00Z',
    isRead: false,
    priority: 'medium'
  }
];

export const mockTeamTasks: TeamTask[] = [
  {
    id: 'task_1',
    title: 'Implement user authentication flow',
    description: 'Create login, registration, and password reset functionality',
    teamId: 'team_1',
    assignedAgentId: 'agent_1',
    status: 'in-progress',
    priority: 'high',
    deadline: '2024-06-15T00:00:00Z',
    createdAt: '2024-05-25T00:00:00Z',
    estimatedHours: 16,
    actualHours: 8,
    dependencies: ['task_3'],
    tags: ['frontend', 'authentication', 'security']
  },
  {
    id: 'task_2',
    title: 'Design system documentation',
    description: 'Document all components in the design system with usage examples',
    teamId: 'team_1',
    assignedAgentId: 'agent_2',
    status: 'review',
    priority: 'medium',
    deadline: '2024-06-10T00:00:00Z',
    createdAt: '2024-05-20T00:00:00Z',
    estimatedHours: 12,
    actualHours: 10,
    dependencies: [],
    tags: ['documentation', 'design-system']
  },
  {
    id: 'task_3',
    title: 'API endpoint security audit',
    description: 'Review and enhance security measures for all API endpoints',
    teamId: 'team_2',
    assignedAgentId: 'agent_4',
    status: 'completed',
    priority: 'urgent',
    deadline: '2024-05-30T00:00:00Z',
    createdAt: '2024-05-15T00:00:00Z',
    estimatedHours: 20,
    actualHours: 18,
    dependencies: [],
    tags: ['backend', 'security', 'api']
  },
  {
    id: 'task_4',
    title: 'Human-AI collaboration framework',
    description: 'Develop best practices for human-AI team collaboration',
    teamId: 'team_4',
    assignedAgentId: 'human_3',
    status: 'in-progress',
    priority: 'high',
    deadline: '2024-06-20T00:00:00Z',
    createdAt: '2024-05-28T00:00:00Z',
    estimatedHours: 24,
    actualHours: 6,
    dependencies: [],
    tags: ['innovation', 'collaboration', 'framework']
  }
];
