#!/bin/bash
# Vibe DevSquad MCP Server Publisher
# Automated publishing for MCP server to npm and GitHub

VERSION_TYPE=${1:-patch}

echo "🖥️ Publishing Vibe DevSquad MCP Server..."
echo "Version bump: $VERSION_TYPE"

# Ensure we're in the right directory
cd "$(dirname "$0")/.."

# Pre-flight checks
echo "🔍 Running pre-flight checks..."

# Check if logged into npm
npm whoami >/dev/null 2>&1 || {
    echo "❌ Not logged into npm. Run 'npm login' first."
    exit 1
}

# Run tests
echo "🧪 Running tests..."
npm test || {
    echo "❌ Tests failed. Fix tests before publishing."
    exit 1
}

# Build
echo "🔨 Building..."
npm run build || {
    echo "❌ Build failed."
    exit 1
}

# Update version
echo "📝 Updating version..."
npm version $VERSION_TYPE --no-git-tag-version

NEW_VERSION=$(node -p "require('./package.json').version")
echo "New version: $NEW_VERSION"

# Update CHANGELOG
echo "📋 Update CHANGELOG.md for v$NEW_VERSION, then press Enter"
read

# Commit changes
git add .
git commit -m "chore: Release MCP server v$NEW_VERSION

- Version bump to $NEW_VERSION
- Updated CHANGELOG.md
- Built distribution files"

# Create tag
git tag "v$NEW_VERSION"

# Publish to npm
echo "📤 Publishing to npm..."
npm publish --access public || {
    echo "❌ npm publish failed"
    exit 1
}

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push origin main
git push origin "v$NEW_VERSION"

# Create GitHub release
echo "📦 Creating GitHub release..."
gh release create "v$NEW_VERSION" \
    --title "MCP Server v$NEW_VERSION" \
    --notes-file CHANGELOG.md \
    --target main

# Update MCP registry (if applicable)
echo "📝 Updating MCP registry..."
cat > mcp-registry-update.json << EOF
{
  "name": "@vibe-devsquad/cursor-mcp-server",
  "version": "$NEW_VERSION",
  "description": "Vibe DevSquad MCP Server for Cursor IDE",
  "author": "Vibe DevSquad",
  "license": "MIT",
  "repository": "https://github.com/vibe-devsquad/cursor-mcp-server"
}
EOF

echo ""
echo "✅ MCP Server v$NEW_VERSION published successfully!"
echo ""
echo "📊 Verify at:"
echo "  - npm: https://www.npmjs.com/package/@vibe-devsquad/cursor-mcp-server"
echo "  - GitHub: https://github.com/vibe-devsquad/cursor-mcp-server/releases"
echo ""
echo "🔧 Users can update with:"
echo "  npm update @vibe-devsquad/cursor-mcp-server"
echo "  or"
echo "  npm install @vibe-devsquad/cursor-mcp-server@$NEW_VERSION"
