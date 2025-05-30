
interface ConnectionStatusDetailsProps {
  connectionStatus: string;
}

export const ConnectionStatusDetails = ({ connectionStatus }: ConnectionStatusDetailsProps) => {
  if (connectionStatus === 'connecting') {
    return (
      <div className="mt-4 p-3 bg-background/50 rounded-lg border border-border/50 fade-in">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          <span>Establishing connection to IDE...</span>
        </div>
      </div>
    );
  }

  if (connectionStatus === 'disconnected') {
    return (
      <div className="mt-4 p-3 bg-background/50 rounded-lg border border-border/50 fade-in">
        <p className="text-sm text-muted-foreground">
          Please check your IDE extension and try reconnecting.
        </p>
      </div>
    );
  }

  return null;
};
