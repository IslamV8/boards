const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  icon: String,
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Completed', "Won't Do"],
    default: 'To Do'
  },
  board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board' }
});

module.exports = mongoose.model('Task', taskSchema);