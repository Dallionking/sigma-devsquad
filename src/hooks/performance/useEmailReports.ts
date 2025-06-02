
import { useState, useEffect } from 'react';
import { usePerformanceAlerts } from '@/contexts/PerformanceAlertsContext';

interface EmailReportData {
  alerts: any[];
  suggestions: any[];
  metrics: any;
  generatedAt: Date;
  period: string;
}

export const useEmailReports = () => {
  const { alerts, suggestions, getActiveAlerts, getCriticalAlerts } = usePerformanceAlerts();
  const [lastReportSent, setLastReportSent] = useState<Date | null>(null);

  const generateReportData = (period: string = 'week'): EmailReportData => {
    const now = new Date();
    const activeAlerts = getActiveAlerts();
    const criticalAlerts = getCriticalAlerts();

    // Calculate period start based on frequency
    let periodStart = new Date();
    switch (period) {
      case 'daily':
        periodStart.setDate(now.getDate() - 1);
        break;
      case 'weekly':
        periodStart.setDate(now.getDate() - 7);
        break;
      case 'monthly':
        periodStart.setMonth(now.getMonth() - 1);
        break;
    }

    // Filter alerts for the period
    const periodAlerts = alerts.filter(alert => alert.timestamp >= periodStart);

    // Mock metrics data (in real app, this would come from monitoring system)
    const metrics = {
      averageRenderTime: Math.random() * 20 + 5,
      averageMemoryUsage: Math.random() * 100 + 50,
      averageStateUpdateTime: Math.random() * 10 + 2,
      totalAlerts: periodAlerts.length,
      criticalAlerts: criticalAlerts.length,
      performance: {
        score: Math.floor(Math.random() * 30 + 70),
        trend: Math.random() > 0.5 ? 'improving' : 'declining'
      }
    };

    return {
      alerts: periodAlerts,
      suggestions: suggestions.slice(0, 5), // Top 5 suggestions
      metrics,
      generatedAt: now,
      period
    };
  };

  const generateEmailHTML = (reportData: EmailReportData): string => {
    const { alerts, suggestions, metrics, generatedAt, period } = reportData;
    
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Performance Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; }
            .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .metric { background: #f8fafc; padding: 15px; margin: 10px 0; border-radius: 6px; border-left: 4px solid #2563eb; }
            .alert { background: #fef2f2; padding: 15px; margin: 10px 0; border-radius: 6px; border-left: 4px solid #ef4444; }
            .suggestion { background: #f0f9ff; padding: 15px; margin: 10px 0; border-radius: 6px; border-left: 4px solid #0ea5e9; }
            .footer { background: #f8fafc; padding: 20px; text-align: center; color: #6b7280; font-size: 12px; }
            h2 { margin-top: 30px; margin-bottom: 15px; color: #1f2937; }
            h3 { margin-top: 0; margin-bottom: 10px; color: #374151; }
            .status-good { color: #059669; }
            .status-warning { color: #d97706; }
            .status-critical { color: #dc2626; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Performance Report</h1>
              <p>${period.charAt(0).toUpperCase() + period.slice(1)} report generated on ${generatedAt.toLocaleDateString()}</p>
            </div>
            
            <div class="content">
              <h2>Performance Overview</h2>
              <div class="metric">
                <h3>Overall Performance Score</h3>
                <p class="${metrics.performance.score >= 80 ? 'status-good' : metrics.performance.score >= 60 ? 'status-warning' : 'status-critical'}">
                  ${metrics.performance.score}/100 (${metrics.performance.trend})
                </p>
              </div>
              
              <div class="metric">
                <h3>Key Metrics</h3>
                <ul>
                  <li>Average Render Time: ${metrics.averageRenderTime.toFixed(2)}ms</li>
                  <li>Average Memory Usage: ${metrics.averageMemoryUsage.toFixed(1)}MB</li>
                  <li>Average State Update Time: ${metrics.averageStateUpdateTime.toFixed(2)}ms</li>
                </ul>
              </div>

              ${alerts.length > 0 ? `
                <h2>Performance Alerts (${alerts.length})</h2>
                ${alerts.slice(0, 10).map(alert => `
                  <div class="alert">
                    <h3 class="status-${alert.severity}">${alert.severity.toUpperCase()}: ${alert.metricName}</h3>
                    <p>${alert.message}</p>
                    <small>Triggered at ${alert.timestamp.toLocaleString()}</small>
                  </div>
                `).join('')}
                ${alerts.length > 10 ? `<p><em>... and ${alerts.length - 10} more alerts</em></p>` : ''}
              ` : '<p>No performance alerts during this period. Great job! 🎉</p>'}

              ${suggestions.length > 0 ? `
                <h2>Improvement Suggestions</h2>
                ${suggestions.map(suggestion => `
                  <div class="suggestion">
                    <h3>${suggestion.title}</h3>
                    <p>${suggestion.description}</p>
                    <small>Impact: ${suggestion.impact} | Effort: ${suggestion.effort}</small>
                  </div>
                `).join('')}
              ` : ''}
            </div>
            
            <div class="footer">
              <p>This report was automatically generated by your performance monitoring system.</p>
              <p>To modify your report settings or unsubscribe, please contact your system administrator.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  };

  const sendEmailReport = async (
    recipients: string[],
    subject: string,
    reportData: EmailReportData
  ): Promise<boolean> => {
    try {
      // In a real application, this would call a backend API or email service
      const htmlContent = generateEmailHTML(reportData);
      
      console.log('Sending email report to:', recipients);
      console.log('Subject:', subject);
      console.log('HTML Content:', htmlContent);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setLastReportSent(new Date());
      return true;
    } catch (error) {
      console.error('Failed to send email report:', error);
      return false;
    }
  };

  const scheduleReport = (
    frequency: 'daily' | 'weekly' | 'monthly',
    time: string,
    recipients: string[],
    config: any
  ) => {
    // In a real application, this would set up a cron job or scheduled task
    console.log('Scheduling email reports:', {
      frequency,
      time,
      recipients,
      config
    });
  };

  return {
    generateReportData,
    generateEmailHTML,
    sendEmailReport,
    scheduleReport,
    lastReportSent
  };
};
