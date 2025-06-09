
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code2, Globe, Smartphone, Database, Palette, Bot, Clock, Users, Star, CheckCircle, ArrowRight } from 'lucide-react';
import { useProjectTemplates } from '@/contexts/ProjectTemplateContext';
import { cn } from '@/lib/utils';

const iconMap = {
  'todo-app': Code2,
  'portfolio': Globe,
  'mobile-weather': Smartphone,
  'ecommerce': Database,
  'design-system': Palette,
  'ai-chatbot': Bot
};

interface SampleProjectsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SampleProjectsModal = ({ open, onOpenChange }: SampleProjectsModalProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const { templates, createProjectFromTemplate } = useProjectTemplates();

  const filteredProjects = selectedCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  const handleCreateProject = async (templateId: string) => {
    await createProjectFromTemplate(templateId);
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

  const getEstimatedTasks = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    return template?.tasks?.length || 0;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span>Project Templates</span>
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
              {filteredProjects.map((template) => {
                const Icon = iconMap[template.id as keyof typeof iconMap] || Code2;
                const estimatedTasks = getEstimatedTasks(template.id);
                
                return (
                  <Card key={template.id} className="h-full flex flex-col group hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg flex items-center space-x-2">
                              <span>{template.title}</span>
                              {template.popular && (
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              )}
                            </CardTitle>
                          </div>
                        </div>
                      </div>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>

                    <CardContent className="flex-1 space-y-4">
                      <div className="flex items-center space-x-2 flex-wrap gap-2">
                        <Badge variant="secondary" className={getDifficultyColor(template.difficulty)}>
                          {template.difficulty}
                        </Badge>
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{template.estimatedTime}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <CheckCircle className="w-3 h-3" />
                          <span>{estimatedTasks} tasks</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {template.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm mb-2">Key Features:</h4>
                        <ul className="text-sm space-y-1">
                          {template.features.slice(0, 3).map((feature, index) => (
                            <li key={index} className="text-muted-foreground flex items-start space-x-2">
                              <span className="text-primary mt-0.5">•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                          {template.features.length > 3 && (
                            <li className="text-muted-foreground">+ {template.features.length - 3} more</li>
                          )}
                        </ul>
                      </div>

                      <div>
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-2">
                          <Users className="w-3 h-3" />
                          <span>{template.agents.length} specialized agents</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {template.agents.slice(0, 2).map((agent, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {agent.role}
                            </Badge>
                          ))}
                          {template.agents.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{template.agents.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <Button 
                        onClick={() => handleCreateProject(template.id)}
                        className="w-full group-hover:bg-primary/90 transition-colors flex items-center space-x-2"
                      >
                        <span>Start with Template</span>
                        <ArrowRight className="w-4 h-4" />
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
