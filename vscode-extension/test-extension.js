// Test file for Vibe DevSquad Extension
// This file helps test the extension functionality

function testFunction() {
    // This is a test function
    const message = "Hello from Vibe DevSquad!";
    console.log(message);
    
    // Test code block for AI analysis
    const numbers = [1, 2, 3, 4, 5];
    const doubled = numbers.map(n => n * 2);
    
    return doubled;
}

// TODO: This is a test task that could be converted
// BUG: This is a test bug for the AI to find
// OPTIMIZE: This could be optimized

class TestClass {
    constructor() {
        this.name = "Test";
    }
    
    async processData(data) {
        // Simulate async processing
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(data.toUpperCase());
            }, 1000);
        });
    }
}

// Export for testing
module.exports = { testFunction, TestClass };
