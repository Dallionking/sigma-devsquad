
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, TrendingUp, AlertTriangle, Download, Calendar, BarChart3 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

interface CostData {
  date: string;
  openai: number;
  anthropic: number;
  google: number;
  total: number;
}

interface UsageStats {
  provider: string;
  model: string;
  requests: number;
  tokens: number;
  cost: number;
  avgResponseTime: number;
}

const mockCostData: CostData[] = [
  { date: "2024-05-01", openai: 45.60, anthropic: 12.05, google: 8.30, total: 65.95 },
  { date: "2024-05-02", openai: 52.30, anthropic: 15.20, google: 9.10, total: 76.60 },
  { date: "2024-05-03", openai: 38.90, anthropic: 18.45, google: 7.65, total: 65.00 },
  { date: "2024-05-04", openai: 41.20, anthropic: 14.80, google: 10.25, total: 66.25 },
  { date: "2024-05-05", openai: 49.75, anthropic: 16.90, google: 8.85, total: 75.50 },
];

const mockUsageStats: UsageStats[] = [
  { provider: "OpenAI", model: "GPT-4o", requests: 1245, tokens: 245000, cost: 49.00, avgResponseTime: 1.2 },
  { provider: "OpenAI", model: "GPT-4o Mini", requests: 3421, tokens: 512000, cost: 25.60, avgResponseTime: 0.8 },
  { provider: "Anthropic", model: "Claude 3 Opus", requests: 892, tokens: 178000, cost: 35.60, avgResponseTime: 1.5 },
  { provider: "Anthropic", model: "Claude 3 Sonnet", requests: 1567, tokens: 298000, cost: 18.90, avgResponseTime: 1.1 },
  { provider: "Google", model: "Gemini Pro", requests: 743, tokens: 134000, cost: 12.40, avgResponseTime: 1.0 },
];

const pieChartData = [
  { name: "OpenAI", value: 74.60, color: "#10B981" },
  { name: "Anthropic", value: 54.50, color: "#3B82F6" },
  { name: "Google", value: 20.85, color: "#F59E0B" },
];

export const CostTrackingDashboard = () => {
  const totalMonthlyCost = mockCostData.reduce((sum, day) => sum + day.total, 0);
  const averageDailyCost = totalMonthlyCost / mockCostData.length;
  const projectedMonthlyCost = averageDailyCost * 30;

  const handleExportData = () => {
    const csvData = mockUsageStats.map(stat => 
      `${stat.provider},${stat.model},${stat.requests},${stat.tokens},${stat.cost},${stat.avgResponseTime}`
    ).join('\n');
    
    const blob = new Blob([`Provider,Model,Requests,Tokens,Cost,Avg Response Time\n${csvData}`], 
      { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'llm-usage-report.csv';
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total This Month</p>
                <p className="text-2xl font-bold">${totalMonthlyCost.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Daily Average</p>
                <p className="text-2xl font-bold">${averageDailyCost.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Projected Monthly</p>
                <p className="text-2xl font-bold">${projectedMonthlyCost.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Budget Usage</p>
                <div className="flex items-center space-x-2">
                  <Progress value={65} className="flex-1" />
                  <span className="text-sm font-medium">65%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="usage">Usage Analytics</TabsTrigger>
            <TabsTrigger value="providers">Provider Breakdown</TabsTrigger>
            <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
          </TabsList>
          <Button onClick={handleExportData} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Cost Trend</CardTitle>
                <CardDescription>Cost breakdown by provider over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockCostData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="openai" stroke="#10B981" />
                    <Line type="monotone" dataKey="anthropic" stroke="#3B82F6" />
                    <Line type="monotone" dataKey="google" stroke="#F59E0B" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Provider Distribution</CardTitle>
                <CardDescription>Cost allocation by provider</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="usage">
          <Card>
            <CardHeader>
              <CardTitle>Usage Statistics by Model</CardTitle>
              <CardDescription>Detailed breakdown of requests, tokens, and costs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockUsageStats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div>
                        <div className="font-medium">{stat.model}</div>
                        <div className="text-sm text-muted-foreground">{stat.provider}</div>
                      </div>
                      <Badge variant="outline">{stat.requests.toLocaleString()} requests</Badge>
                      <Badge variant="secondary">{(stat.tokens / 1000).toFixed(0)}K tokens</Badge>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">${stat.cost.toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">{stat.avgResponseTime}s avg</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="providers">
          <Card>
            <CardHeader>
              <CardTitle>Provider Performance Comparison</CardTitle>
              <CardDescription>Cost efficiency and response time analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={mockUsageStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="model" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="cost" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forecasting">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Projection</CardTitle>
                <CardDescription>Based on current usage patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Conservative Estimate</span>
                    <span className="font-bold">${(projectedMonthlyCost * 0.8).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Current Projection</span>
                    <span className="font-bold">${projectedMonthlyCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>High Usage Scenario</span>
                    <span className="font-bold text-orange-600">${(projectedMonthlyCost * 1.3).toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Optimization Tips</CardTitle>
                <CardDescription>Recommendations to reduce costs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                    <div>
                      <p className="font-medium">Use GPT-4o Mini for simple tasks</p>
                      <p className="text-sm text-muted-foreground">Could save ~40% on costs</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                    <div>
                      <p className="font-medium">Implement request caching</p>
                      <p className="text-sm text-muted-foreground">Reduce duplicate requests</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                    <div>
                      <p className="font-medium">Set per-agent token limits</p>
                      <p className="text-sm text-muted-foreground">Prevent runaway costs</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
