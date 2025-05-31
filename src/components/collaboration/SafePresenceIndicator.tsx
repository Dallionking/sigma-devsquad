
import { PresenceIndicator } from "./PresenceIndicator";
import { useWebSocket } from "@/contexts/WebSocketContext";

interface SafePresenceIndicatorProps {
  className?: string;
  showCount?: boolean;
  maxVisible?: number;
}

export const SafePresenceIndicator = (props: SafePresenceIndicatorProps) => {
  try {
    // Test if we're within WebSocket context
    useWebSocket();
    return <PresenceIndicator {...props} />;
  } catch {
    // If not in WebSocket context, return null or a fallback
    return null;
  }
};
