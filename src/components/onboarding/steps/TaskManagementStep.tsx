import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckSquare, 
  Plus, 
  Clock, 
  User, 
  Flag,
  ArrowRight,
  Zap,
  Target,
  TrendingUp,
  PlayCircle,
  CheckCircle
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { OnboardingStepProps } from '../types';

interface TaskManagementStepProps extends OnboardingStepProps {
  onTaskCreated?: (task: any) => void;
}

export function TaskManagementStep({ 
  userData, 
  onDataUpdate, 
  errors, 
  isLoading, 
  className 
}: TaskManagementStepProps) {
  const [currentDemo, setCurrentDemo] = useState(0);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [demoTasks, setDemoTasks] = useState([
    {
      id: 1,
      title: 'Set up project structure',
      status: 'completed',
      assignee: 'Frontend Developer',
      priority: 'high',
      estimatedTime: '2h'
    },
    {
      id: 2,
      title: 'Design user authentication flow',
      status: 'in-progress',
      assignee: 'UI/UX Designer',
      priority: 'medium',
      estimatedTime: '4h'
    },
    {
      id: 3,
      title: 'Implement API endpoints',
      status: 'pending',
      assignee: 'Backend Developer',
      priority: 'high',
      estimatedTime: '6h'
    }
  ]);

  const demoSteps = [
    {
      title: 'Smart Task Creation',
      description: 'AI agents automatically break down your goals into actionable tasks',
      icon: Zap,
      color: 'text-blue-500'
    },
    {
      title: 'Intelligent Assignment',
      description: 'Tasks are automatically assigned to the most suitable AI agent',
      icon: Target,
      color: 'text-green-500'
    },
    {
      title: 'Progress Tracking',
      description: 'Real-time updates and insights on your project progress',
      icon: TrendingUp,
      color: 'text-purple-500'
    }
  ];

  const handleCreateDemoTask = async () => {
    if (!newTaskTitle.trim()) return;
    
    setIsCreatingTask(true);
    
    // Simulate AI task processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newTask = {
      id: demoTasks.length + 1,
      title: newTaskTitle,
      status: 'pending',
      assignee: 'AI Agent',
      priority: 'medium',
      estimatedTime: '3h'
    };
    
    setDemoTasks(prev => [...prev, newTask]);
    setNewTaskTitle('');
    setIsCreatingTask(false);
    // Task management is just a demo, no need to update user data
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200';
      case 'pending': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200';
    }
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
            className="p-3 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl"
          >
            <CheckSquare className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold">Smart Task Management</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Experience how AI agents transform your ideas into organized, actionable tasks. 
          Watch the magic happen as your project goals become a structured development plan.
        </p>
      </motion.div>

      {/* Demo Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {demoSteps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="p-6 h-full text-center space-y-4 hover:shadow-lg transition-all duration-300">
              <div className={cn(
                "w-12 h-12 mx-auto rounded-xl flex items-center justify-center",
                "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700"
              )}>
                <step.icon className={cn("w-6 h-6", step.color)} />
              </div>
              <h3 className="font-semibold text-lg">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.description}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Interactive Demo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="space-y-6"
      >
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Try It Yourself</h2>
          <p className="text-muted-foreground">Create a task and see how AI agents handle it</p>
        </div>

        {/* Task Creation */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex gap-3">
              <Input
                placeholder="e.g., Create a login page, Add user authentication, Build a dashboard..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleCreateDemoTask()}
              />
              <Button 
                onClick={handleCreateDemoTask}
                disabled={!newTaskTitle.trim() || isCreatingTask}
                className="gap-2"
              >
                {isCreatingTask ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Zap className="w-4 h-4" />
                    </motion.div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Create Task
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>

        {/* Task List */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Project Tasks</h3>
              <Badge variant="outline" className="gap-1">
                <CheckSquare className="w-3 h-3" />
                {demoTasks.filter(t => t.status === 'completed').length} / {demoTasks.length} Complete
              </Badge>
            </div>

            <div className="space-y-3">
              <AnimatePresence>
                {demoTasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      {task.status === 'completed' ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : task.status === 'in-progress' ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <PlayCircle className="w-5 h-5 text-blue-500" />
                        </motion.div>
                      ) : (
                        <Clock className="w-5 h-5 text-gray-400" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className={cn(
                        "font-medium",
                        task.status === 'completed' && "line-through text-muted-foreground"
                      )}>
                        {task.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <User className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{task.assignee}</span>
                        <Clock className="w-3 h-3 text-muted-foreground ml-2" />
                        <span className="text-xs text-muted-foreground">{task.estimatedTime}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(task.priority)}>
                        <Flag className="w-3 h-3 mr-1" />
                        {task.priority}
                      </Badge>
                      <Badge className={getStatusColor(task.status)}>
                        {task.status}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="flex justify-center pt-4"
      >
        <Button
          size="lg"
          onClick={() => onDataUpdate?.(null)}
          className="gap-2 px-8 py-3 text-lg"
        >
          Continue Setup
          <ArrowRight className="w-5 h-5" />
        </Button>
      </motion.div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-2 pt-4">
        <div className="w-2 h-2 bg-muted rounded-full" />
        <div className="w-2 h-2 bg-muted rounded-full" />
        <div className="w-2 h-2 bg-muted rounded-full" />
        <div className="w-2 h-2 bg-primary rounded-full" />
        {[...Array(2)].map((_, i) => (
          <div key={i} className="w-2 h-2 bg-muted rounded-full" />
        ))}
        <span className="ml-3 text-sm text-muted-foreground">Step 4 of 6</span>
      </div>
    </div>
  );
}
