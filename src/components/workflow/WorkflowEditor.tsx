
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, Play, Settings, GitBranch, Diamond, 
  Circle, Square, ArrowRight, Save, TestTube 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkflowNode {
  id: string;
  type: "start" | "task" | "decision" | "end";
  title: string;
  description?: string;
  position: { x: number; y: number };
  connections: string[];
  config?: Record<string, any>;
}

interface WorkflowEditorProps {
  workflowId?: string;
  initialNodes?: WorkflowNode[];
  onSave?: (nodes: WorkflowNode[]) => void;
}

export const WorkflowEditor = ({ workflowId, initialNodes = [], onSave }: WorkflowEditorProps) => {
  const [nodes, setNodes] = useState<WorkflowNode[]>(initialNodes);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<string | null>(null);

  const nodeTypes = [
    { type: "start", icon: Circle, label: "Start", color: "bg-green-100 text-green-600" },
    { type: "task", icon: Square, label: "Task", color: "bg-blue-100 text-blue-600" },
    { type: "decision", icon: Diamond, label: "Decision", color: "bg-yellow-100 text-yellow-600" },
    { type: "end", icon: Circle, label: "End", color: "bg-red-100 text-red-600" }
  ];

  const addNode = (type: WorkflowNode["type"]) => {
    const newNode: WorkflowNode = {
      id: `node-${Date.now()}`,
      type,
      title: `New ${type}`,
      position: { x: 100, y: 100 },
      connections: []
    };
    setNodes([...nodes, newNode]);
  };

  const updateNode = (nodeId: string, updates: Partial<WorkflowNode>) => {
    setNodes(nodes.map(node => 
      node.id === nodeId ? { ...node, ...updates } : node
    ));
  };

  const deleteNode = (nodeId: string) => {
    setNodes(nodes.filter(node => node.id !== nodeId));
    setSelectedNode(null);
  };

  const connectNodes = (fromId: string, toId: string) => {
    setNodes(nodes.map(node => 
      node.id === fromId 
        ? { ...node, connections: [...node.connections, toId] }
        : node
    ));
    setIsConnecting(null);
  };

  const getNodeIcon = (type: WorkflowNode["type"]) => {
    const nodeType = nodeTypes.find(nt => nt.type === type);
    return nodeType?.icon || Square;
  };

  const getNodeColor = (type: WorkflowNode["type"]) => {
    const nodeType = nodeTypes.find(nt => nt.type === type);
    return nodeType?.color || "bg-slate-100 text-slate-600";
  };

  const selectedNodeData = nodes.find(node => node.id === selectedNode);

  return (
    <div className="flex h-screen bg-background">
      {/* Toolbar */}
      <div className="w-64 border-r bg-card p-4 space-y-4">
        <div>
          <h3 className="font-semibold mb-3">Node Types</h3>
          <div className="space-y-2">
            {nodeTypes.map((nodeType) => {
              const Icon = nodeType.icon;
              return (
                <Button
                  key={nodeType.type}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => addNode(nodeType.type as WorkflowNode["type"])}
                >
                  <div className={`p-1 rounded mr-2 ${nodeType.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {nodeType.label}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-semibold mb-3">Actions</h3>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <Play className="w-4 h-4 mr-2" />
              Test Workflow
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => onSave?.(nodes)}>
              <Save className="w-4 h-4 mr-2" />
              Save Workflow
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <TestTube className="w-4 h-4 mr-2" />
              Validate
            </Button>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 relative bg-slate-50 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        {/* Nodes */}
        {nodes.map((node) => {
          const Icon = getNodeIcon(node.type);
          const isSelected = selectedNode === node.id;
          
          return (
            <div
              key={node.id}
              className={cn(
                "absolute cursor-pointer transition-all duration-200",
                isSelected && "z-10"
              )}
              style={{ 
                left: node.position.x, 
                top: node.position.y,
                transform: "translate(-50%, -50%)"
              }}
              onClick={() => setSelectedNode(node.id)}
            >
              <Card className={cn(
                "min-w-32 transition-all duration-200",
                isSelected && "ring-2 ring-primary shadow-lg scale-105"
              )}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`p-1 rounded ${getNodeColor(node.type)}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {node.type}
                    </Badge>
                  </div>
                  <div className="text-sm font-medium line-clamp-2">{node.title}</div>
                  {node.description && (
                    <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {node.description}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Connection Points */}
              <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
                <Button
                  size="sm"
                  variant="outline"
                  className="w-6 h-6 p-0 rounded-full bg-background"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsConnecting(isConnecting === node.id ? null : node.id);
                  }}
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>
          );
        })}

        {/* Connections */}
        <svg className="absolute inset-0 pointer-events-none w-full h-full">
          {nodes.map(node => 
            node.connections.map(connectionId => {
              const targetNode = nodes.find(n => n.id === connectionId);
              if (!targetNode) return null;
              
              return (
                <line
                  key={`${node.id}-${connectionId}`}
                  x1={node.position.x}
                  y1={node.position.y}
                  x2={targetNode.position.x}
                  y2={targetNode.position.y}
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
              );
            })
          )}
          
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill="hsl(var(--primary))"
              />
            </marker>
          </defs>
        </svg>
      </div>

      {/* Properties Panel */}
      {selectedNodeData && (
        <div className="w-80 border-l bg-card p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Node Properties</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteNode(selectedNodeData.id)}
            >
              Delete
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input
                value={selectedNodeData.title}
                onChange={(e) => updateNode(selectedNodeData.id, { title: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Description</label>
              <Input
                value={selectedNodeData.description || ""}
                onChange={(e) => updateNode(selectedNodeData.id, { description: e.target.value })}
                className="mt-1"
                placeholder="Optional description..."
              />
            </div>

            <div>
              <label className="text-sm font-medium">Type</label>
              <Badge variant="secondary" className="mt-1 block w-fit">
                {selectedNodeData.type}
              </Badge>
            </div>

            {selectedNodeData.type === "decision" && (
              <div>
                <label className="text-sm font-medium">Decision Logic</label>
                <Input
                  placeholder="e.g., status === 'completed'"
                  className="mt-1"
                />
              </div>
            )}

            {selectedNodeData.type === "task" && (
              <div>
                <label className="text-sm font-medium">Assigned Agent</label>
                <select className="w-full mt-1 p-2 border rounded">
                  <option>Select agent...</option>
                  <option>Frontend Agent</option>
                  <option>Backend Agent</option>
                  <option>QA Agent</option>
                </select>
              </div>
            )}

            <div>
              <h4 className="text-sm font-medium mb-2">Connections ({selectedNodeData.connections.length})</h4>
              {selectedNodeData.connections.map(connectionId => {
                const targetNode = nodes.find(n => n.id === connectionId);
                return (
                  <div key={connectionId} className="flex items-center justify-between text-sm">
                    <span>{targetNode?.title}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => updateNode(selectedNodeData.id, {
                        connections: selectedNodeData.connections.filter(id => id !== connectionId)
                      })}
                    >
                      Remove
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
