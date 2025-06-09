
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePerformanceAlerts, PerformanceThreshold } from '@/contexts/PerformanceAlertsContext';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle, Save, RotateCcw } from 'lucide-react';

export const AlertsConfiguration = () => {
  const { thresholds, updateThreshold } = usePerformanceAlerts();
  const [editingThresholds, setEditingThresholds] = useState<PerformanceThreshold[]>(thresholds);
  const { toast } = useToast();

  const handleThresholdChange = (id: string, field: keyof PerformanceThreshold, value: any) => {
    setEditingThresholds(prev =>
      prev.map(threshold =>
        threshold.id === id ? { ...threshold, [field]: value } : threshold
      )
    );
  };

  const handleSave = () => {
    editingThresholds.forEach(threshold => {
      updateThreshold(threshold);
    });
    
    toast({
      title: "Configuration Saved",
      description: "Performance alert thresholds have been updated.",
    });
  };

  const handleReset = () => {
    setEditingThresholds(thresholds);
    toast({
      title: "Configuration Reset",
      description: "Changes have been reverted to saved values.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Alert Thresholds</h3>
          <p className="text-sm text-muted-foreground">
            Configure when alerts should be triggered for different performance metrics
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button size="sm" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {editingThresholds.map((threshold) => (
          <Card key={threshold.id}>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  {threshold.metricName}
                </div>
                <Switch
                  checked={threshold.enabled}
                  onCheckedChange={(enabled) =>
                    handleThresholdChange(threshold.id, 'enabled', enabled)
                  }
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`warning-${threshold.id}`}>Warning Threshold</Label>
                  <div className="flex gap-2">
                    <Input
                      id={`warning-${threshold.id}`}
                      type="number"
                      value={threshold.warningThreshold}
                      onChange={(e) =>
                        handleThresholdChange(
                          threshold.id,
                          'warningThreshold',
                          parseFloat(e.target.value)
                        )
                      }
                      disabled={!threshold.enabled}
                    />
                    <span className="flex items-center text-sm text-muted-foreground">
                      {threshold.unit}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`critical-${threshold.id}`}>Critical Threshold</Label>
                  <div className="flex gap-2">
                    <Input
                      id={`critical-${threshold.id}`}
                      type="number"
                      value={threshold.criticalThreshold}
                      onChange={(e) =>
                        handleThresholdChange(
                          threshold.id,
                          'criticalThreshold',
                          parseFloat(e.target.value)
                        )
                      }
                      disabled={!threshold.enabled}
                    />
                    <span className="flex items-center text-sm text-muted-foreground">
                      {threshold.unit}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`comparison-${threshold.id}`}>Comparison Type</Label>
                  <Select
                    value={threshold.comparisonType}
                    onValueChange={(value: 'greater' | 'less' | 'equal') =>
                      handleThresholdChange(threshold.id, 'comparisonType', value)
                    }
                    disabled={!threshold.enabled}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="greater">Greater than</SelectItem>
                      <SelectItem value="less">Less than</SelectItem>
                      <SelectItem value="equal">Equal to</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="text-xs text-muted-foreground p-3 bg-muted/50 rounded">
                Alert will trigger when {threshold.metricName.toLowerCase()} is{' '}
                {threshold.comparisonType === 'greater' ? 'greater than' : 
                 threshold.comparisonType === 'less' ? 'less than' : 'equal to'}{' '}
                <strong>{threshold.warningThreshold}{threshold.unit}</strong> (warning) or{' '}
                <strong>{threshold.criticalThreshold}{threshold.unit}</strong> (critical)
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
