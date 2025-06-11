#!/bin/bash
# Vibe DevSquad - Master Publishing Script
# Publish extensions and MCP servers with one command

PROJECT_TYPE=$1  # extension | mcp | all
VERSION_TYPE=$2  # patch | minor | major
IDE=$3          # cursor | vscode | windsurf | all

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default to patch if not specified
VERSION_TYPE=${VERSION_TYPE:-patch}
IDE=${IDE:-all}

echo -e "${BLUE}🚀 Vibe DevSquad Publisher${NC}"
echo "=========================="
echo "Project: $PROJECT_TYPE"
echo "Version: $VERSION_TYPE"
echo "IDE: $IDE"
echo ""

# Function to publish extension
publish_extension() {
    local dir="vscode-extension"
    
    if [ -d "$dir" ]; then
        echo -e "${YELLOW}📦 Publishing VS Code Extension (works in VS Code, Cursor, Windsurf)...${NC}"
        cd "$dir"
        
        # Run tests first
        echo "Running tests..."
        npm test || {
            echo -e "${RED}❌ Tests failed for VS Code extension${NC}"
            exit 1
        }
        
        # Build
        echo "Building..."
        npm run compile || {
            echo -e "${RED}❌ Build failed for VS Code extension${NC}"
            exit 1
        }
        
        # Publish
        vsce publish $VERSION_TYPE
        
        # Git tag
        NEW_VERSION=$(node -p "require('./package.json').version")
        git add .
        git commit -m "Release VS Code extension v$NEW_VERSION"
        git tag "vscode-extension-v${NEW_VERSION}"
        
        cd ..
        echo -e "${GREEN}✅ VS Code extension v$NEW_VERSION published${NC}"
        echo -e "${GREEN}   Works in: VS Code, Cursor, and Windsurf${NC}"
    fi
}

# Function to publish MCP server
publish_mcp() {
    local dir="cursor-mcp-server"
    
    if [ -d "$dir" ]; then
        echo -e "${YELLOW}🖥️ Publishing MCP Server...${NC}"
        cd "$dir"
        
        # Run tests
        echo "Running tests..."
        npm test || {
            echo -e "${RED}❌ Tests failed for MCP server${NC}"
            exit 1
        }
        
        # Build
        echo "Building..."
        npm run build || {
            echo -e "${RED}❌ Build failed for MCP server${NC}"
            exit 1
        }
        
        # Update version
        npm version $VERSION_TYPE
        
        # Publish to npm
        npm publish --access public
        
        # Git tag
        NEW_VERSION=$(node -p "require('./package.json').version")
        git add .
        git commit -m "Release MCP server v$NEW_VERSION"
        git tag "mcp-server-v${NEW_VERSION}"
        
        # Create GitHub release
        gh release create "mcp-server-v${NEW_VERSION}" \
            --title "MCP Server v${NEW_VERSION}" \
            --notes "See CHANGELOG.md for details"
        
        cd ..
        echo -e "${GREEN}✅ MCP server v$NEW_VERSION published${NC}"
    fi
}

# Function to update documentation
update_docs() {
    echo -e "${YELLOW}📚 Updating Documentation...${NC}"
    
    # Generate API docs
    npm run docs:generate 2>/dev/null || echo "No docs generator found"
    
    # Update README with latest versions
    # This would be a custom script to update version badges
    
    git add docs/ README.md
    git commit -m "docs: Update for latest releases"
    git push
    
    echo -e "${GREEN}✅ Documentation updated${NC}"
}

# Main execution logic
case $PROJECT_TYPE in
    extension)
        publish_extension
        ;;
    mcp)
        publish_mcp
        ;;
    all)
        # Publish everything
        echo -e "${BLUE}Publishing all components...${NC}"
        
        # Run all tests first
        ./scripts/test-all.sh || {
            echo -e "${RED}❌ Tests failed, aborting publish${NC}"
            exit 1
        }
        
        # Publish MCP first (extensions might depend on it)
        publish_mcp
        
        # Publish all extensions
        publish_extension
        
        # Update docs
        update_docs
        ;;
    *)
        echo -e "${RED}Usage: ./publish-all.sh [extension|mcp|all] [patch|minor|major] [cursor|vscode|windsurf|all]${NC}"
        echo "Examples:"
        echo "  ./publish-all.sh extension patch cursor  # Publish cursor extension with patch version"
        echo "  ./publish-all.sh mcp minor              # Publish MCP with minor version"
        echo "  ./publish-all.sh all major              # Publish everything with major version"
        exit 1
        ;;
esac

# Push all tags
echo -e "${YELLOW}Pushing tags...${NC}"
git push --tags

echo ""
echo -e "${GREEN}🎉 Publishing complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Check marketplace listings"
echo "2. Verify npm package"
echo "3. Test installations"
echo "4. Monitor error reports"
