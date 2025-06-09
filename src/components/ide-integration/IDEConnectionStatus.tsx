
import { useState } from "react";

export interface IDE {
  id: string;
  name: string;
  status: string;
  version: string;
  extensions: string[];
  lastSync: string;
}

export const useIDEConnectionStatus = () => {
  const [connectionStatus, setConnectionStatus] = useState("connected");
  const [selectedIDE, setSelectedIDE] = useState("vscode");

  const mockIDEs: IDE[] = [
    {
      id: "vscode",
      name: "VS Code",
      status: "connected",
      version: "1.85.0",
      extensions: ["Lovable", "TypeScript", "React"],
      lastSync: "2 minutes ago"
    },
    {
      id: "webstorm",
      name: "WebStorm",
      status: "disconnected",
      version: "2023.3",
      extensions: ["Lovable Plugin"],
      lastSync: "1 hour ago"
    }
  ];

  return {
    connectionStatus,
    setConnectionStatus,
    selectedIDE,
    setSelectedIDE,
    mockIDEs
  };
};
