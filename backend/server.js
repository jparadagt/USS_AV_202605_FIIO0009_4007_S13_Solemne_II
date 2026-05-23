const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const tasks = [
  {
    id: 1,
    title: 'Backend task',
    description: 'Task from API',
    status: 'PENDING',
    priority: 'HIGH',
    createdAt: new Date(),
    dueDate: new Date('2026-06-01')
  }
];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});