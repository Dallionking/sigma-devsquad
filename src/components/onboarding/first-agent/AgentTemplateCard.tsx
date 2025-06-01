
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
  Beginner: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  Intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
  Advanced: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
};

export const AgentTemplateCard = ({ template, isSelected, onSelect }: AgentTemplateCardProps) => {
  const Icon = iconMap[template.icon as keyof typeof iconMap] || Code2;

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 agent-template-card",
        isSelected && "ring-2 ring-primary border-primary shadow-lg"
      )}
      onClick={() => onSelect(template)}
      style={{ backgroundColor: 'hsl(var(--card))' }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center",
              isSelected ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
            )}>
              <Icon className="w-5 h-5" />
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
            className={cn("text-xs", difficultyColors[template.difficulty])}
          >
            {template.difficulty}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{template.description}</p>
        
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium mb-2">Specialization</h4>
            <Badge variant="secondary" className="text-xs">
              {template.specialization}
            </Badge>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Key Capabilities</h4>
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
          className="w-full mt-4"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(template);
          }}
        >
          {isSelected ? '✓ Selected' : 'Select Template'}
        </Button>
      </CardContent>
    </Card>
  );
};
