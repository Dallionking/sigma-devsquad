
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  FolderOpen, 
  Folder, 
  File, 
  Search, 
  Plus, 
  Download, 
  Upload,
  FileText,
  Code,
  Image
} from "lucide-react";

export const FileExplorerTab = () => {
  const files = [
    { name: "src", type: "folder", children: 4, modified: "2 hours ago" },
    { name: "components", type: "folder", children: 12, modified: "1 hour ago" },
    { name: "pages", type: "folder", children: 8, modified: "30 min ago" },
    { name: "App.tsx", type: "file", size: "2.4 KB", modified: "15 min ago", language: "typescript" },
    { name: "index.css", type: "file", size: "1.8 KB", modified: "1 hour ago", language: "css" },
    { name: "package.json", type: "file", size: "3.2 KB", modified: "2 days ago", language: "json" },
    { name: "README.md", type: "file", size: "1.1 KB", modified: "1 week ago", language: "markdown" },
    { name: "logo.png", type: "image", size: "45 KB", modified: "3 days ago" }
  ];

  const getFileIcon = (file: any) => {
    if (file.type === "folder") return <Folder className="w-4 h-4 text-blue-500" />;
    if (file.type === "image") return <Image className="w-4 h-4 text-green-500" />;
    if (file.language === "typescript" || file.language === "javascript") return <Code className="w-4 h-4 text-yellow-500" />;
    return <FileText className="w-4 h-4 text-gray-500" />;
  };

  const getLanguageBadge = (language: string) => {
    const colors = {
      typescript: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300",
      css: "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300",
      json: "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300",
      markdown: "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300"
    };
    return colors[language as keyof typeof colors] || "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300";
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-card-foreground">File Explorer</CardTitle>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                <Upload className="w-4 h-4 mr-1" />
                Upload
              </Button>
              <Button size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-1" />
                New
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search files..." 
                className="pl-10 bg-background border-border"
              />
            </div>
            <Button variant="outline" size="icon">
              <FolderOpen className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-1">
            {files.map((file, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
              >
                <div className="flex items-center space-x-3 flex-1">
                  {getFileIcon(file)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-card-foreground">{file.name}</span>
                      {file.language && (
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getLanguageBadge(file.language)}`}
                        >
                          {file.language}
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {file.type === "folder" ? `${file.children} items` : file.size} • {file.modified}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
