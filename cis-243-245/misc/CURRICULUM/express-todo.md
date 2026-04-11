# Two-Week Express & MongoDB Backend Course

## Week 1: Express Fundamentals & CRUD Operations

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

### Day 5-7: Complete CRUD Operations

Let's add PUT (update) and DELETE operations:

```javascript
import express from 'express';

const app = express();
app.use(express.json());

let todos = [
  { id: 1, text: 'Learn Express', completed: false },
  { id: 2, text: 'Build a REST API', completed: false },
  { id: 3, text: 'Connect to MongoDB', completed: true }
];

// CREATE - POST new todo
app.post('/todos', (req, res) => {
  const { text } = req.body;
  const newTodo = {
    id: todos.length + 1,
    text: text,
    completed: false
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// READ - GET all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// READ - GET single todo
app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  res.json(todo);
});

// UPDATE - PUT todo (complete replacement)
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { text, completed } = req.body;
  
  const todoIndex = todos.findIndex(t => t.id === id);
  todos[todoIndex] = { id, text, completed };
  
  res.json(todos[todoIndex]);
});

// UPDATE - PATCH todo (partial update)
app.patch('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updates = req.body;
  
  const todoIndex = todos.findIndex(t => t.id === id);
  todos[todoIndex] = { ...todos[todoIndex], ...updates };
  
  res.json(todos[todoIndex]);
});

// DELETE - Remove todo
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(t => t.id !== id);
  res.status(204).send(); // 204 means "No Content" - successful deletion
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

## What is a RESTful Application?

REST (Representational State Transfer) is an architectural style for designing web services. A RESTful API follows these principles:

1. **Resource-based URLs**: Use nouns, not verbs (`/todos` not `/getTodos`)
2. **HTTP methods represent actions**:
   - GET: Retrieve data
   - POST: Create new resource
   - PUT: Update entire resource
   - PATCH: Partial update
   - DELETE: Remove resource
3. **Stateless**: Each request contains all needed information
4. **Consistent response format**: Usually JSON
5. **Proper HTTP status codes**: 200 (OK), 201 (Created), 404 (Not Found), etc.

**RESTful Todo API Example:**
```
GET    /todos        # Get all todos
GET    /todos/1      # Get todo with ID 1
POST   /todos        # Create new todo
PUT    /todos/1      # Update entire todo with ID 1
PATCH  /todos/1      # Partially update todo with ID 1
DELETE /todos/1      # Delete todo with ID 1
```

## Week 2: MongoDB Integration & Error Handling

### Day 8-9: Setting Up MongoDB

Install MongoDB dependencies:
```bash
npm install mongoose
```

**models/Todo.js - Create a Todo model:**
```javascript
import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

export default mongoose.model('Todo', todoSchema);
```

**server.js - Connect to MongoDB:**
```javascript
import express from 'express';
import mongoose from 'mongoose';
import Todo from './models/Todo.js';

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todoapp');

// CREATE - POST new todo
app.post('/todos', async (req, res) => {
  const { text } = req.body;
  const todo = new Todo({ text });
  const savedTodo = await todo.save();
  res.status(201).json(savedTodo);
});

// READ - GET all todos
app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// READ - GET single todo
app.get('/todos/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  res.json(todo);
});

// UPDATE - PUT todo
app.put('/todos/:id', async (req, res) => {
  const { text, completed } = req.body;
  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    { text, completed },
    { new: true } // Return updated document
  );
  res.json(todo);
});

// DELETE - Remove todo
app.delete('/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

### Day 10-12: Adding Error Handling

Now let's add proper error handling:

```javascript
import express from 'express';
import mongoose from 'mongoose';
import Todo from './models/Todo.js';

const app = express();
app.use(express.json());

// Connect to MongoDB with error handling
mongoose.connect('mongodb://localhost:27017/todoapp')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// CREATE - POST new todo
app.post('/todos', async (req, res) => {
  try {
    const { text } = req.body;
    
    // Basic validation
    if (!text || text.trim() === '') {
      return res.status(400).json({ error: 'Text is required' });
    }
    
    const todo = new Todo({ text: text.trim() });
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

// READ - GET all todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// READ - GET single todo
app.get('/todos/:id', async (req, res) => {
  try {
    // Check if ID is valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid todo ID' });
    }
    
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todo' });
  }
});

// UPDATE - PUT todo
app.put('/todos/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid todo ID' });
    }
    
    const { text, completed } = req.body;
    
    if (!text || text.trim() === '') {
      return res.status(400).json({ error: 'Text is required' });
    }
    
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { text: text.trim(), completed: Boolean(completed) },
      { new: true, runValidators: true }
    );
    
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// DELETE - Remove todo
app.delete('/todos/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid todo ID' });
    }
    
    const todo = await Todo.findByIdAndDelete(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

// Global error handler middleware
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

### Day 13-14: Advanced Features & Code Organization

Let's organize our code better with routes and controllers:

**routes/todos.js:**
```javascript
import express from 'express';
import Todo from '../models/Todo.js';
import { validateObjectId, validateTodoData } from '../middleware/validation.js';

const router = express.Router();

// GET all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// GET single todo
router.get('/:id', validateObjectId, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todo' });
  }
});

// POST new todo
router.post('/', validateTodoData, async (req, res) => {
  try {
    const todo = new Todo(req.body);
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

// PUT update todo
router.put('/:id', validateObjectId, validateTodoData, async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// DELETE todo
router.delete('/:id', validateObjectId, async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

export default router;
```

**middleware/validation.js:**
```javascript
import mongoose from 'mongoose';

export const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }
  next();
};

export const validateTodoData = (req, res, next) => {
  const { text } = req.body;
  
  if (!text || text.trim() === '') {
    return res.status(400).json({ error: 'Text is required and cannot be empty' });
  }
  
  req.body.text = text.trim();
  next();
};
```

**Updated server.js:**
```javascript
import express from 'express';
import mongoose from 'mongoose';
import todoRoutes from './routes/todos.js';

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todoapp')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/todos', todoRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

## Other Frameworks Compatible with Express

As you become comfortable with Express, here are other frameworks you might explore:

### 1. **Fastify**
A faster alternative to Express with built-in validation and serialization:
```javascript
import Fastify from 'fastify';

const fastify = Fastify({ logger: true });

fastify.get('/todos', async (request, reply) => {
  return { todos: [] };
});

await fastify.listen({ port: 3000 });
```

### 2. **Koa.js**
Created by the Express team, uses async/await by default:
```javascript
import Koa from 'koa';
import Router from '@koa/router';

const app = new Koa();
const router = new Router();

router.get('/todos', async (ctx) => {
  ctx.body = { todos: [] };
});

app.use(router.routes());
app.listen(3000);
```

### 3. **Hapi.js**
Configuration-centric framework with built-in features:
```javascript
import Hapi from '@hapi/hapi';

const server = Hapi.server({
  port: 3000,
  host: 'localhost'
});

server.route({
  method: 'GET',
  path: '/todos',
  handler: (request, h) => {
    return { todos: [] };
  }
});

await server.start();
```

### 4. **NestJS**
TypeScript-first framework inspired by Angular:
```typescript
@Controller('todos')
export class TodosController {
  @Get()
  findAll(): Todo[] {
    return [];
  }
}
```

### Why Start with Express?
Express is perfect for learning because it's minimal, flexible, and teaches you the fundamentals. Once you understand Express, moving to other frameworks becomes much easier since they often build upon the same concepts but add their own opinions and features.

The key is to master the fundamentals: HTTP methods, middleware, routing, error handling, and database integration. These concepts transfer to any Node.js framework you choose to learn next!