
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Code2, Server, Settings, TestTube, Layers, Smartphone, BarChart3, Palette } from 'lucide-react';
import { AgentTemplate } from './types';
import { cn } from '@/lib/utils';

interface AgentTemplateCardProps {
  template: AgentTemplate;
  isSelected: boolean;
  onSelect: (template: AgentTemplate) => void;
}

const iconMap = {
  Code2,
  Server,
  Settings,
  TestTube,
  Layers,
  Smartphone,
  BarChart3,
  Palette
};

const difficultyColors = {
  Beginner: 'bg-green-100 text-green-800',
  Intermediate: 'bg-yellow-100 text-yellow-800',
  Advanced: 'bg-red-100 text-red-800'
};

export const AgentTemplateCard = ({ template, isSelected, onSelect }: AgentTemplateCardProps) => {
  const Icon = iconMap[template.icon as keyof typeof iconMap] || Code2;

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all hover:shadow-md hover:scale-[1.02]",
        isSelected && "ring-2 ring-primary border-primary"
      )}
      onClick={() => onSelect(template)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg flex items-center space-x-2">
                <span>{template.name}</span>
                {template.popular && (
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                )}
              </CardTitle>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className={difficultyColors[template.difficulty]}
          >
            {template.difficulty}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{template.description}</p>
        
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium mb-2">Core Skills</h4>
            <div className="flex flex-wrap gap-1">
              {template.skills.slice(0, 4).map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {template.skills.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{template.skills.length - 4} more
                </Badge>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Capabilities</h4>
            <div className="flex flex-wrap gap-1">
              {template.capabilities.slice(0, 3).map((capability) => (
                <Badge key={capability} variant="outline" className="text-xs">
                  {capability}
                </Badge>
              ))}
              {template.capabilities.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{template.capabilities.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <Button 
          variant={isSelected ? "default" : "outline"} 
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(template);
          }}
        >
          {isSelected ? 'Selected' : 'Select Template'}
        </Button>
      </CardContent>
    </Card>
  );
};
