# Hamzakhan securing express server

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

## using curl
curl -X POST http://localhost:5000/register -H "Content-Type: application/json" -d '{"username": "user1", "password": "password123"}'

curl -X POST http://localhost:5000/login -H "Content-Type: application/json" -d '{"username": "user1", "password": "password123"}'

curl -X GET http://localhost:5000/dashboard -H "Authorization: Bearer your-jwt-token"

{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWF0IjoxNzQ3MjMzOTA1LCJleHAiOjE3NDcyMzc1MDV9.1fqqmssGRK-fiWdXh0iOoPVXvDX0eoW_GQQEQ9eqnvs"}  

$ curl -X GET http://localhost:5000/dashboard -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWF0IjoxNzQ3MjMzOTA1LCJleHAiOjE3NDcyMzc1MDV9.1fqqmssGRK-fiWdXh0iOoPVXvDX0eoW_GQQEQ9eqnvs "
8-b6996892330f{"message":"Welcome to the dashboard, user1!"} 

curl -X GET http://localhost:5000/dashboard -H "Authorization: {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWF0IjoxNzQ3MjMzOTA1LCJleHAiOjE3NDcyMzc1MDV9.1fqqmssGRK-fiWdXh0iOoPVXvDX0eoW_GQQEQ9eqnvs"}   "

curl -X POST http://localhost:30000/register -H "Content-Type: application/json" -d '{"username": "user1", "password": "password123"}'

curl -X POST http://localhost:3000/signup -H "Content-Type: application/json" -d '{"name": "User1", ""user1", "password": "password123"}'

curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{"email": "user1", "password": "password123"}'


curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{"email": "user1", "password": "password123"}'
{"success":true,"data":{"userId":"6824b6527dd8e9c077d9c3b8","email":"user1","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODI0YjY1MjdkZDhlOWMwNzdkOWMzYjgiLCJlbWFpbCI6InVzZXIxIiwiaWF0IjoxNzQ3MjQxMjQ2LCJleHAiOjE3NDcyNDQ4NDZ9.jSzLgbPSvar4m5UTT1kqox9_soo-Yi89gwg72orArmY"}}localepsilon@cis0768 MINGW64 ~/Documents/_QUARTER3/webdev-certificate-monorepo/cis-243-245/using-jwt/geeksforgeeks-jwt-auth-2025 (main)

accessResource
curl -X GET http://localhost:3000/accessResource -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODI0YjY1MjdkZDhlOWMwNzdkOWMzYjgiLCJlbWFpbCI6InVzZXIxIiwiaWF0IjoxNzQ3MjQxMjQ2LCJleHAiOjE3NDcyNDQ4NDZ9.jSzLgbPSvar4m5UTT1kqox9_soo-Yi89gwg72orArmY"