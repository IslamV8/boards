const Board = require('../models/Board');
const { createBoardSchema, updateBoardSchema } = require('../validations/boardValidation');

// إنشاء Board جديد
exports.createBoard = async (req, res) => {
  const { error } = createBoardSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const board = new Board({ ...req.body, userId: req.userId });
    await board.save();
    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// جلب جميع Boards للمستخدم
exports.getUserBoards = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const filter = { userId: req.userId };

    const boards = await Board.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .exec();

    const total = await Board.countDocuments(filter);

    res.json({
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      totalPages: Math.ceil(total / limit),
      boards
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// جلب Board محددة
exports.getBoard = async (req, res) => {
  try {
    const board = await Board.findOne({ _id: req.params.id, userId: req.userId });
    if (!board) return res.status(404).json({ error: 'Board not found or unauthorized' });
    res.json(board);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// تعديل Board
exports.updateBoard = async (req, res) => {
  const { error } = updateBoardSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const updated = await Board.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Board not found or unauthorized' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// حذف Board
exports.deleteBoard = async (req, res) => {
  try {
    const deleted = await Board.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!deleted) return res.status(404).json({ error: 'Board not found or unauthorized' });
    res.json({ message: 'Board deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
