
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calculator, DollarSign, Sparkles, Users } from "lucide-react";

const devTeamData = [
  {
    resource: "Vibe DevSquad",
    monthly: "$99",
    annual: "$1,188",
    savings: "Base comparison",
    isVibe: true
  },
  {
    resource: "Junior Developer",
    monthly: "$5,000-$8,000",
    annual: "$60,000-$96,000",
    savings: "98% cost reduction",
    isVibe: false
  },
  {
    resource: "Mid-level Developer",
    monthly: "$8,000-$12,000",
    annual: "$96,000-$144,000",
    savings: "99% cost reduction",
    isVibe: false
  },
  {
    resource: "Senior Developer",
    monthly: "$12,000-$20,000",
    annual: "$144,000-$240,000",
    savings: "99.5% cost reduction",
    isVibe: false
  },
  {
    resource: "Small Dev Team (3-5 people)",
    monthly: "$20,000-$40,000",
    annual: "$240,000-$480,000",
    savings: "99.7% cost reduction",
    isVibe: false
  },
  {
    resource: "Mid-sized Dev Team (5-10 people)",
    monthly: "$40,000-$100,000",
    annual: "$480,000-$1,200,000",
    savings: "99.9% cost reduction",
    isVibe: false
  }
];

export const DevTeamComparisonTable = () => {
  return (
    <>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">Traditional Development Team Cost Comparison</h3>
        <p className="text-muted-foreground">
          See the massive cost savings compared to hiring human developers
        </p>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Resource Type</TableHead>
              <TableHead className="font-semibold">Monthly Cost</TableHead>
              <TableHead className="font-semibold">Annual Cost</TableHead>
              <TableHead className="font-semibold">Vibe DevSquad Savings</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {devTeamData.map((item, index) => (
              <TableRow 
                key={index}
                className={item.isVibe ? 'bg-vibe-primary/5 border-vibe-primary/20' : 'hover:bg-muted/30'}
              >
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-2">
                    {item.isVibe && <Sparkles className="w-4 h-4 text-vibe-primary" />}
                    <span>{item.resource}</span>
                    {item.isVibe && <Badge variant="secondary">Our Solution</Badge>}
                  </div>
                </TableCell>
                <TableCell className="font-semibold">
                  {item.monthly}
                </TableCell>
                <TableCell className="font-semibold">
                  {item.annual}
                </TableCell>
                <TableCell>
                  <span className={item.isVibe ? 'text-vibe-primary font-medium' : 'text-green-600 font-semibold'}>
                    {item.savings}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
          <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-600">$240K+</div>
          <div className="text-sm text-blue-700 dark:text-blue-300">Average annual savings vs small team</div>
        </div>
        <div className="text-center p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
          <Calculator className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-600">2 Hours</div>
          <div className="text-sm text-green-700 dark:text-green-300">Break-even time on your investment</div>
        </div>
        <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
          <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-purple-600">10x</div>
          <div className="text-sm text-purple-700 dark:text-purple-300">Team equivalent productivity</div>
        </div>
      </div>
    </>
  );
};
