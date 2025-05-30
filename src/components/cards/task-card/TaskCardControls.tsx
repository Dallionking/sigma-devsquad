
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Agent } from "@/types";

interface TaskCardControlsProps {
  priority: string;
  status: string;
  assignedAgent: string;
  agents: Agent[];
  createdAt: string;
  onUpdatePriority?: (priority: string) => void;
  onUpdateStatus?: (status: string) => void;
  onAssign?: (agentType: string) => void;
}

export const TaskCardControls = ({ 
  priority, 
  status, 
  assignedAgent, 
  agents, 
  createdAt,
  onUpdatePriority,
  onUpdateStatus,
  onAssign 
}: TaskCardControlsProps) => {
  return (
    <div className="space-y-3 pt-3 border-t">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs font-medium text-muted-foreground">Priority</label>
          <Select value={priority} onValueChange={onUpdatePriority}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-xs font-medium text-muted-foreground">Status</label>
          <Select value={status} onValueChange={onUpdateStatus}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-muted-foreground">Assign to Agent</label>
        <Select value={assignedAgent} onValueChange={onAssign}>
          <SelectTrigger className="h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {agents.map((agent) => (
              <SelectItem key={agent.id} value={agent.type}>
                {agent.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="text-xs text-muted-foreground">
        Created: {new Date(createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};
