
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Layout, 
  Move, 
  Eye, 
  EyeOff, 
  RotateCcw,
  Save
} from "lucide-react";

interface CustomizableLayoutProps {
  onLayoutChange: () => void;
}

export const CustomizableLayout = ({ onLayoutChange }: CustomizableLayoutProps) => {
  const [widgets, setWidgets] = useState([
    { id: 'metrics-overview', name: 'Metrics Overview', visible: true, category: 'overview' },
    { id: 'productivity-charts', name: 'Productivity Charts', visible: true, category: 'productivity' },
    { id: 'agent-status', name: 'Agent Status', visible: true, category: 'overview' },
    { id: 'communication-stats', name: 'Communication Stats', visible: true, category: 'communication' },
    { id: 'system-health', name: 'System Health', visible: true, category: 'system' },
    { id: 'performance-trends', name: 'Performance Trends', visible: true, category: 'system' },
    { id: 'task-completion', name: 'Task Completion', visible: false, category: 'productivity' },
    { id: 'response-times', name: 'Response Times', visible: false, category: 'communication' }
  ]);

  const [layoutPresets] = useState([
    { name: 'Overview Focus', description: 'Key metrics and high-level insights' },
    { name: 'Productivity Deep Dive', description: 'Detailed productivity analytics' },
    { name: 'Communication Analysis', description: 'Communication patterns and efficiency' },
    { name: 'System Monitoring', description: 'Technical performance and health' }
  ]);

  const toggleWidget = (id: string) => {
    setWidgets(widgets.map(widget => 
      widget.id === id 
        ? { ...widget, visible: !widget.visible }
        : widget
    ));
  };

  const resetToDefault = () => {
    setWidgets(widgets.map(widget => ({
      ...widget,
      visible: ['metrics-overview', 'productivity-charts', 'agent-status', 'communication-stats', 'system-health', 'performance-trends'].includes(widget.id)
    })));
  };

  const groupedWidgets = widgets.reduce((acc, widget) => {
    if (!acc[widget.category]) {
      acc[widget.category] = [];
    }
    acc[widget.category].push(widget);
    return acc;
  }, {} as Record<string, typeof widgets>);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Layout className="w-5 h-5" />
          Customize Dashboard Layout
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Layout Presets */}
        <div>
          <h3 className="font-semibold mb-3">Quick Layouts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {layoutPresets.map((preset) => (
              <Button
                key={preset.name}
                variant="outline"
                className="h-auto p-3 flex flex-col items-start"
                onClick={() => {
                  // Apply preset logic here
                  console.log('Apply preset:', preset.name);
                }}
              >
                <div className="font-medium">{preset.name}</div>
                <div className="text-xs text-muted-foreground text-left">
                  {preset.description}
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Widget Configuration */}
        <div>
          <h3 className="font-semibold mb-3">Configure Widgets</h3>
          <div className="space-y-4">
            {Object.entries(groupedWidgets).map(([category, categoryWidgets]) => (
              <div key={category}>
                <h4 className="text-sm font-medium text-muted-foreground mb-2 capitalize">
                  {category} Widgets
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {categoryWidgets.map((widget) => (
                    <div
                      key={widget.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          checked={widget.visible}
                          onCheckedChange={() => toggleWidget(widget.id)}
                        />
                        <div className="flex items-center gap-2">
                          <Move className="w-4 h-4 text-muted-foreground cursor-grab" />
                          <span className="font-medium">{widget.name}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {widget.visible ? (
                          <Eye className="w-4 h-4 text-green-500" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {widgets.filter(w => w.visible).length} active widgets
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={resetToDefault}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button onClick={onLayoutChange}>
              <Save className="w-4 h-4 mr-2" />
              Save Layout
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
