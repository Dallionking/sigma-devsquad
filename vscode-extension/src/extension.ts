// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { BridgeClient } from './bridge-client/bridgeClient';
import { PlanningService } from './planning-agent/planningService';
import { PlanningWebviewProvider } from './webview/planningPanel';
import { registerCommands } from './planning-agent/commands';
import { Logger } from './utils/logger';
import { ConfigManager } from './utils/config';

// Global instances
let bridgeClient: BridgeClient | undefined;
let planningService: PlanningService | undefined;
let logger: Logger;
let configManager: ConfigManager;

/**
 * This method is called when your extension is activated
 * Your extension is activated the very first time the command is executed
 */
export function activate(context: vscode.ExtensionContext) {
	logger = new Logger('VibeDevSquad');
	configManager = new ConfigManager();
	
	logger.info('Vibe DevSquad extension is now activating...');

	try {
		// Initialize bridge client for WebSocket communication
		const serverUrl = configManager.getServerUrl();
		bridgeClient = new BridgeClient(serverUrl);
		
		// Initialize planning service
		planningService = new PlanningService(bridgeClient);
		
		// Register all commands
		registerCommands(context, planningService);
		
		// Register webview providers
		const planningProvider = new PlanningWebviewProvider(
			context.extensionUri, 
			planningService
		);
		
		context.subscriptions.push(
			vscode.window.registerWebviewViewProvider(
				PlanningWebviewProvider.viewType, 
				planningProvider
			)
		);
		
		// Auto-connect if enabled
		if (configManager.getAutoConnect()) {
			connectToPlatform();
		}
		
		// Set context to enable commands
		vscode.commands.executeCommand('setContext', 'vibeDevSquad.enabled', true);
		
		logger.info('Vibe DevSquad extension activated successfully');
		
		// Show welcome message
		vscode.window.showInformationMessage(
			'Vibe DevSquad extension is ready! Use the Planning Agent in the Explorer panel.'
		);
		
	} catch (error) {
		logger.error('Failed to activate Vibe DevSquad extension', error);
		vscode.window.showErrorMessage(
			`Failed to activate Vibe DevSquad: ${error instanceof Error ? error.message : 'Unknown error'}`
		);
	}
}

/**
 * Connect to the Vibe DevSquad platform
 */
async function connectToPlatform(): Promise<void> {
	if (!bridgeClient) {
		logger.warn('Bridge client not initialized');
		return;
	}
	
	try {
		logger.info('Connecting to Vibe DevSquad platform...');
		await bridgeClient.connect();
		logger.info('Connected to Vibe DevSquad platform successfully');
		
		vscode.window.showInformationMessage(
			'Connected to Vibe DevSquad platform'
		);
		
	} catch (error) {
		logger.error('Failed to connect to platform', error);
		vscode.window.showWarningMessage(
			`Failed to connect to Vibe DevSquad platform: ${error instanceof Error ? error.message : 'Unknown error'}`
		);
	}
}

/**
 * This method is called when your extension is deactivated
 */
export function deactivate() {
	logger?.info('Deactivating Vibe DevSquad extension...');
	
	// Clean up resources
	if (bridgeClient) {
		bridgeClient.disconnect();
		bridgeClient = undefined;
	}
	
	planningService = undefined;
	
	// Set context to disable commands
	vscode.commands.executeCommand('setContext', 'vibeDevSquad.enabled', false);
	
	logger?.info('Vibe DevSquad extension deactivated');
}
