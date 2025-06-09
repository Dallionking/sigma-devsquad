
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  Image, 
  Video, 
  Globe,
  Download,
  Settings,
  Check,
  Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExportFormat {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  description: string;
  fileSize: string;
  quality: 'High' | 'Medium' | 'Low';
  features: string[];
}

interface EnhancedExportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  presentation: {
    id: string;
    title: string;
    slideCount: number;
  } | null;
}

const exportFormats: ExportFormat[] = [
  {
    id: 'pdf',
    name: 'PDF Document',
    icon: FileText,
    description: 'High-quality PDF with embedded fonts and images',
    fileSize: '~2.5MB',
    quality: 'High',
    features: ['Vector graphics', 'Searchable text', 'Print-ready']
  },
  {
    id: 'pptx',
    name: 'PowerPoint',
    icon: FileText,
    description: 'Native PowerPoint format for full editing capability',
    fileSize: '~3.2MB',
    quality: 'High',
    features: ['Editable', 'Animations', 'Speaker notes']
  },
  {
    id: 'html',
    name: 'Interactive Web',
    icon: Globe,
    description: 'Responsive web presentation with navigation',
    fileSize: '~1.8MB',
    quality: 'High',
    features: ['Interactive', 'Responsive', 'No software needed']
  },
  {
    id: 'video',
    name: 'Video (MP4)',
    icon: Video,
    description: 'Animated video with transitions and timing',
    fileSize: '~15MB',
    quality: 'High',
    features: ['Auto-advance', 'Voiceover ready', 'Social sharing']
  },
  {
    id: 'images',
    name: 'Image Set (PNG)',
    icon: Image,
    description: 'Individual slide images in high resolution',
    fileSize: '~8MB',
    quality: 'High',
    features: ['High-res', 'Social media ready', 'Individual slides']
  }
];

export const EnhancedExportModal = ({
  open,
  onOpenChange,
  presentation
}: EnhancedExportModalProps) => {
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [includeNotes, setIncludeNotes] = useState(false);
  const [includeHiddenSlides, setIncludeHiddenSlides] = useState(false);
  const [highQuality, setHighQuality] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const { toast } = useToast();

  const selectedFormatData = exportFormats.find(f => f.id === selectedFormat);

  const handleExport = async () => {
    setIsExporting(true);
    setExportProgress(0);

    // Simulate export process
    const steps = [
      'Preparing slides...',
      'Processing images...',
      'Applying formatting...',
      'Generating file...',
      'Finalizing export...'
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setExportProgress((i + 1) * 20);
      
      toast({
        title: "Export Progress",
        description: steps[i],
      });
    }

    setIsExporting(false);
    toast({
      title: "Export Complete",
      description: `${presentation?.title}.${selectedFormat} is ready for download.`,
    });
    
    onOpenChange(false);
  };

  if (!presentation) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Export Presentation</span>
          </DialogTitle>
          <DialogDescription>
            Export "{presentation.title}" in your preferred format
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Format Selection */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Choose Export Format</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {exportFormats.map((format) => (
                <Card
                  key={format.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedFormat === format.id
                      ? 'ring-2 ring-primary bg-primary/5'
                      : 'hover:bg-accent/50'
                  }`}
                  onClick={() => setSelectedFormat(format.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <format.icon className="w-5 h-5 text-primary" />
                        <CardTitle className="text-base">{format.name}</CardTitle>
                      </div>
                      {selectedFormat === format.id && (
                        <Check className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-3">
                    <CardDescription className="text-sm">
                      {format.description}
                    </CardDescription>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{format.fileSize}</span>
                      <Badge variant="outline" className="text-xs">
                        {format.quality} Quality
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {format.features.map((feature) => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Export Options */}
          <div className="space-y-4">
            <Label className="text-base font-medium flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Export Options</span>
            </Label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-0.5">
                  <Label className="text-sm">Include Speaker Notes</Label>
                  <p className="text-xs text-muted-foreground">
                    Add presenter notes to export
                  </p>
                </div>
                <Switch
                  checked={includeNotes}
                  onCheckedChange={setIncludeNotes}
                />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-0.5">
                  <Label className="text-sm">Include Hidden Slides</Label>
                  <p className="text-xs text-muted-foreground">
                    Export all slides including hidden ones
                  </p>
                </div>
                <Switch
                  checked={includeHiddenSlides}
                  onCheckedChange={setIncludeHiddenSlides}
                />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-0.5">
                  <Label className="text-sm">High Quality Images</Label>
                  <p className="text-xs text-muted-foreground">
                    Use maximum resolution for images
                  </p>
                </div>
                <Switch
                  checked={highQuality}
                  onCheckedChange={setHighQuality}
                />
              </div>

              <div className="p-3 border rounded-lg">
                <div className="space-y-2">
                  <Label className="text-sm">Estimated File Size</Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold">
                      {selectedFormatData?.fileSize}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {presentation.slideCount} slides
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Export Progress */}
          {isExporting && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-primary" />
                <Label>Exporting presentation...</Label>
              </div>
              <Progress value={exportProgress} className="w-full" />
              <p className="text-sm text-muted-foreground">
                This may take a few moments depending on the presentation size.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            
            <Button 
              onClick={handleExport}
              disabled={isExporting}
            >
              {isExporting ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Export {selectedFormatData?.name}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
