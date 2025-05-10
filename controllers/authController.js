const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { signupSchema, loginSchema } = require('../validations/authValidation');

// تسجيل مستخدم جديد
exports.signup = async (req, res) => {
  const { error } = signupSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ error: 'Username already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// تسجيل الدخول
exports.login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'Invalid username or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid username or password' });

    // هنا بدل ما نرجع توكن، ممكن ترجع الـ userId مباشرة (أو session-id وهمي لو حبيت)
    res.json({ message: 'Login successful', userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
