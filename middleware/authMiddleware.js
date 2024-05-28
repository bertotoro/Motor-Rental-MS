const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(403).send('Forbidden');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role === 'admin') {
      req.user = decoded;
      next();
    } else {
      res.status(403).send('Forbidden');
    }
  } catch (error) {
    res.status(403).send('Forbidden');
  }
};

module.exports = { isAdmin };
