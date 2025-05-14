# Hamzakhan securing exress server

## server.js
```js
// server.js
const express = require('express');
const { registerUser, loginUser } = require('./userController');
const { verifyToken } = require('./authMiddleware');

const app = express();
const PORT = 5000;
// Middleware to parse incoming requests
app.use(express.json());

app.post('/register', registerUser);
app.post('/login', loginUser);

// Protected route
app.get('/dashboard', verifyToken, (req, res) => {
  res.json({ message: `Welcome to the dashboard, ${req.user.username}!` });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
```
## userController.js
```js
// userController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key'; // Store securely in environment variables

let users = []; // In-memory user storage

// Register a new user
exports.registerUser = async (req, res) => {
  const { username, password } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Store user with hashed password
  users.push({ username, password: hashedPassword });

  res.status(201).json({ message: 'User registered successfully!' });
};

// User login and JWT generation
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  // Find user by username
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  // Compare password with the stored hash
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

  // Generate JWT token
  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

  res.json({ token });
};
```

## authMiddleware.js
```js
// authMiddleware.js
const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';

// Middleware to protect routes
exports.verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    // Verify the token
    const verified = jwt.verify(token.split(' ')[1], secretKey);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};
```
