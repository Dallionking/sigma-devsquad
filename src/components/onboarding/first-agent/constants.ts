
import { AgentTemplate } from './types';

export const agentTemplates: AgentTemplate[] = [
  {
    id: 'frontend-react',
    name: 'React Developer',
    type: 'frontend',
    description: 'Specializes in React applications, component development, and modern frontend practices',
    icon: 'Code2',
    skills: ['React', 'TypeScript', 'CSS', 'HTML', 'JavaScript'],
    capabilities: ['Component Development', 'State Management', 'UI/UX Implementation', 'Testing'],
    difficulty: 'Intermediate',
    popular: true
  },
  {
    id: 'backend-node',
    name: 'Node.js Developer',
    type: 'backend',
    description: 'Expert in Node.js APIs, database design, and server-side architecture',
    icon: 'Server',
    skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'API Design'],
    capabilities: ['API Development', 'Database Management', 'Authentication', 'Performance Optimization'],
    difficulty: 'Intermediate',
    popular: true
  },
  {
    id: 'devops-aws',
    name: 'DevOps Engineer',
    type: 'devops',
    description: 'Handles CI/CD pipelines, cloud infrastructure, and deployment automation',
    icon: 'Settings',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Linux'],
    capabilities: ['Infrastructure Management', 'Deployment Automation', 'Monitoring', 'Security'],
    difficulty: 'Advanced',
    popular: true
  },
  {
    id: 'qa-automation',
    name: 'QA Engineer',
    type: 'qa',
    description: 'Ensures quality through automated testing and quality assurance processes',
    icon: 'TestTube',
    skills: ['Jest', 'Cypress', 'Selenium', 'Test Planning', 'Bug Tracking'],
    capabilities: ['Test Automation', 'Quality Assurance', 'Bug Detection', 'Performance Testing'],
    difficulty: 'Intermediate',
    popular: false
  },
  {
    id: 'fullstack-general',
    name: 'Full-Stack Developer',
    type: 'fullstack',
    description: 'Versatile developer comfortable with both frontend and backend technologies',
    icon: 'Layers',
    skills: ['React', 'Node.js', 'Database Design', 'REST APIs', 'Git'],
    capabilities: ['End-to-End Development', 'System Architecture', 'Database Design', 'Integration'],
    difficulty: 'Advanced',
    popular: true
  },
  {
    id: 'mobile-react-native',
    name: 'Mobile Developer',
    type: 'mobile',
    description: 'Builds cross-platform mobile applications using React Native',
    icon: 'Smartphone',
    skills: ['React Native', 'Mobile UI', 'App Store Deployment', 'Native APIs'],
    capabilities: ['Mobile App Development', 'Platform Integration', 'Performance Optimization', 'Store Deployment'],
    difficulty: 'Intermediate',
    popular: false
  },
  {
    id: 'data-analyst',
    name: 'Data Analyst',
    type: 'data',
    description: 'Analyzes data, creates visualizations, and provides business insights',
    icon: 'BarChart3',
    skills: ['Python', 'SQL', 'Data Visualization', 'Statistics', 'Excel'],
    capabilities: ['Data Analysis', 'Report Generation', 'Visualization', 'Business Intelligence'],
    difficulty: 'Beginner',
    popular: false
  },
  {
    id: 'ui-designer',
    name: 'UI/UX Designer',
    type: 'design',
    description: 'Creates user interfaces and experiences with focus on usability and aesthetics',
    icon: 'Palette',
    skills: ['Figma', 'Design Systems', 'Prototyping', 'User Research', 'Typography'],
    capabilities: ['Interface Design', 'User Experience', 'Prototyping', 'Design Systems'],
    difficulty: 'Beginner',
    popular: false
  }
];

export const skillCategories = {
  frontend: ['React', 'Vue', 'Angular', 'TypeScript', 'JavaScript', 'CSS', 'HTML', 'Tailwind'],
  backend: ['Node.js', 'Python', 'Java', 'Express', 'FastAPI', 'Spring Boot', 'REST APIs', 'GraphQL'],
  devops: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Linux', 'Terraform', 'Jenkins', 'Git'],
  qa: ['Jest', 'Cypress', 'Selenium', 'Test Planning', 'Automation', 'Performance Testing'],
  design: ['Figma', 'Sketch', 'Prototyping', 'Design Systems', 'User Research', 'Typography'],
  data: ['Python', 'SQL', 'Data Analysis', 'Machine Learning', 'Visualization', 'Statistics']
};
