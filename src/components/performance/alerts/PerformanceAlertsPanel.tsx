
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePerformanceAlerts } from '@/contexts/PerformanceAlertsContext';
import { AlertTriangle, CheckCircle, Clock, TrendingUp, TrendingDown, Settings, Mail, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AlertsConfiguration } from './AlertsConfiguration';
import { ImprovementSuggestions } from './ImprovementSuggestions';
import { EmailReportsConfig } from './EmailReportsConfig';

export const PerformanceAlertsPanel = () => {
  const { 
    alerts, 
    getActiveAlerts, 
    getCriticalAlerts, 
    acknowledgeAlert,
    suggestions 
  } = usePerformanceAlerts();
  
  const [activeTab, setActiveTab] = useState('alerts');
  const activeAlerts = getActiveAlerts();
  const criticalAlerts = getCriticalAlerts();

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default: return <CheckCircle className="w-4 h-4 text-blue-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="w-3 h-3 text-green-500" />;
      case 'declining': return <TrendingDown className="w-3 h-3 text-red-500" />;
      default: return null;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Performance Alerts
          {activeAlerts.length > 0 && (
            <Badge variant="destructive" className="ml-2">
              {activeAlerts.length} active
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <div className="px-6 pb-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="alerts" className="flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Alerts
                {activeAlerts.length > 0 && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {activeAlerts.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="suggestions" className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Suggestions
                {suggestions.length > 0 && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {suggestions.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="config" className="flex items-center gap-1">
                <Settings className="w-3 h-3" />
                Config
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                Reports
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="alerts" className="mt-0 px-6">
            <div className="space-y-4">
              {/* Critical Alerts Summary */}
              {criticalAlerts.length > 0 && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <span className="font-medium text-red-800">
                      {criticalAlerts.length} Critical Alert{criticalAlerts.length > 1 ? 's' : ''}
                    </span>
                  </div>
                  <p className="text-sm text-red-700">
                    Immediate attention required for critical performance issues.
                  </p>
                </div>
              )}

              {/* Alerts List */}
              <ScrollArea className="h-80">
                <div className="space-y-3">
                  {alerts.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
                      <p>No performance alerts</p>
                      <p className="text-sm">All metrics are within normal ranges</p>
                    </div>
                  ) : (
                    alerts.map((alert) => (
                      <div
                        key={alert.id}
                        className={cn(
                          "p-4 border rounded-lg transition-all",
                          alert.acknowledged ? "opacity-60 bg-muted/30" : "bg-card",
                          getSeverityColor(alert.severity).replace('bg-', 'border-')
                        )}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            {getSeverityIcon(alert.severity)}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium text-sm truncate">
                                  {alert.metricName}
                                </h4>
                                {alert.trend && getTrendIcon(alert.trend)}
                                <Badge 
                                  variant="outline" 
                                  className={cn("text-xs", getSeverityColor(alert.severity))}
                                >
                                  {alert.severity}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mb-2">
                                {alert.message}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                <span>{alert.timestamp.toLocaleTimeString()}</span>
                              </div>
                            </div>
                          </div>
                          {!alert.acknowledged && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => acknowledgeAlert(alert.id)}
                              className="text-xs"
                            >
                              Acknowledge
                            </Button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="suggestions" className="mt-0 px-6">
            <ImprovementSuggestions />
          </TabsContent>

          <TabsContent value="config" className="mt-0 px-6">
            <AlertsConfiguration />
          </TabsContent>

          <TabsContent value="reports" className="mt-0 px-6">
            <EmailReportsConfig />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
