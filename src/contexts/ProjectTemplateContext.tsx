
import React, { createContext, useContext, ReactNode } from 'react';
import { useProjects } from './ProjectContext';
import { useToast } from '@/hooks/use-toast';

interface ProjectTemplate {
  id: string;
  title: string;
  description: string;
  category: 'web' | 'mobile' | 'backend' | 'fullstack';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  tags: string[];
  features: string[];
  agents: Array<{
    role: string;
    description: string;
    specialization?: string;
  }>;
  tasks: Array<{
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    estimatedHours: number;
  }>;
  popular?: boolean;
}

interface ProjectTemplateContextType {
  templates: ProjectTemplate[];
  createProjectFromTemplate: (templateId: string) => Promise<void>;
  getTemplateById: (id: string) => ProjectTemplate | undefined;
  getTemplatesByCategory: (category: string) => ProjectTemplate[];
  getPopularTemplates: () => ProjectTemplate[];
}

const ProjectTemplateContext = createContext<ProjectTemplateContextType | undefined>(undefined);

export const useProjectTemplates = () => {
  const context = useContext(ProjectTemplateContext);
  if (context === undefined) {
    throw new Error('useProjectTemplates must be used within a ProjectTemplateProvider');
  }
  return context;
};

const projectTemplates: ProjectTemplate[] = [
  {
    id: 'todo-app',
    title: 'Todo Application',
    description: 'A modern task management app with real-time updates and team collaboration.',
    category: 'web',
    difficulty: 'beginner',
    estimatedTime: '2-3 hours',
    tags: ['React', 'TypeScript', 'Tailwind'],
    popular: true,
    features: [
      'Task creation and management',
      'Real-time collaboration',
      'Priority levels and due dates',
      'Team workspaces'
    ],
    agents: [
      { role: 'Frontend Developer', description: 'React components and UI', specialization: 'React/TypeScript' },
      { role: 'Backend Developer', description: 'API and data management', specialization: 'REST APIs' }
    ],
    tasks: [
      { title: 'Set up project structure', description: 'Initialize React project with TypeScript and Tailwind', priority: 'high', estimatedHours: 1 },
      { title: 'Create task components', description: 'Build task creation, editing, and display components', priority: 'high', estimatedHours: 3 },
      { title: 'Implement state management', description: 'Set up context for task management', priority: 'medium', estimatedHours: 2 },
      { title: 'Add priority system', description: 'Implement task prioritization features', priority: 'medium', estimatedHours: 2 }
    ]
  },
  {
    id: 'portfolio',
    title: 'Developer Portfolio',
    description: 'A stunning portfolio website to showcase your projects and skills.',
    category: 'web',
    difficulty: 'beginner',
    estimatedTime: '3-4 hours',
    tags: ['React', 'Framer Motion', 'Responsive'],
    features: [
      'Responsive design',
      'Project showcase',
      'Contact form',
      'Blog integration'
    ],
    agents: [
      { role: 'Frontend Developer', description: 'UI components and animations', specialization: 'React/CSS' },
      { role: 'Designer', description: 'Layout and visual design', specialization: 'UI/UX Design' }
    ],
    tasks: [
      { title: 'Design homepage layout', description: 'Create hero section and navigation', priority: 'high', estimatedHours: 2 },
      { title: 'Build project gallery', description: 'Implement project showcase with filtering', priority: 'high', estimatedHours: 3 },
      { title: 'Add contact form', description: 'Create functional contact form with validation', priority: 'medium', estimatedHours: 2 },
      { title: 'Implement animations', description: 'Add smooth transitions and micro-interactions', priority: 'low', estimatedHours: 2 }
    ]
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Platform',
    description: 'Full-featured online store with payment integration and admin dashboard.',
    category: 'fullstack',
    difficulty: 'advanced',
    estimatedTime: '1-2 weeks',
    tags: ['React', 'Node.js', 'Stripe', 'Database'],
    popular: true,
    features: [
      'Product catalog',
      'Shopping cart and checkout',
      'Payment processing',
      'Admin dashboard',
      'Order management'
    ],
    agents: [
      { role: 'Frontend Developer', description: 'Store interface and cart', specialization: 'React/E-commerce' },
      { role: 'Backend Developer', description: 'API and payment processing', specialization: 'Node.js/Stripe' },
      { role: 'Database Designer', description: 'Data modeling and optimization', specialization: 'SQL/NoSQL' }
    ],
    tasks: [
      { title: 'Set up product catalog', description: 'Create product display and filtering system', priority: 'high', estimatedHours: 8 },
      { title: 'Build shopping cart', description: 'Implement cart functionality with persistence', priority: 'high', estimatedHours: 6 },
      { title: 'Integrate payment system', description: 'Set up Stripe payment processing', priority: 'high', estimatedHours: 12 },
      { title: 'Create admin dashboard', description: 'Build admin interface for product management', priority: 'medium', estimatedHours: 16 }
    ]
  }
];

export const ProjectTemplateProvider = ({ children }: { children: ReactNode }) => {
  const { addProject } = useProjects();
  const { toast } = useToast();

  const createProjectFromTemplate = async (templateId: string) => {
    const template = projectTemplates.find(t => t.id === templateId);
    if (!template) {
      toast({
        title: "Template not found",
        description: "The selected template could not be found.",
        variant: "destructive"
      });
      return;
    }

    try {
      const newProject = addProject({
        name: template.title,
        description: template.description,
        status: 'active',
        progress: 0,
        startDate: new Date().toISOString().split('T')[0],
        targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
        team: template.agents.map(agent => agent.role),
        objectives: template.features
      });

      toast({
        title: "Project Created!",
        description: `${template.title} has been created from template. Start building your ${template.category} application!`,
      });

      console.log('Project created from template:', newProject);
    } catch (error) {
      toast({
        title: "Error creating project",
        description: "There was an error creating your project from the template.",
        variant: "destructive"
      });
    }
  };

  const getTemplateById = (id: string) => {
    return projectTemplates.find(template => template.id === id);
  };

  const getTemplatesByCategory = (category: string) => {
    return projectTemplates.filter(template => template.category === category);
  };

  const getPopularTemplates = () => {
    return projectTemplates.filter(template => template.popular);
  };

  return (
    <ProjectTemplateContext.Provider value={{
      templates: projectTemplates,
      createProjectFromTemplate,
      getTemplateById,
      getTemplatesByCategory,
      getPopularTemplates
    }}>
      {children}
    </ProjectTemplateContext.Provider>
  );
};
