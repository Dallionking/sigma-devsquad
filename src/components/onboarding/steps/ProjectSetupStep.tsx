import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FolderPlus, 
  Code, 
  Globe, 
  Smartphone, 
  Database, 
  Palette,
  CheckCircle,
  ArrowRight,
  Lightbulb
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { OnboardingStepProps } from '../types';

interface ProjectSetupStepProps extends OnboardingStepProps {
}

export function ProjectSetupStep({ 
  userData, 
  onDataUpdate, 
  errors, 
  isLoading, 
  className 
}: ProjectSetupStepProps) {
  const [isCreating, setIsCreating] = useState(false);

  const handleProjectNameChange = (name: string) => {
    onDataUpdate({ projectName: name });
  };

  const handleProjectTypeChange = (type: string) => {
    onDataUpdate({ projectType: type as any });
  };

  const handleDescriptionChange = (description: string) => {
    onDataUpdate({ projectDescription: description });
  };

  const projectTypes = [
    {
      id: 'web-app',
      icon: Globe,
      title: 'Web Application',
      description: 'React, Next.js, or Vue.js applications',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
      borderColor: 'border-blue-200 dark:border-blue-800'
    },
    {
      id: 'mobile-app',
      icon: Smartphone,
      title: 'Mobile Application',
      description: 'React Native or Flutter mobile apps',
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      borderColor: 'border-green-200 dark:border-green-800'
    },
    {
      id: 'api-backend',
      icon: Database,
      title: 'API & Backend',
      description: 'Node.js, Python, or Go backend services',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20',
      borderColor: 'border-purple-200 dark:border-purple-800'
    },
    {
      id: 'ui-library',
      icon: Palette,
      title: 'UI Component Library',
      description: 'Design systems and component libraries',
      color: 'text-pink-500',
      bgColor: 'bg-pink-50 dark:bg-pink-950/20',
      borderColor: 'border-pink-200 dark:border-pink-800'
    }
  ];

  const handleCreateProject = async () => {
    if (!userData.projectName?.trim() || !userData.projectType) return;

    setIsCreating(true);
    
    // Simulate project creation API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update user data with additional project info
    onDataUpdate({ 
      projectId: `project_${Date.now()}`,
      projectCreatedAt: new Date().toISOString()
    });
    setIsCreating(false);
  };

  return (
    <div className={cn("max-w-4xl mx-auto space-y-8", className)}>
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
            className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl"
          >
            <FolderPlus className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold">Create Your First Project</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Let's set up your development environment. Choose your project type and give it a name.
          Your AI agents will be configured based on your selection.
        </p>
      </motion.div>

      {/* Project Name Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-3"
      >
        <Label htmlFor="project-name" className="text-lg font-medium">
          Project Name
        </Label>
        <div className="relative">
          <Input
            id="project-name"
            placeholder="e.g., My Awesome App, E-commerce Platform, Task Manager..."
            value={userData.projectName}
            onChange={(e) => handleProjectNameChange(e.target.value)}
            className="text-lg py-3 px-4"
          />
          {userData.projectName && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <CheckCircle className="w-5 h-5 text-green-500" />
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Project Type Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <Label className="text-lg font-medium">
          What type of project are you building?
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projectTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={cn(
                  "p-6 cursor-pointer transition-all duration-300 hover:shadow-lg",
                  userData.projectType === type.id
                    ? `border-2 ${type.borderColor} ${type.bgColor} shadow-md`
                    : "border-2 border-transparent hover:border-muted"
                )}
                onClick={() => handleProjectTypeChange(type.id)}
              >
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "p-3 rounded-xl transition-all duration-300",
                    userData.projectType === type.id ? type.bgColor : "bg-muted",
                    userData.projectType === type.id && "scale-110"
                  )}>
                    <type.icon className={cn(
                      "w-6 h-6",
                      userData.projectType === type.id ? type.color : "text-muted-foreground"
                    )} />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className={cn(
                        "font-semibold text-lg transition-colors",
                        userData.projectType === type.id && "text-primary"
                      )}>
                        {type.title}
                      </h3>
                      {userData.projectType === type.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring" }}
                        >
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </motion.div>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {type.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* AI Agent Preview */}
      {userData.projectType && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Lightbulb className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                  AI Agents for Your Project
                </h4>
                <p className="text-blue-700 dark:text-blue-200 text-sm">
                  Based on your selection, we'll configure specialized AI agents including a 
                  {userData.projectType === 'web-app' && ' Frontend Developer, UI/UX Designer, and Testing Specialist'}
                  {userData.projectType === 'mobile-app' && ' Mobile Developer, Platform Specialist, and Performance Optimizer'}
                  {userData.projectType === 'api-backend' && ' Backend Developer, Database Architect, and Security Specialist'}
                  {userData.projectType === 'ui-library' && ' Design System Expert, Component Architect, and Documentation Specialist'}
                  .
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Create Project Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex justify-center pt-4"
      >
        <Button
          size="lg"
          onClick={handleCreateProject}
          disabled={!userData.projectName.trim() || !userData.projectType || isCreating}
          className="gap-2 px-8 py-3 text-lg"
        >
          {isCreating ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Code className="w-5 h-5" />
              </motion.div>
              Creating Project...
            </>
          ) : (
            <>
              Create Project
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </Button>
      </motion.div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-2 pt-4">
        <div className="w-2 h-2 bg-muted rounded-full" />
        <div className="w-2 h-2 bg-primary rounded-full" />
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-2 h-2 bg-muted rounded-full" />
        ))}
        <span className="ml-3 text-sm text-muted-foreground">Step 2 of 6</span>
      </div>
    </div>
  );
}
