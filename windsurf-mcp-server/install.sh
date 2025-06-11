#!/bin/bash

# Vibe DevSquad Windsurf MCP Server Installation Script

set -e

echo "🚀 Installing Vibe DevSquad MCP Server for Windsurf..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

# Get the directory of this script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Install dependencies
echo "📦 Installing dependencies..."
cd "$SCRIPT_DIR"
npm install

# Build TypeScript
echo "🔨 Building TypeScript..."
npm run build

# Create MCP config directory if it doesn't exist
MCP_CONFIG_DIR="$HOME/.windsurf/mcp"
mkdir -p "$MCP_CONFIG_DIR"

# Check if config file exists
CONFIG_FILE="$MCP_CONFIG_DIR/config.json"
if [ ! -f "$CONFIG_FILE" ]; then
    echo "📝 Creating MCP configuration file..."
    cat > "$CONFIG_FILE" << EOF
{
  "mcpServers": {}
}
EOF
fi

# Prompt for API key
echo ""
echo "🔑 Enter your Vibe DevSquad API key:"
echo "   (Get one at https://vibedevsquad.com/settings/api-keys)"
read -r API_KEY

# Prompt for bridge URL
echo ""
echo "🌐 Enter the Bridge WebSocket URL (press Enter for default: ws://localhost:8765):"
read -r BRIDGE_URL
BRIDGE_URL=${BRIDGE_URL:-"ws://localhost:8765"}

# Update the config file using Node.js
node << EOF
const fs = require('fs');
const path = require('path');

const configPath = '$CONFIG_FILE';
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

config.mcpServers = config.mcpServers || {};
config.mcpServers['vibe-devsquad'] = {
  command: 'node',
  args: ['$SCRIPT_DIR/dist/index.js'],
  env: {
    VIBE_DEVSQUAD_API_KEY: '$API_KEY',
    VIBE_DEVSQUAD_BRIDGE_URL: '$BRIDGE_URL'
  }
};

fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
console.log('✅ Configuration updated successfully!');
EOF

echo ""
echo "🎉 Installation complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Make sure the Vibe DevSquad Bridge is running"
echo "   2. Restart Windsurf to load the MCP server"
echo "   3. Try using 'vibe_devsquad_chat' in Windsurf's AI assistant"
echo ""
echo "📚 For more information, see the README.md file"
echo ""
