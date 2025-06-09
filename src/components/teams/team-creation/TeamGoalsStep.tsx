
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Target, CheckCircle, TrendingUp, Calendar, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TeamGoal {
  id: string;
  title: string;
  description: string;
  category: 'performance' | 'delivery' | 'quality' | 'growth' | 'collaboration';
  priority: 'high' | 'medium' | 'low';
  timeline: string;
}

interface TeamGoalsStepProps {
  goals: TeamGoal[];
  onGoalsChange: (goals: TeamGoal[]) => void;
  teamType?: string;
  className?: string;
}

const GOAL_TEMPLATES = {
  frontend: [
    { title: 'Improve Page Load Speed', description: 'Optimize application performance and reduce load times', category: 'performance' as const },
    { title: 'Component Library Development', description: 'Build reusable UI components for consistent design', category: 'delivery' as const },
    { title: 'User Experience Enhancement', description: 'Improve user satisfaction and interface usability', category: 'quality' as const }
  ],
  backend: [
    { title: 'API Response Time Optimization', description: 'Reduce average API response time by 50%', category: 'performance' as const },
    { title: 'System Scalability', description: 'Implement horizontal scaling for high traffic', category: 'growth' as const },
    { title: 'Security Compliance', description: 'Achieve security certification standards', category: 'quality' as const }
  ],
  devops: [
    { title: 'Deployment Automation', description: 'Implement CI/CD pipelines for faster releases', category: 'delivery' as const },
    { title: 'Infrastructure Monitoring', description: 'Set up comprehensive system monitoring', category: 'performance' as const },
    { title: 'Zero-Downtime Deployments', description: 'Achieve seamless production deployments', category: 'quality' as const }
  ],
  qa: [
    { title: 'Test Coverage Increase', description: 'Achieve 90% automated test coverage', category: 'quality' as const },
    { title: 'Bug Detection Time', description: 'Reduce time to detect critical bugs', category: 'performance' as const },
    { title: 'Testing Process Optimization', description: 'Streamline testing workflows and procedures', category: 'delivery' as const }
  ],
  design: [
    { title: 'Design System Consistency', description: 'Establish and maintain design system standards', category: 'quality' as const },
    { title: 'User Research Integration', description: 'Incorporate user feedback into design decisions', category: 'collaboration' as const },
    { title: 'Design-Dev Collaboration', description: 'Improve handoff process with development team', category: 'collaboration' as const }
  ],
  product: [
    { title: 'Feature Adoption Rate', description: 'Increase new feature adoption by users', category: 'growth' as const },
    { title: 'Product Roadmap Delivery', description: 'Meet quarterly roadmap milestones', category: 'delivery' as const },
    { title: 'Customer Satisfaction', description: 'Improve customer satisfaction scores', category: 'quality' as const }
  ]
};

const CATEGORY_ICONS = {
  performance: TrendingUp,
  delivery: Calendar,
  quality: CheckCircle,
  growth: TrendingUp,
  collaboration: Users
};

const CATEGORY_COLORS = {
  performance: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  delivery: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  quality: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  growth: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  collaboration: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
};

const PRIORITY_COLORS = {
  high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  low: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
};

