
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ExampleItem {
  title: string;
  description: string;
}

interface HelpExamplesSectionProps {
  examples: ExampleItem[];
}

export const HelpExamplesSection = ({ examples }: HelpExamplesSectionProps) => {
  return (
    <div className="space-y-3">
      {examples.map((example, index) => (
        <Card key={index}>
          <CardContent className="pt-4">
            <h4 className="font-medium text-sm mb-2">{example.title}</h4>
            <p className="text-sm text-muted-foreground">{example.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
