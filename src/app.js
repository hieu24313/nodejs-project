const express = require('express');
const { sequelize } = require('./models');
const config = require('./config/db');

const app = express();
const port = config.port || 3000;

// Middleware
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

// Start server
server.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);
  // try {
  //   await sequelize.authenticate();
  //   console.log('Connection to the database has been established successfully.');
  // } catch (err) {
  //   console.error('Unable to connect to the database:', err);
  // }
});

module.exports = app;
