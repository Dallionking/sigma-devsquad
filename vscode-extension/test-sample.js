// Vibe DevSquad VS Code Extension Test File
// Use this file to test the extension features

function calculateSum(a, b) {
    // TODO: Add input validation
    return a + b;
}

function processUserData(userData) {
    // This function needs refactoring
    if (userData && userData.name) {
        return {
            id: userData.id,
            name: userData.name.trim(),
            email: userData.email || 'no-email@example.com'
        };
    }
    return null;
}

// Test the extension with this code:
// 1. Select the calculateSum function
// 2. Run "Vibe DevSquad: Create Task from Selection" 
// 3. Run "Vibe DevSquad: Analyze Current File"
// 4. Open Planning Agent panel

const testData = {
    name: "  John Doe  ",
    email: "john@example.com",
    id: 123
};

console.log(processUserData(testData));
