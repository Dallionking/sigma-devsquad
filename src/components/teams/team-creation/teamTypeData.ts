
import { TeamType, TeamComposition } from '@/types/teams';

export interface TeamTypeOption {
  type: TeamType;
  label: string;
  description: string;
  capabilities: string[];
  recommendedComposition: TeamComposition[];
  toolsUsed: string[];
  example: string;
}

export const teamTypeOptions: TeamTypeOption[] = [
  {
    type: 'frontend',
    label: 'Frontend Development',
    description: 'Build user interfaces and user experiences',
    capabilities: ['UI/UX Design', 'Component Development', 'State Management', 'Performance Optimization'],
    recommendedComposition: ['human', 'hybrid'],
    toolsUsed: ['React', 'TypeScript', 'Tailwind CSS', 'Figma'],
    example: 'E-commerce product pages, dashboard interfaces'
  },
  {
    type: 'backend',
    label: 'Backend Development',
    description: 'Build server-side logic and APIs',
    capabilities: ['API Development', 'Database Design', 'Authentication', 'Performance Tuning'],
    recommendedComposition: ['human', 'ai', 'hybrid'],
    toolsUsed: ['Node.js', 'PostgreSQL', 'REST APIs', 'Docker'],
    example: 'User authentication systems, payment processing APIs'
  },
  {
    type: 'devops',
    label: 'DevOps & Infrastructure',
    description: 'Manage deployment and infrastructure',
    capabilities: ['CI/CD Pipelines', 'Infrastructure as Code', 'Monitoring', 'Security'],
    recommendedComposition: ['human', 'ai'],
    toolsUsed: ['AWS/GCP', 'Kubernetes', 'Terraform', 'GitHub Actions'],
    example: 'Automated deployment pipelines, cloud infrastructure'
  },
  {
    type: 'qa',
    label: 'Quality Assurance',
    description: 'Ensure software quality through testing',
    capabilities: ['Test Automation', 'Manual Testing', 'Performance Testing', 'Bug Tracking'],
    recommendedComposition: ['human', 'ai', 'hybrid'],
    toolsUsed: ['Jest', 'Cypress', 'Selenium', 'Postman'],
    example: 'Automated test suites, regression testing'
  },
  {
    type: 'data',
    label: 'Data & Analytics',
    description: 'Process and analyze data insights',
    capabilities: ['Data Analysis', 'Machine Learning', 'Data Visualization', 'ETL Processes'],
    recommendedComposition: ['ai', 'hybrid'],
    toolsUsed: ['Python', 'SQL', 'Tableau', 'TensorFlow'],
    example: 'Customer behavior analysis, predictive models'
  },
  {
    type: 'design',
    label: 'Design & UX',
    description: 'Create visual designs and user experiences',
    capabilities: ['UI Design', 'User Research', 'Prototyping', 'Design Systems'],
    recommendedComposition: ['human', 'hybrid'],
    toolsUsed: ['Figma', 'Adobe XD', 'Sketch', 'Principle'],
    example: 'Mobile app designs, design system components'
  },
  {
    type: 'product',
    label: 'Product Management',
    description: 'Define product strategy and requirements',
    capabilities: ['Roadmap Planning', 'User Stories', 'Market Research', 'Stakeholder Management'],
    recommendedComposition: ['human', 'hybrid'],
    toolsUsed: ['Jira', 'Confluence', 'Miro', 'Analytics Tools'],
    example: 'Feature roadmaps, user journey mapping'
  }
];

export const getCompositionIcon = (composition: TeamComposition) => {
  switch (composition) {
    case 'human': return 'Users';
    case 'ai': return 'Bot';
    case 'hybrid': return 'GitMerge';
  }
};

export const getCompositionLabel = (composition: TeamComposition) => {
  switch (composition) {
    case 'human': return 'Human';
    case 'ai': return 'AI';
    case 'hybrid': return 'Hybrid';
  }
};
