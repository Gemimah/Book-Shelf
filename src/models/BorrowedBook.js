const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Book = require("./Book");

const BorrowedBook = sequelize.define("BorrowedBook", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  borrowedDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  returnDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  isOverdue: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  userId: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: "id",
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  },
  bookId: {
    type: DataTypes.INTEGER,
    references: {
      model: Book,
      key: "id",
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  },
});

// Define associations
BorrowedBook.belongsTo(User, { foreignKey: "userId" });
BorrowedBook.belongsTo(Book, { foreignKey: "bookId" });

module.exports = BorrowedBook;
