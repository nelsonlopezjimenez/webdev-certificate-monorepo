# Mongo Connect Variation

```js
// Connect to MongoDB with error handling
// src/index.js
const connectToMongoDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/todoapp');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if DB connection fails
  }
};

// Call the function
connectToMongoDB();

// ============== OR

// src/config/database.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todoapp';
    
    await mongoose.connect(mongoURI, {
      // Modern connection options (useNewUrlParser and useUnifiedTopology are now default)
    });
    
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('📴 MongoDB disconnected');
});

mongoose.connection.on('error', (error) => {
  console.error('🔥 MongoDB error:', error);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('📴 MongoDB connection closed through app termination');
    process.exit(0);
  } catch (error) {
    console.error('Error during graceful shutdown:', error);
    process.exit(1);
  }
});

export default connectDB;

//  src/index.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';

// Load environment variables
dotenv.config();

// Connect to database
await connectDB();

const app = express();
const PORT = process.env.PORT || 3001;

// Your other middleware and routes...

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

```
## 🌟 Key Improvements:

1. Better error handling with try/catch
1. Environment variable support for connection string
1. Process exit on connection failure
1. Connection event handlers for monitoring
1. Graceful shutdown handling
1. Modular structure for better organization

🔧 Environment Setup
.env
```sh
envMONGODB_URI=mongodb://localhost:27017/todoapp
NODE_ENV=development
```
This approach is much more robust and follows modern Node.js best practices!RetryClaude can make mistakes. Please double-check responses.Research Sonnet 4