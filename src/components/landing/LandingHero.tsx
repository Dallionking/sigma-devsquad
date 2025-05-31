
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Activity, Users, Zap, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AgentInteraction {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'idle';
  position: { x: number; y: number };
  task: string;
}

export const LandingHero = () => {
  const navigate = useNavigate();
  const [animationPhase, setAnimationPhase] = useState(0);

  const [agentInteractions, setAgentInteractions] = useState<AgentInteraction[]>([
    { id: '1', name: 'Code Agent', status: 'active', position: { x: 20, y: 30 }, task: 'Optimizing components' },
    { id: '2', name: 'Design Agent', status: 'active', position: { x: 60, y: 20 }, task: 'UI/UX refinement' },
    { id: '3', name: 'Test Agent', status: 'completed', position: { x: 80, y: 60 }, task: 'Running test suite' },
    { id: '4', name: 'Deploy Agent', status: 'idle', position: { x: 40, y: 70 }, task: 'Preparing deployment' },
  ]);

  useEffect(() => {
    const phases = [0, 1, 2, 3];
    let currentPhase = 0;

    const interval = setInterval(() => {
      currentPhase = (currentPhase + 1) % phases.length;
      setAnimationPhase(currentPhase);

      // Simulate agent status changes
      setAgentInteractions(prev => prev.map(agent => {
        const statusOptions: ('active' | 'completed' | 'idle')[] = ['active', 'completed', 'idle'];
        const randomStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)];
        return { ...agent, status: Math.random() > 0.7 ? randomStatus : agent.status };
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleRequestDemo = () => {
    navigate('/app');
  };

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-vibe-primary';
      case 'completed': return 'bg-green-500';
      case 'idle': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Activity className="w-3 h-3" />;
      case 'completed': return <CheckCircle className="w-3 h-3" />;
      case 'idle': return <Users className="w-3 h-3" />;
      default: return <Users className="w-3 h-3" />;
    }
  };

  return (
    <section className="relative py-20 sm:py-32 lg:py-40 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-vibe-primary/5 via-background to-vibe-accent/5">
        <div className="absolute inset-0 vibe-flow opacity-20" />
      </div>
      
      {/* Dynamic grid pattern with AI activity suggestion */}
      <div 
        className="absolute inset-0 opacity-10 transition-opacity duration-1000"
        style={{
          backgroundImage: `linear-gradient(rgba(99, 102, 241, ${0.1 + animationPhase * 0.05}) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(99, 102, 241, ${0.1 + animationPhase * 0.05}) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          transform: `translateX(${animationPhase * 2}px)`
        }}
      />

      <div className="relative container-responsive">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Section */}
          <div className="max-w-2xl">
            {/* Announcement badge with staggered animation */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-vibe-primary/10 border border-vibe-primary/20 rounded-full fade-in-up stagger-1">
              <Zap className="w-4 h-4 text-vibe-primary animate-pulse" />
              <span className="text-sm font-medium text-vibe-primary">
                Master Your Development Workflow
              </span>
            </div>

            {/* Main headline with staggered animation */}
            <h1 className="hero-heading mb-6 leading-tight fade-in-up stagger-2">
              Transform Development Complexity into
              <br />
              <span className="vibe-gradient-text">Streamlined Execution</span>
            </h1>

            {/* Subheadline with staggered animation */}
            <p className="vibe-body-lg text-muted-foreground mb-8 leading-relaxed fade-in-up stagger-3">
              Vibe DevSquad orchestrates your dev processes through intelligent multi-agent 
              collaboration—so you can deliver faster, smarter, and with absolute clarity.
            </p>

            {/* CTA buttons with staggered animation */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12 fade-in-up stagger-4">
              <Button 
                size="lg" 
                className="cta-button-lg vibe-btn-primary group"
                onClick={handleRequestDemo}
              >
                Request Your Demo
                <Play className="ml-2 w-5 h-5 transition-transform group-hover:scale-110" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="cta-button-lg border-vibe-primary/20 text-vibe-primary hover:bg-vibe-primary/10 group"
                onClick={handleGetStarted}
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            {/* Stats with staggered animation */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border fade-in-up stagger-4">
              <div className="text-center">
                <div className="vibe-heading-md text-vibe-primary mb-2">5x</div>
                <div className="text-sm text-muted-foreground">Faster Delivery</div>
              </div>
              <div className="text-center">
                <div className="vibe-heading-md text-vibe-secondary mb-2">90%</div>
                <div className="text-sm text-muted-foreground">Fewer Bugs</div>
              </div>
              <div className="text-center">
                <div className="vibe-heading-md text-vibe-accent mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">AI Collaboration</div>
              </div>
            </div>
          </div>

          {/* Interactive Dashboard Visualization */}
          <div className="relative lg:pl-8 fade-in-up stagger-3">
            <div className="relative vibe-card p-6 bg-gradient-to-br from-background/50 to-background border-2 border-vibe-primary/20 backdrop-blur-sm">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="vibe-heading-md text-foreground">Live Agent Dashboard</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-sm text-muted-foreground">Active</span>
                </div>
              </div>

              {/* Agent Interaction Visualization */}
              <div className="relative h-64 bg-gradient-to-br from-vibe-primary/5 to-vibe-secondary/5 rounded-lg border border-vibe-primary/10 overflow-hidden">
                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {agentInteractions.map((agent, index) => 
                    agentInteractions.slice(index + 1).map((otherAgent, otherIndex) => (
                      <line
                        key={`${agent.id}-${otherAgent.id}`}
                        x1={agent.position.x}
                        y1={agent.position.y}
                        x2={otherAgent.position.x}
                        y2={otherAgent.position.y}
                        stroke="rgba(99, 102, 241, 0.2)"
                        strokeWidth="0.5"
                        className="animate-pulse"
                      />
                    ))
                  )}
                </svg>

                {/* Agent nodes */}
                {agentInteractions.map((agent, index) => (
                  <div
                    key={agent.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 hover:scale-110 group cursor-pointer`}
                    style={{
                      left: `${agent.position.x}%`,
                      top: `${agent.position.y}%`,
                      animationDelay: `${index * 200}ms`
                    }}
                  >
                    <div className={`w-8 h-8 rounded-full ${getStatusColor(agent.status)} flex items-center justify-center text-white shadow-lg transition-all duration-300 group-hover:shadow-xl`}>
                      {getStatusIcon(agent.status)}
                    </div>
                    
                    {/* Agent tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-background border border-border rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                      <div className="text-xs font-medium text-foreground">{agent.name}</div>
                      <div className="text-xs text-muted-foreground">{agent.task}</div>
                    </div>
                  </div>
                ))}

                {/* Activity pulse waves */}
                <div className="absolute inset-0">
                  {agentInteractions.filter(agent => agent.status === 'active').map((agent) => (
                    <div
                      key={`pulse-${agent.id}`}
                      className="absolute w-16 h-16 border-2 border-vibe-primary/30 rounded-full animate-ping"
                      style={{
                        left: `calc(${agent.position.x}% - 32px)`,
                        top: `calc(${agent.position.y}% - 32px)`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Agent Status List */}
              <div className="mt-6 space-y-3">
                {agentInteractions.map((agent, index) => (
                  <div 
                    key={agent.id} 
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-200"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)}`} />
                      <span className="text-sm font-medium text-foreground">{agent.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{agent.task}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
