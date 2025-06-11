# Vibe DevSquad AI Platform

> 🚀 The AI-powered development platform that brings advanced AI capabilities directly to your IDE

[![VS Code Extension](https://img.shields.io/badge/VS%20Code-Extension-blue)](https://marketplace.visualstudio.com/items?itemName=vibedevsquad.vibe-devsquad-vscode-extension)
[![npm version](https://img.shields.io/npm/v/@vibedevsquad/cursor-mcp-server)](https://www.npmjs.com/package/@vibedevsquad/cursor-mcp-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🌟 What is Vibe DevSquad?

Vibe DevSquad is a comprehensive AI development platform that seamlessly integrates into your favorite IDEs (VS Code, Cursor, and Windsurf). It combines the power of multiple AI models, task management, and collaborative development tools into a unified experience that accelerates your development workflow.

### 🎯 Key Features

- **🤖 Multi-Model AI Integration**: Access GPT-4, Claude, and other leading AI models
- **📋 Advanced Task Management**: Kanban boards with dependencies and AI-powered planning
- **🔌 MCP Registry**: Discover and integrate Model Context Protocol plugins
- **💬 IDE-Native Chat**: AI assistance without leaving your editor
- **🔄 Real-time Collaboration**: Share context and work together with AI
- **📊 Project Analysis**: AI-powered code analysis and recommendations
- **🚀 Workflow Automation**: Streamline development from research to deployment

## 🏗️ Platform Components

### 1. **Web Dashboard** ([vibe-devsquad.vercel.app](https://vibe-devsquad.vercel.app))
- Central hub for project management
- Visual task boards and planning tools
- MCP registry and configuration
- Team collaboration features

### 2. **Universal IDE Extension**
- One extension for VS Code, Cursor, and Windsurf
- AI chat interface with streaming responses
- Quick actions for common development tasks
- Seamless platform integration

### 3. **MCP Servers**
- Enhanced AI capabilities through Model Context Protocol
- Specialized tools for different development workflows
- Extensible architecture for custom integrations

## 🚀 Quick Start

### Install the IDE Extension

#### For VS Code:
```bash
code --install-extension vibe-devsquad.vibe-devsquad-vscode-extension
```

#### For Cursor:
```bash
cursor --install-extension vibe-devsquad.vibe-devsquad-vscode-extension
```

#### For Windsurf:
```bash
windsurf --install-extension vibe-devsquad.vibe-devsquad-vscode-extension
```

Or search for "Vibe DevSquad" in the Extensions marketplace within any of these IDEs.

### Install MCP Server (Optional)
```bash
npm install -g @vibe-devsquad/cursor-mcp-server
```

## 📈 Current Status

**Phase 7 Complete** - All IDE integrations are now live! 

- ✅ Universal VS Code extension published
- ✅ Cursor MCP server available on npm
- ✅ Windsurf MCP extension fully implemented
- ✅ Automated installer for easy setup
- 🚧 Phase 8 (Onboarding Experience) starting next

See [CURRENT_STATUS.md](./CURRENT_STATUS.md) for detailed platform status.

## 🛠️ Development Setup

### Prerequisites
- Node.js 16+
- npm or yarn
- VS Code, Cursor, or Windsurf IDE

### Clone and Install
```bash
git clone https://github.com/yourusername/vibe-devsquad.git
cd vibe-devsquad
npm install
```

### Build Extension
```bash
cd vscode-extension
npm install
npm run compile
```

### Test Locally
Press `F5` in VS Code/Cursor/Windsurf to launch a new Extension Development Host window.

## 📚 Documentation

- [Current Status](./CURRENT_STATUS.md) - Platform status and metrics
- [Changelog](./CHANGELOG.md) - Detailed version history
- [Features Guide](./Features.md) - Complete feature documentation
- [Publishing Guide](docs/PUBLISHING_GUIDE.md) - Complete publishing workflow
- [Quick Reference](docs/QUICK_PUBLISH_REFERENCE.md) - Quick commands and shortcuts
- [Extension README](vscode-extension/README.md) - Extension-specific details
- [MCP Server README](cursor-mcp-server/README.md) - MCP server documentation

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm test`
5. Submit a pull request

## 📜 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for the Vibe AI community
- Powered by advanced AI models including GPT-4, Claude, and more
- Compatible with VS Code, Cursor, and Windsurf IDEs
- Developed with ❤️ using AI-assisted development

---

**🎉 Join thousands of developers enhancing their workflow with Vibe DevSquad!**
