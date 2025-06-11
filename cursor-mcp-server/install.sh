#!/bin/bash

# Vibe DevSquad Cursor MCP Server Installation Script

set -e

echo "🚀 Installing Vibe DevSquad Cursor MCP Server..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building the project..."
npm run build

# Check if build was successful
if [ ! -f "dist/index.js" ]; then
    echo "❌ Build failed. Please check the error messages above."
    exit 1
fi

echo "✅ Build successful"

# Create .env template if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env template..."
    cat > .env << EOF
# Vibe DevSquad Platform Configuration
VIBE_DEVSQUAD_BRIDGE_URL=ws://localhost:8080
VIBE_DEVSQUAD_API_KEY=your_api_key_here
VIBE_DEVSQUAD_PLANNING_AGENT_ID=agent_id
VIBE_DEVSQUAD_ENABLE_STREAMING=true
VIBE_DEVSQUAD_MAX_TOKENS=4000
EOF
    echo "✅ Created .env template. Please update it with your configuration."
fi

# Get the absolute path to the current directory
CURRENT_DIR=$(pwd)

echo ""
echo "🎉 Installation completed!"
echo ""
echo "📋 Next steps:"
echo "1. Update the .env file with your Vibe DevSquad platform configuration"
echo "2. Ensure your Vibe DevSquad platform is running"
echo "3. Configure Cursor MCP integration:"
echo ""
echo "   Add this to your Cursor MCP configuration:"
echo "   {"
echo "     \"mcpServers\": {"
echo "       \"vibe-devsquad\": {"
echo "         \"command\": \"node\","
echo "         \"args\": [\"${CURRENT_DIR}/dist/index.js\"],"
echo "         \"cwd\": \"${CURRENT_DIR}\""
echo "       }"
echo "     }"
echo "   }"
echo ""
echo "4. Restart Cursor IDE"
echo "5. Start using Vibe DevSquad tools in Cursor!"
echo ""
echo "🔗 For detailed instructions, see: ${CURRENT_DIR}/README.md"
