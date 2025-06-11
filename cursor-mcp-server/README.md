# Vibe DevSquad Cursor MCP Server

A Model Context Protocol (MCP) server that integrates Vibe DevSquad's Planning Agent with Cursor IDE, providing Claude-style AI assistance with full access to project context, file analysis, and task management.

## 🚀 Features

- **Claude-style Chat Interface**: Stream responses from Vibe DevSquad Planning Agent directly in Cursor
- **Context-Aware Analysis**: File and project analysis with AI insights
- **Task Management**: Create and manage tasks with AI-powered suggestions
- **Real-time Streaming**: Token-by-token streaming responses for immediate feedback
- **File Context Sharing**: Share current file and selection context with AI
- **Project Understanding**: Comprehensive project analysis and recommendations

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- Cursor IDE
- Access to Vibe DevSquad platform (running locally or remotely)

### Setup

1. **Clone and Install**
   ```bash
   cd cursor-mcp-server
   npm install
   npm run build
   ```

2. **Configure Environment Variables**
   
   Create a `.env` file or set environment variables:
   ```bash
   VIBE_DEVSQUAD_BRIDGE_URL=ws://localhost:8080
   VIBE_DEVSQUAD_API_KEY=your_api_key_here  # Optional
   VIBE_DEVSQUAD_PLANNING_AGENT_ID=agent_id  # Optional
   VIBE_DEVSQUAD_ENABLE_STREAMING=true
   VIBE_DEVSQUAD_MAX_TOKENS=4000
   ```

3. **Configure Cursor MCP Integration**

   Add the MCP server configuration to your Cursor settings:

   **Option A: Using Cursor's MCP Settings UI**
   1. Open Cursor Settings
   2. Navigate to "Extensions" → "MCP Servers" 
   3. Add a new server with the following configuration:
      - Name: `vibe-devsquad`
      - Command: `node`
      - Args: `["path/to/cursor-mcp-server/dist/index.js"]`
      - Working Directory: `path/to/cursor-mcp-server`

   **Option B: Manual Configuration**
   
   Add to your Cursor configuration file (`~/.cursor/mcp_config.json`):
   ```json
   {
     "mcpServers": {
       "vibe-devsquad": {
         "command": "node",
         "args": ["path/to/cursor-mcp-server/dist/index.js"],
         "cwd": "path/to/cursor-mcp-server",
         "env": {
           "VIBE_DEVSQUAD_BRIDGE_URL": "ws://localhost:8080",
           "VIBE_DEVSQUAD_ENABLE_STREAMING": "true",
           "VIBE_DEVSQUAD_MAX_TOKENS": "4000"
         }
       }
     }
   }
   ```

4. **Start Vibe DevSquad Platform**
   
   Ensure your Vibe DevSquad platform is running and accessible at the configured WebSocket URL.

5. **Restart Cursor**
   
   Restart Cursor IDE to load the new MCP server configuration.

## 🛠 Available Tools

### 1. **vibe_devsquad_chat**
Stream chat responses from the Planning Agent with context awareness.

```typescript
// Example usage in Cursor
{
  "message": "Analyze this React component and suggest improvements",
  "context": {
    "currentFile": {
      "path": "/src/components/UserProfile.tsx", 
      "content": "...",
      "language": "typescript"
    },
    "workspaceRoot": "/Users/you/project"
  }
}
```

### 2. **vibe_devsquad_analyze_file**
Get comprehensive file analysis and suggestions.

```typescript
{
  "filePath": "/src/utils/helpers.ts",
  "analysisType": "code_review"
}
```

### 3. **vibe_devsquad_analyze_project**
Analyze entire project structure and architecture.

```typescript
{
  "projectPath": "/Users/you/my-project",
  "analysisDepth": "comprehensive",
  "focusAreas": ["architecture", "security", "performance"]
}
```

### 4. **vibe_devsquad_create_task**
Create AI-enhanced tasks with context.

```typescript
{
  "title": "Implement user authentication",
  "description": "Add JWT-based auth system",
  "priority": "high",
  "type": "feature"
}
```

### 5. **vibe_devsquad_get_file_context**
Get detailed file content and metadata.

```typescript
{
  "filePath": "/src/App.tsx",
  "includeMetadata": true
}
```

### 6. **vibe_devsquad_get_workspace_context**
Get comprehensive workspace analysis.

```typescript
{
  "workspacePath": "/Users/you/project",
  "includeFileTree": true,
  "maxDepth": 3
}
```

## 🔧 Development

### Building
```bash
npm run build
```

### Development Mode
```bash
npm run dev
```

### Testing the Server
```bash
# Test the MCP server directly
node dist/index.js
```

## 🎯 Usage in Cursor

Once configured, you can use Vibe DevSquad tools in several ways:

### 1. **AI Composer Integration**
Use Cursor's AI composer (Shift-Command-I) and mention Vibe DevSquad tools:
```
@vibe_devsquad_chat "Help me refactor this component for better performance"
```

### 2. **Direct Tool Invocation**
Invoke tools directly through Cursor's command palette or MCP interface.

### 3. **Context-Aware Conversations**
The tools automatically share your current file and selection context with the Planning Agent.

## 🔄 Architecture

```
Cursor IDE
    ↓ (MCP Protocol)
Vibe DevSquad MCP Server
    ↓ (WebSocket)
Vibe DevSquad Platform
    ↓ (API)
Planning Agent + AI Models
```

The MCP server acts as a bridge between Cursor and the Vibe DevSquad platform, translating MCP tool calls into WebSocket messages and streaming responses back to Cursor.

## 🚨 Troubleshooting

### Connection Issues
- Verify Vibe DevSquad platform is running
- Check WebSocket URL configuration
- Ensure no firewall blocking connections

### Tool Execution Errors
- Check Cursor's developer console for MCP errors
- Verify file paths are absolute and accessible
- Check environment variable configuration

### Performance Issues
- Reduce `maxDepth` for workspace analysis
- Lower `maxTokens` for faster responses
- Disable streaming if network is unstable

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and test thoroughly
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🔗 Related Projects

- [Vibe DevSquad Platform](../vibe-devsquad)
- [VS Code Extension](../vscode-extension)
- [Windsurf MCP Extension](../windsurf-mcp-extension)

---

**Vibe DevSquad Cursor MCP Server** - Bringing AI-powered development assistance directly to your Cursor IDE with full context awareness and streaming capabilities.
