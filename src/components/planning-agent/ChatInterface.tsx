
import { CardContent, CardHeader } from "@/components/ui/card";
import { ChatInterfaceHeader } from "./ChatInterfaceHeader";
import { ChatMessageList } from "./ChatMessageList";
import { ChatInput } from "./ChatInput";
import { FileAttachmentManager, useFileAttachmentManager } from "./FileAttachmentManager";
import { useChatMessageManager } from "./ChatMessageManager";

interface ChatInterfaceProps {
  onCreateTask?: () => void;
  onTrackWorkflow?: () => void;
  onToggleCanvas?: () => void;
  canvasOpen?: boolean;
}

export const ChatInterface = ({ 
  onCreateTask, 
  onTrackWorkflow, 
  onToggleCanvas, 
  canvasOpen = false 
}: ChatInterfaceProps) => {
  const { messages, isTyping, handleSendMessage } = useChatMessageManager();
  const {
    attachedFiles,
    showFileAttachment,
    setShowFileAttachment,
    handleFileAttach,
    handleFileRemove,
    clearAttachedFiles
  } = useFileAttachmentManager();

  const onSendMessage = (content: string) => {
    handleSendMessage(content, attachedFiles);
    clearAttachedFiles();
  };

  return (
    <div className="flex flex-col h-full">
      <CardHeader className="pb-3">
        <ChatInterfaceHeader
          onCreateTask={onCreateTask}
          onTrackWorkflow={onTrackWorkflow}
          onToggleCanvas={onToggleCanvas}
          onToggleFileAttachment={() => setShowFileAttachment(!showFileAttachment)}
          attachedFilesCount={attachedFiles.length}
          showFileAttachment={showFileAttachment}
          canvasOpen={canvasOpen}
        />
      </CardHeader>

      <CardContent className="flex-1 flex flex-col min-h-0 p-4 pt-0">
        <div className="flex-1 overflow-hidden mb-4">
          <ChatMessageList messages={messages} isTyping={isTyping} />
        </div>

        <FileAttachmentManager
          show={showFileAttachment}
          onFileAttach={handleFileAttach}
          attachedFiles={attachedFiles}
          onFileRemove={handleFileRemove}
        />

        <ChatInput 
          onSendMessage={onSendMessage} 
          isTyping={isTyping}
          hasAttachments={attachedFiles.length > 0}
        />
      </CardContent>
    </div>
  );
};
