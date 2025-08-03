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
## READ/WATCH/EXPLORE
1. Read Section 1: Getting Started with MERN from Full-Stack React Projects by Shama Hoque, pages 9-26
1. Read Welcome to Node.js chapter 1 from Node.js In Action by Young, Meck, and Catelon, page 3-10
1. Read What is a Node web application, page 50-56 from Node.js In Action
1. Read section Using Web Protocols from Node Cookbook by Bethany Griggs, page 82-99
1. Read Exploring Nodejs web Frameworks, chapter 6 from Node Cookbook, chapter 6, page 154-169

## COMPLETE
1. npm install knock-knock-jokes, cat-me, faker-js modules.
1. Install your first express server from scratch
1. Install the chrome extension httRedirect
1. Install or paste node_modules folder for the app mern-social found in chapter 05 in Full-Stack React Projects source code

## REVIEW
1. From Node.js In Action: 
    1. Building RESTful web services, page 54
    1. What is a framework? page 83
    1. Example of RESTfull routes, page 121
1. From Full-Stack React Project review:
    1. MERN stack, page 14
    1. Social media platform, page 20