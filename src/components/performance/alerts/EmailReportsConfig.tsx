
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Mail, Send, Calendar, Clock, AlertTriangle } from 'lucide-react';

interface EmailReportConfig {
  enabled: boolean;
  recipients: string[];
  frequency: 'daily' | 'weekly' | 'monthly';
  time: string;
  includeAlerts: boolean;
  includeSuggestions: boolean;
  includeMetrics: boolean;
  onlyOnAlerts: boolean;
}

export const EmailReportsConfig = () => {
  const [config, setConfig] = useState<EmailReportConfig>({
    enabled: false,
    recipients: [''],
    frequency: 'weekly',
    time: '09:00',
    includeAlerts: true,
    includeSuggestions: true,
    includeMetrics: true,
    onlyOnAlerts: false
  });
  const [newRecipient, setNewRecipient] = useState('');
  const { toast } = useToast();

  const handleSaveConfig = () => {
    // In a real application, this would save to a backend
    console.log('Saving email report configuration:', config);
    
    toast({
      title: "Email Reports Configured",
      description: `Reports will be sent ${config.frequency} to ${config.recipients.filter(r => r).length} recipient(s)`,
    });
  };

  const handleTestEmail = () => {
    // In a real application, this would trigger a test email
    console.log('Sending test email with current configuration');
    
    toast({
      title: "Test Email Sent",
      description: "Check your inbox for the test performance report",
    });
  };

  const addRecipient = () => {
    if (newRecipient && !config.recipients.includes(newRecipient)) {
      setConfig(prev => ({
        ...prev,
        recipients: [...prev.recipients.filter(r => r), newRecipient]
      }));
      setNewRecipient('');
    }
  };

  const removeRecipient = (index: number) => {
    setConfig(prev => ({
      ...prev,
      recipients: prev.recipients.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Email Report Configuration
          </h3>
          <p className="text-sm text-muted-foreground">
            Schedule automated performance reports to be sent via email
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleTestEmail}>
            <Send className="w-4 h-4 mr-2" />
            Send Test
          </Button>
          <Button size="sm" onClick={handleSaveConfig}>
            <Calendar className="w-4 h-4 mr-2" />
            Save Config
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center justify-between">
            Report Settings
            <Switch
              checked={config.enabled}
              onCheckedChange={(enabled) => setConfig(prev => ({ ...prev, enabled }))}
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Recipients */}
          <div className="space-y-3">
            <Label>Email Recipients</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter email address"
                value={newRecipient}
                onChange={(e) => setNewRecipient(e.target.value)}
                disabled={!config.enabled}
                onKeyPress={(e) => e.key === 'Enter' && addRecipient()}
              />
              <Button onClick={addRecipient} disabled={!config.enabled || !newRecipient}>
                Add
              </Button>
            </div>
            <div className="space-y-2">
              {config.recipients.filter(r => r).map((recipient, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                  <span className="text-sm">{recipient}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeRecipient(index)}
                    disabled={!config.enabled}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Frequency and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Frequency</Label>
              <Select
                value={config.frequency}
                onValueChange={(value: 'daily' | 'weekly' | 'monthly') =>
                  setConfig(prev => ({ ...prev, frequency: value }))
                }
                disabled={!config.enabled}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Time</Label>
              <Input
                type="time"
                value={config.time}
                onChange={(e) => setConfig(prev => ({ ...prev, time: e.target.value }))}
                disabled={!config.enabled}
              />
            </div>
          </div>

          {/* Report Content */}
          <div className="space-y-3">
            <Label>Report Content</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeAlerts"
                  checked={config.includeAlerts}
                  onCheckedChange={(checked) =>
                    setConfig(prev => ({ ...prev, includeAlerts: checked as boolean }))
                  }
                  disabled={!config.enabled}
                />
                <Label htmlFor="includeAlerts">Include Performance Alerts</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeSuggestions"
                  checked={config.includeSuggestions}
                  onCheckedChange={(checked) =>
                    setConfig(prev => ({ ...prev, includeSuggestions: checked as boolean }))
                  }
                  disabled={!config.enabled}
                />
                <Label htmlFor="includeSuggestions">Include Improvement Suggestions</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeMetrics"
                  checked={config.includeMetrics}
                  onCheckedChange={(checked) =>
                    setConfig(prev => ({ ...prev, includeMetrics: checked as boolean }))
                  }
                  disabled={!config.enabled}
                />
                <Label htmlFor="includeMetrics">Include Performance Metrics</Label>
              </div>
            </div>
          </div>

          {/* Alert Conditions */}
          <div className="space-y-3">
            <Label>Alert Conditions</Label>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="onlyOnAlerts"
                checked={config.onlyOnAlerts}
                onCheckedChange={(checked) =>
                  setConfig(prev => ({ ...prev, onlyOnAlerts: checked as boolean }))
                }
                disabled={!config.enabled}
              />
              <Label htmlFor="onlyOnAlerts">Only send reports when alerts are active</Label>
            </div>
          </div>

          {/* Preview */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="font-medium">Report Schedule Preview</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {config.enabled ? (
                <>
                  Reports will be sent <strong>{config.frequency}</strong> at{' '}
                  <strong>{config.time}</strong> to{' '}
                  <strong>{config.recipients.filter(r => r).length} recipient(s)</strong>
                  {config.onlyOnAlerts && (
                    <>
                      {' '}
                      <span className="inline-flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-yellow-500" />
                        only when alerts are active
                      </span>
                    </>
                  )}
                </>
              ) : (
                'Email reports are disabled'
              )}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
