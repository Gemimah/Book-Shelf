const express = require("express");
const router = express.Router();
const { auth, isAdmin } = require("../middleware/auth");
const Book = require("../models/Book");
const { addDays, format, isAfter } = require("date-fns");

// Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.findAll();
    const updatedBooks = updateOverdueStatus(books);
    res.json(updatedBooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get book by ID
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    const updatedBook = updateOverdueStatus([book])[0];
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get borrowed books
router.get("/borrowed/all", auth, async (req, res) => {
  try {
    const books = await Book.findAll({
      where: { status: "borrowed" },
    });
    const updatedBooks = updateOverdueStatus(books);
    res.json(updatedBooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Borrow a book
router.post("/:id/borrow", auth, async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    if (book.status !== "available") {
      return res.status(400).json({ message: "Book is not available" });
    }

    const today = new Date();
    const dueDate = addDays(today, 14); // 2 weeks from now

    await book.update({
      status: "borrowed",
      borrowedDate: format(today, "yyyy-MM-dd"),
      dueDate: format(dueDate, "yyyy-MM-dd"),
      isOverdue: false,
    });

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Return a book
router.post("/:id/return", auth, async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    if (book.status !== "borrowed") {
      return res.status(400).json({ message: "Book is not borrowed" });
    }

    await book.update({
      status: "available",
      borrowedDate: null,
      dueDate: null,
      isOverdue: false,
    });

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new book (admin only)
router.post("/", auth, isAdmin, async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a book (admin only)
router.put("/:id", auth, isAdmin, async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    await book.update(req.body);
    res.json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a book (admin only)
router.delete("/:id", auth, isAdmin, async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    await book.destroy();
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get book statistics
router.get("/stats/all", auth, async (req, res) => {
  try {
    const allBooks = await Book.findAll();
    const updatedBooks = updateOverdueStatus(allBooks);
    const borrowed = updatedBooks.filter((book) => book.status === "borrowed");
    const overdue = borrowed.filter((book) => book.isOverdue);

    const stats = {
      totalBooks: updatedBooks.length,
      available: updatedBooks.filter((book) => book.status === "available")
        .length,
      borrowed: borrowed.length,
      overdue: overdue.length,
      reading: updatedBooks.filter((book) => book.status === "reading").length,
      completed: updatedBooks.filter((book) => book.status === "completed")
        .length,
      wishlist: updatedBooks.filter((book) => book.status === "wishlist")
        .length,
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Helper function to update overdue status
const updateOverdueStatus = (books) => {
  const today = new Date();
  return books.map((book) => {
    if (book.status === "borrowed" && book.dueDate) {
      const dueDate = new Date(book.dueDate);
      return {
        ...book.toJSON(),
        isOverdue: isAfter(today, dueDate),
      };
    }
    return book.toJSON();
  });
};

module.exports = router;
