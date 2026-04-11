
// ============================================================================
// ASYNC/AWAIT GUIDE FOR BEGINNERS
// From Callbacks to Modern Async JavaScript
// ============================================================================

console.log("=== ASYNC/AWAIT COMPREHENSIVE GUIDE ===\n");

// ============================================================================
// PART 1: UNDERSTANDING THE PROBLEM - WHY WE NEED ASYNC/AWAIT
// ============================================================================

console.log("1. THE PROBLEM: JavaScript is Single-Threaded");
console.log("JavaScript can only do one thing at a time, but we need to:");
console.log("- Fetch data from APIs");
console.log("- Read files from disk");
console.log("- Wait for user input");
console.log("- Handle database operations");
console.log("Without blocking the entire application!\n");

// ============================================================================
// PART 2: THE EVOLUTION - FROM CALLBACKS TO ASYNC/AWAIT
// ============================================================================

console.log("2. THE EVOLUTION OF ASYNC JAVASCRIPT\n");

// --- STAGE 1: CALLBACKS (The Old Way) ---
console.log("--- STAGE 1: CALLBACKS (Problems: Callback Hell) ---");

// Simulating old-style callback functions
function fetchUserCallback(userId, callback) {
    // Simulate network delay
    setTimeout(() => {
        if (userId === 999) {
            callback(new Error("User not found"), null);
        } else {
            callback(null, { id: userId, name: `User ${userId}`, email: `user${userId}@example.com` });
        }
    }, 1000);
}

function fetchUserPostsCallback(userId, callback) {
    setTimeout(() => {
        callback(null, [
            { id: 1, title: `Post 1 by User ${userId}`, content: "Content 1" },
            { id: 2, title: `Post 2 by User ${userId}`, content: "Content 2" }
        ]);
    }, 800);
}

// PROBLEM: Callback Hell (Pyramid of Doom)
function getCompleteUserDataCallback(userId) {
    console.log("Fetching user data with callbacks...");
    
    fetchUserCallback(userId, (error, user) => {
        if (error) {
            console.error("Error fetching user:", error.message);
            return;
        }
        
        console.log("User fetched:", user.name);
        
        fetchUserPostsCallback(userId, (error, posts) => {
            if (error) {
                console.error("Error fetching posts:", error.message);
                return;
            }
            
            console.log("Posts fetched:", posts.length, "posts");
            
            // Imagine more nested operations here...
            // This becomes unreadable and hard to maintain!
            console.log("Complete user data (callback style):", {
                user: user,
                posts: posts,
                totalPosts: posts.length
            });
        });
    });
}

// --- STAGE 2: PROMISES (Better, but still complex) ---
console.log("\n--- STAGE 2: PROMISES (Better Error Handling) ---");

// Converting to Promise-based functions
function fetchUserPromise(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId === 999) {
                reject(new Error("User not found"));
            } else {
                resolve({ id: userId, name: `User ${userId}`, email: `user${userId}@example.com` });
            }
        }, 1000);
    });
}

function fetchUserPostsPromise(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: `Post 1 by User ${userId}`, content: "Content 1" },
                { id: 2, title: `Post 2 by User ${userId}`, content: "Content 2" }
            ]);
        }, 800);
    });
}

// Using Promises with .then() chains
function getCompleteUserDataPromise(userId) {
    console.log("Fetching user data with promises...");
    
    return fetchUserPromise(userId)
        .then(user => {
            console.log("User fetched:", user.name);
            
            return fetchUserPostsPromise(userId)
                .then(posts => {
                    console.log("Posts fetched:", posts.length, "posts");
                    
                    return {
                        user: user,
                        posts: posts,
                        totalPosts: posts.length
                    };
                });
        })
        .catch(error => {
            console.error("Error in promise chain:", error.message);
            throw error;
        });
}

// --- STAGE 3: ASYNC/AWAIT (Modern, Clean Solution) ---
console.log("\n--- STAGE 3: ASYNC/AWAIT (Clean and Readable) ---");

