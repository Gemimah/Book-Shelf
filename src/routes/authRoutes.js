const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { auth, isAdmin } = require("../middleware/auth");

// Register new user
router.post("/register", async (req, res) => {
  try {
    console.log("Registration request received:", {
      ...req.body,
      password: req.body.password ? "****" : undefined,
    });

    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      console.log("Missing fields:", {
        name: !!name,
        email: !!email,
        password: !!password,
      });
      return res.status(400).json({
        message: "Name, email and password are required",
        received: { name, email, password: password ? "provided" : "missing" },
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
        received: email,
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
        received: email,
      });
    }

    console.log("Creating new user...");
    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: "user",
    });

    console.log("User created successfully:", {
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // Generate token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "default_secret_key",
      { expiresIn: "24h" }
    );

    res.status(201).json({
      user: user.getPublicProfile(),
      token,
    });
  } catch (error) {
    console.error("Registration error details:");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    if (error.errors) {
      console.error(
        "Validation errors:",
        error.errors.map((e) => ({
          message: e.message,
          type: e.type,
          path: e.path,
          value: e.value,
        }))
      );
    }
    console.error("Stack trace:", error.stack);

    res.status(500).json({
      message: "Registration failed",
      error: error.message,
      details: error.errors ? error.errors.map((e) => e.message) : undefined,
    });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Validate password
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
});

// Get current user
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user data" });
  }
});

// Update user profile
router.patch("/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ message: "Invalid updates" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.json({ user: req.user.getPublicProfile() });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete user account
router.delete("/me", auth, async (req, res) => {
  try {
    await req.user.destroy();
    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Get all users
router.get("/users", auth, isAdmin, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Update user role
router.put("/users/:id/role", auth, isAdmin, async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.update({ role });
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      lastLogin: user.lastLogin,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
