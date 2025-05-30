
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const TestingTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Testing Interface</CardTitle>
        <CardDescription>Test your models and prompt configurations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Test Prompt</Label>
              <Textarea 
                placeholder="Enter your test prompt here..."
                className="h-32"
              />
            </div>
            
            <div className="flex space-x-2">
              <Button className="flex-1">Send Test</Button>
              <Button variant="outline">Clear</Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Response</Label>
              <div className="h-32 p-3 border rounded-md bg-slate-50 text-sm text-slate-600">
                Response will appear here...
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              Response time: 1.24s • Tokens: 156 • Cost: $0.002
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