// SOLUTION: async/await makes asynchronous code look synchronous
async function getCompleteUserDataAsync(userId) {
    try {
        console.log("Fetching user data with async/await...");
        
        // Wait for user data (looks like synchronous code!)
        const user = await fetchUserPromise(userId);
        console.log("User fetched:", user.name);
        
        // Wait for posts data
        const posts = await fetchUserPostsPromise(userId);
        console.log("Posts fetched:", posts.length, "posts");
        
        // Return the complete data
        return {
            user: user,
            posts: posts,
            totalPosts: posts.length
        };
        
    } catch (error) {
        console.error("Error in async function:", error.message);
        throw error; // Re-throw to let caller handle it
    }
}

// ============================================================================
// PART 3: ASYNC/AWAIT FUNDAMENTALS
// ============================================================================

console.log("\n3. ASYNC/AWAIT FUNDAMENTALS\n");

// RULE 1: Functions that use 'await' must be marked as 'async'
async function basicAsyncFunction() {
    // Inside async functions, you can use 'await'
    console.log("This function can use await");
    return "Hello from async function";
}

// RULE 2: 'await' pauses execution until the Promise resolves
async function demonstrateAwait() {
    console.log("Before await");
    
    // This line waits for the Promise to complete
    const result = await fetchUserPromise(1);
    
    console.log("After await - result:", result.name);
    return result;
}

// RULE 3: async functions always return Promises
async function asyncAlwaysReturnsPromise() {
    return "This string becomes a resolved Promise";
}

// Usage examples:
console.log("--- Basic Usage Examples ---");

// You can't use await at the top level (outside async functions)
// This would cause an error:
// const user = await fetchUserPromise(1); // ❌ SyntaxError

// Instead, wrap in an async function or use .then()
async function examples() {
    // Example 1: Basic await usage
    console.log("Example 1: Basic await");
    const user = await fetchUserPromise(1);
    console.log("Fetched user:", user.name);
    
    // Example 2: Multiple awaits in sequence
    console.log("\nExample 2: Sequential operations");
    const user2 = await fetchUserPromise(2);
    const posts2 = await fetchUserPostsPromise(2);
    console.log(`User ${user2.name} has ${posts2.length} posts`);
    
    // Example 3: Parallel operations (faster!)
    console.log("\nExample 3: Parallel operations");
    const [user3, posts3] = await Promise.all([
        fetchUserPromise(3),
        fetchUserPostsPromise(3)
    ]);
    console.log(`User ${user3.name} has ${posts3.length} posts (fetched in parallel)`);
}

// ============================================================================
// PART 4: ERROR HANDLING WITH TRY/CATCH
// ============================================================================

console.log("\n4. ERROR HANDLING WITH ASYNC/AWAIT\n");

// BEST PRACTICE: Always use try/catch with async/await
async function properErrorHandling(userId) {
    try {
        console.log(`Attempting to fetch user ${userId}...`);
        
        const user = await fetchUserPromise(userId);
        const posts = await fetchUserPostsPromise(userId);
        
        return {
            success: true,
            data: { user, posts }
        };
        
    } catch (error) {
        // Handle specific error types
        if (error.message.includes("not found")) {
            console.log("User not found - returning default data");
            return {
                success: false,
                error: "User not found",
                data: null
            };
        }
        
        // Handle unexpected errors
        console.error("Unexpected error:", error.message);
        return {
            success: false,
            error: "Something went wrong",
            data: null
        };
    }
}

// Multiple try/catch blocks for granular error handling
async function granularErrorHandling(userId) {
    let user = null;
    let posts = [];
    
    // Try to get user (required)
    try {
        user = await fetchUserPromise(userId);
    } catch (error) {
        console.error("Failed to fetch user:", error.message);
        throw new Error("Cannot proceed without user data");
    }
    
    // Try to get posts (optional)
    try {
        posts = await fetchUserPostsPromise(userId);
    } catch (error) {
        console.warn("Failed to fetch posts, continuing with empty array:", error.message);
        posts = []; // Default value
    }
    
    return { user, posts };
}

