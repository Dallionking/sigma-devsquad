
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TeamType, TeamComposition } from '@/types/teams';
import { getTeamTypeIcon } from '@/utils/teamVisualUtils';
import { CheckCircle, Users, Bot, GitMerge, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TeamTypeOption {
  type: TeamType;
  label: string;
  description: string;
  capabilities: string[];
  recommendedComposition: TeamComposition[];
  toolsUsed: string[];
  example: string;
}

const teamTypeOptions: TeamTypeOption[] = [
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

const getCompositionIcon = (composition: TeamComposition) => {
  switch (composition) {
    case 'human': return Users;
    case 'ai': return Bot;
    case 'hybrid': return GitMerge;
  }
};

const getCompositionLabel = (composition: TeamComposition) => {
  switch (composition) {
    case 'human': return 'Human Team';
    case 'ai': return 'AI Team';
    case 'hybrid': return 'Hybrid Team';
  }
};

interface EnhancedTeamTypeSelectionProps {
  selectedType: TeamType | "";
  onTypeSelect: (type: TeamType) => void;
  className?: string;
}

export const EnhancedTeamTypeSelection = ({
  selectedType,
  onTypeSelect,
  className
}: EnhancedTeamTypeSelectionProps) => {
  const selectedOption = teamTypeOptions.find(option => option.type === selectedType);

  return (
    <div className={cn("space-y-6", className)}>
      <div>
        <h3 className="text-lg font-semibold mb-2">Select Team Type</h3>
        <p className="text-sm text-muted-foreground">
          Choose the primary focus area for your team. This will help us recommend the right composition and tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamTypeOptions.map((option) => (
          <Card
            key={option.type}
            className={cn(
              "cursor-pointer transition-all duration-200 hover:shadow-md",
              selectedType === option.type && "ring-2 ring-primary bg-primary/5"
            )}
            onClick={() => onTypeSelect(option.type)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="text-2xl">{getTeamTypeIcon(option.type)}</div>
                {selectedType === option.type && (
                  <CheckCircle className="w-5 h-5 text-primary" />
                )}
              </div>
              <CardTitle className="text-base">{option.label}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{option.description}</p>
              
              <div>
                <h5 className="text-xs font-medium mb-1">Key Capabilities</h5>
                <div className="flex flex-wrap gap-1">
                  {option.capabilities.slice(0, 2).map((capability) => (
                    <Badge key={capability} variant="secondary" className="text-xs">
                      {capability}
                    </Badge>
                  ))}
                  {option.capabilities.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{option.capabilities.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <h5 className="text-xs font-medium mb-1">Recommended Composition</h5>
                <div className="flex gap-1">
                  {option.recommendedComposition.map((comp) => {
                    const Icon = getCompositionIcon(comp);
                    return (
                      <div key={comp} className="flex items-center gap-1">
                        <Icon className="w-3 h-3" />
                        <span className="text-xs">{getCompositionLabel(comp)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedOption && (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lightbulb className="w-5 h-5 text-primary" />
              {selectedOption.label} Team Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Core Capabilities</h4>
              <div className="grid grid-cols-2 gap-2">
                {selectedOption.capabilities.map((capability) => (
                  <div key={capability} className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    <span className="text-sm">{capability}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Common Tools & Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {selectedOption.toolsUsed.map((tool) => (
                  <Badge key={tool} variant="outline" className="text-xs">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Example Use Cases</h4>
              <p className="text-sm text-muted-foreground">{selectedOption.example}</p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Recommended Team Composition</h4>
              <div className="space-y-2">
                {selectedOption.recommendedComposition.map((comp) => {
                  const Icon = getCompositionIcon(comp);
                  return (
                    <div key={comp} className="flex items-center gap-3 p-2 rounded-lg bg-white/50 dark:bg-gray-800/50">
                      <Icon className="w-4 h-4" />
                      <div>
                        <span className="font-medium text-sm">{getCompositionLabel(comp)}</span>
                        <p className="text-xs text-muted-foreground">
                          {comp === 'human' && 'Best for creative problem-solving and complex decision-making'}
                          {comp === 'ai' && 'Ideal for automated tasks and consistent execution'}
                          {comp === 'hybrid' && 'Combines human creativity with AI efficiency'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
