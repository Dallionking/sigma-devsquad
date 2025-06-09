
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";

interface Provider {
  name: string;
  status: string;
  models: string[];
  usage: number;
  limit: number;
  cost: string;
}

interface ProviderCardProps {
  provider: Provider;
  showApiKey: boolean;
  setShowApiKey: (show: boolean) => void;
}

export const ProviderCard = ({ provider, showApiKey, setShowApiKey }: ProviderCardProps) => {
  return (
    <Card className="relative">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <span>{provider.name}</span>
            {provider.status === "connected" ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <AlertCircle className="w-4 h-4 text-muted-foreground" />
            )}
          </CardTitle>
          <Badge 
            variant={provider.status === "connected" ? "default" : "secondary"}
            className={provider.status === "connected" ? "bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300" : ""}
          >
            {provider.status}
          </Badge>
        </div>
        <CardDescription>
          {provider.models.length} models available
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>API Key</Label>
          <div className="flex space-x-2">
            <Input 
              type={showApiKey ? "text" : "password"}
              placeholder={provider.status === "connected" ? "••••••••••••" : "Enter API key"}
              className="flex-1"
            />
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setShowApiKey(!showApiKey)}
            >
              {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
        </div>
        
        {provider.status === "connected" && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Usage this month</span>
              <span>{provider.cost}</span>
            </div>
            <Progress value={provider.usage} className="h-2" />
            <div className="text-xs text-muted-foreground">
              {provider.usage}% of {provider.limit.toLocaleString()} tokens
            </div>
          </div>
        )}
        
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            variant={provider.status === "connected" ? "outline" : "default"}
            className="flex-1"
          >
            {provider.status === "connected" ? "Update" : "Connect"}
          </Button>
          {provider.status === "connected" && (
            <Button size="sm" variant="outline">Test</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
