const { Sequelize } = require("sequelize");
require("dotenv").config();

// Log the database URL (without password)
const dbUrl =
  process.env.DATABASE_URL ||
  "postgres://postgres:symbols9@localhost:5432/book_management";
console.log(
  "Attempting to connect to database:",
  dbUrl.replace(/:[^:@]+@/, ":****@")
);

const sequelize = new Sequelize(dbUrl, {
  dialect: "postgres",
  logging: (msg) => console.log("Database:", msg),
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    timestamps: true,
    underscored: true,
  },
  dialectOptions: {
    ssl: false,
  },
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:");
    console.error("Error name:", err.name);
    console.error("Error message:", err.message);
    console.error("Error stack:", err.stack);
    process.exit(1);
  });

module.exports = sequelize;
