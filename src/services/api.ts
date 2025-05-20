
import { Book } from "../types/book";
import { getAllBooks, getBookById, getBorrowedBooks, borrowBook, returnBook, addBook, getBookStatistics } from "./bookService";

// This file simulates API calls to a backend server
// In a real application, these would be actual HTTP requests

// Simulate network delay
const simulateNetworkDelay = (min: number = 400, max: number = 1200) => {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
};

// Simulate random errors (about 10% of the time)
const simulateRandomError = (errorRate: number = 0.1) => {
  return Math.random() < errorRate;
};

// API endpoints for books
export const api = {
  // Get all books
  getAllBooks: async (): Promise<{ data: Book[] | null; error: string | null }> => {
    try {
      await simulateNetworkDelay();
      
      if (simulateRandomError()) {
        throw new Error("Failed to fetch books. Server error.");
      }
      
      const books = getAllBooks();
      return { data: books, error: null };
    } catch (err) {
      console.error("Error fetching books:", err);
      return { 
        data: null, 
        error: err instanceof Error ? err.message : "An unknown error occurred" 
      };
    }
  },
  
  // Get a book by ID
  getBookById: async (id: string): Promise<{ data: Book | null; error: string | null }> => {
    try {
      await simulateNetworkDelay(300, 800);
      
      if (simulateRandomError()) {
        throw new Error("Failed to fetch book details. Server error.");
      }
      
      const book = getBookById(id);
      
      if (!book) {
        throw new Error("Book not found");
      }
      
      return { data: book, error: null };
    } catch (err) {
      console.error("Error fetching book details:", err);
      return { 
        data: null, 
        error: err instanceof Error ? err.message : "An unknown error occurred" 
      };
    }
  },
  
  // Get borrowed books
  getBorrowedBooks: async (): Promise<{ data: Book[] | null; error: string | null }> => {
    try {
      await simulateNetworkDelay();
      
      if (simulateRandomError()) {
        throw new Error("Failed to fetch borrowed books. Server error.");
      }
      
      const books = getBorrowedBooks();
      return { data: books, error: null };
    } catch (err) {
      console.error("Error fetching borrowed books:", err);
      return { 
        data: null, 
        error: err instanceof Error ? err.message : "An unknown error occurred" 
      };
    }
  },
  
  // Borrow a book
  borrowBook: async (id: string): Promise<{ data: Book | null; error: string | null }> => {
    try {
      await simulateNetworkDelay(500, 1500);
      
      if (simulateRandomError()) {
        throw new Error("Failed to borrow book. The book may not be available.");
      }
      
      const book = borrowBook(id);
      
      if (!book) {
        throw new Error("Book not found or not available for borrowing");
      }
      
      return { data: book, error: null };
    } catch (err) {
      console.error("Error borrowing book:", err);
      return { 
        data: null, 
        error: err instanceof Error ? err.message : "An unknown error occurred" 
      };
    }
  },
  
  // Return a book
  returnBook: async (id: string): Promise<{ data: Book | null; error: string | null }> => {
    try {
      await simulateNetworkDelay(500, 1500);
      
      if (simulateRandomError()) {
        throw new Error("Failed to return book. Please try again later.");
      }
      
      const book = returnBook(id);
      
      if (!book) {
        throw new Error("Book not found or not currently borrowed");
      }
      
      return { data: book, error: null };
    } catch (err) {
      console.error("Error returning book:", err);
      return { 
        data: null, 
        error: err instanceof Error ? err.message : "An unknown error occurred" 
      };
    }
  },
  
  // Add a new book
  addBook: async (bookData: Omit<Book, "id">): Promise<{ data: Book | null; error: string | null }> => {
    try {
      await simulateNetworkDelay(700, 2000);
      
      if (simulateRandomError()) {
        throw new Error("Failed to add book. Server error.");
      }
      
      const newBook = addBook(bookData);
      return { data: newBook, error: null };
    } catch (err) {
      console.error("Error adding book:", err);
      return { 
        data: null, 
        error: err instanceof Error ? err.message : "An unknown error occurred" 
      };
    }
  },
  
  // Get book statistics
  getBookStatistics: async (): Promise<{ 
    data: { 
      totalBooks: number; 
      available: number; 
      borrowed: number; 
      overdue: number;
      reading: number;
      completed: number;
      wishlist: number;
    } | null; 
    error: string | null 
  }> => {
    try {
      await simulateNetworkDelay();
      
      if (simulateRandomError()) {
        throw new Error("Failed to fetch book statistics. Server error.");
      }
      
      const stats = getBookStatistics();
      return { data: stats, error: null };
    } catch (err) {
      console.error("Error fetching book statistics:", err);
      return { 
        data: null, 
        error: err instanceof Error ? err.message : "An unknown error occurred" 
      };
    }
  },
};

// API Documentation
/*
API Documentation

This mock API simulates a real backend service. Here's the structure:

Endpoints:
1. GET /books
   - Returns all books
   - Response: { data: Book[], error: string | null }

2. GET /books/:id
   - Returns a specific book by ID
   - Response: { data: Book, error: string | null }

3. GET /books/borrowed
   - Returns all borrowed books
   - Response: { data: Book[], error: string | null }

4. POST /books/borrow/:id
   - Borrows a book by ID
   - Response: { data: Book, error: string | null }

5. POST /books/return/:id
   - Returns a borrowed book
   - Response: { data: Book, error: string | null }

6. POST /books
   - Adds a new book
   - Request Body: Book (minus id)
   - Response: { data: Book, error: string | null }

7. GET /statistics
   - Returns book statistics
   - Response: { data: { totalBooks, available, borrowed, overdue }, error: string | null }

Error Handling:
- All endpoints return errors in a consistent format: { data: null, error: string }
- Simulated network errors occur randomly (10% of the time)
- All endpoints use async/await patterns

Data Types:
- See the Book interface in src/types/book.ts for the book data structure
*/
