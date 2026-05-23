const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const taskRoutes = require('./routes/task.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/tasks', taskRoutes);

const publicPath = path.join(__dirname, 'public');
const indexPath = path.join(publicPath, 'index.html');

app.use(express.static(publicPath));

if (fs.existsSync(indexPath)) {
  app.get(/.*/, (req, res) => {
    res.sendFile(indexPath);
  });
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
