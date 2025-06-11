import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Rocket, 
  BookOpen, 
  Video, 
  MessageCircle,
  ExternalLink,
  CheckCircle,
  Star,
  Users,
  Lightbulb,
  ArrowRight,
  Play,
  Download,
  Heart,
  Trophy,
  Zap
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { OnboardingStepProps } from '../types';

export function NextStepsStep({ 
  userData, 
  onDataUpdate, 
  errors, 
  isLoading, 
  className 
}: OnboardingStepProps) {
  const [completedActions, setCompletedActions] = useState<string[]>([]);
  const [isCompleting, setIsCompleting] = useState(false);

  const quickActions = [
    {
      id: 'explore-dashboard',
      title: 'Explore Your Dashboard',
      description: 'Take a tour of your personalized project dashboard',
      icon: Rocket,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
      estimatedTime: '2 min'
    },
    {
      id: 'first-task',
      title: 'Create Your First Task',
      description: 'Start your project by creating your first development task',
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      estimatedTime: '3 min'
    },
    {
      id: 'meet-agents',
      title: 'Meet Your AI Agents',
      description: 'Get acquainted with your development team members',
      icon: Users,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20',
      estimatedTime: '5 min'
    }
  ];

  const resources = [
    {
      title: 'Getting Started Guide',
      description: 'Comprehensive guide to using Vibe DevSquad effectively',
      icon: BookOpen,
      color: 'text-orange-500',
      type: 'guide',
      url: '#'
    },
    {
      title: 'Video Tutorials',
      description: 'Watch step-by-step tutorials for common workflows',
      icon: Video,
      color: 'text-red-500',
      type: 'video',
      url: '#'
    },
    {
      title: 'Community Forum',
      description: 'Connect with other developers and get help',
      icon: MessageCircle,
      color: 'text-blue-500',
      type: 'community',
      url: '#'
    },
    {
      title: 'Best Practices',
      description: 'Learn proven strategies for AI-assisted development',
      icon: Lightbulb,
      color: 'text-yellow-500',
      type: 'tips',
      url: '#'
    }
  ];

  const achievements = [
    { title: 'Welcome Aboard!', description: 'Completed onboarding successfully', icon: Trophy },
    { title: 'Team Builder', description: 'Assembled your AI development team', icon: Users },
    { title: 'Project Pioneer', description: 'Set up your first project', icon: Rocket },
    { title: 'Communication Master', description: 'Configured notification preferences', icon: MessageCircle }
  ];

  const handleActionComplete = (actionId: string) => {
    if (!completedActions.includes(actionId)) {
      setCompletedActions(prev => [...prev, actionId]);
    }
  };

  const handleFinishOnboarding = async () => {
    setIsCompleting(true);
    
    // Simulate final setup
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsCompleting(false);
  };

  const completionPercentage = (completedActions.length / quickActions.length) * 100;

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
            className="p-3 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl"
          >
            <Rocket className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold">You're All Set!</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Congratulations! Your Vibe DevSquad workspace is ready. Here are some next steps 
          to help you make the most of your AI-powered development experience.
        </p>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">Your Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="p-4 text-center bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border-yellow-200 dark:border-yellow-800">
                <div className="flex flex-col items-center gap-2">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                    <achievement.icon className="w-5 h-5 text-yellow-600" />
                  </div>
                  <h3 className="font-medium text-sm">{achievement.title}</h3>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Quick Actions</h2>
          <div className="flex items-center gap-2">
            <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <span className="text-sm text-muted-foreground">
              {completedActions.length}/{quickActions.length}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => {
            const isCompleted = completedActions.includes(action.id);
            
            return (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card 
                  className={cn(
                    "p-6 cursor-pointer transition-all duration-300",
                    isCompleted 
                      ? "border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20" 
                      : "hover:shadow-lg"
                  )}
                  onClick={() => handleActionComplete(action.id)}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={cn(
                        "p-3 rounded-xl transition-all duration-300",
                        isCompleted ? action.bgColor : "bg-muted"
                      )}>
                        <action.icon className={cn(
                          "w-6 h-6",
                          isCompleted ? action.color : "text-muted-foreground"
                        )} />
                      </div>
                      <AnimatePresence>
                        {isCompleted && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={{ type: "spring" }}
                          >
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    
                    <div>
                      <h3 className={cn(
                        "font-semibold mb-2",
                        isCompleted && "text-green-700 dark:text-green-300"
                      )}>
                        {action.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {action.description}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {action.estimatedTime}
                      </Badge>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold">Helpful Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="p-4 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-muted rounded-lg">
                    <resource.icon className={cn("w-5 h-5", resource.color)} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Special Offer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="space-y-4"
      >
        <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
              <Heart className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
                Welcome Bonus: 7 Days Premium Free!
              </h3>
              <p className="text-purple-700 dark:text-purple-200 mb-4">
                As a new member, enjoy full access to premium features including advanced AI agents, 
                priority support, and unlimited projects for your first week.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200">
                  <Star className="w-3 h-3 mr-1" />
                  Premium AI Agents
                </Badge>
                <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200">
                  <Zap className="w-3 h-3 mr-1" />
                  Unlimited Projects
                </Badge>
                <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200">
                  <MessageCircle className="w-3 h-3 mr-1" />
                  Priority Support
                </Badge>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Complete Onboarding Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className="flex flex-col items-center gap-4 pt-4"
      >
        <Button
          size="lg"
          onClick={handleFinishOnboarding}
          disabled={isCompleting}
          className="gap-2 px-12 py-4 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          {isCompleting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Rocket className="w-5 h-5" />
              </motion.div>
              Launching Your Workspace...
            </>
          ) : (
            <>
              Start Building Amazing Things
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </Button>
        
        <p className="text-sm text-muted-foreground text-center max-w-md">
          You can always revisit these resources from your dashboard settings. 
          Welcome to the future of development!
        </p>
      </motion.div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-2 pt-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-2 h-2 bg-muted rounded-full" />
        ))}
        <div className="w-2 h-2 bg-primary rounded-full" />
        <span className="ml-3 text-sm text-muted-foreground">Step 6 of 6</span>
      </div>
    </div>
  );
}
