const express = require('express');
// const userRoutes = require('./routes/userRoutes');
const userRoutes = require('./src/routes/userRoutes');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
