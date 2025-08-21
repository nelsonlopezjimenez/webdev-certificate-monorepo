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

### Setting Up MongoDB

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

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
```

### Adding Validation and Error Handling

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

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
```
