
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, Clock, Play, Pause, RotateCcw } from "lucide-react";

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed" | "failed";
  estimatedTime: number; // in minutes
  actualTime?: number;
  dependencies?: string[];
}

interface WorkflowState {
  id: string;
  name: string;
  steps: WorkflowStep[];
  currentStepIndex: number;
  startTime?: Date;
  pausedTime?: number;
  isActive: boolean;
}

interface WorkflowProgressTrackerProps {
  workflow: WorkflowState;
  onStepComplete: (stepId: string) => void;
  onWorkflowPause: () => void;
  onWorkflowResume: () => void;
  onWorkflowRestart: () => void;
  onWorkflowCancel: () => void;
}

export const WorkflowProgressTracker = ({
  workflow,
  onStepComplete,
  onWorkflowPause,
  onWorkflowResume,
  onWorkflowRestart,
  onWorkflowCancel
}: WorkflowProgressTrackerProps) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (workflow.isActive && workflow.startTime) {
      interval = setInterval(() => {
        const now = new Date().getTime();
        const start = workflow.startTime!.getTime();
        const paused = workflow.pausedTime || 0;
        setElapsedTime(Math.floor((now - start - paused) / 1000));
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [workflow.isActive, workflow.startTime, workflow.pausedTime]);

  const completedSteps = workflow.steps.filter(step => step.status === "completed").length;
  const totalSteps = workflow.steps.length;
  const overallProgress = (completedSteps / totalSteps) * 100;
  
  const totalEstimatedTime = workflow.steps.reduce((sum, step) => sum + step.estimatedTime, 0);
  const estimatedProgress = totalEstimatedTime > 0 ? (elapsedTime / (totalEstimatedTime * 60)) * 100 : 0;

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const getStepIcon = (step: WorkflowStep) => {
    switch (step.status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "in-progress":
        return <Clock className="w-5 h-5 text-blue-600 animate-pulse" />;
      case "failed":
        return <Circle className="w-5 h-5 text-red-600" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStepStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <span>{workflow.name}</span>
            <Badge variant="outline" className={workflow.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
              {workflow.isActive ? "Active" : "Paused"}
            </Badge>
          </CardTitle>
          
          <div className="flex items-center space-x-2">
            {workflow.isActive ? (
              <Button variant="outline" size="sm" onClick={onWorkflowPause}>
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </Button>
            ) : (
              <Button variant="outline" size="sm" onClick={onWorkflowResume}>
                <Play className="w-4 h-4 mr-2" />
                Resume
              </Button>
            )}
            
            <Button variant="outline" size="sm" onClick={onWorkflowRestart}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Restart
            </Button>
            
            <Button variant="destructive" size="sm" onClick={onWorkflowCancel}>
              Cancel
            </Button>
          </div>
        </div>
        
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress: {completedSteps} of {totalSteps} steps</span>
            <span>Time: {formatTime(elapsedTime)}</span>
          </div>
          <Progress value={overallProgress} className="w-full" />
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Steps List */}
          <div className="space-y-3">
            {workflow.steps.map((step, index) => {
              const isCurrentStep = index === workflow.currentStepIndex;
              const canComplete = step.status === "in-progress" && isCurrentStep;
              
              return (
                <div 
                  key={step.id} 
                  className={`flex items-center space-x-4 p-3 rounded-lg border ${
                    isCurrentStep ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <div className="flex-shrink-0">
                    {getStepIcon(step)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium truncate">{step.title}</h4>
                      <Badge variant="outline" className={getStepStatusColor(step.status)}>
                        {step.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                    
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-muted-foreground">
                        Est: {step.estimatedTime}m
                      </span>
                      {step.actualTime && (
                        <span className="text-xs text-muted-foreground">
                          Actual: {step.actualTime}m
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {canComplete && (
                    <Button 
                      size="sm" 
                      onClick={() => onStepComplete(step.id)}
                    >
                      Complete
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Workflow Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 pt-4 border-t">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{completedSteps}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {workflow.steps.filter(s => s.status === "in-progress").length}
              </div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </div>
            
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-gray-600">
                {workflow.steps.filter(s => s.status === "pending").length}
              </div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
            
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {Math.max(0, Math.ceil((totalEstimatedTime * 60 - elapsedTime) / 60))}m
              </div>
              <div className="text-sm text-muted-foreground">Est. Remaining</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
