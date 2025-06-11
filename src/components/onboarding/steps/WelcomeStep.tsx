import { motion } from 'framer-motion';
import { 
  Bot, 
  Users, 
  CheckSquare, 
  MessageSquare, 
  Zap, 
  Sparkles,
  ArrowRight 
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { OnboardingStepProps } from '../types';

export function WelcomeStep({ 
  userData, 
  onDataUpdate, 
  errors, 
  isLoading, 
  className 
}: OnboardingStepProps) {
  const handleNameChange = (name: string) => {
    onDataUpdate({ userName: name });
  };

  const handleRoleChange = (role: string) => {
    onDataUpdate({ userRole: role as any });
  };

  const features = [
    {
      icon: Bot,
      title: "AI-Powered Development",
      description: "Smart agents that understand your code and help you build faster"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Seamless collaboration tools for distributed development teams"
    },
    {
      icon: CheckSquare,
      title: "Task Management",
      description: "Intelligent task tracking with automated progress updates"
    },
    {
      icon: MessageSquare,
      title: "Smart Communication",
      description: "Context-aware notifications and team communication"
    }
  ];

  return (
    <div className={cn("space-y-8", className)}>
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Welcome to Vibe DevSquad
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Your AI-powered development companion that transforms how you build, collaborate, and ship software.
        </p>
      </motion.div>

      {/* User Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Let's get to know you</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="userName">What should we call you?</Label>
              <Input
                id="userName"
                placeholder="Enter your name"
                value={userData.userName || ''}
                onChange={(e) => handleNameChange(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userRole">What's your primary role?</Label>
              <Select value={userData.userRole || ''} onValueChange={handleRoleChange} disabled={isLoading}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="developer">Developer</SelectItem>
                  <SelectItem value="designer">Designer</SelectItem>
                  <SelectItem value="manager">Project Manager</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
          >
            <Card className="p-6 h-full hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Getting Started CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center"
      >
        <Card className="p-8 bg-gradient-to-r from-primary/5 to-blue-600/5 border-primary/20">
          <div className="space-y-4">
            <Zap className="h-12 w-12 text-primary mx-auto" />
            <h3 className="text-xl font-semibold">Ready to supercharge your development?</h3>
            <p className="text-muted-foreground">
              Let's set up your first project and build your AI development team.
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
