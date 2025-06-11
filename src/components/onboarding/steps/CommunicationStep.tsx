import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Bell, 
  Mail, 
  Slack, 
  Github,
  Calendar,
  Settings,
  CheckCircle,
  ArrowRight,
  Bot,
  Users,
  Zap
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { OnboardingStepProps } from '../types';

interface CommunicationStepProps extends OnboardingStepProps {
  // Add any additional props specific to CommunicationStep here
}

export function CommunicationStep({ 
  userData, 
  onDataUpdate, 
  errors, 
  isLoading, 
  className 
}: CommunicationStepProps) {
  const [notifications, setNotifications] = useState({
    taskUpdates: true,
    agentMessages: true,
    projectMilestones: true,
    weeklyReports: false,
    emergencyAlerts: true
  });

  const [integrations, setIntegrations] = useState({
    slack: false,
    github: false,
    calendar: false,
    email: true
  });

  const [isConfiguring, setIsConfiguring] = useState(false);

  const notificationTypes = [
    {
      key: 'taskUpdates',
      title: 'Task Updates',
      description: 'Get notified when tasks are completed or need attention',
      icon: CheckCircle,
      color: 'text-green-500'
    },
    {
      key: 'agentMessages',
      title: 'Agent Messages',
      description: 'Receive important communications from your AI agents',
      icon: Bot,
      color: 'text-blue-500'
    },
    {
      key: 'projectMilestones',
      title: 'Project Milestones',
      description: 'Celebrate achievements and track major progress',
      icon: Zap,
      color: 'text-purple-500'
    },
    {
      key: 'weeklyReports',
      title: 'Weekly Reports',
      description: 'Comprehensive summaries of your project progress',
      icon: Calendar,
      color: 'text-orange-500'
    },
    {
      key: 'emergencyAlerts',
      title: 'Emergency Alerts',
      description: 'Critical issues that need immediate attention',
      icon: Bell,
      color: 'text-red-500'
    }
  ];

  const integrationOptions = [
    {
      key: 'slack',
      name: 'Slack',
      description: 'Get notifications in your Slack workspace',
      icon: Slack,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20'
    },
    {
      key: 'github',
      name: 'GitHub',
      description: 'Sync with your GitHub repositories and issues',
      icon: Github,
      color: 'text-gray-800 dark:text-gray-200',
      bgColor: 'bg-gray-50 dark:bg-gray-950/20'
    },
    {
      key: 'calendar',
      name: 'Calendar',
      description: 'Schedule meetings and deadlines automatically',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20'
    },
    {
      key: 'email',
      name: 'Email',
      description: 'Receive updates via email notifications',
      icon: Mail,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950/20'
    }
  ];

  const handleNotificationToggle = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handleIntegrationToggle = (key: string) => {
    setIntegrations(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handleFinishSetup = async () => {
    setIsConfiguring(true);
    
    // Simulate configuration
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const settings = {
      notifications,
      integrations,
      configuredAt: new Date().toISOString()
    };
    
    onDataUpdate?.(settings);
    setIsConfiguring(false);
  };

  const enabledNotifications = Object.values(notifications).filter(Boolean).length;
  const enabledIntegrations = Object.values(integrations).filter(Boolean).length;

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
            className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl"
          >
            <MessageSquare className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold">Communication Preferences</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Configure how you want to stay connected with your AI development team. 
          Set up notifications and integrations to match your workflow.
        </p>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="font-medium">Notifications</h3>
              <p className="text-sm text-muted-foreground">
                {enabledNotifications} of {notificationTypes.length} enabled
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-green-600" />
            <div>
              <h3 className="font-medium">Integrations</h3>
              <p className="text-sm text-muted-foreground">
                {enabledIntegrations} of {integrationOptions.length} connected
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Notification Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold">Notification Preferences</h2>
        <Card className="p-6">
          <div className="space-y-6">
            {notificationTypes.map((notification, index) => (
              <motion.div
                key={notification.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-muted rounded-lg">
                    <notification.icon className={cn("w-5 h-5", notification.color)} />
                  </div>
                  <div>
                    <Label htmlFor={notification.key} className="text-base font-medium cursor-pointer">
                      {notification.title}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                  </div>
                </div>
                <Switch
                  id={notification.key}
                  checked={notifications[notification.key as keyof typeof notifications]}
                  onCheckedChange={() => handleNotificationToggle(notification.key)}
                />
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Integration Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold">Platform Integrations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integrationOptions.map((integration, index) => (
            <motion.div
              key={integration.key}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card
                className={cn(
                  "p-6 cursor-pointer transition-all duration-300",
                  integrations[integration.key as keyof typeof integrations]
                    ? "border-2 border-primary bg-primary/5 shadow-md"
                    : "border-2 border-transparent hover:border-muted hover:shadow-lg"
                )}
                onClick={() => handleIntegrationToggle(integration.key)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "p-3 rounded-xl transition-all duration-300",
                      integrations[integration.key as keyof typeof integrations]
                        ? integration.bgColor
                        : "bg-muted"
                    )}>
                      <integration.icon className={cn(
                        "w-6 h-6",
                        integrations[integration.key as keyof typeof integrations]
                          ? integration.color
                          : "text-muted-foreground"
                      )} />
                    </div>
                    <div>
                      <h3 className={cn(
                        "font-semibold text-lg transition-colors",
                        integrations[integration.key as keyof typeof integrations] && "text-primary"
                      )}>
                        {integration.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {integration.description}
                      </p>
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {integrations[integration.key as keyof typeof integrations] && (
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
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Communication Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="space-y-4"
      >
        <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">
                Your Communication Hub
              </h4>
              <p className="text-purple-700 dark:text-purple-200 text-sm mb-3">
                With your settings, you'll receive updates through {enabledIntegrations} platform{enabledIntegrations !== 1 ? 's' : ''} 
                and {enabledNotifications} notification type{enabledNotifications !== 1 ? 's' : ''}.
              </p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(integrations)
                  .filter(([_, enabled]) => enabled)
                  .map(([key, _]) => {
                    const integration = integrationOptions.find(i => i.key === key);
                    return integration ? (
                      <Badge key={key} variant="secondary" className="gap-1">
                        <integration.icon className="w-3 h-3" />
                        {integration.name}
                      </Badge>
                    ) : null;
                  })}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Finish Setup Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="flex justify-center pt-4"
      >
        <Button
          size="lg"
          onClick={handleFinishSetup}
          disabled={isConfiguring}
          className="gap-2 px-8 py-3 text-lg"
        >
          {isConfiguring ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Settings className="w-5 h-5" />
              </motion.div>
              Configuring...
            </>
          ) : (
            <>
              Save Preferences
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </Button>
      </motion.div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-2 pt-4">
        <div className="w-2 h-2 bg-muted rounded-full" />
        <div className="w-2 h-2 bg-muted rounded-full" />
        <div className="w-2 h-2 bg-muted rounded-full" />
        <div className="w-2 h-2 bg-muted rounded-full" />
        <div className="w-2 h-2 bg-primary rounded-full" />
        <div className="w-2 h-2 bg-muted rounded-full" />
        <span className="ml-3 text-sm text-muted-foreground">Step 5 of 6</span>
      </div>
    </div>
  );
}
