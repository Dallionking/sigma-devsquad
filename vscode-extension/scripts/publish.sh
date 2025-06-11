#!/bin/bash
# Vibe DevSquad VS Code Extension Publisher
# Works for VS Code, Cursor, and Windsurf IDEs

VERSION_TYPE=${1:-patch}
GIT_PUSH=${2:-yes}  # Set to 'no' to skip git operations

echo "🚀 Publishing Vibe DevSquad VS Code Extension..."
echo "   This extension works in VS Code, Cursor, and Windsurf!"
echo "   Version bump: $VERSION_TYPE"

# Ensure we're in the right directory
cd "$(dirname "$0")/.."

# Pre-flight checks
echo "🔍 Running pre-flight checks..."

# Check if vsce is installed
if ! command -v vsce &> /dev/null; then
    echo "❌ vsce is not installed. Run: npm install -g @vscode/vsce"
    exit 1
fi

# Check if logged into vsce
vsce ls-publishers 2>/dev/null | grep -q "vibe-devsquad" || {
    echo "❌ Not logged into vsce. Run: vsce login vibe-devsquad"
    exit 1
}

# Build the extension
echo "🔨 Building extension..."
npm run compile || {
    echo "❌ Build failed"
    exit 1
}

# Package to test
echo "📦 Creating test package..."
vsce package

# Publish
echo "📤 Publishing to VS Code Marketplace..."
vsce publish $VERSION_TYPE || {
    echo "❌ Publishing failed"
    exit 1
}

# Get the new version
NEW_VERSION=$(node -p "require('./package.json').version")

echo ""
echo "✅ Successfully published v$NEW_VERSION!"
echo ""
echo "🎯 The extension is now available for:"
echo "   - VS Code users"
echo "   - Cursor users"
echo "   - Windsurf users"
echo ""
echo "📦 Install with:"
echo "   code --install-extension vibe-devsquad.vibe-devsquad-vscode-extension"
echo "   cursor --install-extension vibe-devsquad.vibe-devsquad-vscode-extension"
echo "   windsurf --install-extension vibe-devsquad.vibe-devsquad-vscode-extension"
echo ""

# Git operations (optional)
if [ "$GIT_PUSH" = "yes" ]; then
    echo "🔄 Creating git tag..."
    git add .
    git commit -m "Release v$NEW_VERSION - VS Code Extension for all IDEs" || true
    git tag "v$NEW_VERSION"
    git push && git push --tags
    echo "✅ Git tag v$NEW_VERSION created and pushed"
fi

echo ""
echo "🌐 View in marketplace:"
echo "   https://marketplace.visualstudio.com/items?itemName=vibe-devsquad.vibe-devsquad-vscode-extension"
