const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const { isAdmin } = require('../middleware/authMiddleware.js');


// Admin route to get all users
router.get("/userlist", isAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
