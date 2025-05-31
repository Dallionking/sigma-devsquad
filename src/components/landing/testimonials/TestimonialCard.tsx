
import React from 'react';
import { Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Testimonial } from './types';

interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive?: boolean;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  testimonial, 
  isActive = false 
}) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <Card className={`relative overflow-hidden border-0 bg-gradient-to-br from-background to-muted/20 
                     backdrop-blur-sm transition-all duration-500 ${
                       isActive 
                         ? 'scale-105 shadow-2xl border-vibe-primary/20' 
                         : 'scale-100 shadow-lg hover:shadow-xl'
                     }`}>
      {/* Background Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-500 ${
        isActive 
          ? 'from-vibe-primary/10 to-vibe-secondary/10 opacity-100' 
          : 'from-vibe-primary/5 to-vibe-secondary/5 opacity-0 group-hover:opacity-100'
      }`} />
      
      <CardContent className="p-8 relative z-10">
        {/* Quote Icon */}
        <div className={`flex items-center justify-center w-12 h-12 rounded-full mb-6 transition-all duration-300 ${
          isActive 
            ? 'bg-vibe-primary/20 text-vibe-primary scale-110' 
            : 'bg-muted text-muted-foreground'
        }`}>
          <Quote className="w-6 h-6" />
        </div>

        {/* Testimonial Quote */}
        <blockquote className={`vibe-body-lg leading-relaxed mb-8 transition-all duration-300 ${
          isActive ? 'text-foreground' : 'text-muted-foreground'
        }`}>
          "{testimonial.quote}"
        </blockquote>

        {/* Author Information */}
        <div className="flex items-center gap-4">
          <Avatar className={`w-12 h-12 border-2 transition-all duration-300 ${
            isActive ? 'border-vibe-primary' : 'border-border'
          }`}>
            <AvatarFallback className={`font-semibold transition-all duration-300 ${
              isActive 
                ? 'bg-vibe-primary/20 text-vibe-primary' 
                : 'bg-muted text-muted-foreground'
            }`}>
              {getInitials(testimonial.author.name)}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <div className={`font-semibold transition-colors duration-300 ${
              isActive ? 'text-foreground' : 'text-muted-foreground'
            }`}>
              {testimonial.author.name}
            </div>
            <div className={`text-sm transition-colors duration-300 ${
              isActive ? 'text-vibe-primary' : 'text-muted-foreground/80'
            }`}>
              {testimonial.author.title}
            </div>
          </div>
        </div>

        {/* Active Indicator */}
        {isActive && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-vibe-primary to-vibe-secondary" />
        )}
      </CardContent>
    </Card>
  );
};
