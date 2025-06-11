# Vibe DevSquad AI Assistant

> AI-powered development assistant for VS Code, Cursor, and Windsurf IDEs

## Features

Vibe DevSquad brings powerful AI assistance to your favorite VS Code-based IDE:

- **Universal Compatibility**: Works seamlessly in VS Code, Cursor, and Windsurf
- **AI Chat Interface**: Integrated chat panel with streaming responses
- **Quick Actions**: Fast access to common AI commands
- **Project Analysis**: Comprehensive codebase understanding
- **Task Management**: AI-powered task creation and tracking
- **File Context**: Automatic context injection from active files

## Installation

### From Marketplace (All IDEs)
1. Open Extensions panel (`Cmd+Shift+X`)
2. Search for "Vibe DevSquad"
3. Click Install

### From Command Line
```bash
# VS Code
code --install-extension vibe-devsquad.vibe-devsquad-vscode-extension

# Cursor
cursor --install-extension vibe-devsquad.vibe-devsquad-vscode-extension

# Windsurf
windsurf --install-extension vibe-devsquad.vibe-devsquad-vscode-extension
```

### Manual Installation (Development)
```bash
# Clone and build
git clone https://github.com/vibe-devsquad/vscode-extension
cd vscode-extension
npm install
npm run compile

# Package
vsce package

# Install in your IDE
code --install-extension vibe-devsquad-vscode-extension-*.vsix
```

## Usage

1. **Open Chat Panel**: 
   - Click the Vibe DevSquad icon in the editor toolbar
   - Or use `Cmd+Shift+P` → "Vibe DevSquad: Toggle Chat"

2. **Quick Actions**:
   - Analyze File: Get AI insights on current file
   - Create Task: Generate tasks from selection
   - Analyze Project: Full codebase analysis

3. **Chat Commands**:
   - Type naturally to interact with the AI
   - Use `/help` for available commands
   - Select code and ask questions about it

## Configuration

Configure in Settings (`Cmd+,`):

```json
{
  "vibeDevSquad.apiKey": "your-api-key",
  "vibeDevSquad.bridgeUrl": "ws://localhost:8765",
  "vibeDevSquad.autoConnect": true
}
```

## Requirements

- VS Code 1.74.0+ (or compatible IDE)
- Active internet connection
- Vibe DevSquad API key (get one at [vibe-devsquad.com](https://vibe-devsquad.com))

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT License - see [LICENSE](LICENSE) for details.

## Support

- Documentation: [docs.vibe-devsquad.com](https://docs.vibe-devsquad.com)
- Issues: [GitHub Issues](https://github.com/vibe-devsquad/vscode-extension/issues)
- Discord: [Join our community](https://discord.gg/vibe-devsquad)

---

**Note**: This extension works identically in VS Code, Cursor, and Windsurf IDEs. Install once, use everywhere!
