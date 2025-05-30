
import { useState } from "react";
import { EnhancedFileAttachment } from "./EnhancedFileAttachment";

interface AttachedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  content?: string;
  url?: string;
}

interface FileAttachmentManagerProps {
  show: boolean;
  onFileAttach: (files: AttachedFile[]) => void;
  attachedFiles: AttachedFile[];
  onFileRemove: (fileId: string) => void;
}

export const FileAttachmentManager = ({
  show,
  onFileAttach,
  attachedFiles,
  onFileRemove
}: FileAttachmentManagerProps) => {
  if (!show) return null;

  return (
    <div className="mb-4 border rounded-lg p-4 bg-muted/30">
      <EnhancedFileAttachment
        onFileAttach={onFileAttach}
        attachedFiles={attachedFiles}
        onFileRemove={onFileRemove}
      />
    </div>
  );
};

export const useFileAttachmentManager = () => {
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [showFileAttachment, setShowFileAttachment] = useState(false);

  const handleFileAttach = (files: AttachedFile[]) => {
    setAttachedFiles(prev => [...prev, ...files]);
  };

  const handleFileRemove = (fileId: string) => {
    setAttachedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const clearAttachedFiles = () => {
    setAttachedFiles([]);
    setShowFileAttachment(false);
  };

  return {
    attachedFiles,
    showFileAttachment,
    setShowFileAttachment,
    handleFileAttach,
    handleFileRemove,
    clearAttachedFiles
  };
};
