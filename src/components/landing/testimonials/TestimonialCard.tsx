
import React from 'react';
import { Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Testimonial } from './types';

interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive?: boolean;
  className?: string;
}

export const TestimonialCard = ({ testimonial, isActive = false, className = '' }: TestimonialCardProps) => {
  return (
    <Card className={`
      relative overflow-hidden bg-gradient-to-br from-background/80 to-background/60 
      backdrop-blur-sm border-vibe-primary/10 hover:border-vibe-primary/20 
      transition-all duration-500 h-full
      ${isActive ? 'scale-105 shadow-xl border-vibe-primary/30' : 'shadow-lg hover:shadow-xl'}
      ${className}
    `}>
      <CardContent className="p-8 h-full flex flex-col">
        {/* Quote Icon */}
        <div className="mb-6">
          <Quote className={`w-8 h-8 transition-colors duration-300 ${
            isActive ? 'text-vibe-primary' : 'text-vibe-primary/60'
          }`} />
        </div>

        {/* Quote Text */}
        <blockquote className="flex-1 mb-8">
          <p className="vibe-body-lg text-foreground leading-relaxed italic">
            "{testimonial.quote}"
          </p>
        </blockquote>

        {/* Author Attribution */}
        <div className="border-t border-vibe-primary/10 pt-6">
          <div className="flex items-center gap-4">
            {/* Avatar Placeholder */}
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br transition-all duration-300 ${
              isActive 
                ? 'from-vibe-primary to-vibe-secondary' 
                : 'from-vibe-primary/60 to-vibe-secondary/60'
            } flex items-center justify-center`}>
              <span className="text-white font-semibold text-sm">
                {testimonial.author.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>

            {/* Author Info */}
            <div>
              <div className="vibe-heading-sm text-foreground mb-1">
                {testimonial.author.name}
              </div>
              <div className="vibe-body-sm text-muted-foreground">
                {testimonial.author.title}
                {testimonial.author.company && (
                  <>
                    <br />
                    <span className="text-vibe-primary">{testimonial.author.company}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Featured Badge */}
        {testimonial.featured && (
          <div className="absolute top-4 right-4">
            <div className="px-3 py-1 bg-vibe-primary/10 border border-vibe-primary/20 rounded-full">
              <span className="text-xs font-medium text-vibe-primary">Featured</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
