
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";

const aiToolsData = [
  {
    tool: "Vibe DevSquad",
    price: "$99",
    function: "Complete AI development team",
    target: "Teams & individuals",
    advantage: "All-in-one solution with team orchestration",
    isVibe: true
  },
  {
    tool: "Cursor",
    price: "$20",
    function: "AI-powered code editor",
    target: "Individual developers",
    advantage: "Limited to code editing only",
    isVibe: false
  },
  {
    tool: "Windsurf",
    price: "$15",
    function: "AI development assistant",
    target: "Individual developers",
    advantage: "No team orchestration or planning",
    isVibe: false
  },
  {
    tool: "ChatGPT Plus",
    price: "$20",
    function: "General AI assistant",
    target: "General users",
    advantage: "Not development-specific",
    isVibe: false
  },
  {
    tool: "GitHub Copilot",
    price: "$10",
    function: "Code completion",
    target: "Individual developers",
    advantage: "No planning, testing, or workflow",
    isVibe: false
  },
  {
    tool: "Anthropic Claude Pro",
    price: "$20",
    function: "General AI assistant",
    target: "General users",
    advantage: "Not development-focused",
    isVibe: false
  },
  {
    tool: "Perplexity Pro",
    price: "$20",
    function: "Research assistant",
    target: "Knowledge workers",
    advantage: "Limited to research tasks",
    isVibe: false
  }
];

export const AIToolsComparisonTable = () => {
  return (
    <>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">AI Development Tools Market Comparison</h3>
        <p className="text-muted-foreground">
          See how Vibe DevSquad compares to popular AI development tools
        </p>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Tool</TableHead>
              <TableHead className="font-semibold">Price/Month</TableHead>
              <TableHead className="font-semibold">Primary Function</TableHead>
              <TableHead className="font-semibold">Target User</TableHead>
              <TableHead className="font-semibold">Key Limitation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {aiToolsData.map((item, index) => (
              <TableRow 
                key={index}
                className={item.isVibe ? 'bg-vibe-primary/5 border-vibe-primary/20' : 'hover:bg-muted/30'}
              >
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-2">
                    {item.isVibe && <Sparkles className="w-4 h-4 text-vibe-primary" />}
                    <span>{item.tool}</span>
                    {item.isVibe && <Badge variant="secondary">Our Solution</Badge>}
                  </div>
                </TableCell>
                <TableCell className="font-semibold">
                  {item.price}/month
                </TableCell>
                <TableCell>{item.function}</TableCell>
                <TableCell>{item.target}</TableCell>
                <TableCell>
                  <span className={item.isVibe ? 'text-vibe-primary font-medium' : 'text-muted-foreground'}>
                    {item.advantage}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
        <div className="flex items-center space-x-2 mb-2">
          <Check className="w-5 h-5 text-green-600" />
          <span className="font-semibold text-green-800 dark:text-green-200">
            Vibe DevSquad Advantage
          </span>
        </div>
        <p className="text-green-700 dark:text-green-300 text-sm">
          For just $99/month, you get the equivalent functionality of multiple tools, 
          plus team orchestration, project planning, and workflow automation that none of the individual tools provide.
        </p>
      </div>
    </>
  );
};
