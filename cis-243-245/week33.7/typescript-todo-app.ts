// ============================================
// FILE: src/types/Todo.ts
// Purpose: Define TypeScript interfaces and types
// ============================================

/**
 * Interface defining the structure of a Todo item
 * This helps TypeScript understand what properties a Todo should have
 */
export interface ITodo {
  _id?: string;           // Optional because MongoDB generates this
  text: string;           // The todo description (required)
  completed: boolean;     // Whether the todo is done or not
  createdAt?: Date;       // Optional because MongoDB timestamps add this
  updatedAt?: Date;       // Optional because MongoDB timestamps add this
}

/**
 * Interface for creating a new Todo (without MongoDB generated fields)
 * This is what we expect when someone creates a new todo
 */
export interface CreateTodoRequest {
  text: string;
}

/**
 * Interface for updating a Todo
 * Both fields are optional because user might only want to update one
 */
export interface UpdateTodoRequest {
  text?: string;
  completed?: boolean;
}

/**
 * Standard API response structure for consistency
 */
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// ============================================
// FILE: src/models/Todo.ts
// Purpose: Define MongoDB schema and model
// ============================================

import mongoose, { Schema, Document } from 'mongoose';
import { ITodo } from '../types/Todo.js';

/**
 * Extend ITodo interface with MongoDB Document properties
 * This gives us access to MongoDB methods like save(), remove(), etc.
 */
export interface ITodoDocument extends ITodo, Document {}

/**
 * Define the MongoDB schema structure
 * This tells MongoDB how to store our todos
 */
const todoSchema: Schema<ITodoDocument> = new Schema(
  {
    text: {
      type: String,
      required: [true, 'Todo text is required'],    // Custom error message
      trim: true,                                   // Remove whitespace automatically
      minlength: [1, 'Todo text cannot be empty'], // Minimum length validation
      maxlength: [500, 'Todo text is too long']    // Maximum length validation
    },
    completed: {
      type: Boolean,
      default: false  // New todos are incomplete by default
    }
  },
  {
    timestamps: true,  // Automatically add createdAt and updatedAt fields
    versionKey: false  // Remove the __v field that MongoDB adds by default
  }
);

/**
 * Add an index to improve query performance
 * This makes searching by 'completed' status faster
 */
todoSchema.index({ completed: 1 });

/**
 * Create and export the Todo model
 * This is what we'll use to interact with the database
 */
export default mongoose.model<ITodoDocument>('Todo', todoSchema);

// ============================================
// FILE: src/middleware/validation.ts
// Purpose: Input validation middleware
// ============================================

import { Request, Response, NextFunction } from 'express';
import { body, param, validationResult } from 'express-validator';
import { ApiResponse } from '../types/Todo.js';

/**
 * Middleware to check if validation errors occurred
 * This runs after express-validator rules and formats errors nicely
 */
export const handleValidationErrors = (
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    // Format validation errors into a readable message
    const errorMessages = errors.array().map(error => error.msg).join(', ');
    
    res.status(400).json({
      success: false,
      error: errorMessages
    });
    return;
  }
  
  next(); // Continue to next middleware if no errors
};

/**
 * Validation rules for creating a new todo
 * These run before the route handler
 */
export const validateCreateTodo = [
  body('text')
    .trim()                                    // Remove whitespace
    .notEmpty()                               // Must not be empty
    .withMessage('Todo text is required')
    .isLength({ min: 1, max: 500 })          // Length constraints
    .withMessage('Todo text must be between 1 and 500 characters'),
  
  handleValidationErrors  // Check for errors after validation
];

/**
 * Validation rules for updating a todo
 */
export const validateUpdateTodo = [
  body('text')
    .optional()                               // Field is optional for updates
    .trim()
    .notEmpty()
    .withMessage('Todo text cannot be empty if provided')
    .isLength({ max: 500 })
    .withMessage('Todo text must not exceed 500 characters'),
  
  body('completed')
    .optional()
    .isBoolean()
    .withMessage('Completed must be a boolean value'),
  
  handleValidationErrors
];

/**
 * Validation for MongoDB ObjectId parameters
 */
