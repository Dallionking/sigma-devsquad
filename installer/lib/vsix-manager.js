const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

class VSIXManager {
  constructor() {
    // Path to the bundled VSIX in the npm package
    this.bundledVSIXPath = path.join(__dirname, '..', 'extensions', 'vibe-devsquad-vscode-extension.vsix');
    
    // GitHub release URL (update with your actual repo)
    this.githubRepo = 'vibedevsquad/vibe-devsquad';
    this.githubReleasesAPI = `https://api.github.com/repos/${this.githubRepo}/releases`;
  }

  async getLatestVSIX(version) {
    // First, check if we have a bundled VSIX
    if (fs.existsSync(this.bundledVSIXPath)) {
      return this.bundledVSIXPath;
    }

    // If no bundled VSIX, try to download from GitHub releases
    try {
      const vsixPath = await this.downloadFromGitHub(version);
      return vsixPath;
    } catch (error) {
      // If download fails, try to build from source if we're in the repo
      const repoVSCodeExtPath = path.join(__dirname, '..', '..', 'vscode-extension');
      if (fs.existsSync(repoVSCodeExtPath)) {
        console.log('Building extension from source...');
        return await this.buildFromSource(repoVSCodeExtPath);
      }
      
      throw new Error('Could not find or download extension package');
    }
  }

  async downloadFromGitHub(version) {
    // Get releases from GitHub
    const releases = await this.fetchJSON(this.githubReleasesAPI);
    
    // Find the release we want
    let release;
    if (version) {
      release = releases.find(r => r.tag_name === `v${version}` || r.tag_name === version);
      if (!release) {
        throw new Error(`Version ${version} not found`);
      }
    } else {
      // Get latest release
      release = releases[0];
    }

    // Find VSIX asset
    const vsixAsset = release.assets.find(asset => asset.name.endsWith('.vsix'));
    if (!vsixAsset) {
      throw new Error('No VSIX file found in release');
    }

    // Download to temp location
    const tempPath = path.join(require('os').tmpdir(), vsixAsset.name);
    await this.downloadFile(vsixAsset.browser_download_url, tempPath);
    
    return tempPath;
  }

  async buildFromSource(extensionPath) {
    const originalCwd = process.cwd();
    
    try {
      process.chdir(extensionPath);
      
      // Install dependencies if needed
      if (!fs.existsSync('node_modules')) {
        console.log('Installing dependencies...');
        execSync('npm install', { stdio: 'inherit' });
      }
      
      // Build the extension
      console.log('Building extension...');
      execSync('npm run compile', { stdio: 'inherit' });
      
      // Package the extension
      console.log('Packaging extension...');
      execSync('npx vsce package', { stdio: 'inherit' });
      
      // Find the generated VSIX
      const files = fs.readdirSync('.');
      const vsixFile = files.find(f => f.endsWith('.vsix'));
      
      if (!vsixFile) {
        throw new Error('Failed to build VSIX package');
      }
      
      return path.join(extensionPath, vsixFile);
    } finally {
      process.chdir(originalCwd);
    }
  }

  fetchJSON(url) {
    return new Promise((resolve, reject) => {
      https.get(url, { headers: { 'User-Agent': 'vibe-devsquad-installer' } }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(e);
          }
        });
      }).on('error', reject);
    });
  }

  downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
      const file = fs.createWriteStream(dest);
      https.get(url, { headers: { 'User-Agent': 'vibe-devsquad-installer' } }, (res) => {
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      }).on('error', (err) => {
        fs.unlink(dest, () => {}); // Delete partial file
        reject(err);
      });
    });
  }
}

// Export a singleton instance
const vsixManager = new VSIXManager();

module.exports = {
  getLatestVSIX: (version) => vsixManager.getLatestVSIX(version)
};
