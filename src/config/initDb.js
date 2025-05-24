const { Sequelize } = require("sequelize");
const sequelize = require("./database");
const User = require("../models/User");
const Book = require("../models/Book");

async function initializeDatabase() {
  try {
    // Test the connection
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    // Sync all models without force
    await sequelize.sync(); // Remove force: true to preserve data
    console.log("Database synchronized successfully.");

    // Create an admin user if it doesn't exist
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
    }

    // Create a regular user if it doesn't exist
    const userExists = await User.findOne({
      where: { email: "user@example.com" },
    });
    if (!userExists) {
      const regularUser = await User.create({
        name: "Regular User",
        email: "user@example.com",
        password: "user123",
        role: "user",
      });
      console.log("Regular user created:", regularUser.email);
    }

    console.log("Database initialization completed successfully!");
  } catch (error) {
    console.error("Error initializing database:", error);
  } finally {
    process.exit();
  }
}

initializeDatabase();
