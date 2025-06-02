
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Upload, 
  File, 
  Image, 
  FileText, 
  Download, 
  Eye, 
  Trash2,
  Share,
  Lock,
  Unlock,
  Clock,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SharedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: Date;
  uploadedBy: {
    id: string;
    name: string;
  };
  url: string;
  isPublic: boolean;
  downloadCount: number;
  versions: Array<{
    id: string;
    version: number;
    uploadedAt: Date;
    size: number;
  }>;
  preview?: string;
}

interface FileSharingProps {
  roomId: string;
  currentUserId: string;
}

export const FileSharing = ({ roomId, currentUserId }: FileSharingProps) => {
  const [files, setFiles] = useState<SharedFile[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<SharedFile | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock data
  useState(() => {
    const mockFiles: SharedFile[] = [
      {
        id: "1",
        name: "project-requirements.pdf",
        type: "application/pdf",
        size: 2048000,
        uploadedAt: new Date(Date.now() - 3600000),
        uploadedBy: { id: "user1", name: "Alice Johnson" },
        url: "#",
        isPublic: true,
        downloadCount: 12,
        versions: [
          { id: "v1", version: 1, uploadedAt: new Date(Date.now() - 7200000), size: 1900000 },
          { id: "v2", version: 2, uploadedAt: new Date(Date.now() - 3600000), size: 2048000 }
        ]
      },
      {
        id: "2",
        name: "design-mockup.png",
        type: "image/png",
        size: 5120000,
        uploadedAt: new Date(Date.now() - 1800000),
        uploadedBy: { id: "user2", name: "Bob Smith" },
        url: "#",
        isPublic: false,
        downloadCount: 7,
        versions: [
          { id: "v1", version: 1, uploadedAt: new Date(Date.now() - 1800000), size: 5120000 }
        ],
        preview: "/placeholder.svg"
      },
      {
        id: "3",
        name: "meeting-notes.docx",
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        size: 1024000,
        uploadedAt: new Date(Date.now() - 900000),
        uploadedBy: { id: "user3", name: "Carol Wilson" },
        url: "#",
        isPublic: true,
        downloadCount: 5,
        versions: [
          { id: "v1", version: 1, uploadedAt: new Date(Date.now() - 900000), size: 1024000 }
        ]
      }
    ];
    setFiles(mockFiles);
  });

  const handleFileUpload = (fileList: FileList) => {
    Array.from(fileList).forEach((file) => {
      const fileId = Date.now().toString() + Math.random().toString(36);
      
      // Simulate upload progress
      setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));
      
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const currentProgress = prev[fileId] || 0;
          if (currentProgress >= 100) {
            clearInterval(interval);
            // Add file to list when upload complete
            const newFile: SharedFile = {
              id: fileId,
              name: file.name,
              type: file.type,
              size: file.size,
              uploadedAt: new Date(),
              uploadedBy: { id: currentUserId, name: "You" },
              url: URL.createObjectURL(file),
              isPublic: true,
              downloadCount: 0,
              versions: [
                { id: "v1", version: 1, uploadedAt: new Date(), size: file.size }
              ]
            };
            setFiles(prev => [newFile, ...prev]);
            setUploadProgress(prev => {
              const { [fileId]: removed, ...rest } = prev;
              return rest;
            });
            return prev;
          }
          return { ...prev, [fileId]: currentProgress + 10 };
        });
      }, 200);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFileUpload(files);
    }
  };

  const toggleFileVisibility = (fileId: string) => {
    setFiles(prev => prev.map(file => 
      file.id === fileId ? { ...file, isPublic: !file.isPublic } : file
    ));
  };

  const deleteFile = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return Image;
    if (type.includes('pdf') || type.includes('document')) return FileText;
    return File;
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.uploadedBy.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Upload Area */}
      <Card>
        <CardContent className="p-6">
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
              dragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25"
            )}
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
          >
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">Upload Files</h3>
            <p className="text-muted-foreground mb-4">
              Drag and drop files here, or click to select files
            </p>
            <Button onClick={() => fileInputRef.current?.click()}>
              Select Files
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
          
          {/* Upload Progress */}
          {Object.keys(uploadProgress).length > 0 && (
            <div className="mt-4 space-y-2">
              {Object.entries(uploadProgress).map(([fileId, progress]) => (
                <div key={fileId} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* File Search */}
      <Card>
        <CardContent className="p-4">
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Files List */}
      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Shared Files</span>
            <Badge variant="outline">{filteredFiles.length} files</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-3">
              {filteredFiles.map((file) => {
                const FileIcon = getFileIcon(file.type);
                return (
                  <div
                    key={file.id}
                    className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-muted rounded">
                        <FileIcon className="w-6 h-6" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium truncate">{file.name}</h4>
                          {file.isPublic ? (
                            <Unlock className="w-4 h-4 text-green-500" />
                          ) : (
                            <Lock className="w-4 h-4 text-orange-500" />
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {file.uploadedBy.name}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatDate(file.uploadedAt)}
                          </span>
                          <span>{formatFileSize(file.size)}</span>
                          <span>{file.downloadCount} downloads</span>
                        </div>
                        
                        {file.versions.length > 1 && (
                          <Badge variant="secondary" className="text-xs">
                            v{file.versions.length} ({file.versions.length} versions)
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1">
                        {file.preview && (
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFileVisibility(file.id)}
                        >
                          {file.isPublic ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                        </Button>
                        {file.uploadedBy.id === currentUserId && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteFile(file.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {filteredFiles.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  <File className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No files found</h3>
                  <p>Upload some files to get started with sharing.</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