// ============================================================================
// PART 5: REAL-WORLD EXAMPLES
// ============================================================================

console.log("\n5. REAL-WORLD EXAMPLES\n");

// Example 1: API Calls (using fetch)
async function fetchFromAPI() {
    try {
        console.log("--- API Example (simulated) ---");
        
        // Simulate fetch API call
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        
        // Check if response is ok
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const userData = await response.json();
        console.log("API Response:", userData.name);
        
        return userData;
        
    } catch (error) {
        console.error("API call failed:", error.message);
        
        // Return mock data as fallback
        return {
            id: 1,
            name: "Mock User",
            email: "mock@example.com"
        };
    }
}

// Note: Since we can't actually make HTTP requests in this environment,
// let's create a mock fetch function for demonstration
function fetch(url) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                ok: true,
                status: 200,
                json: async () => ({
                    id: 1,
                    name: "Leanne Graham",
                    email: "Sincere@april.biz",
                    username: "Bret"
                })
            });
        }, 500);
    });
}

// Example 2: File Operations (Node.js style)
async function readFileExample() {
    console.log("--- File Reading Example (simulated) ---");
    
    // Simulate fs.promises.readFile
    const readFile = (filename) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (filename.includes('missing')) {
                    reject(new Error('File not found'));
                } else {
                    resolve(`Contents of ${filename}`);
                }
            }, 300);
        });
    };
    
    try {
        const fileContent = await readFile('config.json');
        console.log("File content:", fileContent);
        return fileContent;
    } catch (error) {
        console.error("File read error:", error.message);
        return null;
    }
}

// Example 3: Database Operations (simulated)
async function databaseExample() {
    console.log("--- Database Example (simulated) ---");
    
    // Simulate database operations
    const db = {
        findUser: (id) => new Promise(resolve => 
            setTimeout(() => resolve({ id, name: `User${id}`, email: `user${id}@db.com` }), 200)
        ),
        createPost: (userId, title) => new Promise(resolve => 
            setTimeout(() => resolve({ id: Date.now(), userId, title, createdAt: new Date() }), 300)
        ),
        updateUser: (id, data) => new Promise(resolve => 
            setTimeout(() => resolve({ id, ...data, updatedAt: new Date() }), 250)
        )
    };
    
    try {
        // Sequential database operations
        console.log("1. Finding user...");
        const user = await db.findUser(123);
        
        console.log("2. Creating post...");
        const post = await db.createPost(user.id, "My New Post");
        
        console.log("3. Updating user...");
        const updatedUser = await db.updateUser(user.id, { lastPostId: post.id });
        
        console.log("Database operations completed:", {
            user: updatedUser,
            post: post
        });
        
    } catch (error) {
        console.error("Database operation failed:", error.message);
    }
}

// ============================================================================
// PART 6: COMMON PATTERNS AND BEST PRACTICES
// ============================================================================

console.log("\n6. COMMON PATTERNS AND BEST PRACTICES\n");

// Pattern 1: Sequential vs Parallel Execution
async function sequentialVsParallel() {
    console.log("--- Sequential vs Parallel Execution ---");
    
    // Sequential (slow) - each operation waits for the previous one
    console.time("Sequential");
    const user1 = await fetchUserPromise(1);
    const user2 = await fetchUserPromise(2);
    const user3 = await fetchUserPromise(3);
    console.timeEnd("Sequential");
    
    // Parallel (fast) - all operations start at the same time
    console.time("Parallel");
    const [userA, userB, userC] = await Promise.all([
        fetchUserPromise(1),
        fetchUserPromise(2),
        fetchUserPromise(3)
    ]);
    console.timeEnd("Parallel");
    
    console.log("Both approaches got the same data, but parallel was faster!");
}

