# Week 30.4

## 7/28 to 8/1

## Week 30.4 Focus:
1. Modern JavaScript syntax essential for server-side development
1. NPM ecosystem and package management
1. Core array methods (map, filter, reduce, sort) with practical exercises

### Day 1 Monday: JavaScript Review & Modern ES6+ Features
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

**Lab4.1: Modern Syntax Conversion**
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

**Lab4.2: Destructuring Practice**
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