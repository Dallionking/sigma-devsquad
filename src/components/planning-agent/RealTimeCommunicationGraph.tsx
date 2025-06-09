
import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Agent, Message } from "@/types";
import { ZoomIn, ZoomOut, RotateCcw, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Node {
  id: string;
  x: number;
  y: number;
  agent: Agent;
  messageCount: number;
  isActive: boolean;
}

interface Edge {
  source: string;
  target: string;
  strength: number;
  messages: Message[];
  isActive: boolean;
}

interface RealTimeCommunicationGraphProps {
  agents: Agent[];
  messages: Message[];
  isActive: boolean;
  filterSettings: any;
}

export const RealTimeCommunicationGraph = ({
  agents,
  messages,
  isActive,
  filterSettings
}: RealTimeCommunicationGraphProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [animationFrame, setAnimationFrame] = useState(0);

  // Initialize nodes and edges
  useEffect(() => {
    const newNodes: Node[] = agents.map((agent, index) => {
      const angle = (index * 2 * Math.PI) / agents.length;
      const radius = 150;
      const centerX = 300;
      const centerY = 200;
      
      return {
        id: agent.id,
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
        agent,
        messageCount: messages.filter(m => m.from === agent.type || m.to === agent.type).length,
        isActive: agent.status === "working"
      };
    });

    const newEdges: Edge[] = [];
    agents.forEach(fromAgent => {
      agents.forEach(toAgent => {
        if (fromAgent.id !== toAgent.id) {
          const edgeMessages = messages.filter(m => 
            (m.from === fromAgent.type && m.to === toAgent.type) ||
            (m.from === toAgent.type && m.to === fromAgent.type)
          );
          
          if (edgeMessages.length > 0) {
            newEdges.push({
              source: fromAgent.id,
              target: toAgent.id,
              strength: edgeMessages.length,
              messages: edgeMessages,
              isActive: edgeMessages.some(m => 
                new Date(m.timestamp).getTime() > Date.now() - 30000
              )
            });
          }
        }
      });
    });

    setNodes(newNodes);
    setEdges(newEdges);
  }, [agents, messages]);

  // Animation loop for real-time updates
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setAnimationFrame(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev * 1.2, 3));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev / 1.2, 0.5));
  const handleReset = () => setZoomLevel(1);

  const getNodeColor = (node: Node) => {
    if (node.agent.status === "working") return "#10b981";
    if (node.agent.status === "waiting") return "#f59e0b";
    if (node.agent.status === "error") return "#ef4444";
    return "#6b7280";
  };

  const getEdgeOpacity = (edge: Edge) => {
    return edge.isActive ? 0.8 : 0.3;
  };

  const getEdgeWidth = (edge: Edge) => {
    return Math.max(1, Math.min(edge.strength / 2, 8));
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium">Real-time Communication Flow</h3>
          <p className="text-sm text-muted-foreground">
            Live visualization of agent message exchanges
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleZoomOut}>
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleZoomIn}>
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Badge variant="secondary">{Math.round(zoomLevel * 100)}%</Badge>
        </div>
      </div>

      <div className="relative bg-muted/20 rounded-lg overflow-hidden" style={{ height: '500px' }}>
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          viewBox="0 0 600 400"
          className="cursor-move"
        >
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
                fill="#6b7280"
              />
            </marker>
            
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <g transform={`scale(${zoomLevel})`}>
            {/* Render edges */}
            {edges.map((edge) => {
              const sourceNode = nodes.find(n => n.id === edge.source);
              const targetNode = nodes.find(n => n.id === edge.target);
              
              if (!sourceNode || !targetNode) return null;

              return (
                <g key={`${edge.source}-${edge.target}`}>
                  <line
                    x1={sourceNode.x}
                    y1={sourceNode.y}
                    x2={targetNode.x}
                    y2={targetNode.y}
                    stroke={edge.isActive ? "#3b82f6" : "#9ca3af"}
                    strokeWidth={getEdgeWidth(edge)}
                    strokeOpacity={getEdgeOpacity(edge)}
                    markerEnd="url(#arrowhead)"
                    className={cn(
                      "transition-all duration-500",
                      edge.isActive && isActive && "animate-pulse"
                    )}
                  />
                  
                  {/* Message count badge on edge */}
                  {edge.strength > 0 && (
                    <g>
                      <circle
                        cx={(sourceNode.x + targetNode.x) / 2}
                        cy={(sourceNode.y + targetNode.y) / 2}
                        r="12"
                        fill="white"
                        stroke="#e5e7eb"
                        strokeWidth="1"
                      />
                      <text
                        x={(sourceNode.x + targetNode.x) / 2}
                        y={(sourceNode.y + targetNode.y) / 2}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize="10"
                        fill="#374151"
                      >
                        {edge.strength}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Render nodes */}
            {nodes.map((node) => (
              <g
                key={node.id}
                onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                className="cursor-pointer"
              >
                {/* Node glow effect for active nodes */}
                {node.isActive && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="25"
                    fill={getNodeColor(node)}
                    opacity="0.3"
                    filter="url(#glow)"
                    className={isActive ? "animate-ping" : ""}
                  />
                )}
                
                {/* Main node circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="20"
                  fill={getNodeColor(node)}
                  stroke={selectedNode === node.id ? "#3b82f6" : "#e5e7eb"}
                  strokeWidth={selectedNode === node.id ? "3" : "2"}
                  className="transition-all duration-200 hover:stroke-blue-400"
                />
                
                {/* Node label */}
                <text
                  x={node.x}
                  y={node.y - 30}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#374151"
                  fontWeight="medium"
                >
                  {node.agent.name}
                </text>
                
                {/* Status indicator */}
                <text
                  x={node.x}
                  y={node.y + 35}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#6b7280"
                >
                  {node.agent.status}
                </text>
                
                {/* Message count indicator */}
                <circle
                  cx={node.x + 15}
                  cy={node.y - 15}
                  r="8"
                  fill="#3b82f6"
                  stroke="white"
                  strokeWidth="2"
                />
                <text
                  x={node.x + 15}
                  y={node.y - 15}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="8"
                  fill="white"
                  fontWeight="bold"
                >
                  {node.messageCount}
                </text>
              </g>
            ))}
          </g>
        </svg>

        {/* Node details overlay */}
        {selectedNode && (
          <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg border max-w-xs">
            {(() => {
              const node = nodes.find(n => n.id === selectedNode);
              if (!node) return null;
              
              return (
                <div className="space-y-2">
                  <h4 className="font-medium">{node.agent.name}</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <Badge variant={node.agent.status === "working" ? "default" : "secondary"}>
                        {node.agent.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Messages:</span>
                      <span className="font-medium">{node.messageCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span className="capitalize">{node.agent.type}</span>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </Card>
  );
};
