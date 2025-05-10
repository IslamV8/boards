const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/authRoutes');
const boardRoutes = require('./routes/boardRoutes');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get(`/`, (req, res) => {
  res.json("Hi Alpha");
});
app.use('/api/auth', authRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/tasks', taskRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected!'))
  .catch(err => console.error('❌ DB Error:', err));

// ✅ للتشغيل المحلي فقط
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Server running on port ${port}`));
}

// ✅ لـ Vercel
module.exports = app;
