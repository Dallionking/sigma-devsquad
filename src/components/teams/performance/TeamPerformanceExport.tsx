
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Team } from '@/types/teams';
import { TimeRange } from './TeamPerformanceDashboard';
import { Download, FileText, FileSpreadsheet, Printer, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TeamPerformanceExportProps {
  team: Team;
  timeRange: TimeRange;
  customDateRange: { start: Date; end: Date } | null;
}

export const TeamPerformanceExport = ({
  team,
  timeRange,
  customDateRange
}: TeamPerformanceExportProps) => {
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [selectedSections, setSelectedSections] = useState({
    overview: true,
    kpis: true,
    charts: true,
    comparison: true,
    rawData: false
  });
  const { toast } = useToast();

  const exportOptions = [
    { id: 'overview', label: 'Performance Overview', description: 'Key metrics and summary' },
    { id: 'kpis', label: 'KPI Details', description: 'All key performance indicators' },
    { id: 'charts', label: 'Charts & Graphs', description: 'Visual performance data' },
    { id: 'comparison', label: 'Comparison Analysis', description: 'Period and target comparisons' },
    { id: 'rawData', label: 'Raw Data', description: 'Detailed underlying data' }
  ];

  const handleExport = (format: 'pdf' | 'excel' | 'csv') => {
    const selectedCount = Object.values(selectedSections).filter(Boolean).length;
    
    if (selectedCount === 0) {
      toast({
        title: "No sections selected",
        description: "Please select at least one section to export.",
        variant: "destructive"
      });
      return;
    }

    // Mock export functionality
    toast({
      title: "Export started",
      description: `Generating ${format.toUpperCase()} report for ${team.name}...`,
    });

    // Simulate export process
    setTimeout(() => {
      toast({
        title: "Export completed",
        description: `${team.name} performance report (${format.toUpperCase()}) is ready for download.`,
      });
      setShowExportDialog(false);
    }, 2000);
  };

  const handleQuickExport = (format: 'pdf' | 'excel' | 'print') => {
    toast({
      title: "Quick export started",
      description: `Generating ${format} report for ${team.name}...`,
    });

    setTimeout(() => {
      if (format === 'print') {
        window.print();
      } else {
        toast({
          title: "Export completed",
          description: `${team.name} performance report is ready for download.`,
        });
      }
    }, 1500);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Quick Export</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => handleQuickExport('pdf')}>
            <FileText className="w-4 h-4 mr-2" />
            Export as PDF
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleQuickExport('excel')}>
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Export as Excel
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleQuickExport('print')}>
            <Printer className="w-4 h-4 mr-2" />
            Print Report
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowExportDialog(true)}>
            <Settings className="w-4 h-4 mr-2" />
            Custom Export
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Custom Export Options</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Export Sections */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Select Sections</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {exportOptions.map((option) => (
                  <div key={option.id} className="flex items-start space-x-3">
                    <Checkbox
                      id={option.id}
                      checked={selectedSections[option.id as keyof typeof selectedSections]}
                      onCheckedChange={(checked) =>
                        setSelectedSections(prev => ({
                          ...prev,
                          [option.id]: checked
                        }))
                      }
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor={option.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {option.label}
                      </label>
                      <p className="text-xs text-muted-foreground">
                        {option.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Export Format Buttons */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Choose Format:</p>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExport('pdf')}
                  className="w-full"
                >
                  <FileText className="w-4 h-4 mr-1" />
                  PDF
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExport('excel')}
                  className="w-full"
                >
                  <FileSpreadsheet className="w-4 h-4 mr-1" />
                  Excel
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExport('csv')}
                  className="w-full"
                >
                  <Download className="w-4 h-4 mr-1" />
                  CSV
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
