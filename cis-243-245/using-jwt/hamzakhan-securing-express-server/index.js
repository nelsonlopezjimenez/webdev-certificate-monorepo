// server.js
const express = require('express');
const bodyParser = require('body-parser');
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