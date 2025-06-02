
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  Calendar,
  BarChart3,
  Activity,
  Clock
} from 'lucide-react';
import { PredictabilityData } from '@/types/workflow-analytics';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  Area,
  AreaChart,
  Bar,
  BarChart,
  Legend
} from 'recharts';

interface PredictabilityChartsProps {
  data: PredictabilityData;
  loading?: boolean;
}

export const PredictabilityCharts: React.FC<PredictabilityChartsProps> = ({
  data,
  loading
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1w' | '2w' | '1m'>('2w');

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Delivery Predictability
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Filter forecast data based on timeframe
  const filteredForecast = data.deliveryForecast.slice(0, 
    selectedTimeframe === '1w' ? 7 : selectedTimeframe === '2w' ? 14 : 30
  );

  // Prepare chart data
  const forecastChartData = filteredForecast.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    predicted: item.predictedCompletions,
    actual: item.actualCompletions || null,
    confidence: Math.round(item.confidenceLevel * 100),
    fullDate: item.date
  }));

  const confidenceChartData = data.confidenceIntervals.slice(0, 14).map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    lower: item.lower,
    predicted: item.predicted,
    upper: item.upper,
    range: item.upper - item.lower
  }));

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 85) return 'text-green-600 bg-green-50 border-green-200';
    if (accuracy >= 70) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getRiskColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  // Calculate accuracy metrics
  const actualVsPredicted = forecastChartData.filter(item => item.actual !== null);
  const avgAccuracy = actualVsPredicted.length > 0 
    ? actualVsPredicted.reduce((sum, item) => {
        const accuracy = item.actual ? (1 - Math.abs(item.predicted - item.actual) / Math.max(item.predicted, item.actual)) * 100 : 0;
        return sum + accuracy;
      }, 0) / actualVsPredicted.length
    : data.historicalAccuracy;

  return (
    <div className="space-y-6">
      {/* Header with Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Historical Accuracy</span>
            </div>
            <div className="text-2xl font-bold">{Math.round(data.historicalAccuracy)}%</div>
            <div className="text-xs text-muted-foreground">Last 90 days</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Current Accuracy</span>
            </div>
            <div className="text-2xl font-bold">{Math.round(avgAccuracy)}%</div>
            <div className="text-xs text-muted-foreground">Recent forecasts</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium">Forecast Range</span>
            </div>
            <div className="text-2xl font-bold">{filteredForecast.length}d</div>
            <div className="text-xs text-muted-foreground">Planning horizon</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium">Risk Factors</span>
            </div>
            <div className="text-2xl font-bold">{data.riskFactors.length}</div>
            <div className="text-xs text-muted-foreground">Active risks</div>
          </CardContent>
        </Card>
      </div>

      {/* Forecast Accuracy Alert */}
      {avgAccuracy < 70 && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>Forecast accuracy below target</strong> ({Math.round(avgAccuracy)}%). 
            Consider reviewing risk factors and adjusting planning assumptions.
          </AlertDescription>
        </Alert>
      )}

      {/* Forecast vs Actual Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Delivery Forecast vs Actual
            </CardTitle>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={selectedTimeframe === '1w' ? 'default' : 'outline'}
                onClick={() => setSelectedTimeframe('1w')}
              >
                1W
              </Button>
              <Button
                size="sm"
                variant={selectedTimeframe === '2w' ? 'default' : 'outline'}
                onClick={() => setSelectedTimeframe('2w')}
              >
                2W
              </Button>
              <Button
                size="sm"
                variant={selectedTimeframe === '1m' ? 'default' : 'outline'}
                onClick={() => setSelectedTimeframe('1m')}
              >
                1M
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              predicted: { label: "Predicted Completions", color: "hsl(var(--chart-1))" },
              actual: { label: "Actual Completions", color: "hsl(var(--chart-2))" }
            }}
            className="h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={forecastChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  labelFormatter={(label, payload) => {
                    const item = payload?.[0]?.payload;
                    return item ? `${label} (${item.confidence}% confidence)` : label;
                  }}
                />
                <Legend />
                <Bar dataKey="predicted" fill="hsl(var(--chart-1))" name="Predicted" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actual" fill="hsl(var(--chart-2))" name="Actual" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Confidence Intervals Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Confidence Intervals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              upper: { label: "Upper Bound", color: "hsl(var(--chart-3))" },
              predicted: { label: "Predicted", color: "hsl(var(--chart-1))" },
              lower: { label: "Lower Bound", color: "hsl(var(--chart-4))" }
            }}
            className="h-64"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={confidenceChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area 
                  dataKey="upper" 
                  stackId="1" 
                  stroke="hsl(var(--chart-3))" 
                  fill="hsl(var(--chart-3))" 
                  fillOpacity={0.3}
                />
                <Area 
                  dataKey="lower" 
                  stackId="1" 
                  stroke="hsl(var(--chart-4))" 
                  fill="hsl(var(--chart-4))" 
                  fillOpacity={0.3}
                />
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="hsl(var(--chart-1))" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Risk Factors and Accuracy Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Factors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Risk Factors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.riskFactors.map((risk, index) => (
                <div key={index} className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{risk.factor}</h4>
                    <Badge className={getRiskColor(risk.impact)}>
                      {risk.impact} impact
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{risk.description}</p>
                  <div className="bg-blue-50 border border-blue-200 rounded p-3">
                    <h5 className="font-medium text-blue-800 mb-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Mitigation
                    </h5>
                    <p className="text-sm text-blue-700">{risk.mitigation}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Accuracy Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Accuracy Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className={`p-4 rounded-lg border ${getAccuracyColor(data.historicalAccuracy)}`}>
                <h4 className="font-medium mb-2">Overall Performance</h4>
                <div className="text-2xl font-bold mb-2">{data.historicalAccuracy}%</div>
                <p className="text-sm">
                  {data.historicalAccuracy >= 85 ? 'Excellent predictability' : 
                   data.historicalAccuracy >= 70 ? 'Good predictability with room for improvement' : 
                   'Predictability needs significant improvement'}
                </p>
              </div>

              <div className="space-y-3">
                <h5 className="font-medium">Accuracy Breakdown</h5>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-sm">Last 7 days</span>
                  <Badge variant="outline">{Math.round(avgAccuracy)}%</Badge>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-sm">Last 30 days</span>
                  <Badge variant="outline">{data.historicalAccuracy}%</Badge>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-sm">Trend</span>
                  <Badge variant={avgAccuracy > data.historicalAccuracy ? 'default' : 'destructive'}>
                    {avgAccuracy > data.historicalAccuracy ? 'Improving' : 'Declining'}
                  </Badge>
                </div>
              </div>

              <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded">
                <h5 className="font-medium text-blue-800 mb-2">Recommendations</h5>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Review forecasting methodology monthly</li>
                  <li>• Monitor risk factors proactively</li>
                  <li>• Adjust confidence intervals based on historical variance</li>
                  <li>• Implement early warning systems for delivery risks</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