// Pattern 2: Handling Arrays of Async Operations
async function arrayAsyncPatterns() {
    console.log("--- Array Async Patterns ---");
    
    const userIds = [1, 2, 3, 4, 5];
    
    // Method 1: Sequential processing (slower)
    console.log("Sequential processing:");
    const sequentialResults = [];
    for (const id of userIds) {
        try {
            const user = await fetchUserPromise(id);
            sequentialResults.push(user);
        } catch (error) {
            console.log(`Failed to fetch user ${id}`);
        }
    }
    console.log(`Processed ${sequentialResults.length} users sequentially`);
    
    // Method 2: Parallel processing (faster)
    console.log("Parallel processing:");
    const parallelResults = await Promise.allSettled(
        userIds.map(id => fetchUserPromise(id))
    );
    
    const successfulUsers = parallelResults
        .filter(result => result.status === 'fulfilled')
        .map(result => result.value);
        
    console.log(`Processed ${successfulUsers.length} users in parallel`);
    
    // Method 3: Map with async/await (common mistake!)
    console.log("Common mistake - map with async:");
    const promises = userIds.map(async (id) => {
        return await fetchUserPromise(id);
    });
    // promises is now an array of Promises, not resolved values!
    console.log("promises array contains:", promises[0].constructor.name);
    
    // Correct way:
    const resolvedUsers = await Promise.all(promises);
    console.log("After Promise.all:", resolvedUsers[0].constructor.name);
}

// Pattern 3: Timeout and Cancellation
async function timeoutPattern() {
    console.log("--- Timeout Pattern ---");
    
    // Create a timeout Promise
    const timeout = (ms) => new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Operation timed out')), ms)
    );
    
    try {
        // Race between the actual operation and timeout
        const result = await Promise.race([
            fetchUserPromise(1),
            timeout(500) // 500ms timeout
        ]);
        
        console.log("Operation completed within timeout:", result.name);
        
    } catch (error) {
        if (error.message.includes('timeout')) {
            console.log("Operation took too long and was cancelled");
        } else {
            console.log("Operation failed:", error.message);
        }
    }
}

