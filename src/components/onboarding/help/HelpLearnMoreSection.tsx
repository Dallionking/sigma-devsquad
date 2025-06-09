
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

interface LearnMoreLink {
  title: string;
  description: string;
}

interface HelpLearnMoreSectionProps {
  links: LearnMoreLink[];
}

export const HelpLearnMoreSection = ({ links }: HelpLearnMoreSectionProps) => {
  return (
    <div className="space-y-2">
      {links.map((link, index) => (
        <Card key={index} className="cursor-pointer hover:bg-accent/50 transition-colors">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-sm mb-1">{link.title}</h4>
                <p className="text-xs text-muted-foreground">{link.description}</p>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
