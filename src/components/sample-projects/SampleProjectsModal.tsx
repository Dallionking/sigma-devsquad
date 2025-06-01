
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code2, Globe, Smartphone, Database, Palette, Bot, Clock, Users, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SampleProject {
  id: string;
  title: string;
  description: string;
  category: 'web' | 'mobile' | 'backend' | 'fullstack';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  tags: string[];
  icon: React.ComponentType<any>;
  features: string[];
  agents: Array<{
    role: string;
    description: string;
  }>;
  popular?: boolean;
}

const sampleProjects: SampleProject[] = [
  {
    id: 'todo-app',
    title: 'Todo Application',
    description: 'A modern task management app with real-time updates and team collaboration.',
    category: 'web',
    difficulty: 'beginner',
    estimatedTime: '2-3 hours',
    tags: ['React', 'TypeScript', 'Tailwind'],
    icon: Code2,
    popular: true,
    features: [
      'Task creation and management',
      'Real-time collaboration',
      'Priority levels and due dates',
      'Team workspaces'
    ],
    agents: [
      { role: 'Frontend Developer', description: 'React components and UI' },
      { role: 'Backend Developer', description: 'API and data management' }
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
    icon: Globe,
    features: [
      'Responsive design',
      'Project showcase',
      'Contact form',
      'Blog integration'
    ],
    agents: [
      { role: 'Frontend Developer', description: 'UI components and animations' },
      { role: 'Designer', description: 'Layout and visual design' }
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
    icon: Database,
    popular: true,
    features: [
      'Product catalog',
      'Shopping cart and checkout',
      'Payment processing',
      'Admin dashboard',
      'Order management'
    ],
    agents: [
      { role: 'Frontend Developer', description: 'Store interface and cart' },
      { role: 'Backend Developer', description: 'API and payment processing' },
      { role: 'Database Designer', description: 'Data modeling and optimization' }
    ]
  },
  {
    id: 'mobile-weather',
    title: 'Weather App',
    description: 'Beautiful weather application with location-based forecasts.',
    category: 'mobile',
    difficulty: 'intermediate',
    estimatedTime: '1 week',
    tags: ['React Native', 'API Integration', 'Maps'],
    icon: Smartphone,
    features: [
      'Current weather display',
      '7-day forecast',
      'Location detection',
      'Weather maps',
      'Push notifications'
    ],
    agents: [
      { role: 'Mobile Developer', description: 'React Native components' },
      { role: 'API Developer', description: 'Weather service integration' }
    ]
  },
  {
    id: 'design-system',
    title: 'Design System',
    description: 'Comprehensive design system with reusable components and documentation.',
    category: 'web',
    difficulty: 'intermediate',
    estimatedTime: '1-2 weeks',
    tags: ['Storybook', 'TypeScript', 'Design Tokens'],
    icon: Palette,
    features: [
      'Component library',
      'Design tokens',
      'Interactive documentation',
      'Accessibility guidelines',
      'Usage examples'
    ],
    agents: [
      { role: 'Design System Engineer', description: 'Component architecture' },
      { role: 'Documentation Writer', description: 'Usage guides and examples' }
    ]
  },
  {
    id: 'ai-chatbot',
    title: 'AI Chatbot',
    description: 'Intelligent chatbot with natural language processing and custom training.',
    category: 'fullstack',
    difficulty: 'advanced',
    estimatedTime: '2-3 weeks',
    tags: ['AI/ML', 'NLP', 'Chat Interface'],
    icon: Bot,
    features: [
      'Natural language understanding',
      'Context awareness',
      'Custom training data',
      'Multi-language support',
      'Analytics dashboard'
    ],
    agents: [
      { role: 'AI Developer', description: 'Model training and NLP' },
      { role: 'Frontend Developer', description: 'Chat interface' },
      { role: 'Backend Developer', description: 'API and data processing' }
    ]
  }
];

interface SampleProjectsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SampleProjectsModal = ({ open, onOpenChange }: SampleProjectsModalProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { toast } = useToast();

  const filteredProjects = selectedCategory === 'all' 
    ? sampleProjects 
    : sampleProjects.filter(project => project.category === selectedCategory);

  const handleCreateProject = (project: SampleProject) => {
    toast({
      title: "Project Created!",
      description: `${project.title} has been added to your workspace. Check your dashboard to start working.`,
    });
    onOpenChange(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span>Sample Projects</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="web">Web</TabsTrigger>
            <TabsTrigger value="mobile">Mobile</TabsTrigger>
            <TabsTrigger value="backend">Backend</TabsTrigger>
            <TabsTrigger value="fullstack">Full Stack</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => {
                const Icon = project.icon;
                return (
                  <Card key={project.id} className="h-full flex flex-col">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg flex items-center space-x-2">
                              <span>{project.title}</span>
                              {project.popular && (
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              )}
                            </CardTitle>
                          </div>
                        </div>
                      </div>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>

                    <CardContent className="flex-1 space-y-4">
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className={getDifficultyColor(project.difficulty)}>
                          {project.difficulty}
                        </Badge>
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{project.estimatedTime}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {project.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm mb-2">Key Features:</h4>
                        <ul className="text-sm space-y-1">
                          {project.features.slice(0, 3).map((feature, index) => (
                            <li key={index} className="text-muted-foreground">• {feature}</li>
                          ))}
                          {project.features.length > 3 && (
                            <li className="text-muted-foreground">+ {project.features.length - 3} more</li>
                          )}
                        </ul>
                      </div>

                      <div>
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-2">
                          <Users className="w-3 h-3" />
                          <span>{project.agents.length} agents needed</span>
                        </div>
                      </div>

                      <Button 
                        onClick={() => handleCreateProject(project)}
                        className="w-full"
                      >
                        Create Project
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