export const TeamGoalsStep = ({
  goals,
  onGoalsChange,
  teamType,
  className
}: TeamGoalsStepProps) => {
  const [newGoal, setNewGoal] = useState<Partial<TeamGoal>>({
    title: '',
    description: '',
    category: 'delivery',
    priority: 'medium',
    timeline: ''
  });
  const [showCustomForm, setShowCustomForm] = useState(false);

  const templates = teamType && GOAL_TEMPLATES[teamType as keyof typeof GOAL_TEMPLATES] || [];

  const addGoalFromTemplate = (template: typeof templates[0]) => {
    const goal: TeamGoal = {
      id: `goal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: template.title,
      description: template.description,
      category: template.category,
      priority: 'medium',
      timeline: 'Q1 2024'
    };
    onGoalsChange([...goals, goal]);
  };

  const addCustomGoal = () => {
    if (!newGoal.title?.trim()) return;

    const goal: TeamGoal = {
      id: `goal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: newGoal.title.trim(),
      description: newGoal.description?.trim() || '',
      category: newGoal.category as TeamGoal['category'],
      priority: newGoal.priority as TeamGoal['priority'],
      timeline: newGoal.timeline?.trim() || ''
    };

    onGoalsChange([...goals, goal]);
    setNewGoal({
      title: '',
      description: '',
      category: 'delivery',
      priority: 'medium',
      timeline: ''
    });
    setShowCustomForm(false);
  };

  const removeGoal = (goalId: string) => {
    onGoalsChange(goals.filter(goal => goal.id !== goalId));
  };

  const updateGoalPriority = (goalId: string, priority: TeamGoal['priority']) => {
    onGoalsChange(goals.map(goal => 
      goal.id === goalId ? { ...goal, priority } : goal
    ));
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div>
        <h3 className="text-lg font-semibold mb-2">Set Team Goals & Objectives</h3>
        <p className="text-sm text-muted-foreground">
          Define clear, measurable goals that will guide your team's efforts and success metrics.
        </p>
      </div>

      {/* Goal Templates */}
      {templates.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Target className="w-4 h-4" />
              Recommended Goals for {teamType} Teams
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {templates.map((template, index) => {
              const CategoryIcon = CATEGORY_ICONS[template.category];
              const isAlreadyAdded = goals.some(goal => goal.title === template.title);
              
              return (
                <div
                  key={index}
                  className={cn(
                    "p-4 rounded-lg border transition-colors",
                    isAlreadyAdded ? "bg-muted border-muted" : "hover:bg-accent/50"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <CategoryIcon className="w-4 h-4" />
                        <h4 className="font-medium">{template.title}</h4>
                        <Badge className={cn("text-xs", CATEGORY_COLORS[template.category])}>
                          {template.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </div>
                    <Button
                      variant={isAlreadyAdded ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => addGoalFromTemplate(template)}
                      disabled={isAlreadyAdded}
                    >
                      {isAlreadyAdded ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Added
                        </>
                      ) : (
                        <>
                          <Plus className="w-3 h-3 mr-1" />
                          Add Goal
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Custom Goal Form */}
      {showCustomForm ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Create Custom Goal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="goal-title">Goal Title</Label>
              <Input
                id="goal-title"
                value={newGoal.title || ''}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                placeholder="Enter goal title..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="goal-description">Description</Label>
              <Textarea
                id="goal-description"
                value={newGoal.description || ''}
                onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                placeholder="Describe the goal in detail..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="goal-category">Category</Label>
                <select
                  id="goal-category"
                  value={newGoal.category}
                  onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value as TeamGoal['category'] })}
                  className="w-full p-2 border rounded-md bg-background"
                >
                  <option value="delivery">Delivery</option>
                  <option value="performance">Performance</option>
                  <option value="quality">Quality</option>
                  <option value="growth">Growth</option>
                  <option value="collaboration">Collaboration</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="goal-timeline">Timeline</Label>
                <Input
                  id="goal-timeline"
                  value={newGoal.timeline || ''}
                  onChange={(e) => setNewGoal({ ...newGoal, timeline: e.target.value })}
                  placeholder="e.g., Q1 2024, 3 months"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowCustomForm(false)}>
                Cancel
              </Button>
              <Button onClick={addCustomGoal} disabled={!newGoal.title?.trim()}>
                Add Goal
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button
          variant="outline"
          onClick={() => setShowCustomForm(true)}
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Custom Goal
        </Button>
      )}

      {/* Selected Goals */}
      {goals.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Team Goals ({goals.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {goals.map((goal) => {
              const CategoryIcon = CATEGORY_ICONS[goal.category];
              
              return (
                <div key={goal.id} className="p-4 rounded-lg border bg-accent/20">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CategoryIcon className="w-4 h-4" />
                      <h4 className="font-medium">{goal.title}</h4>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeGoal(goal.id)}
                      className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  {goal.description && (
                    <p className="text-sm text-muted-foreground mb-3">{goal.description}</p>
                  )}
                  
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className={cn("text-xs", CATEGORY_COLORS[goal.category])}>
                      {goal.category}
                    </Badge>
                    
                    <select
                      value={goal.priority}
                      onChange={(e) => updateGoalPriority(goal.id, e.target.value as TeamGoal['priority'])}
                      className={cn(
                        "text-xs px-2 py-1 rounded border-0 font-medium",
                        PRIORITY_COLORS[goal.priority]
                      )}
                    >
                      <option value="high">High Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="low">Low Priority</option>
                    </select>
                    
                    {goal.timeline && (
                      <Badge variant="outline" className="text-xs">
                        {goal.timeline}
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {goals.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No goals set yet. Add some goals to guide your team's success.</p>
        </div>
      )}
    </div>
  );
};
