# Express & MongoDB Backend Course

## Express Fundamentals & CRUD Operations

### Day 1-2: Setting Up Express & First GET Route

Let's start with the absolute basics. First, initialize your project:

```bash
npm init -y
npm install express
```

**server.js - Your first Express server:**
```javascript
import express from 'express';

const app = express();
const PORT = 3000;

// Hard-coded todo data to start with
const todos = [
  { id: 1, text: 'Learn Express', completed: false },
  { id: 2, text: 'Build a REST API', completed: false },
  { id: 3, text: 'Connect to MongoDB', completed: true }
];

// GET route to fetch all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// GET route to fetch a single todo by ID
app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  res.json(todo);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

Don't forget to add `"type": "module"` to your package.json for ES6 imports!

### Day 3-4: Adding POST Routes & Middleware

Now let's add the ability to create new todos:

```javascript
import express from 'express';

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

let todos = [
  { id: 1, text: 'Learn Express', completed: false },
  { id: 2, text: 'Build a REST API', completed: false },
  { id: 3, text: 'Connect to MongoDB', completed: true }
];

// GET all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// GET single todo
app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  res.json(todo);
});

// POST new todo
app.post('/todos', (req, res) => {
  const { text } = req.body;
  
  // Create new todo with auto-incrementing ID
  const newTodo = {
    id: todos.length + 1,
    text: text,
    completed: false
  };
  
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```