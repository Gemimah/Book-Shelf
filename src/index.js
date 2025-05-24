require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const User = require("./models/User");
const Book = require("./models/Book");
const BorrowedBook = require("./models/BorrowedBook");

// Set default JWT_SECRET if not in environment
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = "book_management_system_secret_key_2024";
  console.log("Using default JWT_SECRET");
}

// Debug environment variables
console.log("Environment variables loaded:");
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "Set" : "Not set");
console.log("DATABASE_URL:", process.env.DATABASE_URL ? "Set" : "Not set");
console.log("PORT:", process.env.PORT || 3000);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Add general request logging middleware
app.use((req, res, next) => {
  console.log(`[INCOMING REQUEST] ${req.method} ${req.url}`);
  // console.log('Request body:', req.body); // Be cautious logging bodies in production
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

// Initialize database and start server
async function startServer() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    // Sync all models without force (preserves data)
    await sequelize.sync({ alter: true }); // Changed from { force: true }
    console.log("Database synchronized successfully (alter: true).");

    // Create admin user if it doesn't exist
    const adminExists = await User.findOne({
      where: { email: "admin@example.com" },
    });
    if (!adminExists) {
      const adminUser = await User.create({
        name: "Admin User",
        email: "admin@example.com",
        password: "admin123",
        role: "admin",
      });
      console.log("Admin user created:", adminUser.email);
    } else {
      console.log("Admin user already exists.");
    }

    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    console.error("Error details:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });
    process.exit(1);
  }
}

startServer();
