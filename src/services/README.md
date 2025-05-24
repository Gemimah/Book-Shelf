
# Book Management System - Mock API Documentation

This document describes the mock API implementation for the Book Management System.

## Overview

The mock API simulates backend server interactions while running entirely in the frontend. It includes:

- Simulated network delays to mimic real-world latency
- Random error generation (10% failure rate) to test error handling
- Consistent response formats for all endpoints

## API Endpoints

### Books

#### GET /books
- **Description**: Retrieves all books in the library
- **Response**: `{ data: Book[] | null, error: string | null }`
- **Function**: `api.getAllBooks()`

#### GET /books/:id
- **Description**: Retrieves a specific book by ID
- **Response**: `{ data: Book | null, error: string | null }`
- **Function**: `api.getBookById(id: string)`

#### GET /books/borrowed
- **Description**: Retrieves all currently borrowed books
- **Response**: `{ data: Book[] | null, error: string | null }`
- **Function**: `api.getBorrowedBooks()`

#### POST /books/borrow/:id
- **Description**: Borrows a book by ID
- **Response**: `{ data: Book | null, error: string | null }`
- **Function**: `api.borrowBook(id: string)`

#### POST /books/return/:id
- **Description**: Returns a borrowed book
- **Response**: `{ data: Book | null, error: string | null }`
- **Function**: `api.returnBook(id: string)`

#### POST /books
- **Description**: Adds a new book to the library
- **Request Body**: Book data (minus the ID)
- **Response**: `{ data: Book | null, error: string | null }`
- **Function**: `api.addBook(bookData: Omit<Book, "id">)`

### Statistics

#### GET /statistics
- **Description**: Retrieves book statistics
- **Response**: `{ data: { totalBooks, available, borrowed, overdue, reading, completed, wishlist } | null, error: string | null }`
- **Function**: `api.getBookStatistics()`

## Error Handling

All API calls have uniform error handling:

1. Network errors are simulated randomly (10% chance)
2. All errors return a consistent format: `{ data: null, error: string }`
3. Component-level error states display user-friendly error messages
4. Retry mechanisms are implemented in UI components

## Data Types

The main data structure is the Book interface defined in `src/types/book.ts`:

```typescript
export interface Book {
  id: string;
  title: string;
  author: string;
  coverImg: string;
  status: "available" | "borrowed" | "reading" | "completed" | "wishlist";
  progress?: number;
  borrowedDate?: string;
  dueDate?: string;
  isOverdue?: boolean;
  description?: string;
  isbn?: string;
  genre?: string;
  publisher?: string;
  publishedYear?: string;
  pages?: string;
}
```

## Implementation Notes

- All API functions return Promises to simulate asynchronous behavior
- Loading states are managed at the component level
- Error messages are displayed using toast notifications or alert components
- Component-level retry mechanisms allow users to attempt failed operations
