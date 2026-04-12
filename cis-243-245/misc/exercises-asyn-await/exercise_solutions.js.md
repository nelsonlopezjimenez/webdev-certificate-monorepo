# WEEK 2 EXERCISE SOLUTIONS WITH DETAILED COMMENTS FOR BEGINNERS

## DAY 1: MODERN JAVASCRIPT SYNTAX

```js
// Exercise 1.1: Modern Syntax Conversion
console.log("=== Exercise 1.1: Modern Syntax Conversion ===");

// OLD VERSION (ES5 style)
function getUserInfo(user) {
    var name = user.name;
    var email = user.email;
    var age = user.age || 18;
    return "User: " + name + " (" + email + ") - Age: " + age;
}

// NEW VERSION (ES6+ style) - SOLUTION
const getUserInfoModern = (user) => {
    // Destructuring: Extract properties directly from the object
    // The = 18 provides a default value if age is undefined
    const { name, email, age = 18 } = user;
    
    // Template literal: Uses backticks (`) and ${} for variable insertion
    // Much cleaner than string concatenation with +
    return `User: ${name} (${email}) - Age: ${age}`;
};

// Test the function
const testUser = { name: "John Doe", email: "john@example.com" };
console.log(getUserInfoModern(testUser));
// Output: User: John Doe (john@example.com) - Age: 18

// Exercise 1.2: Destructuring Practice
console.log("\n=== Exercise 1.2: Destructuring Practice ===");

const company = {
    name: "TechCorp",
    location: {
        city: "San Francisco",
        state: "CA"
    },
    employees: ["Alice", "Bob", "Charlie"]
};

// SOLUTION: Multiple destructuring techniques
// 1. Basic object destructuring
const { name: companyName } = company;

// 2. Nested destructuring - extracting from nested objects
const { location: { city, state } } = company;

// 3. Array destructuring with default values
const { employees: [firstEmployee, secondEmployee, thirdEmployee = "No third employee"] } = company;

// Alternative: Direct array destructuring
const [employee1, employee2, employee3 = "Default Employee"] = company.employees;

console.log(`Company: ${companyName}`);
console.log(`Location: ${city}, ${state}`);
console.log(`First Employee: ${firstEmployee}`);
console.log(`Second Employee: ${employee2}`);
```

## DAY 2: NPM & PACKAGE MANAGEMENT

```js
// Exercise 2.1: Package Management - Complete package.json example
console.log("\n=== Exercise 2.1: Package Management ===");

/* 
SOLUTION: Complete package.json file

{
  "name": "my-web-app",
  "version": "1.0.0",
  "description": "A simple web application for learning MERN stack",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["nodejs", "express", "web-app"],
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.20"
  }
}

Commands to create this setup:
1. npm init (follow prompts)
2. npm install express cors dotenv
3. npm install --save-dev nodemon
4. Edit package.json to add the scripts section
*/

// Basic server.js file that would use these packages
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Loads environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enables cross-origin requests
app.use(express.json()); // Parses JSON request bodies

// Simple route
app.get('/', (req, res) => {
    res.json({ message: 'Hello from Express!' });
});

// Only start server if this file is run directly (not imported)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
```

## DAY 3: WORKING WITH EXTERNAL LIBRARIES

```js
// Exercise 3.1: Library Integration - Weather App
console.log("\n=== Exercise 3.1: Library Integration ===");

// Note: In a real project, you would install these packages:
// npm install axios dayjs lodash

// Simulated imports (in real code, uncomment these)
// const axios = require('axios');
// const dayjs = require('dayjs');
// const _ = require('lodash');

// Mock functions for demonstration (replace with real imports)
const axios = {
    get: async (url) => ({
        data: {
            name: "San Francisco",
            main: { temp: 22, humidity: 65 },
            weather: [{ description: "sunny" }],
            dt: 1640995200
        }
    })
};

const dayjs = (timestamp) => ({
    format: (format) => "2022-01-01 12:00:00"
});

const _ = {
    pick: (obj, keys) => {
        const result = {};
        keys.forEach(key => {
            if (obj[key] !== undefined) result[key] = obj[key];
        });
        return result;
    },
    capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1)
};

