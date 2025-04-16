const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Temporary database (replace with real database in production)
let users = [];

app.use(bodyParser.json());
app.use(express.static('public')); // Serve your HTML files

// CREATE - Register new user
app.post('/api/users', (req, res) => {
  const { name, email, password } = req.body;
  const newUser = { id: Date.now(), name, email, password };
  users.push(newUser);
  res.status(201).json(newUser);
});

// READ - Get all users (for admin)
app.get('/api/users', (req, res) => {
  res.json(users);
});

// READ - Get single user
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// UPDATE - Edit user
app.put('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'User not found' });
  
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.password = req.body.password || user.password;
  
  res.json(user);
});

// DELETE - Remove user
app.delete('/api/users/:id', (req, res) => {
  users = users.filter(u => u.id !== parseInt(req.params.id));
  res.json({ message: 'User deleted' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));