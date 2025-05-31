
import React from 'react';
import { AlertTriangle, Clock, Zap, Users, TrendingDown, ArrowRight } from 'lucide-react';

const problemPoints = [
  {
    icon: Zap,
    text: "Juggling endless toolsets without clear integration"
  },
  {
    icon: AlertTriangle,
    text: "Managing context loss and chaotic workflows"
  },
  {
    icon: Clock,
    text: "Constant firefighting rather than strategic planning"
  },
  {
    icon: Users,
    text: "Excessive coordination overhead between specialized teams"
  },
  {
    icon: TrendingDown,
    text: "Scaling challenges that decrease productivity as teams grow"
  }
];

const fragmentationData = [
  { tool: 'Communication', inefficiency: 85, color: 'bg-red-500' },
  { tool: 'Code Review', inefficiency: 70, color: 'bg-orange-500' },
  { tool: 'Documentation', inefficiency: 90, color: 'bg-red-600' },
  { tool: 'Planning', inefficiency: 65, color: 'bg-yellow-500' },
  { tool: 'Deployment', inefficiency: 75, color: 'bg-orange-600' }
];

export const LandingProblemSection = () => {
  return (
    <section id="problem" className="section-padding bg-gradient-to-b from-background to-muted/20">
      <div className="container-responsive">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Section */}
          <div className="order-2 lg:order-1">
            {/* Headline */}
            <h2 className="section-heading mb-8 text-foreground fade-in-up">
              Stop Losing Time to{' '}
              <span className="vibe-gradient-text">Disconnected Tools</span>{' '}
              and Fragmented Communication
            </h2>

            {/* Subtitle */}
            <p className="vibe-body-lg text-muted-foreground mb-8 fade-in-up stagger-1">
              Dev teams face critical hurdles:
            </p>

            {/* Problem Points */}
            <div className="space-y-4 mb-8">
              {problemPoints.map((point, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg bg-background/50 border border-red-200/20 hover:border-red-300/30 transition-all duration-300 fade-in-up"
                  style={{ animationDelay: `${(index + 2) * 200}ms` }}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mt-1">
                    <point.icon className="w-4 h-4 text-red-600" />
                  </div>
                  <p className="vibe-body text-foreground leading-relaxed">
                    {point.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Solution Statement */}
            <div className="p-6 rounded-xl bg-gradient-to-r from-vibe-primary/5 to-vibe-secondary/5 border border-vibe-primary/20 fade-in-up stagger-4">
              <p className="vibe-body-lg text-foreground leading-relaxed">
                <strong className="vibe-gradient-text">Vibe DevSquad</strong> was built to seamlessly 
                organize and orchestrate—restoring clarity and efficiency.
              </p>
              <div className="flex items-center gap-2 mt-4 text-vibe-primary">
                <span className="vibe-body font-medium">See how we solve this</span>
                <ArrowRight className="w-4 h-4 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Visualization Section */}
          <div className="order-1 lg:order-2 fade-in-up stagger-2">
            <div className="relative">
              {/* Main Visualization Card */}
              <div className="vibe-card p-6 bg-gradient-to-br from-background/80 to-background border-2 border-red-200/30">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="vibe-heading-md text-foreground">Development Fragmentation</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-sm text-red-600 font-medium">Critical</span>
                  </div>
                </div>

                {/* Time Loss Visualization */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <span className="vibe-body-sm text-muted-foreground">Time Lost to Coordination</span>
                    <span className="text-2xl font-bold text-red-600">47%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: '47%' }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Average time developers spend on coordination vs. actual coding
                  </p>
                </div>

                {/* Fragmentation Bars */}
                <div className="space-y-4">
                  <h4 className="vibe-body font-semibold text-foreground mb-4">Tool Inefficiency by Category</h4>
                  {fragmentationData.map((item, index) => (
                    <div key={item.tool} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="vibe-body-sm text-foreground font-medium">{item.tool}</span>
                        <span className="vibe-body-sm text-red-600 font-semibold">{item.inefficiency}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${item.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                          style={{ 
                            width: `${item.inefficiency}%`,
                            animationDelay: `${index * 200}ms`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Impact Stats */}
                <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-red-200/20">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600 mb-1">3.2x</div>
                    <div className="text-xs text-muted-foreground">Longer Delivery</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600 mb-1">68%</div>
                    <div className="text-xs text-muted-foreground">More Bugs</div>
                  </div>
                </div>
              </div>

              {/* Floating Problem Indicators */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              
              {/* Chaos Lines */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
                <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path 
                    d="M10,10 Q50,80 90,20 Q30,90 70,30" 
                    stroke="rgb(239, 68, 68)" 
                    strokeWidth="0.5" 
                    fill="none"
                    className="animate-pulse"
                  />
                  <path 
                    d="M20,90 Q80,20 40,60 Q90,80 10,40" 
                    stroke="rgb(239, 68, 68)" 
                    strokeWidth="0.5" 
                    fill="none"
                    className="animate-pulse"
                    style={{ animationDelay: '1s' }}
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
