
import React from 'react';
import { TrendingUp, Clock, Users, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ROICalculator = () => {
  const roiMetrics = [
    {
      icon: Clock,
      title: 'Time Saved',
      value: '40%',
      description: 'Reduction in development coordination time',
    },
    {
      icon: TrendingUp,
      title: 'Productivity Boost',
      value: '65%',
      description: 'Increase in team productivity and output',
    },
    {
      icon: Users,
      title: 'Team Efficiency',
      value: '3x',
      description: 'Faster onboarding and collaboration setup',
    },
    {
      icon: DollarSign,
      title: 'Cost Savings',
      value: '$50K+',
      description: 'Annual savings on development overhead',
    },
  ];

  return (
    <div className="mt-16 fade-in-up stagger-4">
      <div className="text-center mb-12">
        <h3 className="vibe-heading-md text-foreground mb-4">
          <span className="vibe-gradient-text">Proven ROI Impact</span>
        </h3>
        <p className="vibe-body-lg text-muted-foreground max-w-2xl mx-auto">
          See the measurable impact Vibe DevSquad has on development teams worldwide
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {roiMetrics.map((metric, index) => (
          <Card key={index} className="text-center border-vibe-primary/10 hover:border-vibe-primary/20 transition-all duration-300 hover:shadow-lg">
            <CardHeader className="pb-4">
              <div className="mx-auto w-12 h-12 bg-vibe-primary/10 rounded-full flex items-center justify-center mb-4">
                <metric.icon className="w-6 h-6 text-vibe-primary" />
              </div>
              <CardTitle className="text-2xl font-bold vibe-gradient-text">
                {metric.value}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <h4 className="font-semibold text-foreground mb-2">{metric.title}</h4>
              <p className="vibe-body-sm text-muted-foreground">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
