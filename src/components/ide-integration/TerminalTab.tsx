
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Terminal, Play, Square, RotateCcw, Plus, Trash2 } from "lucide-react";

export const TerminalTab = () => {
  const [command, setCommand] = useState("");
  const [activeTerminal, setActiveTerminal] = useState(0);

  const terminals = [
    { id: 0, name: "Main", status: "active", workingDir: "/Users/dev/projects/my-app" },
    { id: 1, name: "Server", status: "running", workingDir: "/Users/dev/projects/my-app" },
    { id: 2, name: "Build", status: "idle", workingDir: "/Users/dev/projects/my-app" }
  ];

  const terminalHistory = [
    { type: "command", content: "npm install", timestamp: "10:30:45" },
    { type: "output", content: "added 1247 packages from 837 contributors", timestamp: "10:30:47" },
    { type: "command", content: "npm run dev", timestamp: "10:31:02" },
    { type: "output", content: "Local:   http://localhost:3000/", timestamp: "10:31:03" },
    { type: "output", content: "ready - started server on 0.0.0.0:3000", timestamp: "10:31:03" },
    { type: "command", content: "git status", timestamp: "10:32:15" },
    { type: "output", content: "On branch main\nnothing to commit, working tree clean", timestamp: "10:32:16" }
  ];

  const handleCommand = () => {
    if (command.trim()) {
      console.log(`Executing: ${command}`);
      setCommand("");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-card-foreground">Terminal Interface</CardTitle>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-1" />
                New Terminal
              </Button>
              <Button size="sm" variant="outline">
                <RotateCcw className="w-4 h-4 mr-1" />
                Clear
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Terminal Tabs */}
          <div className="flex space-x-1 border-b border-border">
            {terminals.map((terminal) => (
              <div
                key={terminal.id}
                className={`flex items-center space-x-2 px-3 py-2 rounded-t-md cursor-pointer transition-colors ${
                  activeTerminal === terminal.id 
                    ? 'bg-muted text-card-foreground' 
                    : 'hover:bg-muted/50 text-muted-foreground'
                }`}
                onClick={() => setActiveTerminal(terminal.id)}
              >
                <Terminal className="w-4 h-4" />
                <span className="text-sm font-medium">{terminal.name}</span>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    terminal.status === "running" 
                      ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                      : terminal.status === "active"
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                      : "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {terminal.status}
                </Badge>
                <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>

          {/* Terminal Output */}
          <div className="bg-black text-green-400 p-4 rounded-md h-64 overflow-y-auto font-mono text-sm">
            <div className="text-muted-foreground mb-2">
              Working directory: {terminals[activeTerminal]?.workingDir}
            </div>
            {terminalHistory.map((line, index) => (
              <div key={index} className="mb-1">
                <span className="text-gray-500 text-xs mr-2">{line.timestamp}</span>
                {line.type === "command" ? (
                  <span className="text-blue-400">$ {line.content}</span>
                ) : (
                  <span className="text-green-400 whitespace-pre-line">{line.content}</span>
                )}
              </div>
            ))}
            <div className="flex items-center">
              <span className="text-blue-400 mr-2">$</span>
              <span className="animate-pulse">|</span>
            </div>
          </div>

          {/* Command Input */}
          <div className="flex space-x-2">
            <div className="flex-1 flex">
              <span className="bg-muted px-3 py-2 rounded-l-md text-muted-foreground font-mono text-sm">$</span>
              <Input
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCommand()}
                placeholder="Enter command..."
                className="rounded-l-none bg-background border-border font-mono"
              />
            </div>
            <Button onClick={handleCommand} disabled={!command.trim()}>
              <Play className="w-4 h-4 mr-1" />
              Run
            </Button>
            <Button variant="outline">
              <Square className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
