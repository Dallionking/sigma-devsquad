
interface AgentCardMetricsProps {
  compact?: boolean;
}

export const AgentCardMetrics = ({ compact = false }: AgentCardMetricsProps) => {
  if (compact) return null;

  return (
    <div className="grid grid-cols-3 gap-2 text-xs">
      <div className="text-center p-2 bg-background rounded">
        <div className="font-semibold">94%</div>
        <div className="text-muted-foreground">Success Rate</div>
      </div>
      <div className="text-center p-2 bg-background rounded">
        <div className="font-semibold">2.3s</div>
        <div className="text-muted-foreground">Avg Response</div>
      </div>
      <div className="text-center p-2 bg-background rounded">
        <div className="font-semibold">15</div>
        <div className="text-muted-foreground">Tasks Today</div>
      </div>
    </div>
  );
};
