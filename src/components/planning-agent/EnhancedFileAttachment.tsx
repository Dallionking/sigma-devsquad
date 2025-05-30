
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Paperclip, 
  FileText, 
  FileImage, 
  FileCode, 
  File, 
  X, 
  Upload,
  Download
} from "lucide-react";

interface AttachedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  content?: string;
  url?: string;
  uploadProgress?: number;
}

interface EnhancedFileAttachmentProps {
  onFileAttach: (files: AttachedFile[]) => void;
  attachedFiles: AttachedFile[];
  onFileRemove: (fileId: string) => void;
  maxFiles?: number;
  maxFileSize?: number; // in MB
}

export const EnhancedFileAttachment = ({ 
  onFileAttach, 
  attachedFiles, 
  onFileRemove,
  maxFiles = 10,
  maxFileSize = 10
}: EnhancedFileAttachmentProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <FileImage className="w-4 h-4" />;
    if (type.includes('text') || type.includes('json')) return <FileCode className="w-4 h-4" />;
    if (type.includes('pdf') || type.includes('document')) return <FileText className="w-4 h-4" />;
    return <File className="w-4 h-4" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const processFiles = async (files: FileList) => {
    const fileArray = Array.from(files);
    
    // Validate file count
    if (attachedFiles.length + fileArray.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }

    // Validate file sizes
    const oversizedFiles = fileArray.filter(file => file.size > maxFileSize * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      alert(`Files must be smaller than ${maxFileSize}MB`);
      return;
    }

    const processedFiles: AttachedFile[] = [];

    for (const file of fileArray) {
      const fileId = `file_${Date.now()}_${Math.random()}`;
      setUploadingFiles(prev => [...prev, fileId]);

      // Simulate file processing/upload
      const attachedFile: AttachedFile = {
        id: fileId,
        name: file.name,
        type: file.type,
        size: file.size,
        uploadProgress: 0
      };

      // Read file content for text files
      if (file.type.startsWith('text/') || file.type.includes('json')) {
        const content = await file.text();
        attachedFile.content = content;
      }

      // Create URL for images
      if (file.type.startsWith('image/')) {
        attachedFile.url = URL.createObjectURL(file);
      }

      processedFiles.push(attachedFile);

      // Simulate upload progress
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += 10;
        if (progress >= 100) {
          clearInterval(progressInterval);
          setUploadingFiles(prev => prev.filter(id => id !== fileId));
        }
      }, 100);
    }

    onFileAttach(processedFiles);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFiles(files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      processFiles(files);
    }
    // Reset input value
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      {/* File Drop Zone */}
      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
          isDragging 
            ? 'border-primary bg-primary/5' 
            : 'border-muted-foreground/25 hover:border-primary/50'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm text-muted-foreground mb-2">
          Drag & drop files here, or click to select
        </p>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => fileInputRef.current?.click()}
        >
          <Paperclip className="w-4 h-4 mr-2" />
          Choose Files
        </Button>
        <p className="text-xs text-muted-foreground mt-2">
          Max {maxFiles} files, {maxFileSize}MB each
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleFileInput}
        accept=".txt,.md,.json,.pdf,.png,.jpg,.jpeg,.gif,.svg"
      />

      {/* Attached Files List */}
      {attachedFiles.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              Attached Files ({attachedFiles.length})
            </span>
            <Badge variant="secondary" className="text-xs">
              {formatFileSize(attachedFiles.reduce((sum, file) => sum + file.size, 0))}
            </Badge>
          </div>
          
          {attachedFiles.map((file) => (
            <Card key={file.id} className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {getFileIcon(file.type)}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{file.name}</div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{formatFileSize(file.size)}</span>
                      <Badge variant="outline" className="text-xs">
                        {file.type.split('/')[1]?.toUpperCase() || 'FILE'}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  {file.url && (
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Download className="w-3 h-3" />
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    onClick={() => onFileRemove(file.id)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              
              {uploadingFiles.includes(file.id) && (
                <div className="mt-2">
                  <Progress value={file.uploadProgress || 0} className="h-1" />
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
