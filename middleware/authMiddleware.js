module.exports = (req, res, next) => {
  // نحاول نجيب userId من body أو query أو حتى header لو حبيت
  const userId =
    req.body.userId ||
    req.query.userId ||
    req.headers['x-user-id']; // ممكن تستخدم Header مخصص لو عايز

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized: userId is required' });
  }

  req.userId = userId; // نخزّنه في req لاستخدامه في الكنترولرز
  next();
};
