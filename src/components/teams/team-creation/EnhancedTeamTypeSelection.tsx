
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TeamType, TeamComposition } from '@/types/teams';
import { getTeamTypeIcon } from '@/utils/teamVisualUtils';
import { CheckCircle, Users, Bot, GitMerge, Lightbulb, ArrowRight } from 'lucide-react';
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
    case 'human': return 'Human';
    case 'ai': return 'AI';
    case 'hybrid': return 'Hybrid';
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
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold">Choose Your Team Type</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Select the primary focus area for your team. Each type comes with tailored recommendations for composition, tools, and workflows.
        </p>
      </div>

      {/* Compact Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {teamTypeOptions.map((option) => (
          <Card
            key={option.type}
            className={cn(
              "cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] group",
              selectedType === option.type && "ring-2 ring-primary bg-primary/5 shadow-lg"
            )}
            onClick={() => onTypeSelect(option.type)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{getTeamTypeIcon(option.type)}</div>
                  <div className="flex-1">
                    <CardTitle className="text-lg leading-tight">{option.label}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                  </div>
                </div>
                {selectedType === option.type ? (
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h5 className="text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-wide">Key Capabilities</h5>
                <div className="flex flex-wrap gap-1">
                  {option.capabilities.slice(0, 3).map((capability) => (
                    <Badge key={capability} variant="secondary" className="text-xs px-2 py-1">
                      {capability}
                    </Badge>
                  ))}
                  {option.capabilities.length > 3 && (
                    <Badge variant="outline" className="text-xs px-2 py-1">
                      +{option.capabilities.length - 3}
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <h5 className="text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-wide">Best For</h5>
                <div className="flex flex-wrap gap-2">
                  {option.recommendedComposition.map((comp) => {
                    const Icon = getCompositionIcon(comp);
                    return (
                      <div key={comp} className="flex items-center gap-1 text-xs bg-muted/50 rounded px-2 py-1">
                        <Icon className="w-3 h-3" />
                        <span>{getCompositionLabel(comp)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Selected Option Details */}
      {selectedOption && (
        <Card className="bg-gradient-to-br from-primary/5 via-primary/3 to-transparent border-primary/20 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="text-4xl">{getTeamTypeIcon(selectedOption.type)}</div>
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  {selectedOption.label}
                  <Lightbulb className="w-5 h-5 text-primary" />
                </CardTitle>
                <p className="text-muted-foreground">{selectedOption.description}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Core Capabilities
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {selectedOption.capabilities.map((capability) => (
                    <div key={capability} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span>{capability}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Common Tools & Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedOption.toolsUsed.map((tool) => (
                    <Badge key={tool} variant="outline" className="text-xs">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Example Use Cases</h4>
              <p className="text-sm text-muted-foreground bg-muted/30 rounded-lg p-3">
                {selectedOption.example}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Recommended Team Compositions</h4>
              <div className="grid gap-3">
                {selectedOption.recommendedComposition.map((comp) => {
                  const Icon = getCompositionIcon(comp);
                  return (
                    <div key={comp} className="flex items-center gap-3 p-3 rounded-lg bg-background/60 border">
                      <Icon className="w-5 h-5 text-primary" />
                      <div>
                        <span className="font-medium text-sm">{getCompositionLabel(comp)} Team</span>
                        <p className="text-xs text-muted-foreground mt-1">
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
