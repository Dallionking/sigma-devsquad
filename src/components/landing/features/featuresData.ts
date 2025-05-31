
import { 
  Users, 
  MessageSquare, 
  Zap, 
  Monitor, 
  Settings, 
  FileCode, 
  FileText, 
  Shield, 
  Database, 
  Cloud
} from 'lucide-react';
import { Feature } from './types';

export const features: Feature[] = [
  {
    id: 'hierarchical-structure',
    title: 'Hierarchical Agent Team Structure',
    icon: Users,
    description: 'Orchestrated development with specialized agents that mirror professional development organizations.',
    details: [
      'Planning Agent (CEO) orchestrates and aligns development efforts',
      'Specialized Frontend, Backend, DevOps, and QA agents ensure precision',
      'Team-based context sharing eliminates fragmented information',
      'Collaboration patterns that mirror professional development organizations'
    ],
    color: 'text-blue-600',
    gradient: 'from-blue-500/10 to-blue-600/10'
  },
  {
    id: 'communication-hub',
    title: 'Advanced Communication Hub',
    icon: MessageSquare,
    description: 'Visualize and optimize real-time communication flows with comprehensive external integrations.',
    details: [
      'Visualize real-time communication and agent interaction flows',
      'Track communication metrics and instantly analyze message effectiveness',
      'Seamless external integrations with Discord and Telegram for notifications',
      'Interactive Team Communication Flow visualization'
    ],
    color: 'text-purple-600',
    gradient: 'from-purple-500/10 to-purple-600/10'
  },
  {
    id: 'task-management',
    title: 'Intelligent Task Management',
    icon: Zap,
    description: 'Automated task breakdown with real-time progress tracking and dynamic resource allocation.',
    details: [
      'Automated task breakdown from high-level objectives',
      'Real-time progress tracking and dynamic task assignment',
      'Visual bottleneck analysis to proactively address delays',
      'Dynamic resource allocation based on project needs'
    ],
    color: 'text-green-600',
    gradient: 'from-green-500/10 to-green-600/10'
  },
  {
    id: 'comprehensive-dashboard',
    title: 'Comprehensive Dashboard',
    icon: Monitor,
    description: 'Real-time insights with customizable views and project health indicators at a glance.',
    details: [
      'Real-time insights into team performance and resource utilization',
      'Customizable views tailored to your priorities',
      'Project health indicators at a glance',
      'Team performance metrics and agent status monitoring'
    ],
    color: 'text-cyan-600',
    gradient: 'from-cyan-500/10 to-cyan-600/10'
  },
  {
    id: 'llm-integration',
    title: 'Customizable LLM Integration',
    icon: Settings,
    description: 'Model customization and intelligent cost management with role-based parameter optimization.',
    details: [
      'Model customization and assignment based on agent specialization',
      'Optimize performance and manage costs with intelligent model usage',
      'Parameter customization for different agent roles and tasks',
      'Cost management to optimize LLM usage'
    ],
    color: 'text-orange-600',
    gradient: 'from-orange-500/10 to-orange-600/10'
  },
  {
    id: 'tool-integration',
    title: 'Enterprise Tool Integration',
    icon: FileCode,
    description: 'Direct integration with IDEs, Git workflows, and enterprise systems through flexible APIs.',
    details: [
      'Direct integration with IDEs, Git workflows, CI/CD, and project management tools',
      'Flexible APIs for connecting enterprise-specific systems',
      'Seamless connection with existing development tools and environments',
      'Integration with version control systems and development pipelines'
    ],
    color: 'text-indigo-600',
    gradient: 'from-indigo-500/10 to-indigo-600/10'
  },
  {
    id: 'knowledge-management',
    title: 'Knowledge Management System',
    icon: FileText,
    description: 'Centralized documentation with context preservation and continuous learning capabilities.',
    details: [
      'Centralized, automatically generated documentation',
      'Context preservation and seamless knowledge transfer across teams',
      'Unified knowledge base accessible to all agents with perfect recall',
      'Continuous learning from project experiences and outcomes'
    ],
    color: 'text-emerald-600',
    gradient: 'from-emerald-500/10 to-emerald-600/10'
  },
  {
    id: 'state-management',
    title: 'Robust State Management',
    icon: Database,
    description: 'Real-time collaboration with persistent state and optimized cross-component communication.',
    details: [
      'Real-time collaboration and persistent state maintenance',
      'Optimized cross-component communication',
      'Consistent data access across all components and agents',
      'Data persistence across sessions and system restarts'
    ],
    color: 'text-violet-600',
    gradient: 'from-violet-500/10 to-violet-600/10'
  },
  {
    id: 'enterprise-security',
    title: 'Enterprise-Grade Security',
    icon: Shield,
    description: 'Role-based access with encrypted communications and comprehensive audit logging.',
    details: [
      'Role-based access, secure encrypted communications, and comprehensive audit logs',
      'Regulatory compliance built-in',
      'Comprehensive audit logging for compliance and security',
      'Secure handling of sensitive project information'
    ],
    color: 'text-red-600',
    gradient: 'from-red-500/10 to-red-600/10'
  },
  {
    id: 'deployment-flexibility',
    title: 'Deployment Flexibility',
    icon: Cloud,
    description: 'Choose on-premise, cloud-based, or hybrid deployments with Docker containerization.',
    details: [
      'Choose on-premise, cloud-based, or hybrid deployments',
      'Docker-based containerization for consistent deployment and scaling',
      'Local installation for individual developers',
      'Cloud-based SaaS for accessibility and scalability'
    ],
    color: 'text-sky-600',
    gradient: 'from-sky-500/10 to-sky-600/10'
  }
];
