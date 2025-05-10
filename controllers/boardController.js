const Board = require('../models/Board');
const Task = require('../models/Task');

exports.createBoard = async (req, res) => {
  try {
    const { name, description } = req.body;
    const defaultTasks = [
      { name: 'Task in Progress', status: 'In Progress', icon: '⏰' },
      { name: 'Task Completed', status: 'Completed', icon: '✅' },
      { name: 'Task Won’t Do', status: "Won't Do", icon: '❌' },
      { name: 'Task To Do', status: 'To Do', icon: '📋' }
    ];
    const tasks = await Task.insertMany(defaultTasks);
    const taskIds = tasks.map(t => t._id);
    const board = await Board.create({ name, description, tasks: taskIds });
    await Task.updateMany({ _id: { $in: taskIds } }, { board: board._id });
    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBoard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id).populate('tasks');
    if (!board) return res.status(404).json({ error: 'Board not found' });
    res.json(board);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBoard = async (req, res) => {
  try {
    const updated = await Board.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBoard = async (req, res) => {
  try {
    await Task.deleteMany({ board: req.params.id });
    await Board.findByIdAndDelete(req.params.id);
    res.json({ message: 'Board deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};