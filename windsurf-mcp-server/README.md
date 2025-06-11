# Vibe DevSquad MCP Server for Windsurf

A Model Context Protocol (MCP) server that integrates Vibe DevSquad's AI-powered development platform with Windsurf IDE.

## Features

- **Claude-style Chat Interface**: Stream AI responses with full context awareness
- **File & Project Analysis**: AI-powered code analysis and insights
- **Task Management**: Create and manage development tasks with AI assistance
- **Complete Development Workflows**: From research to implementation
- **Windsurf-specific Integration**: Leverage Windsurf's collaboration and multi-agent features
- **Real-time Collaboration**: Pair programming and code review sessions

## Available Tools

1. **vibe_devsquad_chat** - Interactive AI chat with streaming responses
2. **vibe_devsquad_analyze_file** - Analyze files for quality, security, and best practices
3. **vibe_devsquad_analyze_project** - Get architectural insights for entire projects
4. **vibe_devsquad_create_task** - Create AI-enhanced development tasks
5. **vibe_devsquad_query_tasks** - Query and filter existing tasks
6. **vibe_devsquad_get_file_context** - Get file content and metadata
7. **vibe_devsquad_get_workspace_context** - Analyze workspace structure
8. **vibe_devsquad_start_workflow** - Start complete development workflows
9. **vibe_devsquad_collaborate** - Manage collaborative coding sessions
10. **vibe_devsquad_windsurf_command** - Execute Windsurf-specific commands

## Installation

### Prerequisites

- Node.js 18+ installed
- Windsurf IDE
- Vibe DevSquad account and API key

### Quick Install

1. Clone or download this repository:
```bash
git clone https://github.com/vibedevsquad/windsurf-mcp-server.git
cd windsurf-mcp-server
```

2. Install dependencies:
```bash
npm install
```

3. Build the TypeScript code:
```bash
npm run build
```

4. Configure your Windsurf MCP settings:

Add to your Windsurf configuration file (usually `~/.windsurf/mcp/config.json`):

```json
{
  "mcpServers": {
    "vibe-devsquad": {
      "command": "node",
      "args": ["/path/to/windsurf-mcp-server/dist/index.js"],
      "env": {
        "VIBE_DEVSQUAD_API_KEY": "your-api-key-here",
        "VIBE_DEVSQUAD_BRIDGE_URL": "ws://localhost:8765"
      }
    }
  }
}
```

5. Restart Windsurf to load the MCP server

## Configuration

### Environment Variables

- `VIBE_DEVSQUAD_API_KEY` - Your Vibe DevSquad API key (required)
- `VIBE_DEVSQUAD_BRIDGE_URL` - WebSocket bridge URL (default: ws://localhost:8765)

### Getting an API Key

1. Sign up at [vibedevsquad.com](https://vibedevsquad.com)
2. Navigate to Settings > API Keys
3. Create a new API key for Windsurf integration

## Usage

Once installed, the Vibe DevSquad tools will be available in Windsurf's AI assistant.

### Example: Chat with AI

```
Use vibe_devsquad_chat to help me refactor this function to be more efficient
```

### Example: Analyze a Project

```
Use vibe_devsquad_analyze_project to analyze the architecture of my React app
```

### Example: Start a Workflow

```
Use vibe_devsquad_start_workflow to create a new feature for user authentication
```

### Example: Collaborate

```
Use vibe_devsquad_collaborate to start a pair programming session
```

## Development

### Building from Source

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Watch mode for development
npm run watch
```

### Testing

```bash
# Run the MCP test script
npm test
```

## Troubleshooting

### Connection Issues

1. Ensure the Vibe DevSquad Bridge is running
2. Check your API key is valid
3. Verify the WebSocket URL is correct

### MCP Not Loading

1. Check Windsurf's MCP configuration file syntax
2. Ensure the path to the MCP server is absolute
3. Check Node.js is in your PATH

### Debugging

Enable debug logging by setting:
```bash
export DEBUG=vibe-devsquad:*
```

## Support

- Documentation: [docs.vibedevsquad.com](https://docs.vibedevsquad.com)
- Issues: [GitHub Issues](https://github.com/vibedevsquad/windsurf-mcp-server/issues)
- Discord: [Join our community](https://discord.gg/vibedevsquad)

## License

MIT License - see LICENSE file for details
