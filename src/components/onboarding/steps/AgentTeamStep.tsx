import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Users, 
  Code, 
  Palette, 
  Shield, 
  Database,
  TestTube,
  FileText,
  CheckCircle,
  Plus,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { OnboardingStepProps } from '../types';

interface AgentTeamStepProps extends OnboardingStepProps {
  projectType?: string;
}

export function AgentTeamStep({ 
  userData, 
  onDataUpdate, 
  errors, 
  isLoading, 
  className 
}: AgentTeamStepProps) {
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [isConfiguring, setIsConfiguring] = useState(false);

  const agentTypes = {
    'web-app': [
      {
        id: 'frontend-dev',
        name: 'Frontend Developer',
        icon: Code,
        description: 'Specializes in React, TypeScript, and modern frontend frameworks',
        skills: ['React', 'TypeScript', 'CSS', 'Testing'],
        color: 'text-blue-500',
        bgColor: 'bg-blue-50 dark:bg-blue-950/20',
        recommended: true
      },
      {
        id: 'ui-designer',
        name: 'UI/UX Designer',
        icon: Palette,
        description: 'Creates beautiful, user-friendly interfaces and experiences',
        skills: ['Design Systems', 'Accessibility', 'User Research', 'Prototyping'],
        color: 'text-purple-500',
        bgColor: 'bg-purple-50 dark:bg-purple-950/20',
        recommended: true
      },
      {
        id: 'backend-dev',
        name: 'Backend Developer',
        icon: Database,
        description: 'Builds robust APIs and server-side architecture',
        skills: ['Node.js', 'APIs', 'Databases', 'Authentication'],
        color: 'text-green-500',
        bgColor: 'bg-green-50 dark:bg-green-950/20',
        recommended: false
      },
      {
        id: 'qa-specialist',
        name: 'QA Specialist',
        icon: TestTube,
        description: 'Ensures code quality through testing and automation',
        skills: ['Testing', 'Automation', 'Quality Assurance', 'Performance'],
        color: 'text-orange-500',
        bgColor: 'bg-orange-50 dark:bg-orange-950/20',
        recommended: true
      },
      {
        id: 'security-expert',
        name: 'Security Expert',
        icon: Shield,
        description: 'Identifies vulnerabilities and implements security best practices',
        skills: ['Security Audits', 'OWASP', 'Penetration Testing', 'Compliance'],
        color: 'text-red-500',
        bgColor: 'bg-red-50 dark:bg-red-950/20',
        recommended: false
      },
      {
        id: 'tech-writer',
        name: 'Technical Writer',
        icon: FileText,
        description: 'Creates comprehensive documentation and guides',
        skills: ['Documentation', 'API Docs', 'User Guides', 'Tutorials'],
        color: 'text-indigo-500',
        bgColor: 'bg-indigo-50 dark:bg-indigo-950/20',
        recommended: false
      }
    ]
  };

  const availableAgents = agentTypes['web-app'];
  const recommendedAgents = availableAgents.filter(agent => agent.recommended);

  React.useEffect(() => {
    // Auto-select recommended agents
    setSelectedAgents(recommendedAgents.map(agent => agent.id));
  }, []);

  const toggleAgent = (agentId: string) => {
    setSelectedAgents(prev => 
      prev.includes(agentId) 
        ? prev.filter(id => id !== agentId)
        : [...prev, agentId]
    );
  };

  const handleConfigureTeam = async () => {
    setIsConfiguring(true);
    
    // Simulate team configuration
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update user data with selected agents
    onDataUpdate({ selectedAgents });
    setIsConfiguring(false);
  };

  return (
    <div className={cn("max-w-5xl mx-auto space-y-8", className)}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl"
          >
            <Users className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold">Build Your AI Team</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Select the AI agents that will work with you on this project. We've pre-selected 
          the most relevant agents based on your project type, but you can customize your team.
        </p>
      </motion.div>

      {/* Team Size Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex justify-center"
      >
        <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
          <div className="flex items-center gap-3">
            <Bot className="w-5 h-5 text-blue-600" />
            <span className="font-medium">
              Team Size: {selectedAgents.length} Agent{selectedAgents.length !== 1 ? 's' : ''}
            </span>
            <Badge variant="secondary">
              {selectedAgents.length >= 3 ? 'Optimal' : selectedAgents.length >= 2 ? 'Good' : 'Minimal'}
            </Badge>
          </div>
        </Card>
      </motion.div>

      {/* Agents Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {availableAgents.map((agent, index) => {
          const isSelected = selectedAgents.includes(agent.id);
          const isRecommended = agent.recommended;
          
          return (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={cn(
                  "p-6 cursor-pointer transition-all duration-300 hover:shadow-lg relative",
                  isSelected
                    ? "border-2 border-primary bg-primary/5 shadow-md"
                    : "border-2 border-transparent hover:border-muted"
                )}
                onClick={() => toggleAgent(agent.id)}
              >
                {/* Recommended Badge */}
                {isRecommended && (
                  <div className="absolute -top-2 -right-2">
                    <Badge className="gap-1 bg-yellow-500 hover:bg-yellow-600">
                      <Sparkles className="w-3 h-3" />
                      Recommended
                    </Badge>
                  </div>
                )}

                {/* Agent Info */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "p-3 rounded-xl transition-all duration-300",
                        isSelected ? agent.bgColor : "bg-muted",
                        isSelected && "scale-110"
                      )}>
                        <agent.icon className={cn(
                          "w-6 h-6",
                          isSelected ? agent.color : "text-muted-foreground"
                        )} />
                      </div>
                      <div>
                        <h3 className={cn(
                          "font-semibold text-lg transition-colors",
                          isSelected && "text-primary"
                        )}>
                          {agent.name}
                        </h3>
                      </div>
                    </div>
                    
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ type: "spring" }}
                        >
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {agent.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {agent.skills.map(skill => (
                      <Badge 
                        key={skill} 
                        variant="outline" 
                        className={cn(
                          "text-xs",
                          isSelected && "border-primary/30 bg-primary/10"
                        )}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Team Preview */}
      {selectedAgents.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
            <h4 className="font-medium text-green-900 dark:text-green-100 mb-3">
              Your AI Development Team
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedAgents.map(agentId => {
                const agent = availableAgents.find(a => a.id === agentId);
                return agent ? (
                  <Badge key={agentId} className="gap-2">
                    <agent.icon className="w-3 h-3" />
                    {agent.name}
                  </Badge>
                ) : null;
              })}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Configure Team Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex justify-center pt-4"
      >
        <Button
          size="lg"
          onClick={handleConfigureTeam}
          disabled={selectedAgents.length === 0 || isConfiguring}
          className="gap-2 px-8 py-3 text-lg"
        >
          {isConfiguring ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Bot className="w-5 h-5" />
              </motion.div>
              Configuring Team...
            </>
          ) : (
            <>
              Configure Team
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </Button>
      </motion.div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-2 pt-4">
        <div className="w-2 h-2 bg-muted rounded-full" />
        <div className="w-2 h-2 bg-muted rounded-full" />
        <div className="w-2 h-2 bg-primary rounded-full" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="w-2 h-2 bg-muted rounded-full" />
        ))}
        <span className="ml-3 text-sm text-muted-foreground">Step 3 of 6</span>
      </div>
    </div>
  );
}
