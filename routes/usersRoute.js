// routes/users.js

const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const { isAdmin } = require('../middleware/authMiddleware.js');

// User login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (user) {
      res.send(user);
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// User registration route
router.post("/register", async (req, res) => {
  try {
    console.log("Request Body: ", req.body); // Add logging for debugging
    const { username, password, role } = req.body;
    const newUser = new User({ username, password, role });
    await newUser.save();
    res.send('User registered successfully');
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to get all users
router.get("/userlist", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to delete a user by ID
router.delete("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
});

// Route to update user role
router.put("/:userId/role", async (req, res) => {
  const { userId } = req.params;
  const { newRole } = req.body;

  try {
    await User.findByIdAndUpdate(userId, { role: newRole });
    res.status(200).json({ message: "User role updated successfully" });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ message: "Failed to update user role" });
  }
});

// Route to update user password
router.put("/:userId/password", async (req, res) => {
  const { userId } = req.params;
  const { newPassword } = req.body;

  try {
    await User.findByIdAndUpdate(userId, { password: newPassword });
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating user password:", error);
    res.status(500).json({ message: "Failed to update password" });
  }
});

// Route to update user credentials (username and password)
router.put("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { newUsername, newPassword } = req.body;

  try {
    // Find the user by ID and update the username and password fields
    await User.findByIdAndUpdate(userId, { username: newUsername, password: newPassword });
    res.status(200).json({ message: "User credentials updated successfully" });
  } catch (error) {
    console.error("Error updating user credentials:", error);
    res.status(500).json({ message: "Failed to update user credentials" });
  }
});

module.exports = router;
