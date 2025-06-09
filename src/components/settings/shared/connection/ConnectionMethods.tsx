
import { Button } from "@/components/ui/button";
import { Shield, Zap } from "lucide-react";

interface ConnectionMethod {
  type: 'oauth' | 'webhook' | 'token';
  label: string;
  description: string;
}

interface ConnectionMethodsProps {
  methods: ConnectionMethod[];
  onConnect: (type: 'oauth' | 'webhook' | 'token') => Promise<void>;
  isConnecting: boolean;
}

export const ConnectionMethods = ({ methods, onConnect, isConnecting }: ConnectionMethodsProps) => {
  return (
    <div className="space-y-3">
      {methods.map((method) => (
        <div key={method.type} className="p-3 border rounded-md space-y-2">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {method.type === 'oauth' && <Shield className="w-4 h-4 text-green-500" />}
                {method.type === 'webhook' && <Zap className="w-4 h-4 text-blue-500" />}
                {method.type === 'token' && <Shield className="w-4 h-4 text-purple-500" />}
                <span className="font-medium">{method.label}</span>
              </div>
              <p className="text-xs text-gray-500">{method.description}</p>
            </div>
            <Button
              onClick={() => onConnect(method.type)}
              disabled={isConnecting}
              size="sm"
            >
              {isConnecting ? "Connecting..." : "Connect"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
