
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Feature } from './types';
import { FeatureDetails } from './FeatureDetails';

interface FeatureCardProps {
  feature: Feature;
  index: number;
  isVisible: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}

export const FeatureCard = ({ 
  feature, 
  index, 
  isVisible, 
  isExpanded, 
  onToggle 
}: FeatureCardProps) => {
  return (
    <Card
      data-feature-id={feature.id}
      className={`group relative overflow-hidden border-0 bg-gradient-to-br ${feature.gradient} 
                 backdrop-blur-sm hover:shadow-xl transition-all duration-500 cursor-pointer
                 ${isVisible 
                   ? 'opacity-100 translate-y-0' 
                   : 'opacity-0 translate-y-8'
                 }`}
      style={{ 
        transitionDelay: `${index * 100}ms`,
        boxShadow: '0 4px 20px -2px rgba(99, 102, 241, 0.1)'
      }}
      onClick={onToggle}
    >
      {/* Hover Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-vibe-primary/5 to-vibe-secondary/5 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardContent className="p-6 relative z-10">
        {/* Feature Icon */}
        <div className={`w-12 h-12 rounded-xl bg-background/80 border border-current/20 
                       flex items-center justify-center mb-4 group-hover:scale-110 
                       transition-transform duration-300 ${feature.color}`}>
          <feature.icon className="w-6 h-6" />
        </div>

        {/* Feature Title */}
        <h3 className="vibe-heading-md text-foreground mb-3 group-hover:text-vibe-primary 
                     transition-colors duration-300">
          {feature.title}
        </h3>

        {/* Feature Description */}
        <p className="vibe-body text-muted-foreground mb-4 leading-relaxed">
          {feature.description}
        </p>

        {/* Expand/Collapse Button */}
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-between p-3 h-auto bg-background/50 
                   hover:bg-background/80 border border-border/50"
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
        >
          <span className="text-sm font-medium">
            {isExpanded ? 'Show Less' : 'Learn More'}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </Button>

        {/* Expandable Details */}
        <FeatureDetails feature={feature} isExpanded={isExpanded} />
      </CardContent>

      {/* Feature Number Badge */}
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-vibe-primary/10 
                    border border-vibe-primary/20 flex items-center justify-center">
        <span className="text-xs font-bold text-vibe-primary">
          {(index + 1).toString().padStart(2, '0')}
        </span>
      </div>
    </Card>
  );
};
