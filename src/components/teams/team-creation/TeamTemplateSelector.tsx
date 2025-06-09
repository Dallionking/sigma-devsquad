
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TeamType, TeamComposition } from '@/types/teams';
import { getTeamTypeIcon } from '@/utils/teamVisualUtils';
import { Users, Bot, GitMerge, Star, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TeamTemplate {
  id: string;
  name: string;
  type: TeamType;
  composition: TeamComposition;
  description: string;
  memberCount: number;
  roles: string[];
  isPopular?: boolean;
  isRecommended?: boolean;
  objectives: string[];
}

const teamTemplates: TeamTemplate[] = [
  {
    id: 'startup-frontend',
    name: 'Startup Frontend Team',
    type: 'frontend',
    composition: 'hybrid',
    description: 'Fast-moving team for rapid UI development and prototyping',
    memberCount: 3,
    roles: ['Frontend Lead', 'UI/UX Designer', 'AI Assistant'],
    isPopular: true,
    objectives: ['Rapid prototyping', 'User experience optimization', 'Component library development']
  },
  {
    id: 'enterprise-backend',
    name: 'Enterprise Backend Team',
    type: 'backend',
    composition: 'human',
    description: 'Robust team for scalable enterprise-grade backend systems',
    memberCount: 5,
    roles: ['Backend Lead', 'Senior Developer', 'Database Engineer', 'DevOps Engineer', 'Security Specialist'],
    isRecommended: true,
    objectives: ['Scalable architecture', 'Security compliance', 'Performance optimization']
  },
  {
    id: 'ai-powered-qa',
    name: 'AI-Powered QA Team',
    type: 'qa',
    composition: 'ai',
    description: 'Automated testing team with AI-driven test generation',
    memberCount: 4,
    roles: ['Test Automation Lead', 'AI Test Generator', 'Performance Tester', 'Bug Tracker'],
    objectives: ['Automated test coverage', 'Continuous testing', 'Quality metrics tracking']
  },
  {
    id: 'data-science-hybrid',
    name: 'Data Science Hybrid Team',
    type: 'data',
    composition: 'hybrid',
    description: 'Mixed team combining human insights with AI processing power',
    memberCount: 4,
    roles: ['Data Scientist', 'ML Engineer', 'AI Analyst', 'Data Visualizer'],
    isPopular: true,
    objectives: ['Predictive modeling', 'Data visualization', 'Business intelligence']
  },
  {
    id: 'cloud-devops',
    name: 'Cloud DevOps Team',
    type: 'devops',
    composition: 'human',
    description: 'Infrastructure and deployment specialists for cloud environments',
    memberCount: 3,
    roles: ['DevOps Lead', 'Cloud Architect', 'Site Reliability Engineer'],
    objectives: ['Infrastructure automation', 'Deployment pipelines', 'System monitoring']
  },
  {
    id: 'design-system-team',
    name: 'Design System Team',
    type: 'design',
    composition: 'hybrid',
    description: 'Team focused on creating and maintaining design systems',
    memberCount: 4,
    roles: ['Design Lead', 'UI Designer', 'UX Researcher', 'AI Design Assistant'],
    isRecommended: true,
    objectives: ['Design consistency', 'Component libraries', 'User research']
  },
  {
    id: 'product-strategy',
    name: 'Product Strategy Team',
    type: 'product',
    composition: 'human',
    description: 'Strategic team for product planning and market analysis',
    memberCount: 3,
    roles: ['Product Manager', 'Business Analyst', 'Market Researcher'],
    objectives: ['Product roadmap', 'Market analysis', 'Feature prioritization']
  }
];

const getCompositionIcon = (composition: TeamComposition) => {
  switch (composition) {
    case 'human': return Users;
    case 'ai': return Bot;
    case 'hybrid': return GitMerge;
  }
};

interface TeamTemplateSelectorProps {
  selectedType?: TeamType;
  selectedTemplate?: string;
  onTemplateSelect: (template: TeamTemplate) => void;
  className?: string;
}

export const TeamTemplateSelector = ({
  selectedType,
  selectedTemplate,
  onTemplateSelect,
  className
}: TeamTemplateSelectorProps) => {
  const filteredTemplates = selectedType 
    ? teamTemplates.filter(template => template.type === selectedType)
    : teamTemplates;

  const recommendedTemplates = filteredTemplates.filter(t => t.isRecommended);
  const popularTemplates = filteredTemplates.filter(t => t.isPopular && !t.isRecommended);
  const otherTemplates = filteredTemplates.filter(t => !t.isRecommended && !t.isPopular);

  const renderTemplateCard = (template: TeamTemplate) => {
    const CompositionIcon = getCompositionIcon(template.composition);
    const isSelected = selectedTemplate === template.id;

    return (
      <Card
        key={template.id}
        className={cn(
          "cursor-pointer transition-all duration-200 hover:shadow-md",
          isSelected && "ring-2 ring-primary bg-primary/5"
        )}
        onClick={() => onTemplateSelect(template)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-xl">{getTeamTypeIcon(template.type)}</div>
              <div>
                <CardTitle className="text-sm">{template.name}</CardTitle>
                <div className="flex items-center gap-1 mt-1">
                  <CompositionIcon className="w-3 h-3" />
                  <span className="text-xs text-muted-foreground capitalize">
                    {template.composition} • {template.memberCount} members
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              {template.isRecommended && (
                <Badge variant="default" className="text-xs">
                  <Star className="w-3 h-3 mr-1" />
                  Recommended
                </Badge>
              )}
              {template.isPopular && (
                <Badge variant="secondary" className="text-xs">
                  <Zap className="w-3 h-3 mr-1" />
                  Popular
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">{template.description}</p>
          
          <div>
            <h5 className="text-xs font-medium mb-1">Team Roles</h5>
            <div className="flex flex-wrap gap-1">
              {template.roles.slice(0, 2).map((role) => (
                <Badge key={role} variant="outline" className="text-xs">
                  {role}
                </Badge>
              ))}
              {template.roles.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{template.roles.length - 2} more
                </Badge>
              )}
            </div>
          </div>

          <div>
            <h5 className="text-xs font-medium mb-1">Key Objectives</h5>
            <ul className="text-xs text-muted-foreground space-y-1">
              {template.objectives.slice(0, 2).map((objective, index) => (
                <li key={index}>• {objective}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (filteredTemplates.length === 0) {
    return (
      <div className={cn("text-center py-8", className)}>
        <p className="text-muted-foreground">No templates available for the selected team type.</p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      <div>
        <h3 className="text-lg font-semibold mb-2">Choose a Team Template</h3>
        <p className="text-sm text-muted-foreground">
          Select a pre-configured template to get started quickly, or customize as needed.
        </p>
      </div>

      {recommendedTemplates.length > 0 && (
        <div>
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500" />
            Recommended Templates
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedTemplates.map(renderTemplateCard)}
          </div>
        </div>
      )}

      {popularTemplates.length > 0 && (
        <div>
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-500" />
            Popular Templates
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {popularTemplates.map(renderTemplateCard)}
          </div>
        </div>
      )}

      {otherTemplates.length > 0 && (
        <div>
          <h4 className="font-medium mb-3">Other Templates</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {otherTemplates.map(renderTemplateCard)}
          </div>
        </div>
      )}
    </div>
  );
};
