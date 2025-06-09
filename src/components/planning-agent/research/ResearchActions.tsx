
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, TrendingUp, Globe } from "lucide-react";

export const ResearchActions = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Research Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start text-xs h-8">
            <BookOpen className="w-3 h-3 mr-2" />
            Browse documentation
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start text-xs h-8">
            <TrendingUp className="w-3 h-3 mr-2" />
            Analyze trends
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start text-xs h-8">
            <Globe className="w-3 h-3 mr-2" />
            Search web resources
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