export const validateObjectId = [
  param('id')
    .isMongoId()
    .withMessage('Invalid todo ID format'),
  
  handleValidationErrors
];

// ============================================
// FILE: src/middleware/errorHandler.ts
// Purpose: Global error handling middleware
// ============================================

import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types/Todo.js';

/**
 * Custom error class for application-specific errors
 */
export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Mark as operational error (not programming error)
    
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Global error handling middleware
 * This catches any errors that occur in route handlers
 */
export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
): void => {
  console.error('Error occurred:', error);

  // Default error values
  let statusCode = 500;
  let message = 'Something went wrong!';

  // Handle specific error types
  if (error instanceof AppError) {
    // Our custom application errors
    statusCode = error.statusCode;
    message = error.message;
  } else if (error.name === 'ValidationError') {
    // MongoDB validation errors
    statusCode = 400;
    message = Object.values(error.errors).map((err: any) => err.message).join(', ');
  } else if (error.name === 'CastError') {
    // MongoDB ObjectId casting errors
    statusCode = 400;
    message = 'Invalid ID format';
  } else if (error.code === 11000) {
    // MongoDB duplicate key error
    statusCode = 400;
    message = 'Duplicate entry found';
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
};

/**
 * Middleware to handle routes that don't exist
 */
export const notFoundHandler = (req: Request, res: Response<ApiResponse>): void => {
  res.status(404).json({
    success: false,
    error: `Route ${req.originalUrl} not found`
  });
};

// ============================================
// FILE: src/controllers/todoController.ts
// Purpose: Handle business logic for todo operations
// ============================================

import { Request, Response, NextFunction } from 'express';
import Todo from '../models/Todo.js';
import { CreateTodoRequest, UpdateTodoRequest, ApiResponse, ITodo } from '../types/Todo.js';
import { AppError } from '../middleware/errorHandler.js';

/**
 * Get all todos from the database
 * Query parameters: completed (optional) - filter by completion status
 */
export const getAllTodos = async (
  req: Request,
  res: Response<ApiResponse<ITodo[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    // Build query object based on query parameters
    const query: any = {};
    
    // Filter by completion status if provided
    if (req.query.completed !== undefined) {
      query.completed = req.query.completed === 'true';
    }

    // Fetch todos from database
    const todos = await Todo.find(query)
      .sort({ createdAt: -1 })  // Sort by newest first
      .exec();                  // Execute the query

    res.status(200).json({
      success: true,
      message: `Found ${todos.length} todos`,
      data: todos
    });
  } catch (error) {
    next(error); // Pass error to error handler middleware
  }
};

/**
 * Get a single todo by ID
 */
export const getTodoById = async (
  req: Request,
  res: Response<ApiResponse<ITodo>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const todo = await Todo.findById(id).exec();

    if (!todo) {
      throw new AppError('Todo not found', 404);
    }

    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new todo
 */
export const createTodo = async (
  req: Request<{}, ApiResponse<ITodo>, CreateTodoRequest>,
  res: Response<ApiResponse<ITodo>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { text } = req.body;

    // Create new todo instance
    const todo = new Todo({ text });

    // Save to database
    const savedTodo = await todo.save();

    res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      data: savedTodo
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update an existing todo
 */
export const updateTodo = async (
  req: Request<{ id: string }, ApiResponse<ITodo>, UpdateTodoRequest>,
  res: Response<ApiResponse<ITodo>>,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Find and update todo, return the updated document
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,        // Return updated document instead of original
        runValidators: true  // Run schema validators on update
      }
    ).exec();

    if (!updatedTodo) {
      throw new AppError('Todo not found', 404);
    }

    res.status(200).json({
      success: true,
      message: 'Todo updated successfully',
      data: updatedTodo
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a todo by ID
 */
export const deleteTodo = async (
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedTodo = await Todo.findByIdAndDelete(id).exec();

    if (!deletedTodo) {
      throw new AppError('Todo not found', 404);
    }

    res.status(200).json({
      success: true,
      message: 'Todo deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete all completed todos
 * Useful for cleaning up completed tasks
 */
export const deleteCompletedTodos = async (
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await Todo.deleteMany({ completed: true }).exec();

    res.status(200).json({
      success: true,
      message: `Deleted ${result.deletedCount} completed todos`
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get todo statistics
 * Returns count of total, completed, and pending todos
 */
export const getTodoStats = async (
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    // Use MongoDB aggregation for efficient counting
    const stats = await Todo.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          completed: {
            $sum: { $cond: ['$completed', 1, 0] }
          },
          pending: {
            $sum: { $cond: ['$completed', 0, 1] }
          }
        }
      }
    ]);

    const result = stats[0] || { total: 0, completed: 0, pending: 0 };
    delete result._id; // Remove MongoDB's _id field

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

// ============================================
// FILE: src/routes/todoRoutes.ts
// Purpose: Define API routes for todo operations
// ============================================

import { Router } from 'express';
import {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteCompletedTodos,
  getTodoStats
} from '../controllers/todoController.js';
import {
  validateCreateTodo,
  validateUpdateTodo,
  validateObjectId
} from '../middleware/validation.js';

/**
 * Create Express router instance
 * This allows us to define routes in a modular way
 */
const router = Router();

// GET /api/todos/stats - Get todo statistics
router.get('/stats', getTodoStats);

// GET /api/todos - Get all todos (with optional filtering)
router.get('/', getAllTodos);

// GET /api/todos/:id - Get single todo by ID
router.get('/:id', validateObjectId, getTodoById);

// POST /api/todos - Create new todo
router.post('/', validateCreateTodo, createTodo);

// PUT /api/todos/:id - Update todo by ID
router.put('/:id', validateObjectId, validateUpdateTodo, updateTodo);

// DELETE /api/todos/:id - Delete single todo by ID
router.delete('/:id', validateObjectId, deleteTodo);

// DELETE /api/todos/completed/all - Delete all completed todos
router.delete('/completed/all', deleteCompletedTodos);

export default router;

// ============================================
// FILE: src/config/database.ts
// Purpose: Database connection configuration
// ============================================

import mongoose from 'mongoose';

/**
 * Database connection configuration
 */
interface DatabaseConfig {
  url: string;
  options: mongoose.ConnectOptions;
}

/**
 * Get database configuration based on environment
 */
const getDatabaseConfig = (): DatabaseConfig => {
  const nodeEnv = process.env.NODE_ENV || 'development';
  
  // Default configuration for development
  let config: DatabaseConfig = {
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/todoapp',
    options: {
      // No need for deprecated options in newer versions of mongoose
    }
  };

  // Modify configuration for different environments
  if (nodeEnv === 'test') {
    config.url = process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/todoapp_test';
  }

  return config;
};

/**
 * Connect to MongoDB database
 * Returns a promise that resolves when connected
 */
export const connectDatabase = async (): Promise<void> => {
  try {
    const config = getDatabaseConfig();
    
    // Connect to MongoDB
    await mongoose.connect(config.url, config.options);
    
    console.log(`✅ Connected to MongoDB: ${config.url}`);
    
    // Log database events
    mongoose.connection.on('error', (error) => {
      console.error('❌ MongoDB connection error:', error);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('📴 MongoDB disconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('🔌 MongoDB connection closed through app termination');
      process.exit(0);
    });
    
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
    process.exit(1); // Exit with failure
  }
};

// ============================================
// FILE: src/app.ts
// Purpose: Express application setup and configuration
// ============================================

import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import todoRoutes from './routes/todoRoutes.js';
import { globalErrorHandler, notFoundHandler } from './middleware/errorHandler.js';

/**
 * Create and configure Express application
 */
export const createApp = (): Application => {
  const app: Application = express();

  // =====================================
  // Security and Performance Middleware
  // =====================================

  // Enable trust proxy for accurate IP addresses behind reverse proxy
  app.set('trust proxy', 1);

  // Helmet helps secure Express apps by setting various HTTP headers
  app.use(helmet());

  // Enable CORS for cross-origin requests
  app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
  }));

  // Compress responses for better performance
  app.use(compression());

  // Rate limiting to prevent abuse
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
      success: false,
      error: 'Too many requests from this IP, please try again later'
    },
    standardHeaders: true, // Return rate limit info in headers
    legacyHeaders: false
  });
  app.use('/api/', limiter);

  // =====================================
  // Body Parsing Middleware
  // =====================================

  // Parse JSON payloads (with size limit)
  app.use(express.json({ 
    limit: '10mb',
    type: 'application/json'
  }));

  // Parse URL-encoded payloads
  app.use(express.urlencoded({ 
    extended: true, 
    limit: '10mb'
  }));

  // =====================================
  // Request Logging (Development)
  // =====================================

  if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
      console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
      next();
    });
  }

  // =====================================
  // Health Check Route
  // =====================================

  app.get('/health', (req, res) => {
    res.status(200).json({
      success: true,
      message: 'Server is healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  });

  // =====================================
  // API Routes
  // =====================================

  // Mount todo routes under /api/todos
  app.use('/api/todos', todoRoutes);

  // API root endpoint
  app.get('/api', (req, res) => {
    res.json({
      success: true,
      message: 'Todo API is running!',
      version: '1.0.0',
      endpoints: {
        todos: '/api/todos',
        health: '/health'
      }
    });
  });

  // =====================================
  // Error Handling
  // =====================================

  // Handle 404 errors (route not found)
  app.use(notFoundHandler);

  // Global error handler (must be last)
  app.use(globalErrorHandler);

  return app;
};

// ============================================
// FILE: src/server.ts
// Purpose: Application entry point
// ============================================

import dotenv from 'dotenv';
import { createApp } from './app.js';
import { connectDatabase } from './config/database.js';

// Load environment variables from .env file
dotenv.config();

/**
 * Start the server
 */
const startServer = async (): Promise<void> => {
  try {
    // Connect to database first
    await connectDatabase();

    // Create Express application
    const app = createApp();

    // Get port from environment or use default
    const PORT = process.env.PORT || 4000;

    // Start listening for requests
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
      console.log(`📚 API documentation: http://localhost:${PORT}/api`);
      console.log(`❤️  Health check: http://localhost:${PORT}/health`);
    });

    // Handle server shutdown gracefully
    process.on('SIGTERM', () => {
      console.log('SIGTERM received, shutting down gracefully...');
      server.close(() => {
        console.log('Server closed');
      });
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  startServer();
}

// ============================================
// FILE: package.json
// Purpose: Project dependencies and scripts
// ============================================
/*
{
  "name": "typescript-todo-api",
  "version": "1.0.0",
  "description": "A professional Todo API built with TypeScript, Express, and MongoDB",
  "type": "module",
  "main": "dist/server.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/server.js",
    "dev": "tsx watch src/server.ts",
    "dev:nodemon": "nodemon --exec tsx src/server.ts",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint src --ext .ts",
    "lint:fix": "eslint src --ext .ts --fix",
    "format": "prettier --write src/**/*.ts"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.0",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "compression": "^1.7.4",
    "express-rate-limit": "^7.1.5",
    "express-validator": "^7.0.1",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/cors": "^2.8.17",
    "@types/compression": "^1.7.5",
    "@types/node": "^20.10.0",
    "typescript": "^5.3.0",
    "tsx": "^4.6.0",
    "nodemon": "^3.0.0",
    "@typescript-eslint/eslint-plugin": "^6.13.0",
    "@typescript-eslint/parser": "^6.13.0",
    "eslint": "^8.54.0",
    "prettier": "^3.1.0",
    "jest": "^29.7.0",
    "@types/jest": "^29.5.0",
    "ts-jest": "^29.1.0"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
*/

// ============================================
// FILE: tsconfig.json
// Purpose: TypeScript compiler configuration
// ============================================
/*
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Node",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": false,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "removeComments": false,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "**/*.test.ts",
    "**/*.spec.ts"
  ]
}
*/

// ============================================
// FILE: .env.example
// Purpose: Environment variables template
// ============================================
/*
# Server Configuration
PORT=4000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/todoapp
MONGODB_TEST_URI=mongodb://localhost:27017/todoapp_test

# Frontend URL for CORS
FRONTEND_URL=http://localhost:3000

# Optional: MongoDB Atlas connection
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todoapp?retryWrites=true&w=majority
*/