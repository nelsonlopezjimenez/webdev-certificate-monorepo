# 2-Week JavaScript & NPM Curriculum for MERN Stack

## Week 1: JavaScript Fundamentals & NPM Basics

### Day 1: JavaScript Review & Modern ES6+ Features
**Learning Objectives:**
- Understand modern JavaScript syntax essential for Node.js
- Master destructuring, arrow functions, and template literals
- Work with let/const vs var

**Content:**
- Arrow functions vs regular functions
- Destructuring objects and arrays
- Template literals and string interpolation
- Spread operator (...) and rest parameters
- Default parameters

**Exercises:**

**Exercise 1.1: Modern Syntax Conversion**
```javascript
// Convert this traditional function to modern ES6+ syntax
function getUserInfo(user) {
    var name = user.name;
    var email = user.email;
    var age = user.age || 18;
    return "User: " + name + " (" + email + ") - Age: " + age;
}

// Your ES6+ version here
```

**Exercise 1.2: Destructuring Practice**
```javascript
const company = {
    name: "TechCorp",
    location: {
        city: "San Francisco",
        state: "CA"
    },
    employees: ["Alice", "Bob", "Charlie"]
};

// Extract name, city, and first employee using destructuring
// Also provide default values where appropriate
```

### Day 2: Introduction to NPM & Package Management
**Learning Objectives:**
- Understand what NPM is and why it's essential
- Initialize projects with package.json
- Install and manage dependencies

**Content:**
- What is NPM and the Node ecosystem
- package.json structure and importance
- Dependencies vs devDependencies
- NPM scripts basics
- Semantic versioning (semver)

**Hands-on Lab:**
1. Initialize a new project: `npm init`
2. Install packages: `npm install express`
3. Install dev dependencies: `npm install --save-dev nodemon`
4. Explore node_modules and package-lock.json
5. Create basic npm scripts

**Exercise 2.1: Package Management**
Create a simple Node.js project that:
- Has a proper package.json with metadata
- Installs express, cors, and dotenv as dependencies
- Installs nodemon as a dev dependency
- Creates scripts for "start", "dev", and "test"

### Day 3: Working with External Libraries
**Learning Objectives:**
- Import and use NPM packages in Node.js
- Understand CommonJS vs ES6 modules
- Work with popular utility libraries

**Content:**
- require() vs import/export
- Using popular packages: lodash, moment/dayjs, axios
- Reading package documentation
- Version management and updates

**Exercise 3.1: Library Integration**
```javascript
// Create a simple weather app that:
// 1. Uses axios to fetch data from a weather API
// 2. Uses dayjs to format dates
// 3. Uses lodash to manipulate the response data
// 4. Exports functions using ES6 modules
```

### Day 4: Array Methods Fundamentals
**Learning Objectives:**
- Master map(), filter(), and basic array iteration
- Understand when to use each method
- Practice chaining methods

**Content:**
- Array.prototype.map() - transforming data
- Array.prototype.filter() - selecting data
- Method chaining concepts
- Immutability principles

**Exercise 4.1: E-commerce Data Processing**
```javascript
const products = [
    { id: 1, name: "Laptop", price: 999, category: "Electronics", inStock: true },
    { id: 2, name: "Shirt", price: 29, category: "Clothing", inStock: false },
    { id: 3, name: "Phone", price: 699, category: "Electronics", inStock: true },
    { id: 4, name: "Jeans", price: 79, category: "Clothing", inStock: true }
];

// Tasks:
// 1. Get all product names
// 2. Get products under $100
// 3. Get in-stock electronics
// 4. Create discounted prices (20% off) for in-stock items
```

**Exercise 4.2: User Data Transformation**
```javascript
const users = [
    { firstName: "John", lastName: "Doe", age: 28, city: "New York" },
    { firstName: "Jane", lastName: "Smith", age: 34, city: "Los Angeles" },
    { firstName: "Bob", lastName: "Johnson", age: 22, city: "Chicago" }
];

// Create functions that:
// 1. Return full names
// 2. Filter users by minimum age
// 3. Group users by city
// 4. Create user profile summaries
```

### Day 5: Advanced Array Methods & Project Setup
**Learning Objectives:**
- Master reduce() for complex data aggregation
- Understand sort() and custom sorting
- Set up a complete Node.js project structure

**Content:**
- Array.prototype.reduce() - aggregating data
- Array.prototype.sort() - ordering data
- Custom comparator functions
- Project structure best practices

**Exercise 5.1: Data Analytics with Reduce**
```javascript
const sales = [
    { product: "Laptop", amount: 999, date: "2024-01-15", salesperson: "Alice" },
    { product: "Phone", amount: 699, date: "2024-01-16", salesperson: "Bob" },
    { product: "Laptop", amount: 999, date: "2024-01-17", salesperson: "Alice" },
    { product: "Tablet", amount: 399, date: "2024-01-18", salesperson: "Charlie" }
];

// Use reduce to calculate:
// 1. Total sales amount
// 2. Sales by product
// 3. Sales by salesperson
// 4. Average sale amount
```

**Project: Simple Inventory Manager**
Create a Node.js application that:
- Uses external packages (inquirer for CLI, fs for file operations)
- Manages product inventory with array methods
- Implements search, filter, and sort functionality