// Pattern 4: Retry Logic
async function retryPattern(operation, maxRetries = 3) {
    console.log("--- Retry Pattern ---");
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`Attempt ${attempt}/${maxRetries}`);
            const result = await operation();
            console.log("Operation succeeded!");
            return result;
            
        } catch (error) {
            console.log(`Attempt ${attempt} failed:`, error.message);
            
            if (attempt === maxRetries) {
                console.log("All retries exhausted");
                throw new Error(`Operation failed after ${maxRetries} attempts`);
            }
            
            // Wait before retrying (exponential backoff)
            const delay = Math.pow(2, attempt) * 1000;
            console.log(`Waiting ${delay}ms before retry...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

// ============================================================================
// PART 7: COMMON MISTAKES AND HOW TO AVOID THEM
// ============================================================================

console.log("\n7. COMMON MISTAKES AND HOW TO AVOID THEM\n");

// Mistake 1: Forgetting to await
async function mistakeForgetAwait() {
    console.log("--- Mistake 1: Forgetting await ---");
    
    // WRONG: Missing await
    const userPromise = fetchUserPromise(1); // This is a Promise, not a user!
    console.log("Without await:", userPromise.constructor.name); // "Promise"
    
    // CORRECT: Using await
    const user = await fetchUserPromise(1);
    console.log("With await:", user.constructor.name); // "Object"
}

// Mistake 2: Using await in non-async function
function mistakeAwaitInNonAsync() {
    console.log("--- Mistake 2: await in non-async function ---");
    
    // This would cause a SyntaxError:
    // const user = await fetchUserPromise(1); // ❌ SyntaxError
    
    // CORRECT: Either make function async or use .then()
    return fetchUserPromise(1).then(user => {
        console.log("Using .then() instead:", user.name);
        return user;
    });
}

// Mistake 3: Not handling errors
async function mistakeNoErrorHandling() {
    console.log("--- Mistake 3: Not handling errors ---");
    
    try {
        // This might throw an error
        const user = await fetchUserPromise(999); // This will fail
        console.log("User:", user.name);
    } catch (error) {
        console.log("Properly caught error:", error.message);
    }
    
    // Without try/catch, the error would crash the program or be an unhandled rejection
}

// Mistake 4: Sequential when you want parallel
async function mistakeSequentialInsteadOfParallel() {
    console.log("--- Mistake 4: Sequential instead of parallel ---");
    
    // SLOW: Sequential execution
    console.time("Sequential mistake");
    const user1 = await fetchUserPromise(1);
    const user2 = await fetchUserPromise(2);
    console.timeEnd("Sequential mistake");
    
    // FAST: Parallel execution
    console.time("Parallel correct");
    const [userA, userB] = await Promise.all([
        fetchUserPromise(1),
        fetchUserPromise(2)
    ]);
    console.timeEnd("Parallel correct");
}

// ============================================================================
// PART 8: PRACTICAL EXERCISES AND DEMOS
// ============================================================================

console.log("\n8. RUNNING PRACTICAL EXAMPLES\n");

// Function to run all examples with proper timing
async function runAllExamples() {
    console.log("🚀 Starting Async/Await Demonstrations...\n");
    
    try {
        // Basic examples
        await examples();
        
        console.log("\n" + "─".repeat(50));
        await sequentialVsParallel();
        
        console.log("\n" + "─".repeat(50));
        await arrayAsyncPatterns();
        
        console.log("\n" + "─".repeat(50));
        await timeoutPattern();
        
        console.log("\n" + "─".repeat(50));
        
        // Error handling examples
        console.log("Testing error handling...");
        const result1 = await properErrorHandling(1); // Success
        console.log("Result 1:", result1);
        
        const result2 = await properErrorHandling(999); // Will fail
        console.log("Result 2:", result2);
        
        console.log("\n" + "─".repeat(50));
        
        // Real-world examples
        await fetchFromAPI();
        await readFileExample();
        await databaseExample();
        
        console.log("\n" + "─".repeat(50));
        
        // Common mistakes
        await mistakeForgetAwait();
        await mistakeAwaitInNonAsync();
        await mistakeNoErrorHandling();
        await mistakeSequentialInsteadOfParallel();
        
        console.log("\n" + "─".repeat(50));
        
        // Retry pattern demo
        let attemptCount = 0;
        const flakyOperation = () => {
            attemptCount++;
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (attemptCount < 3) {
                        reject(new Error(`Simulated failure ${attemptCount}`));
                    } else {
                        resolve("Success after retries!");
                    }
                }, 100);
            });
        };
        
        const retryResult = await retryPattern(flakyOperation);
        console.log("Retry result:", retryResult);
        
    } catch (error) {
        console.error("Demo failed:", error.message);
    }
    
    console.log("\n🎉 All async/await demonstrations completed!");
}

// ============================================================================
// PART 9: SUMMARY AND BEST PRACTICES
// ============================================================================

console.log("\n9. SUMMARY AND BEST PRACTICES\n");

console.log(`
📋 ASYNC/AWAIT CHECKLIST FOR BEGINNERS:

✅ DO:
- Always mark functions as 'async' when using 'await'
- Use try/catch blocks for error handling
- Use Promise.all() for parallel operations
- Handle both success and error cases
- Use meaningful variable names for async results

❌ DON'T:
- Forget to await Promises (you'll get a Promise object instead of the value)
- Use await in non-async functions
- Ignore error handling
- Use sequential awaits when parallel would be faster
- Mix async/await with .then() chains (pick one style)

🎯 KEY CONCEPTS:
1. async/await is syntactic sugar over Promises
2. await pauses function execution until Promise resolves
3. async functions always return Promises
4. Use Promise.all() for concurrent operations
5. Always handle errors with try/catch

🔧 COMMON PATTERNS:
- API calls: fetch + await + error handling
- File operations: fs.promises + await
- Database queries: await db operations
- Parallel processing: Promise.all()
- Error recovery: try/catch with fallbacks
`);

// Export the main demo function
module.exports = {
    runAllExamples,
    fetchUserPromise,
    fetchUserPostsPromise,
    properErrorHandling,
    retryPattern
};

// Auto-run the examples
runAllExamples().catch(console.error);
