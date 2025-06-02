
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, AlertCircle, Clock, Target } from 'lucide-react';

interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  completedDate?: Date;
  status: 'completed' | 'in_progress' | 'overdue' | 'upcoming';
  progress: number;
  priority: 'high' | 'medium' | 'low';
  dependencies: string[];
  tasksTotal: number;
  tasksCompleted: number;
}

interface MilestoneCompletionVisualizationProps {
  projectId?: string;
  timeRange: string;
}

const generateMilestoneData = (): Milestone[] => {
  const milestones = [
    'MVP Development',
    'User Authentication System',
    'Dashboard Implementation',
    'API Integration',
    'Testing & QA',
    'Performance Optimization',
    'Documentation',
    'Deployment Setup'
  ];

  return milestones.map((title, index) => {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + (index * 7) - 14);
    
    const progress = Math.floor(Math.random() * 100);
    const isOverdue = dueDate < new Date() && progress < 100;
    const isCompleted = progress === 100 || Math.random() > 0.6;
    
    let status: Milestone['status'] = 'upcoming';
    if (isCompleted) status = 'completed';
    else if (isOverdue) status = 'overdue';
    else if (progress > 0) status = 'in_progress';

    const tasksTotal = Math.floor(Math.random() * 15) + 5;
    const tasksCompleted = Math.floor((progress / 100) * tasksTotal);

    return {
      id: `milestone-${index}`,
      title,
      description: `Complete ${title.toLowerCase()} phase of the project`,
      dueDate,
      completedDate: isCompleted ? new Date(dueDate.getTime() - Math.random() * 86400000) : undefined,
      status,
      progress: isCompleted ? 100 : progress,
      priority: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as Milestone['priority'],
      dependencies: index > 0 ? [`milestone-${index - 1}`] : [],
      tasksTotal,
      tasksCompleted
    };
  });
};

export const MilestoneCompletionVisualization = ({ 
  projectId, 
  timeRange 
}: MilestoneCompletionVisualizationProps) => {
  const milestones = generateMilestoneData();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in_progress': return <Clock className="w-5 h-5 text-blue-500" />;
      case 'overdue': return <AlertCircle className="w-5 h-5 text-red-500" />;
      default: return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    completed: milestones.filter(m => m.status === 'completed').length,
    inProgress: milestones.filter(m => m.status === 'in_progress').length,
    overdue: milestones.filter(m => m.status === 'overdue').length,
    upcoming: milestones.filter(m => m.status === 'upcoming').length,
    totalProgress: Math.round(milestones.reduce((sum, m) => sum + m.progress, 0) / milestones.length)
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          Milestone Completion Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-3 border rounded-lg">
              <div className="text-lg font-bold text-green-600">{stats.completed}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="text-lg font-bold text-blue-600">{stats.inProgress}</div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="text-lg font-bold text-red-600">{stats.overdue}</div>
              <div className="text-sm text-muted-foreground">Overdue</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="text-lg font-bold text-gray-600">{stats.upcoming}</div>
              <div className="text-sm text-muted-foreground">Upcoming</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="text-lg font-bold text-purple-600">{stats.totalProgress}%</div>
              <div className="text-sm text-muted-foreground">Overall Progress</div>
            </div>
          </div>

          {/* Overall Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Project Progress</span>
              <span>{stats.totalProgress}%</span>
            </div>
            <Progress value={stats.totalProgress} className="h-3" />
          </div>

          {/* Milestones Timeline */}
          <div className="space-y-4">
            <h4 className="font-medium">Milestone Timeline</h4>
            {milestones.map((milestone, index) => (
              <div key={milestone.id} className="relative">
                {/* Timeline connector */}
                {index < milestones.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-8 bg-gray-200"></div>
                )}
                
                <div className="flex gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0">
                    {getStatusIcon(milestone.status)}
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h5 className="font-medium">{milestone.title}</h5>
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getPriorityColor(milestone.priority)}>
                          {milestone.priority}
                        </Badge>
                        <Badge className={getStatusColor(milestone.status)}>
                          {milestone.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Due Date</div>
                        <div className="font-medium">{milestone.dueDate.toLocaleDateString()}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Tasks Progress</div>
                        <div className="font-medium">{milestone.tasksCompleted}/{milestone.tasksTotal}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Completion</div>
                        <div className="font-medium">{milestone.progress}%</div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Progress value={milestone.progress} className="h-2" />
                    </div>

                    {milestone.completedDate && (
                      <div className="text-sm text-green-600">
                        ✓ Completed on {milestone.completedDate.toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
