
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Monitor, Wifi, WifiOff, Settings, RefreshCw } from "lucide-react";
import { IDE } from "./IDEConnectionStatus";

interface ConnectionStatusTabProps {
  ides: IDE[];
  selectedIDE: string;
  setSelectedIDE: (id: string) => void;
}

export const ConnectionStatusTab = ({ ides, selectedIDE, setSelectedIDE }: ConnectionStatusTabProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ides.map((ide) => (
        <Card 
          key={ide.id} 
          className={`bg-card border-border cursor-pointer transition-all hover:shadow-md ${
            selectedIDE === ide.id ? 'ring-2 ring-primary' : ''
          }`}
          onClick={() => setSelectedIDE(ide.id)}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Monitor className="w-5 h-5 text-primary" />
                <CardTitle className="text-card-foreground">{ide.name}</CardTitle>
              </div>
              <Badge 
                variant={ide.status === "connected" ? "default" : "secondary"}
                className={ide.status === "connected" 
                  ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300" 
                  : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                }
              >
                {ide.status === "connected" ? (
                  <Wifi className="w-3 h-3 mr-1" />
                ) : (
                  <WifiOff className="w-3 h-3 mr-1" />
                )}
                {ide.status}
              </Badge>
            </div>
            <CardDescription className="text-muted-foreground">
              Version {ide.version}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-card-foreground mb-2">Extensions</h4>
              <div className="flex flex-wrap gap-1">
                {ide.extensions.map((ext) => (
                  <Badge key={ext} variant="outline" className="text-xs">
                    {ext}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              Last sync: {ide.lastSync}
            </div>
            
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="flex-1">
                <Settings className="w-4 h-4 mr-1" />
                Configure
              </Button>
              <Button size="sm" variant="outline">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
