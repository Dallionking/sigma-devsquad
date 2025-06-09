
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface QuickAction {
  title: string;
  description: string;
}

interface HelpQuickActionsSectionProps {
  actions: QuickAction[];
}

export const HelpQuickActionsSection = ({ actions }: HelpQuickActionsSectionProps) => {
  return (
    <div className="space-y-2">
      {actions.map((action, index) => (
        <Card key={index} className="cursor-pointer hover:bg-accent/50 transition-colors">
          <CardContent className="pt-4">
            <h4 className="font-medium text-sm mb-1">{action.title}</h4>
            <p className="text-xs text-muted-foreground">{action.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