## Week 2: Advanced Concepts & Real-World Applications

### Day 6: Complex Array Method Combinations
**Learning Objectives:**
- Chain multiple array methods effectively
- Handle nested data structures
- Optimize for performance

**Content:**
- Advanced method chaining patterns
- Working with nested arrays and objects
- Performance considerations
- Debugging complex chains

**Exercise 6.1: Restaurant Order System**
```javascript
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
    }
];

// Tasks using method chaining:
// 1. Get all completed orders with total amounts
// 2. Find the most popular menu category
// 3. Calculate revenue by customer
// 4. Get average order value for completed orders
```

### Day 7: Error Handling & Package Security
**Learning Objectives:**
- Implement proper error handling with array methods
- Understand NPM security basics
- Handle async operations with arrays

**Content:**
- Try-catch with array operations
- NPM audit and security
- Working with async/await in array contexts
- Promise.all() with array data

**Exercise 7.1: Async Data Processing**
```javascript
// Create functions that:
// 1. Fetch user data from multiple APIs concurrently
// 2. Process the data with array methods
// 3. Handle errors gracefully
// 4. Return formatted results

const userIds = [1, 2, 3, 4, 5];
// Implement fetchUserProfiles(userIds) that processes all users
```

### Day 8: Real-World MERN Integration
**Learning Objectives:**
- Apply array methods in Express.js routes
- Process request data efficiently
- Prepare data for MongoDB operations

**Content:**
- Express.js route handlers with array processing
- Request body validation and transformation
- Preparing data for database operations
- Response formatting

**Exercise 8.1: Blog API Routes**
```javascript
// Create Express routes that:
// 1. GET /posts - return filtered and sorted posts
// 2. POST /posts/batch - process multiple posts
// 3. GET /posts/stats - return aggregated statistics
// 4. PUT /posts/categories - update categories in bulk

const posts = [
    { title: "JS Basics", content: "...", tags: ["javascript", "tutorial"], likes: 15 },
    { title: "React Tips", content: "...", tags: ["react", "frontend"], likes: 23 },
    // ... more posts
];
```

### Day 9: Performance & Best Practices
**Learning Objectives:**
- Optimize array operations for large datasets
- Understand time complexity
- Implement efficient algorithms

**Content:**
- Big O notation for array methods
- When to use for loops vs array methods
- Memory management considerations
- Benchmarking and profiling

**Exercise 9.1: Performance Optimization**
```javascript
// Given a large dataset (10,000+ items), optimize these operations:
const largeDataset = generateLargeDataset(10000);

// Optimize these functions for better performance:
function findFrequentItems(data) {
    // Current: O(n²) implementation
    // Your optimized version here
}

function processUserPreferences(users, preferences) {
    // Current: Multiple array iterations
    // Your single-pass version here
}
```

### Day 10: Final Project & Assessment
**Learning Objectives:**
- Integrate all learned concepts
- Build a complete application
- Demonstrate mastery of JavaScript and NPM

**Final Project: Task Management API**
Build a complete Node.js application that:

**Requirements:**
1. **Project Setup:**
   - Proper package.json with all dependencies
   - Environment configuration with dotenv
   - NPM scripts for development and production

2. **Core Features:**
   - Task CRUD operations using array methods
   - User management with data transformation
   - Statistics and reporting endpoints
   - Data export/import functionality

3. **Technical Requirements:**
   - Use at least 5 different NPM packages
   - Implement all major array methods (map, filter, reduce, sort)
   - Error handling and input validation
   - Proper ES6+ syntax throughout

**Project Structure:**
```
task-manager/
├── package.json
├── server.js
├── routes/
│   ├── tasks.js
│   ├── users.js
│   └── stats.js
├── utils/
│   ├── dataProcessing.js
│   └── validators.js
├── data/
│   └── mockData.js
└── tests/ (bonus)
    └── arrayMethods.test.js
```

**Assessment Criteria:**
- Correct use of NPM and package management (20%)
- Proper implementation of array methods (30%)
- Code quality and ES6+ syntax (25%)
- Error handling and edge cases (15%)
- Project structure and documentation (10%)

## Additional Resources

### Recommended NPM Packages to Explore:
- **Utilities:** lodash, ramda, moment/dayjs
- **HTTP:** axios, node-fetch
- **Validation:** joi, express-validator
- **CLI:** inquirer, commander
- **Testing:** jest, mocha
- **Development:** nodemon, concurrently

### Practice Datasets:
- E-commerce products and orders
- Social media posts and users
- Financial transactions
- Weather data
- Movie/book databases

### Bonus Challenges:
1. Implement custom array methods (myMap, myFilter, myReduce)
2. Create a package and publish to NPM
3. Build a CLI tool using array processing
4. Performance benchmark different approaches
5. Add TypeScript for better type safety

## Assessment Methods:
- Daily coding exercises (40%)
- Mid-week practical exam (30%)
- Final project (30%)

## Common Pitfalls to Address:
- Mutating original arrays vs immutability
- Confusing map() and forEach()
- Not understanding return values of array methods
- Improper error handling in chains
- Package version conflicts and security issues