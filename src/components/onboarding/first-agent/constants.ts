
import { AgentTemplate } from './types';

export const AGENT_TEMPLATES: AgentTemplate[] = [
  {
    id: 'fullstack-dev',
    name: 'Full-Stack Developer',
    type: 'development',
    description: 'Expert in both frontend and backend development with modern frameworks',
    icon: '💻',
    skills: ['React', 'Node.js', 'TypeScript', 'SQL'],
    capabilities: ['Code Generation', 'API Design', 'Database Modeling', 'Testing'],
    difficulty: 'Intermediate',
    popular: true,
    role: 'developer',
    specialization: 'Full-stack development with React and Node.js'
  },
  {
    id: 'frontend-specialist',
    name: 'Frontend Specialist',
    type: 'development',
    description: 'Focused on modern UI/UX development and user experience',
    icon: '🎨',
    skills: ['React', 'TypeScript', 'CSS', 'Design Systems'],
    capabilities: ['Component Design', 'State Management', 'Performance Optimization', 'Accessibility'],
    difficulty: 'Beginner',
    popular: true,
    role: 'frontend',
    specialization: 'Modern frontend development with React and TypeScript'
  },
  {
    id: 'backend-engineer',
    name: 'Backend Engineer',
    type: 'development',
    description: 'Server-side development, APIs, and database architecture',
    icon: '⚙️',
    skills: ['Node.js', 'Python', 'SQL', 'Redis'],
    capabilities: ['API Development', 'Database Design', 'Performance Tuning', 'Security'],
    difficulty: 'Intermediate',
    popular: false,
    role: 'backend',
    specialization: 'Backend development with Node.js and database optimization'
  },
  {
    id: 'devops-expert',
    name: 'DevOps Expert',
    type: 'operations',
    description: 'Infrastructure, deployment, and development operations',
    icon: '🚀',
    skills: ['Docker', 'AWS', 'CI/CD', 'Kubernetes'],
    capabilities: ['Deployment Automation', 'Infrastructure as Code', 'Monitoring', 'Scaling'],
    difficulty: 'Advanced',
    popular: false,
    role: 'devops',
    specialization: 'DevOps and infrastructure automation'
  },
  {
    id: 'qa-engineer',
    name: 'QA Engineer',
    type: 'testing',
    description: 'Testing automation and quality assurance specialist',
    icon: '🧪',
    skills: ['Jest', 'Cypress', 'Playwright', 'Testing Strategies'],
    capabilities: ['Test Automation', 'Bug Detection', 'Performance Testing', 'Code Review'],
    difficulty: 'Intermediate',
    popular: false,
    role: 'qa',
    specialization: 'Quality assurance and test automation'
  },
  {
    id: 'product-manager',
    name: 'Product Manager',
    type: 'management',
    description: 'Product strategy, roadmap planning, and feature prioritization',
    icon: '📊',
    skills: ['Strategy', 'Analytics', 'User Research', 'Roadmapping'],
    capabilities: ['Feature Planning', 'User Story Creation', 'Analytics', 'Stakeholder Management'],
    difficulty: 'Beginner',
    popular: true,
    role: 'manager',
    specialization: 'Product management and strategic planning'
  }
];
