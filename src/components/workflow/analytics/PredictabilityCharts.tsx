
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  Calendar,
  BarChart3,
  Activity,
  Settings
} from 'lucide-react';
import { PredictabilityData } from '@/types/workflow-analytics';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  AreaChart,
  Area,
  ComposedChart,
  Bar,
  ReferenceLine
} from 'recharts';

interface PredictabilityChartsProps {
  data: PredictabilityData;
  loading?: boolean;
}

export const PredictabilityCharts: React.FC<PredictabilityChartsProps> = ({
  data,
  loading
}) => {
  const [forecastRange, setForecastRange] = useState<'7d' | '14d' | '30d'>('14d');
  const [activeTab, setActiveTab] = useState('forecast');

  // Prepare forecast chart data
  const forecastChartData = data.deliveryForecast.map((item, index) => {
    const confidence = data.confidenceIntervals[index];
    return {
      ...item,
      ...confidence,
      accuracy: item.actualCompletions ? 
        Math.abs(item.predictedCompletions - item.actualCompletions) / item.predictedCompletions * 100 : null
    };
  });

  // Calculate accuracy metrics
  const getAccuracyMetrics = () => {
    const actualData = forecastChartData.filter(item => item.actualCompletions !== undefined);
    if (actualData.length === 0) return { avgAccuracy: 0, trend: 0, variance: 0 };

    const accuracies = actualData.map(item => {
      const error = Math.abs(item.predictedCompletions - item.actualCompletions!) / item.actualCompletions! * 100;
      return Math.max(0, 100 - error);
    });

    const avgAccuracy = accuracies.reduce((sum, acc) => sum + acc, 0) / accuracies.length;
    const variance = Math.sqrt(accuracies.reduce((sum, acc) => sum + Math.pow(acc - avgAccuracy, 2), 0) / accuracies.length);
    
    // Simple trend calculation (last 3 vs first 3)
    const recent = accuracies.slice(-3).reduce((sum, acc) => sum + acc, 0) / 3;
    const earlier = accuracies.slice(0, 3).reduce((sum, acc) => sum + acc, 0) / 3;
    const trend = recent - earlier;

    return { avgAccuracy, trend, variance };
  };

  const accuracyMetrics = getAccuracyMetrics();

  const getRiskLevel = (riskCount: number) => {
    if (riskCount >= 3) return { level: 'High', color: 'text-red-600', bgColor: 'bg-red-50' };
    if (riskCount >= 2) return { level: 'Medium', color: 'text-orange-600', bgColor: 'bg-orange-50' };
    return { level: 'Low', color: 'text-green-600', bgColor: 'bg-green-50' };
  };

  const riskLevel = getRiskLevel(data.riskFactors.filter(r => r.impact === 'high').length);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Predictability & Forecasting
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Predictability & Forecasting
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant={forecastRange === '7d' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setForecastRange('7d')}
              >
                7 days
              </Button>
              <Button
                variant={forecastRange === '14d' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setForecastRange('14d')}
              >
                14 days
              </Button>
              <Button
                variant={forecastRange === '30d' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setForecastRange('30d')}
              >
                30 days
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="text-center p-4 rounded-lg bg-blue-50">
              <div className="text-2xl font-bold text-blue-600">{Math.round(data.historicalAccuracy)}%</div>
              <div className="text-sm font-medium">Historical Accuracy</div>
              <div className="text-xs text-muted-foreground mt-1">
                {accuracyMetrics.trend > 0 ? '↗' : '↘'} {Math.abs(accuracyMetrics.trend).toFixed(1)}%
              </div>
            </div>

            <div className="text-center p-4 rounded-lg bg-green-50">
              <div className="text-2xl font-bold text-green-600">
                {forecastChartData.filter(d => d.confidenceLevel > 0.8).length}
              </div>
              <div className="text-sm font-medium">High Confidence Days</div>
              <div className="text-xs text-muted-foreground mt-1">
                >80% confidence
              </div>
            </div>

            <div className={`text-center p-4 rounded-lg ${riskLevel.bgColor}`}>
              <div className={`text-2xl font-bold ${riskLevel.color}`}>
                {data.riskFactors.filter(r => r.impact === 'high').length}
              </div>
              <div className="text-sm font-medium">High Risk Factors</div>
              <Badge variant="outline" className={riskLevel.color}>
                {riskLevel.level} Risk
              </Badge>
            </div>

            <div className="text-center p-4 rounded-lg bg-purple-50">
              <div className="text-2xl font-bold text-purple-600">
                ±{Math.round(accuracyMetrics.variance)}%
              </div>
              <div className="text-sm font-medium">Prediction Variance</div>
              <div className="text-xs text-muted-foreground mt-1">
                Forecast stability
              </div>
            </div>
          </div>

          {/* Risk Alert */}
          {data.riskFactors.filter(r => r.impact === 'high').length > 0 && (
            <Alert className="mb-6 border-orange-200 bg-orange-50">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                <strong>{data.riskFactors.filter(r => r.impact === 'high').length} high-impact risk factors</strong> detected 
                that may affect delivery predictability. Review mitigation strategies below.
              </AlertDescription>
            </Alert>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="forecast">Delivery Forecast</TabsTrigger>
              <TabsTrigger value="confidence">Confidence Analysis</TabsTrigger>
              <TabsTrigger value="accuracy">Historical Accuracy</TabsTrigger>
              <TabsTrigger value="risks">Risk Assessment</TabsTrigger>
            </TabsList>

            <TabsContent value="forecast" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {forecastRange === '7d' ? '7-Day' : forecastRange === '14d' ? '14-Day' : '30-Day'} Delivery Forecast
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      predicted: { label: "Predicted Completions", color: "hsl(var(--chart-1))" },
                      actual: { label: "Actual Completions", color: "hsl(var(--chart-2))" },
                      upper: { label: "Upper Bound", color: "hsl(var(--chart-3))" },
                      lower: { label: "Lower Bound", color: "hsl(var(--chart-3))" }
                    }}
                    className="h-80"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={forecastChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="date" 
                          tick={{ fontSize: 12 }}
                          tickFormatter={(value) => new Date(value).toLocaleDateString()}
                        />
                        <YAxis tick={{ fontSize: 12 }} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        
                        {/* Confidence interval area */}
                        <Area
                          dataKey="upper"
                          stroke="none"
                          fill="hsl(var(--chart-3))"
                          fillOpacity={0.2}
                        />
                        <Area
                          dataKey="lower"
                          stroke="none"
                          fill="hsl(var(--chart-3))"
                          fillOpacity={0.2}
                        />
                        
                        {/* Predicted line */}
                        <Line
                          type="monotone"
                          dataKey="predicted"
                          stroke="hsl(var(--chart-1))"
                          strokeWidth={3}
                          dot={{ fill: 'hsl(var(--chart-1))', strokeWidth: 2, r: 4 }}
                        />
                        
                        {/* Actual completions */}
                        <Line
                          type="monotone"
                          dataKey="actualCompletions"
                          stroke="hsl(var(--chart-2))"
                          strokeWidth={2}
                          dot={{ fill: 'hsl(var(--chart-2))', strokeWidth: 2, r: 6 }}
                          connectNulls={false}
                        />
                        
                        {/* Reference line for today */}
                        <ReferenceLine 
                          x={new Date().toISOString().split('T')[0]} 
                          stroke="#666" 
                          strokeDasharray="5 5"
                          label="Today"
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </ChartContainer>

                  <div className="mt-6 grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">
                        {forecastChartData.reduce((sum, item) => sum + item.predicted, 0)}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Predicted</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">
                        {Math.round(forecastChartData.reduce((sum, item) => sum + item.confidenceLevel, 0) / forecastChartData.length * 100)}%
                      </div>
                      <div className="text-sm text-muted-foreground">Avg Confidence</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-lg font-bold text-purple-600">
                        ±{Math.round((forecastChartData.reduce((sum, item) => sum + (item.upper - item.lower), 0) / forecastChartData.length) / 2)}
                      </div>
                      <div className="text-sm text-muted-foreground">Avg Variance</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="confidence" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Confidence Level Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      confidenceLevel: { label: "Confidence Level", color: "hsl(var(--chart-1))" }
                    }}
                    className="h-64"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={forecastChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="date" 
                          tick={{ fontSize: 12 }}
                          tickFormatter={(value) => new Date(value).toLocaleDateString()}
                        />
                        <YAxis 
                          tick={{ fontSize: 12 }}
                          domain={[0, 1]}
                          tickFormatter={(value) => `${Math.round(value * 100)}%`}
                        />
                        <ChartTooltip 
                          content={<ChartTooltipContent />}
                          formatter={(value: any) => [`${Math.round(value * 100)}%`, 'Confidence']}
                        />
                        <Area
                          type="monotone"
                          dataKey="confidenceLevel"
                          stroke="hsl(var(--chart-1))"
                          fill="hsl(var(--chart-1))"
                          fillOpacity={0.6}
                        />
                        <ReferenceLine y={0.8} stroke="#22c55e" strokeDasharray="5 5" label="High Confidence" />
                        <ReferenceLine y={0.6} stroke="#eab308" strokeDasharray="5 5" label="Medium Confidence" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
                      <span className="font-medium text-green-800">High Confidence (>80%)</span>
                      <span className="text-green-600">
                        {forecastChartData.filter(d => d.confidenceLevel > 0.8).length} days
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50">
                      <span className="font-medium text-yellow-800">Medium Confidence (60-80%)</span>
                      <span className="text-yellow-600">
                        {forecastChartData.filter(d => d.confidenceLevel >= 0.6 && d.confidenceLevel <= 0.8).length} days
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-red-50">
                      <span className="font-medium text-red-800">Low Confidence (<60%)</span>
                      <span className="text-red-600">
                        {forecastChartData.filter(d => d.confidenceLevel < 0.6).length} days
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="accuracy" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Historical Accuracy Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      predicted: { label: "Predicted", color: "hsl(var(--chart-1))" },
                      actual: { label: "Actual", color: "hsl(var(--chart-2))" }
                    }}
                    className="h-64"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={forecastChartData.filter(d => d.actualCompletions !== undefined)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="date" 
                          tick={{ fontSize: 12 }}
                          tickFormatter={(value) => new Date(value).toLocaleDateString()}
                        />
                        <YAxis tick={{ fontSize: 12 }} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="predictedCompletions"
                          stroke="hsl(var(--chart-1))"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                        />
                        <Line
                          type="monotone"
                          dataKey="actualCompletions"
                          stroke="hsl(var(--chart-2))"
                          strokeWidth={3}
                          dot={{ fill: 'hsl(var(--chart-2))', strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>

                  <div className="mt-6 grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-medium">Accuracy Metrics</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Overall Accuracy:</span>
                          <span className="font-medium">{Math.round(data.historicalAccuracy)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Recent Trend:</span>
                          <span className={`font-medium ${accuracyMetrics.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {accuracyMetrics.trend > 0 ? '+' : ''}{accuracyMetrics.trend.toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Variance:</span>
                          <span className="font-medium">±{Math.round(accuracyMetrics.variance)}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Improvement Areas</h4>
                      <div className="space-y-2 text-sm">
                        <div className="text-muted-foreground">
                          • Better estimation for complex tasks
                        </div>
                        <div className="text-muted-foreground">
                          • Account for holiday impact
                        </div>
                        <div className="text-muted-foreground">
                          • Include technical debt factor
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="risks" className="mt-6">
              <div className="space-y-4">
                {data.riskFactors.map((risk, index) => (
                  <Card key={index} className={`border-l-4 ${
                    risk.impact === 'high' ? 'border-red-500' :
                    risk.impact === 'medium' ? 'border-orange-500' : 'border-yellow-500'
                  }`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{risk.factor}</h4>
                        <Badge 
                          variant="outline" 
                          className={
                            risk.impact === 'high' ? 'text-red-600 border-red-300' :
                            risk.impact === 'medium' ? 'text-orange-600 border-orange-300' :
                            'text-yellow-600 border-yellow-300'
                          }
                        >
                          {risk.impact} impact
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">{risk.description}</p>
                      
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <h5 className="font-medium text-sm mb-1 flex items-center gap-2">
                          <Settings className="w-3 h-3" />
                          Mitigation Strategy
                        </h5>
                        <p className="text-sm text-muted-foreground">{risk.mitigation}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
