
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface Provider {
  name: string;
  status: string;
  models: string[];
  usage: number;
  limit: number;
  cost: string;
}

interface UsageTabProps {
  providers: Provider[];
}

export const UsageTab = ({ providers }: UsageTabProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$57.65</div>
            <div className="text-sm text-muted-foreground">This month</div>
          </CardContent>
        </Card>
      
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Requests Made</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2,847</div>
            <div className="text-sm text-muted-foreground">Last 30 days</div>
          </CardContent>
        </Card>
      
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Avg. Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1.2s</div>
            <div className="text-sm text-muted-foreground">Across all models</div>
          </CardContent>
        </Card>
      </div>
    
      <Card>
        <CardHeader>
          <CardTitle>Usage by Provider</CardTitle>
          <CardDescription>Detailed breakdown of API usage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {providers.map((provider) => (
              <div key={provider.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <div>
                    <div className="font-medium">{provider.name}</div>
                    <div className="text-sm text-muted-foreground">{provider.usage}% of limit</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{provider.cost}</div>
                  <div className="text-sm text-muted-foreground">This month</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
