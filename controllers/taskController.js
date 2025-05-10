const Task = require('../models/Task');
const { createTaskSchema, updateTaskSchema } = require('../validations/taskValidation');

// إنشاء مهمة جديدة
exports.createTask = async (req, res) => {
  const { error } = createTaskSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const task = new Task({ ...req.body, userId: req.userId });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// جلب المهام مع دعم الفلترة والبحث
exports.getTasks = async (req, res) => {
  try {
    const { status, search, page = 1, limit = 10 } = req.query;
    const filter = { userId: req.userId };

    if (status) filter.status = status;

    if (search) {
      filter.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const tasks = await Task.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .exec();

    const total = await Task.countDocuments(filter);

    res.json({
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      totalPages: Math.ceil(total / limit),
      tasks
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// تحديث مهمة
exports.updateTask = async (req, res) => {
  const { error } = updateTaskSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const updated = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: 'Task not found or unauthorized' });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// حذف مهمة
exports.deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });

    if (!deleted) return res.status(404).json({ error: 'Task not found or unauthorized' });

    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