// SOLUTION: Weather app functions
class WeatherApp {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
    }

    // Fetch weather data using axios
    async fetchWeatherData(city) {
        try {
            // In real implementation, use actual API
            const url = `${this.baseUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('Error fetching weather data:', error.message);
            throw new Error('Failed to fetch weather data');
        }
    }

    // Format date using dayjs
    formatDate(timestamp) {
        // Convert Unix timestamp to readable date
        return dayjs(timestamp * 1000).format('YYYY-MM-DD HH:mm:ss');
    }

    // Process weather data using lodash
    processWeatherData(rawData) {
        // Pick only the fields we need using lodash
        const essentialData = _.pick(rawData, ['name', 'main', 'weather', 'dt']);
        
        // Transform the data structure
        return {
            city: essentialData.name,
            temperature: essentialData.main.temp,
            humidity: essentialData.main.humidity,
            description: _.capitalize(essentialData.weather[0].description),
            date: this.formatDate(essentialData.dt)
        };
    }

    // Main function that combines all operations
    async getWeatherReport(city) {
        try {
            console.log(`Fetching weather for ${city}...`);
            
            // 1. Fetch raw data
            const rawData = await this.fetchWeatherData(city);
            
            // 2. Process and format data
            const processedData = this.processWeatherData(rawData);
            
            // 3. Return formatted report
            return {
                success: true,
                data: processedData,
                message: `Weather report for ${city} retrieved successfully`
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Failed to get weather report'
            };
        }
    }
}

// Usage example
const weatherApp = new WeatherApp('your-api-key-here');

// Async function to demonstrate usage
async function demonstrateWeatherApp() {
    const report = await weatherApp.getWeatherReport('San Francisco');
    console.log('Weather Report:', JSON.stringify(report, null, 2));
}

// Export for ES6 modules (uncomment in real project)
// export { WeatherApp };
// export default WeatherApp;

// CommonJS export (current approach)
module.exports = { WeatherApp };
```

## DAY 4: ARRAY METHODS FUNDAMENTALS

```js
// Exercise 4.1: E-commerce Data Processing
console.log("\n=== Exercise 4.1: E-commerce Data Processing ===");

const products = [
    { id: 1, name: "Laptop", price: 999, category: "Electronics", inStock: true },
    { id: 2, name: "Shirt", price: 29, category: "Clothing", inStock: false },
    { id: 3, name: "Phone", price: 699, category: "Electronics", inStock: true },
    { id: 4, name: "Jeans", price: 79, category: "Clothing", inStock: true }
];

// SOLUTION 1: Get all product names
console.log("1. All product names:");
const productNames = products.map(product => {
    // map() creates a new array by transforming each element
    // Here we're extracting just the name property from each product
    return product.name;
});
console.log(productNames);
// Output: ["Laptop", "Shirt", "Phone", "Jeans"]

// Alternative shorter syntax using arrow function
const productNamesShort = products.map(product => product.name);

// SOLUTION 2: Get products under $100
console.log("\n2. Products under $100:");
const affordableProducts = products.filter(product => {
    // filter() creates a new array with elements that pass the test
    // Return true to include the item, false to exclude it
    return product.price < 100;
});
console.log(affordableProducts);
// Output: Products with price < 100

// SOLUTION 3: Get in-stock electronics
console.log("\n3. In-stock electronics:");
const inStockElectronics = products.filter(product => {
    // Multiple conditions: both must be true
    return product.category === "Electronics" && product.inStock === true;
});
console.log(inStockElectronics);

// SOLUTION 4: Create discounted prices (20% off) for in-stock items
console.log("\n4. Discounted prices for in-stock items:");
const discountedProducts = products
    .filter(product => product.inStock) // First, filter in-stock items
    .map(product => {
        // Then, transform each item to include discounted price
        return {
            ...product, // Spread operator copies all existing properties
            originalPrice: product.price,
            discountedPrice: product.price * 0.8, // 20% off = multiply by 0.8
            savings: product.price * 0.2 // How much they save
        };
    });

console.log(discountedProducts);

// Exercise 4.2: User Data Transformation
console.log("\n=== Exercise 4.2: User Data Transformation ===");

const users = [
    { firstName: "John", lastName: "Doe", age: 28, city: "New York" },
    { firstName: "Jane", lastName: "Smith", age: 34, city: "Los Angeles" },
    { firstName: "Bob", lastName: "Johnson", age: 22, city: "Chicago" }
];

// SOLUTION 1: Return full names
console.log("1. Full names:");
const fullNames = users.map(user => {
    // Combine firstName and lastName with a space
    return `${user.firstName} ${user.lastName}`;
});
console.log(fullNames);
// Output: ["John Doe", "Jane Smith", "Bob Johnson"]

// SOLUTION 2: Filter users by minimum age
console.log("\n2. Users 25 and older:");
function filterUsersByAge(users, minAge) {
    return users.filter(user => {
        // Return true if user meets age requirement
        return user.age >= minAge;
    });
}

const adultUsers = filterUsersByAge(users, 25);
console.log(adultUsers);

// SOLUTION 3: Group users by city (using reduce - preview of Day 5)
console.log("\n3. Users grouped by city:");
const usersByCity = users.reduce((grouped, user) => {
    // If city doesn't exist in grouped object, create empty array
    if (!grouped[user.city]) {
        grouped[user.city] = [];
    }
    // Add current user to their city's array
    grouped[user.city].push(user);
    return grouped;
}, {}); // Start with empty object

console.log(usersByCity);

// SOLUTION 4: Create user profile summaries
console.log("\n4. User profile summaries:");
const userProfiles = users.map(user => {
    // Create a summary string for each user
    return {
        id: `${user.firstName.toLowerCase()}.${user.lastName.toLowerCase()}`,
        fullName: `${user.firstName} ${user.lastName}`,
        summary: `${user.firstName} ${user.lastName} is ${user.age} years old and lives in ${user.city}`,
        ageGroup: user.age < 25 ? 'Young Adult' : user.age < 35 ? 'Adult' : 'Mature Adult'
    };
});

console.log(userProfiles);
```
## DAY 5: ADVANCED ARRAY METHODS

```js
// Exercise 5.1: Data Analytics with Reduce
console.log("\n=== Exercise 5.1: Data Analytics with Reduce ===");

const sales = [
    { product: "Laptop", amount: 999, date: "2024-01-15", salesperson: "Alice" },
    { product: "Phone", amount: 699, date: "2024-01-16", salesperson: "Bob" },
    { product: "Laptop", amount: 999, date: "2024-01-17", salesperson: "Alice" },
    { product: "Tablet", amount: 399, date: "2024-01-18", salesperson: "Charlie" }
];

// SOLUTION 1: Total sales amount
console.log("1. Total sales amount:");
const totalSales = sales.reduce((total, sale) => {
    // reduce() accumulates values into a single result
    // total is the accumulator, sale is the current item
    // Add current sale amount to running total
    return total + sale.amount;
}, 0); // Start with 0

console.log(`Total sales: $${totalSales}`);
// Output: Total sales: $3096

// SOLUTION 2: Sales by product
console.log("\n2. Sales by product:");
const salesByProduct = sales.reduce((productSales, sale) => {
    // If product doesn't exist in our object, initialize it
    if (!productSales[sale.product]) {
        productSales[sale.product] = {
            totalAmount: 0,
            count: 0
        };
    }
    
    // Add to existing totals
    productSales[sale.product].totalAmount += sale.amount;
    productSales[sale.product].count += 1;
    
    return productSales;
}, {}); // Start with empty object

console.log(salesByProduct);

// SOLUTION 3: Sales by salesperson
console.log("\n3. Sales by salesperson:");
const salesBySalesperson = sales.reduce((personSales, sale) => {
    // Similar pattern to product sales
    if (!personSales[sale.salesperson]) {
        personSales[sale.salesperson] = {
            totalAmount: 0,
            salesCount: 0,
            products: []
        };
    }
    
    personSales[sale.salesperson].totalAmount += sale.amount;
    personSales[sale.salesperson].salesCount += 1;
    personSales[sale.salesperson].products.push(sale.product);
    
    return personSales;
}, {});

console.log(salesBySalesperson);

// SOLUTION 4: Average sale amount
console.log("\n4. Average sale amount:");
const averageSale = sales.reduce((acc, sale, index, array) => {
    // Add current amount to accumulator
    acc += sale.amount;
    
    // If this is the last item, calculate average
    if (index === array.length - 1) {
        return acc / array.length;
    }
    
    return acc;
}, 0);

// Alternative simpler approach
const averageSaleSimple = totalSales / sales.length;

console.log(`Average sale: $${averageSale}`);
console.log(`Average sale (simple): $${averageSaleSimple}`);

// BONUS: Sort sales by amount (highest to lowest)
console.log("\n5. Sales sorted by amount (highest first):");
const sortedSales = sales.sort((a, b) => {
    // sort() arranges elements based on comparison function
    // Return negative if a should come before b
    // Return positive if a should come after b
    // Return 0 if they're equal
    return b.amount - a.amount; // Descending order
});

console.log(sortedSales);

// Sort by date (newest first)
console.log("\n6. Sales sorted by date (newest first):");
const sortedByDate = sales.sort((a, b) => {
    // Convert date strings to Date objects for comparison
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA; // Newer dates first
});

console.log(sortedByDate);
```

## WEEK 3 EXERCISE SOLUTIONS


// DAY 1: COMPLEX ARRAY METHOD COMBINATIONS

```js
// Exercise 6.1: Restaurant Order System
console.log("\n=== Exercise 6.1: Restaurant Order System ===");

const orders = [
    {
        id: 1,
        customer: "John",
        items: [
            { name: "Burger", price: 12, category: "Main" },
            { name: "Fries", price: 4, category: "Side" }
        ],
        status: "completed"
    },
    {
        id: 2,
        customer: "Jane",
        items: [
            { name: "Salad", price: 8, category: "Main" },
            { name: "Drink", price: 3, category: "Beverage" }
        ],
        status: "pending"
    },
    {
        id: 3,
        customer: "Bob",
        items: [
            { name: "Pizza", price: 15, category: "Main" },
            { name: "Drink", price: 3, category: "Beverage" },
            { name: "Dessert", price: 6, category: "Dessert" }
        ],
        status: "completed"
    }
];

// SOLUTION 1: Get all completed orders with total amounts
console.log("1. Completed orders with totals:");
const completedOrdersWithTotals = orders
    .filter(order => order.status === "completed") // Only completed orders
    .map(order => {
        // Calculate total for each order
        const total = order.items.reduce((sum, item) => sum + item.price, 0);
        
        return {
            id: order.id,
            customer: order.customer,
            items: order.items,
            total: total,
            status: order.status
        };
    });

console.log(completedOrdersWithTotals);

// SOLUTION 2: Find the most popular menu category
console.log("\n2. Most popular menu category:");
const categoryCount = orders
    .flatMap(order => order.items) // Flatten all items into one array
    .reduce((categories, item) => {
        // Count occurrences of each category
        categories[item.category] = (categories[item.category] || 0) + 1;
        return categories;
    }, {});

// Find category with highest count
const mostPopularCategory = Object.entries(categoryCount)
    .sort(([,a], [,b]) => b - a) // Sort by count (descending)
    [0]; // Get first entry (highest count)

console.log(`Most popular category: ${mostPopularCategory[0]} (${mostPopularCategory[1]} items)`);
console.log("All categories:", categoryCount);

// SOLUTION 3: Calculate revenue by customer
console.log("\n3. Revenue by customer:");
const revenueByCustomer = orders
    .reduce((customerRevenue, order) => {
        // Calculate total for this order
        const orderTotal = order.items.reduce((sum, item) => sum + item.price, 0);
        
        // Add to customer's total (only if completed)
        if (order.status === "completed") {
            customerRevenue[order.customer] = (customerRevenue[order.customer] || 0) + orderTotal;
        }
        
        return customerRevenue;
    }, {});

console.log(revenueByCustomer);

// SOLUTION 4: Get average order value for completed orders
console.log("\n4. Average order value for completed orders:");
const completedOrders = orders.filter(order => order.status === "completed");

const averageOrderValue = completedOrders
    .map(order => order.items.reduce((sum, item) => sum + item.price, 0)) // Get totals
    .reduce((sum, total, index, array) => {
        sum += total;
        // Return average on last iteration
        return index === array.length - 1 ? sum / array.length : sum;
    }, 0);

console.log(`Average order value: $${averageOrderValue.toFixed(2)}`);

// DAY 7: ERROR HANDLING & ASYNC OPERATIONS


// Exercise 7.1: Async Data Processing
console.log("\n=== Exercise 7.1: Async Data Processing ===");

// Mock API function (simulates real API call)
async function fetchUserById(userId) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Simulate some failures for error handling
    if (userId === 4) {
        throw new Error(`User ${userId} not found`);
    }
    
    // Return mock user data
    return {
        id: userId,
        name: `User ${userId}`,
        email: `user${userId}@example.com`,
        age: 20 + userId * 3,
        city: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'][userId - 1] || 'Unknown'
    };
}

// SOLUTION: Process multiple users with error handling
async function fetchUserProfiles(userIds) {
    console.log(`Fetching profiles for users: ${userIds.join(', ')}`);
    
    try {
        // Method 1: Process all users concurrently (faster)
        const userPromises = userIds.map(async (userId) => {
            try {
                const user = await fetchUserById(userId);
                return {
                    success: true,
                    user: user,
                    processed: true
                };
            } catch (error) {
                // Handle individual user errors
                console.warn(`Failed to fetch user ${userId}: ${error.message}`);
                return {
                    success: false,
                    userId: userId,
                    error: error.message,
                    processed: false
                };
            }
        });
        
        // Wait for all promises to complete
        const results = await Promise.all(userPromises);
        
        // Separate successful and failed requests
        const successfulUsers = results
            .filter(result => result.success)
            .map(result => result.user);
            
        const failedUsers = results
            .filter(result => !result.success);
        
        // Process successful users with array methods
        const processedUsers = successfulUsers
            .map(user => ({
                ...user,
                fullProfile: `${user.name} (${user.email}) - Age: ${user.age}, City: ${user.city}`,
                ageGroup: user.age < 25 ? 'Young' : user.age < 35 ? 'Adult' : 'Senior'
            }))
            .sort((a, b) => a.age - b.age); // Sort by age
        
        return {
            success: true,
            users: processedUsers,
            totalProcessed: processedUsers.length,
            totalFailed: failedUsers.length,
            errors: failedUsers
        };
        
    } catch (error) {
        console.error('Critical error in fetchUserProfiles:', error);
        return {
            success: false,
            error: error.message,
            users: []
        };
    }
}

// Method 2: Sequential processing (slower but sometimes necessary)
async function fetchUserProfilesSequential(userIds) {
    const results = [];
    const errors = [];
    
    for (const userId of userIds) {
        try {
            const user = await fetchUserById(userId);
            results.push(user);
        } catch (error) {
            console.warn(`Failed to fetch user ${userId}: ${error.message}`);
            errors.push({ userId, error: error.message });
        }
    }
    
    return {
        success: true,
        users: results,
        errors: errors
    };
}

// Demonstration function
async function demonstrateAsyncProcessing() {
    const userIds = [1, 2, 3, 4, 5]; // Note: userId 4 will fail
    
    console.log("Concurrent processing:");
    const concurrentResult = await fetchUserProfiles(userIds);
    console.log(JSON.stringify(concurrentResult, null, 2));
    
    console.log("\nSequential processing:");
    const sequentialResult = await fetchUserProfilesSequential(userIds);
    console.log(JSON.stringify(sequentialResult, null, 2));
}
```
## DAY 8: REAL-WORLD MERN INTEGRATION

```js
// Exercise 8.1: Blog API Routes
console.log("\n=== Exercise 8.1: Blog API Routes ===");

// Mock blog posts data
const posts = [
    { 
        id: 1, 
        title: "JavaScript Basics", 
        content: "Learn the fundamentals of JavaScript...", 
        tags: ["javascript", "tutorial"], 
        likes: 15,
        category: "Programming",
        author: "Alice",
        createdAt: "2024-01-15"
    },
    { 
        id: 2, 
        title: "React Tips", 
        content: "Advanced React patterns and tips...", 
        tags: ["react", "frontend"], 
        likes: 23,
        category: "Programming",
        author: "Bob",
        createdAt: "2024-01-20"
    },
    { 
        id: 3, 
        title: "Node.js Best Practices", 
        content: "How to write better Node.js applications...", 
        tags: ["nodejs", "backend"], 
        likes: 18,
        category: "Programming",
        author: "Charlie",
        createdAt: "2024-01-25"
    },
    { 
        id: 4, 
        title: "CSS Grid Layout", 
        content: "Master CSS Grid for responsive layouts...", 
        tags: ["css", "layout"], 
        likes: 12,
        category: "Design",
        author: "Alice",
        createdAt: "2024-01-30"
    }
];

// SOLUTION: Express.js route handlers with array processing

// Route 1: GET /posts - return filtered and sorted posts
function getPosts(req, res) {
    try {
        // Extract query parameters
        const { 
            category, 
            author, 
            tag, 
            sortBy = 'createdAt', 
            order = 'desc',
            limit = 10,
            page = 1
        } = req.query;
        
        let filteredPosts = [...posts]; // Create a copy to avoid mutation
        
        // Apply filters using array methods
        if (category) {
            filteredPosts = filteredPosts.filter(post => 
                post.category.toLowerCase() === category.toLowerCase()
            );
        }
        
        if (author) {
            filteredPosts = filteredPosts.filter(post => 
                post.author.toLowerCase().includes(author.toLowerCase())
            );
        }
        
        if (tag) {
            filteredPosts = filteredPosts.filter(post => 
                post.tags.some(postTag => postTag.toLowerCase().includes(tag.toLowerCase()))
            );
        }
        
        // Sort posts
        filteredPosts.sort((a, b) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];
            
            // Handle different data types
            if (sortBy === 'createdAt') {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            }
            
            if (order === 'desc') {
                return bValue > aValue ? 1 : bValue < aValue ? -1 : 0;
            } else {
                return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
            }
        });
        
        // Implement pagination
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + parseInt(limit);
        const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
        
        // Transform posts for response (remove sensitive data, add computed fields)
        const transformedPosts = paginatedPosts.map(post => ({
            ...post,
            excerpt: post.content.substring(0, 100) + '...',
            tagCount: post.tags.length,
            popularity: post.likes > 20 ? 'High' : post.likes > 10 ? 'Medium' : 'Low'
        }));
        
        res.json({
            success: true,
            data: transformedPosts,
            pagination: {
                total: filteredPosts.length,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(filteredPosts.length / limit)
            },
            filters: { category, author, tag, sortBy, order }
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch posts',
            message: error.message
        });
    }
}

// Route 2: POST /posts/batch - process multiple posts
function createBatchPosts(req, res) {
    try {
        const { posts: newPosts } = req.body;
        
        if (!Array.isArray(newPosts)) {
            return res.status(400).json({
                success: false,
                error: 'Posts must be an array'
            });
        }
        
        // Validate and transform each post
        const processedPosts = newPosts
            .map((post, index) => {
                // Validate required fields
                const requiredFields = ['title', 'content', 'author'];
                const missingFields = requiredFields.filter(field => !post[field]);
                
                if (missingFields.length > 0) {
                    return {
                        index,
                        success: false,
                        error: `Missing required fields: ${missingFields.join(', ')}`
                    };
                }
                
                // Transform and enhance the post
                const processedPost = {
                    id: posts.length + index + 1, // Simple ID generation
                    title: post.title.trim(),
                    content: post.content.trim(),
                    author: post.author.trim(),
                    tags: post.tags ? post.tags.map(tag => tag.toLowerCase().trim()) : [],
                    likes: 0, // New posts start with 0 likes
                    category: post.category || 'Uncategorized',
                    createdAt: new Date().toISOString().split('T')[0], // Today's date
                    wordCount: post.content.split(' ').length,
                    slug: post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
                };
                
                return {
                    index,
                    success: true,
                    post: processedPost
                };
            })
            .filter(result => result.success); // Only keep successful posts
        
        // Add successful posts to our posts array
        const newValidPosts = processedPosts.map(result => result.post);
        posts.push(...newValidPosts);
        
        // Calculate statistics
        const stats = {
            totalSubmitted: newPosts.length,
            successful: processedPosts.length,
            failed: newPosts.length - processedPosts.length,
            averageWordCount: newValidPosts.reduce((sum, post) => sum + post.wordCount, 0) / newValidPosts.length || 0
        };
        
        res.status(201).json({
            success: true,
            message: `Successfully created ${stats.successful} posts`,
            data: newValidPosts,
            statistics: stats
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to create batch posts',
            message: error.message
        });
    }
}

// Route 3: GET /posts/stats - return aggregated statistics
function getPostStats(req, res) {
    try {
        // Calculate comprehensive statistics using array methods
        
        // Basic counts
        const totalPosts = posts.length;
        const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);
        const averageLikes = totalLikes / totalPosts;
        
        // Posts by category
        const postsByCategory = posts.reduce((categories, post) => {
            categories[post.category] = (categories[post.category] || 0) + 1;
            return categories;
        }, {});
        
        // Posts by author with additional stats
        const authorStats = posts.reduce((authors, post) => {
            if (!authors[post.author]) {
                authors[post.author] = {
                    postCount: 0,
                    totalLikes: 0,
                    categories: new Set(),
                    tags: new Set()
                };
            }
            
            authors[post.author].postCount++;
            authors[post.author].totalLikes += post.likes;
            authors[post.author].categories.add(post.category);
            post.tags.forEach(tag => authors[post.author].tags.add(tag));
            
            return authors;
        }, {});
        
        // Convert Sets to arrays and add computed fields
        Object.keys(authorStats).forEach(author => {
            const stats = authorStats[author];
            stats.averageLikes = stats.totalLikes / stats.postCount;
            stats.categories = Array.from(stats.categories);
            stats.tags = Array.from(stats.tags);
            stats.categoriesCount = stats.categories.length;
            stats.tagsCount = stats.tags.length;
        });
        
        // Most popular posts (top 3)
        const mostPopularPosts = posts
            .sort((a, b) => b.likes - a.likes)
            .slice(0, 3)
            .map(post => ({
                id: post.id,
                title: post.title,
                author: post.author,
                likes: post.likes
            }));
        
        // Tag frequency analysis
        const tagFrequency = posts
            .flatMap(post => post.tags) // Flatten all tags into one array
            .reduce((frequency, tag) => {
                frequency[tag] = (frequency[tag] || 0) + 1;
                return frequency;
            }, {});
        
        // Most popular tags (top 5)
        const popularTags = Object.entries(tagFrequency)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([tag, count]) => ({ tag, count }));
        
        // Recent activity (posts from last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const recentPosts = posts.filter(post => {
            return new Date(post.createdAt) >= thirtyDaysAgo;
        });
        
        // Content analysis
        const contentStats = posts.reduce((stats, post) => {
            const wordCount = post.content.split(' ').length;
            stats.totalWords += wordCount;
            stats.minWords = Math.min(stats.minWords, wordCount);
            stats.maxWords = Math.max(stats.maxWords, wordCount);
            return stats;
        }, { totalWords: 0, minWords: Infinity, maxWords: 0 });
        
        contentStats.averageWords = contentStats.totalWords / totalPosts;
        
        res.json({
            success: true,
            statistics: {
                overview: {
                    totalPosts,
                    totalLikes,
                    averageLikes: parseFloat(averageLikes.toFixed(2)),
                    totalAuthors: Object.keys(authorStats).length,
                    totalCategories: Object.keys(postsByCategory).length,
                    uniqueTags: Object.keys(tagFrequency).length
                },
                postsByCategory,
                authorStats,
                mostPopularPosts,
                popularTags,
                recentActivity: {
                    postsLast30Days: recentPosts.length,
                    recentPosts: recentPosts.slice(0, 5).map(post => ({
                        id: post.id,
                        title: post.title,
                        createdAt: post.createdAt
                    }))
                },
                contentAnalysis: {
                    averageWordCount: parseFloat(contentStats.averageWords.toFixed(2)),
                    shortestPost: contentStats.minWords,
                    longestPost: contentStats.maxWords,
                    totalWords: contentStats.totalWords
                }
            },
            generatedAt: new Date().toISOString()
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to generate statistics',
            message: error.message
        });
    }
}

// Route 4: PUT /posts/categories - update categories in bulk
function updateCategoriesBulk(req, res) {
    try {
        const { updates } = req.body;
        
        if (!Array.isArray(updates)) {
            return res.status(400).json({
                success: false,
                error: 'Updates must be an array'
            });
        }
        
        // Process updates with validation
        const results = updates.map(update => {
            const { postId, newCategory } = update;
            
            // Validate update data
            if (!postId || !newCategory) {
                return {
                    postId,
                    success: false,
                    error: 'Missing postId or newCategory'
                };
            }
            
            // Find the post
            const postIndex = posts.findIndex(post => post.id === postId);
            
            if (postIndex === -1) {
                return {
                    postId,
                    success: false,
                    error: 'Post not found'
                };
            }
            
            // Store old category for logging
            const oldCategory = posts[postIndex].category;
            
            // Update the category
            posts[postIndex].category = newCategory.trim();
            posts[postIndex].updatedAt = new Date().toISOString().split('T')[0];
            
            return {
                postId,
                success: true,
                oldCategory,
                newCategory: newCategory.trim(),
                postTitle: posts[postIndex].title
            };
        });
        
        // Separate successful and failed updates
        const successful = results.filter(result => result.success);
        const failed = results.filter(result => !result.success);
        
        // Generate summary statistics
        const categoryChanges = successful.reduce((changes, result) => {
            const changeKey = `${result.oldCategory} → ${result.newCategory}`;
            changes[changeKey] = (changes[changeKey] || 0) + 1;
            return changes;
        }, {});
        
        res.json({
            success: true,
            message: `Successfully updated ${successful.length} posts`,
            results: {
                successful: successful.length,
                failed: failed.length,
                totalRequested: updates.length
            },
            updates: successful,
            failures: failed,
            categoryChanges,
            updatedAt: new Date().toISOString()
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to update categories',
            message: error.message
        });
    }
}


// Express.js setup example (commented out since we can't run a real server)
/*
const express = require('express');
const app = express();

app.use(express.json());

// Register routes
app.get('/posts', getPosts);
app.post('/posts/batch', createBatchPosts);
app.get('/posts/stats', getPostStats);
app.put('/posts/categories', updateCategoriesBulk);

app.listen(3000, () => {
    console.log('Blog API server running on port 3000');
});
*/
```
## DAY 9: PERFORMANCE & BEST PRACTICES

```js
// Exercise 9.1: Performance Optimization
console.log("\n=== Exercise 9.1: Performance Optimization ===");

// Generate large dataset for testing
function generateLargeDataset(size) {
    const categories = ['Electronics', 'Clothing', 'Books', 'Sports', 'Home'];
    const brands = ['Brand A', 'Brand B', 'Brand C', 'Brand D', 'Brand E'];
    
    return Array.from({ length: size }, (_, i) => ({
        id: i + 1,
        name: `Product ${i + 1}`,
        category: categories[i % categories.length],
        brand: brands[i % brands.length],
        price: Math.floor(Math.random() * 1000) + 10,
        rating: Math.floor(Math.random() * 5) + 1,
        sales: Math.floor(Math.random() * 100),
        inStock: Math.random() > 0.2
    }));
}

// PROBLEM: Inefficient O(n²) implementation
function findFrequentItemsInefficient(data) {
    console.time('Inefficient Method');
    
    const result = [];
    
    // O(n²) - nested loops are expensive
    for (let i = 0; i < data.length; i++) {
        let count = 0;
        for (let j = 0; j < data.length; j++) {
            if (data[i].category === data[j].category) {
                count++;
            }
        }
        
        // Check if this category is already in results (another O(n) operation!)
        const existing = result.find(item => item.category === data[i].category);
        if (!existing) {
            result.push({
                category: data[i].category,
                count: count,
                percentage: (count / data.length) * 100
            });
        }
    }
    
    console.timeEnd('Inefficient Method');
    return result.sort((a, b) => b.count - a.count);
}

// SOLUTION: Optimized O(n) implementation
function findFrequentItemsOptimized(data) {
    console.time('Optimized Method');
    
    // Single pass through data - O(n)
    const categoryCount = data.reduce((counts, item) => {
        counts[item.category] = (counts[item.category] || 0) + 1;
        return counts;
    }, {});
    
    // Convert to array and add percentage - O(k) where k is number of unique categories
    const result = Object.entries(categoryCount)
        .map(([category, count]) => ({
            category,
            count,
            percentage: (count / data.length) * 100
        }))
        .sort((a, b) => b.count - a.count);
    
    console.timeEnd('Optimized Method');
    return result;
}

// PROBLEM: Multiple array iterations
function processUserPreferencesInefficient(users, preferences) {
    console.time('Multiple Iterations');
    
    // Multiple passes through the data
    const activeUsers = users.filter(user => user.isActive);
    const userPrefs = activeUsers.map(user => {
        const prefs = preferences.filter(pref => pref.userId === user.id);
        return { ...user, preferences: prefs };
    });
    const categorizedUsers = userPrefs.map(user => {
        const categories = user.preferences.map(pref => pref.category);
        return { ...user, categories: [...new Set(categories)] };
    });
    const finalUsers = categorizedUsers.filter(user => user.categories.length > 0);
    
    console.timeEnd('Multiple Iterations');
    return finalUsers;
}

// SOLUTION: Single-pass optimized version
function processUserPreferencesOptimized(users, preferences) {
    console.time('Single Pass');
    
    // Create a lookup map for preferences - O(m) where m is preferences length
    const preferenceLookup = preferences.reduce((lookup, pref) => {
        if (!lookup[pref.userId]) {
            lookup[pref.userId] = [];
        }
        lookup[pref.userId].push(pref);
        return lookup;
    }, {});
    
    // Single pass through users - O(n)
    const result = users.reduce((processed, user) => {
        // Skip inactive users early
        if (!user.isActive) return processed;
        
        // Get user preferences from lookup (O(1) access)
        const userPrefs = preferenceLookup[user.id] || [];
        
        // Skip users with no preferences
        if (userPrefs.length === 0) return processed;
        
        // Extract unique categories efficiently
        const categories = [...new Set(userPrefs.map(pref => pref.category))];
        
        processed.push({
            ...user,
            preferences: userPrefs,
            categories,
            preferenceCount: userPrefs.length,
            categoryCount: categories.length
        });
        
        return processed;
    }, []);
    
    console.timeEnd('Single Pass');
    return result;
}

// Performance comparison function
function comparePerformance() {
    console.log("Performance Comparison with 10,000 items:");
    
    const largeDataset = generateLargeDataset(10000);
    
    // Test frequent items functions
    console.log("\n--- Finding Frequent Categories ---");
    const inefficientResult = findFrequentItemsInefficient(largeDataset.slice(0, 1000)); // Smaller set for demo
    const optimizedResult = findFrequentItemsOptimized(largeDataset);
    
    console.log("Results match:", JSON.stringify(inefficientResult.slice(0, 3)) === JSON.stringify(optimizedResult.slice(0, 3)));
    
    // Test user preferences functions
    console.log("\n--- Processing User Preferences ---");
    const users = Array.from({ length: 1000 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        isActive: Math.random() > 0.3
    }));
    
    const preferences = Array.from({ length: 5000 }, (_, i) => ({
        id: i + 1,
        userId: Math.floor(Math.random() * 1000) + 1,
        category: ['Tech', 'Sports', 'Music', 'Travel', 'Food'][i % 5],
        value: Math.random()
    }));
    
    const inefficientUserResult = processUserPreferencesInefficient(users.slice(0, 100), preferences.slice(0, 500));
    const optimizedUserResult = processUserPreferencesOptimized(users, preferences);
    
    console.log(`Inefficient result count: ${inefficientUserResult.length}`);
    console.log(`Optimized result count: ${optimizedUserResult.length}`);
}

// Advanced optimization techniques
console.log("\n--- Advanced Optimization Techniques ---");

// Technique 1: Early termination
function findFirstMatch(data, condition) {
    // Use find() instead of filter() when you only need the first match
    return data.find(condition); // Stops at first match
    // vs data.filter(condition)[0]; // Checks all items
}

// Technique 2: Memoization for expensive calculations
function createMemoizedCalculator() {
    const cache = new Map();
    
    return function expensiveCalculation(input) {
        // Check cache first
        if (cache.has(input)) {
            return cache.get(input);
        }
        
        // Simulate expensive calculation
        const result = input.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
        
        // Store in cache
        cache.set(input, result);
        return result;
    };
}

// Technique 3: Batch processing for large datasets
function processBatchData(largeArray, batchSize = 1000) {
    const results = [];
    
    for (let i = 0; i < largeArray.length; i += batchSize) {
        const batch = largeArray.slice(i, i + batchSize);
        
        // Process batch
        const batchResult = batch
            .filter(item => item.isValid)
            .map(item => ({ ...item, processed: true }));
            
        results.push(...batchResult);
        
        // Optional: Add delay to prevent blocking
        // In real applications, you might use setTimeout or process.nextTick
    }
    
    return results;
}

// Technique 4: Using appropriate data structures
function createIndexedSearch(data) {
    // Create indexes for fast lookups
    const categoryIndex = data.reduce((index, item) => {
        if (!index[item.category]) {
            index[item.category] = [];
        }
        index[item.category].push(item);
        return index;
    }, {});
    
    const priceIndex = data.reduce((index, item) => {
        const priceRange = Math.floor(item.price / 100) * 100; // Group by $100 ranges
        if (!index[priceRange]) {
            index[priceRange] = [];
        }
        index[priceRange].push(item);
        return index;
    }, {});
    
    return {
        findByCategory: (category) => categoryIndex[category] || [],
        findByPriceRange: (min, max) => {
            const results = [];
            for (let range = Math.floor(min / 100) * 100; range <= max; range += 100) {
                if (priceIndex[range]) {
                    results.push(...priceIndex[range].filter(item => item.price >= min && item.price <= max));
                }
            }
            return results;
        }
    };
}
```
## DAY 10: FINAL PROJECT COMPONENTS

```js
console.log("\n=== Final Project: Task Management API Components ===");

// Mock data for the task management system
let tasks = [
    { id: 1, title: "Setup project", description: "Initialize the task management system", status: "completed", priority: "high", assignee: "Alice", dueDate: "2024-01-15", tags: ["setup", "urgent"] },
    { id: 2, title: "Design database", description: "Create database schema", status: "in-progress", priority: "medium", assignee: "Bob", dueDate: "2024-01-20", tags: ["database", "design"] },
    { id: 3, title: "Implement API", description: "Build REST API endpoints", status: "pending", priority: "high", assignee: "Charlie", dueDate: "2024-01-25", tags: ["api", "backend"] }
];

let users = [
    { id: 1, name: "Alice Johnson", email: "alice@company.com", role: "admin", isActive: true },
    { id: 2, name: "Bob Smith", email: "bob@company.com", role: "developer", isActive: true },
    { id: 3, name: "Charlie Brown", email: "charlie@company.com", role: "developer", isActive: false }
];

// Core data processing utilities
const TaskProcessor = {
    // Filter tasks by multiple criteria
    filterTasks: (tasks, filters = {}) => {
        return tasks.filter(task => {
            // Apply each filter condition
            if (filters.status && task.status !== filters.status) return false;
            if (filters.priority && task.priority !== filters.priority) return false;
            if (filters.assignee && task.assignee !== filters.assignee) return false;
            if (filters.tag && !task.tags.some(tag => tag.includes(filters.tag))) return false;
            
            // Date range filtering
            if (filters.dueBefore && new Date(task.dueDate) > new Date(filters.dueBefore)) return false;
            if (filters.dueAfter && new Date(task.dueDate) < new Date(filters.dueAfter)) return false;
            
            return true;
        });
    },
    
    // Sort tasks by various criteria
    sortTasks: (tasks, sortBy = 'dueDate', order = 'asc') => {
        return [...tasks].sort((a, b) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];
            
            // Handle different data types
            if (sortBy === 'dueDate') {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            } else if (sortBy === 'priority') {
                const priorityOrder = { 'low': 1, 'medium': 2, 'high': 3 };
                aValue = priorityOrder[aValue];
                bValue = priorityOrder[bValue];
            }
            
            const comparison = aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
            return order === 'desc' ? -comparison : comparison;
        });
    },
    
    // Group tasks by specified field
    groupTasks: (tasks, groupBy) => {
        return tasks.reduce((groups, task) => {
            const key = task[groupBy] || 'unassigned';
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(task);
            return groups;
        }, {});
    },
    
    // Calculate task statistics
    calculateStats: (tasks) => {
        const stats = tasks.reduce((acc, task) => {
            // Count by status
            acc.statusCounts[task.status] = (acc.statusCounts[task.status] || 0) + 1;
            
            // Count by priority
            acc.priorityCounts[task.priority] = (acc.priorityCounts[task.priority] || 0) + 1;
            
            // Count by assignee
            acc.assigneeCounts[task.assignee] = (acc.assigneeCounts[task.assignee] || 0) + 1;
            
            // Track overdue tasks
            if (new Date(task.dueDate) < new Date() && task.status !== 'completed') {
                acc.overdueTasks.push(task);
            }
            
            return acc;
        }, {
            statusCounts: {},
            priorityCounts: {},
            assigneeCounts: {},
            overdueTasks: []
        });
        
        // Calculate additional metrics
        stats.totalTasks = tasks.length;
        stats.completionRate = (stats.statusCounts.completed || 0) / tasks.length * 100;
        stats.overdueCount = stats.overdueTasks.length;
        stats.overdueRate = stats.overdueCount / tasks.length * 100;
        
        return stats;
    },
    
    // Transform tasks for different views
    transformTasks: (tasks, viewType = 'summary') => {
        return tasks.map(task => {
            const base = {
                id: task.id,
                title: task.title,
                status: task.status,
                priority: task.priority,
                assignee: task.assignee,
                dueDate: task.dueDate
            };
            
            switch (viewType) {
                case 'summary':
                    return {
                        ...base,
                        isOverdue: new Date(task.dueDate) < new Date() && task.status !== 'completed',
                        daysTillDue: Math.ceil((new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24))
                    };
                    
                case 'detailed':
                    return {
                        ...task,
                        isOverdue: new Date(task.dueDate) < new Date() && task.status !== 'completed',
                        daysTillDue: Math.ceil((new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24)),
                        tagCount: task.tags.length,
                        urgencyScore: this.calculateUrgencyScore(task)
                    };
                    
                default:
                    return base;
            }
        });
    },
    
    // Calculate urgency score based on priority and due date
    calculateUrgencyScore: (task) => {
        const priorityScores = { 'low': 1, 'medium': 2, 'high': 3 };
        const priorityScore = priorityScores[task.priority] || 1;
        
        const daysUntilDue = Math.ceil((new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
        const dateScore = daysUntilDue <= 1 ? 3 : daysUntilDue <= 3 ? 2 : 1;
        
        return priorityScore * dateScore;
    }
};

// Example usage of the TaskProcessor
console.log("Task Management System Examples:");

// Example 1: Filter and sort tasks
const highPriorityTasks = TaskProcessor.filterTasks(tasks, { priority: 'high' });
const sortedTasks = TaskProcessor.sortTasks(highPriorityTasks, 'dueDate', 'asc');
console.log("High priority tasks sorted by due date:", sortedTasks);

// Example 2: Group tasks by assignee
const tasksByAssignee = TaskProcessor.groupTasks(tasks, 'assignee');
console.log("Tasks grouped by assignee:", tasksByAssignee);

// Example 3: Calculate statistics
const taskStats = TaskProcessor.calculateStats(tasks);
console.log("Task statistics:", taskStats);

// Example 4: Transform tasks for summary view
const summaryTasks = TaskProcessor.transformTasks(tasks, 'summary');
console.log("Task summary view:", summaryTasks);

// Advanced reporting functions
const ReportGenerator = {
    // Generate productivity report by user
    generateProductivityReport: (tasks, users) => {
        const userProductivity = users.map(user => {
            const userTasks = tasks.filter(task => task.assignee === user.name);
            const completedTasks = userTasks.filter(task => task.status === 'completed');
            const overdueTasks = userTasks.filter(task => 
                new Date(task.dueDate) < new Date() && task.status !== 'completed'
            );
            
            return {
                user: user.name,
                email: user.email,
                role: user.role,
                totalTasks: userTasks.length,
                completedTasks: completedTasks.length,
                overdueTasks: overdueTasks.length,
                completionRate: userTasks.length > 0 ? (completedTasks.length / userTasks.length * 100).toFixed(2) : 0,
                averageUrgency: userTasks.length > 0 ? 
                    (userTasks.reduce((sum, task) => sum + TaskProcessor.calculateUrgencyScore(task), 0) / userTasks.length).toFixed(2) : 0
            };
        });
        
        return userProductivity.sort((a, b) => b.completionRate - a.completionRate);
    },
    
    // Generate weekly summary
    generateWeeklySummary: (tasks) => {
        const today = new Date();
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        
        const thisWeekTasks = tasks.filter(task => 
            new Date(task.dueDate) >= weekAgo && new Date(task.dueDate) <= today
        );
        
        const summary = TaskProcessor.calculateStats(thisWeekTasks);
        
        return {
            period: {
                start: weekAgo.toISOString().split('T')[0],
                end: today.toISOString().split('T')[0]
            },
            ...summary,
            tasksDueThisWeek: thisWeekTasks.length,
            completedThisWeek: thisWeekTasks.filter(task => task.status === 'completed').length
        };
    }
};

// Example reports
console.log("\nProductivity Report:");
const productivityReport = ReportGenerator.generateProductivityReport(tasks, users);
console.log(productivityReport);

console.log("\nWeekly Summary:");
const weeklySummary = ReportGenerator.generateWeeklySummary(tasks);
console.log(weeklySummary);

// Run performance comparison
console.log("\n" + "=".repeat(50));
console.log("PERFORMANCE COMPARISON DEMO");
console.log("=".repeat(50));
comparePerformance();

console.log("\n" + "=".repeat(50));
console.log("EXERCISE SOLUTIONS COMPLETE!");
console.log("=".repeat(50));
```

# PROMPT: js color 
Here's the CSS matching VS Code Dark+ theme colors for those highlight.js classes:

```css
pre code {
    display: block;
    background: #1e1e1e;
    color: #d4d4d4;
    padding: 1rem;
    font-family: 'Consolas', 'Courier New', monospace;
    font-size: 0.9rem;
    line-height: 1.6;
    overflow-x: auto;
}

.hljs-comment                { color: #6a9955; font-style: italic; }
.hljs-keyword                { color: #569cd6; }
.hljs-literal                { color: #569cd6; }  /* true, false, null */
.hljs-string                 { color: #ce9178; }
.hljs-subst                  { color: #9cdcfe; }  /* ${...} inside template literals */
.hljs-number                 { color: #b5cea8; }
.hljs-variable.language_     { color: #9cdcfe; }  /* console, document, window */
.hljs-title.function_        { color: #dcdcaa; }  /* function calls */
.hljs-title.class_           { color: #4ec9b0; }  /* Date, Map, etc. */
.hljs-params                 { color: #9cdcfe; }
.hljs-attr                   { color: #9cdcfe; }  /* object keys */
.hljs-property               { color: #9cdcfe; }  /* obj.property */
.hljs-function               { color: #d4d4d4; }
```

Key color mapping:
- **Blue** `#569cd6` → `const`, `let`, `function`, `true/false`
- **Yellow** `#dcdcaa` → function names at call site
- **Orange** `#ce9178` → strings
- **Light blue** `#9cdcfe` → `console`, params, properties, object keys
- **Teal** `#4ec9b0` → class names (`Date`)
- **Light green** `#b5cea8` → numbers
- **Green** `#6a9955` → comments