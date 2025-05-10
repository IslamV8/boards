const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const serverless = require('serverless-http');

const authRoutes = require('./routes/authRoutes');
const boardRoutes = require('./routes/boardRoutes');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get(`/`, (req, res) => {
  res.json("Hi Alpha")
});
app.use('/api/auth', authRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/tasks', taskRoutes);

if (require.main === module) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('✅ MongoDB connected!');
      const port = process.env.PORT || 5000;
      app.listen(port, () => console.log(`Server running on port ${port}`));
    })
    .catch(err => console.error('❌ DB Error:', err));
}

module.exports = serverless(app);