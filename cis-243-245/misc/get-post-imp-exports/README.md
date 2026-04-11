# Week 6

## Goals
1. GET vs POST
1. Import/export syntax

## GET vs POST Requests

### GET Requests
GET requests are used to **retrieve data** from a server. They're like asking a question - you want information back without changing anything on the server.

**Key characteristics:**
- Data is sent in the URL as query parameters
- Visible in browser history and server logs
- Can be bookmarked and cached
- Limited data size (usually ~2048 characters)
- Should be idempotent (safe to repeat)

**Example:**
```javascript
// Fetching user data
fetch('https://api.example.com/users/123')
  .then(response => response.json())
  .then(data => console.log(data));

// With query parameters
fetch('https://api.example.com/search?q=javascript&limit=10')
  .then(response => response.json())
  .then(results => console.log(results));
```

### POST Requests
POST requests are used to **send data** to a server, typically to create or update resources. Think of it like submitting a form or uploading a file.

**Key characteristics:**
- Data is sent in the request body (not visible in URL)
- Not cached by default
- No size limitations (within reason)
- Can modify server state
- Not idempotent (repeating may have different effects)

**Example:**
```javascript
// Creating a new user
fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    age: 30
  })
})
  .then(response => response.json())
  .then(data => console.log('User created:', data));
```

## ES6 Import/Export Syntax

### Named Exports
Use named exports when you want to export multiple things from a module.

**mathUtils.js:**
```javascript
// Named exports
export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

export const multiply = (a, b) => a * b;

// Or export all at once
function subtract(a, b) {
  return a - b;
}

function divide(a, b) {
  return a / b;
}

export { subtract, divide };
```

**Importing named exports:**
```javascript
// Import specific functions
import { add, multiply, PI } from './mathUtils.js';

console.log(add(5, 3)); // 8
console.log(multiply(4, PI)); // 12.56636

// Import with alias
import { subtract as sub } from './mathUtils.js';
console.log(sub(10, 4)); // 6

// Import everything
import * as math from './mathUtils.js';
console.log(math.add(2, 3)); // 5
```

### Default Exports
Use default export when your module has one main thing to export.

**Calculator.js:**
```javascript
// Default export (one per module)
class Calculator {
  add(a, b) {
    return a + b;
  }
  
  subtract(a, b) {
    return a - b;
  }
}

export default Calculator;

// Or inline
export default class Calculator {
  multiply(a, b) {
    return a * b;
  }
}
```

**Importing default exports:**
```javascript
// You can name it whatever you want
import Calculator from './Calculator.js';
import Calc from './Calculator.js'; // Same thing, different name

const calc = new Calculator();
console.log(calc.add(5, 3)); // 8
```

### Mixed Exports
You can combine default and named exports in the same module.

**api.js:**
```javascript
// Named exports
export const API_URL = 'https://api.example.com';
export const timeout = 5000;

// Default export
export default class ApiClient {
  constructor(baseUrl = API_URL) {
    this.baseUrl = baseUrl;
  }
  
  async get(endpoint) {
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    return response.json();
  }
  
  async post(endpoint, data) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  }
}
```

**Importing mixed exports:**
```javascript
// Import both default and named exports
import ApiClient, { API_URL, timeout } from './api.js';

const client = new ApiClient();
console.log(`Using API: ${API_URL} with ${timeout}ms timeout`);

// Use the client for GET and POST requests
client.get('/users/123')
  .then(user => console.log(user));

client.post('/users', { name: 'Jane', email: 'jane@example.com' })
  .then(result => console.log('User created:', result));
```

The key difference is that GET retrieves data while POST sends data, and with ES6 modules, you can organize your code into reusable pieces using named exports for multiple utilities and default exports for main classes or functions.

## Prompt
Refactor the fetch examples into async/await syntax

## Result

## GET vs POST Requests with Async/Await

### GET Requests with Async/Await

**Basic GET request:**
```javascript
async function fetchUser(userId) {
  try {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching user:', error);
  }
}

// Usage
fetchUser(123);
```

**GET with query parameters:**
```javascript
async function searchData(query, limit = 10) {
  try {
    const response = await fetch(`https://api.example.com/search?q=${query}&limit=${limit}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const results = await response.json();
    console.log(results);
    return results;
  } catch (error) {
    console.error('Search failed:', error);
  }
}

// Usage
await searchData('javascript', 20);
```

### POST Requests with Async/Await

**Creating a new resource:**
```javascript
async function createUser(userData) {
  try {
    const response = await fetch('https://api.example.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create user: ${response.status}`);
    }
    
    const newUser = await response.json();
    console.log('User created:', newUser);
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

// Usage
const userData = {
  name: 'John Doe',
  email: 'john@example.com',
  age: 30
};

await createUser(userData);
```

**Form submission example:**
```javascript
async function submitForm(formData) {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    const result = await response.json();
    
    if (response.ok) {
      console.log('Form submitted successfully:', result);
    } else {
      console.error('Form submission failed:', result.message);
    }
    
    return result;
  } catch (error) {
    console.error('Network error:', error);
  }
}

// Usage
const formData = {
  name: 'Jane Smith',
  email: 'jane@example.com',
  message: 'Hello from the contact form!'
};

await submitForm(formData);
```

## Updated API Client Example with Async/Await

**api.js (refactored):**
```javascript
// Named exports
export const API_URL = 'https://api.example.com';
export const timeout = 5000;

// Default export with async/await
export default class ApiClient {
  constructor(baseUrl = API_URL) {
    this.baseUrl = baseUrl;
  }
  
  async get(endpoint) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`);
      
      if (!response.ok) {
        throw new Error(`GET request failed: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('GET error:', error);
      throw error;
    }
  }
  
  async post(endpoint, data) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error(`POST request failed: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('POST error:', error);
      throw error;
    }
  }
  
  async put(endpoint, data) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error(`PUT request failed: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('PUT error:', error);
      throw error;
    }
  }
  
  async delete(endpoint) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error(`DELETE request failed: ${response.status}`);
      }
      
      return response.status === 204 ? null : await response.json();
    } catch (error) {
      console.error('DELETE error:', error);
      throw error;
    }
  }
}
```

**Using the refactored API client:**
```javascript
import ApiClient, { API_URL, timeout } from './api.js';

async function demonstrateApiUsage() {
  const client = new ApiClient();
  console.log(`Using API: ${API_URL} with ${timeout}ms timeout`);
  
  try {
    // GET request
    const user = await client.get('/users/123');
    console.log('Fetched user:', user);
    
    // POST request
    const newUser = await client.post('/users', { 
      name: 'Jane', 
      email: 'jane@example.com' 
    });
    console.log('User created:', newUser);
    
    // PUT request
    const updatedUser = await client.put('/users/123', { 
      name: 'Jane Doe', 
      email: 'jane.doe@example.com' 
    });
    console.log('User updated:', updatedUser);
    
    // DELETE request
    await client.delete('/users/123');
    console.log('User deleted successfully');
    
  } catch (error) {
    console.error('API operation failed:', error.message);
  }
}

// Usage
demonstrateApiUsage();
```

The async/await syntax makes the code much more readable and easier to follow compared to Promise chains. It also makes error handling more straightforward with try/catch blocks, and you can handle both network errors and HTTP status errors in a clean way.