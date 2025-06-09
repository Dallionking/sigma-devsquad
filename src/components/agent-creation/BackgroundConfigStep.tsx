
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload, FileText, X } from "lucide-react";

interface BackgroundConfigStepProps {
  background: string;
  onBackgroundChange: (background: string) => void;
}

export const BackgroundConfigStep = ({ background, onBackgroundChange }: BackgroundConfigStepProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Background & Context Configuration</h2>
        <p className="text-muted-foreground">
          Provide context, knowledge, and reference materials for your agent
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Text Context */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Context Description</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="background">Background Information</Label>
              <Textarea
                id="background"
                placeholder="Describe the agent's background, domain knowledge, specific requirements, constraints, or any other contextual information that will help the agent perform better..."
                value={background}
                onChange={(e) => onBackgroundChange(e.target.value)}
                rows={10}
                className="resize-none"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              This information will be used to train and configure your agent's knowledge base.
            </p>
          </CardContent>
        </Card>

        {/* File Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="w-5 h-5" />
              <span>Knowledge Files</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <div className="space-y-2">
                  <p className="text-sm font-medium">Upload Reference Files</p>
                  <p className="text-xs text-muted-foreground">
                    Support for PDFs, docs, text files, and other knowledge resources
                  </p>
                </div>
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Button variant="outline" className="mt-4" asChild>
                    <span>Choose Files</span>
                  </Button>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.txt,.md"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <Label>Uploaded Files</Label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4" />
                          <span className="text-sm truncate">{file.name}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Example Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Context Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Domain Expertise</h4>
              <p className="text-sm text-muted-foreground">
                "This agent specializes in e-commerce platforms with expertise in payment processing, inventory management, and customer service workflows..."
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Technical Constraints</h4>
              <p className="text-sm text-muted-foreground">
                "The agent must follow our coding standards, use TypeScript, prioritize security best practices, and ensure all APIs are RESTful..."
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
