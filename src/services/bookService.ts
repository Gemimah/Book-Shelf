
import { Book } from "../types/book";
import { addDays, format, isAfter } from "date-fns";

// In a real app, this would be replaced with API calls
let mockBooks: Book[] = [
  {
    id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    coverImg: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
    status: "available",
    description:
      "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
    isbn: "9780525559474",
    genre: "Fiction, Fantasy",
    publisher: "Viking",
    publishedYear: "2020",
    pages: "304",
  },
  {
    id: "2",
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    coverImg: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e",
    status: "available",
    description: "From the Nobel Prize-winning author, a novel about an Artificial Friend who observes the behavior of humans and yearns to be chosen by one.",
    isbn: "9780571364879",
    genre: "Science Fiction",
    publisher: "Faber & Faber",
    publishedYear: "2021",
    pages: "320",
  },
  {
    id: "3",
    title: "Project Hail Mary",
    author: "Andy Weir",
    coverImg: "https://images.unsplash.com/photo-1532012197267-da84d127e765",
    status: "available",
    description: "Ryland Grace is the sole survivor on a desperate mission - and if he fails, humanity and the Earth itself will perish.",
    isbn: "9780593135204",
    genre: "Science Fiction",
    publisher: "Ballantine Books",
    publishedYear: "2021",
    pages: "496",
  },
  {
    id: "4",
    title: "The Song of Achilles",
    author: "Madeline Miller",
    coverImg: "https://images.unsplash.com/photo-1541963463532-d68292c34b19",
    status: "available",
    description: "A retelling of the Trojan War from the perspective of Patroclus, who is exiled to the court of King Peleus where he meets the young Achilles.",
    isbn: "9781408821985",
    genre: "Historical Fiction, Fantasy",
    publisher: "Bloomsbury Publishing",
    publishedYear: "2012",
    pages: "352",
  },
  {
    id: "5",
    title: "A Gentleman in Moscow",
    author: "Amor Towles",
    coverImg: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc",
    status: "available",
    description: "In 1922, Count Alexander Rostov is deemed an unrepentant aristocrat by a Bolshevik tribunal and sentenced to house arrest in the Metropol hotel.",
    isbn: "9780670026197",
    genre: "Historical Fiction",
    publisher: "Viking",
    publishedYear: "2016",
    pages: "462",
  },
  {
    id: "6",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    coverImg: "https://images.unsplash.com/photo-1541963463532-d68292c34b19",
    status: "available",
    description: "A novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it.",
    isbn: "9780061120084",
    genre: "Fiction, Classic",
    publisher: "Harper Perennial",
    publishedYear: "1960",
    pages: "336",
  },
  {
    id: "7",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverImg: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
    status: "available",
    description: "A portrait of the Jazz Age in all of its decadence and excess, Gatsby captured the spirit of the author's generation.",
    isbn: "9780743273565",
    genre: "Fiction, Classic",
    publisher: "Scribner",
    publishedYear: "1925",
    pages: "180",
  },
  {
    id: "8",
    title: "1984",
    author: "George Orwell",
    coverImg: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e",
    status: "available",
    description: "A dystopian novel set in Airstrip One, a province of the superstate Oceania in a world of perpetual war and government surveillance.",
    isbn: "9780451524935",
    genre: "Dystopian, Science Fiction",
    publisher: "Signet Classic",
    publishedYear: "1949",
    pages: "328",
  },
];

// Get all books
export const getAllBooks = (): Book[] => {
  return updateOverdueStatus(mockBooks);
};

// Get a book by ID
export const getBookById = (id: string): Book | undefined => {
  const book = mockBooks.find((book) => book.id === id);
  if (book) {
    return updateOverdueStatus([book])[0];
  }
  return undefined;
};

// Get borrowed books
export const getBorrowedBooks = (): Book[] => {
  return updateOverdueStatus(mockBooks.filter((book) => book.status === "borrowed"));
};

// Borrow a book
export const borrowBook = (id: string): Book | undefined => {
  const bookIndex = mockBooks.findIndex((book) => book.id === id);
  if (bookIndex === -1 || mockBooks[bookIndex].status !== "available") {
    return undefined;
  }
  
  const today = new Date();
  const dueDate = addDays(today, 14); // 2 weeks from now
  
  mockBooks[bookIndex] = {
    ...mockBooks[bookIndex],
    status: "borrowed",
    borrowedDate: format(today, "yyyy-MM-dd"),
    dueDate: format(dueDate, "yyyy-MM-dd"),
    isOverdue: false
  };
  
  return mockBooks[bookIndex];
};

// Return a book
export const returnBook = (id: string): Book | undefined => {
  const bookIndex = mockBooks.findIndex((book) => book.id === id);
  if (bookIndex === -1 || mockBooks[bookIndex].status !== "borrowed") {
    return undefined;
  }
  
  mockBooks[bookIndex] = {
    ...mockBooks[bookIndex],
    status: "available",
    borrowedDate: undefined,
    dueDate: undefined,
    isOverdue: undefined
  };
  
  return mockBooks[bookIndex];
};

// Add a new book
export const addBook = (book: Omit<Book, "id">): Book => {
  const newBook: Book = {
    ...book,
    id: (mockBooks.length + 1).toString(),
    status: book.status || "available"
  };
  
  mockBooks.push(newBook);
  return newBook;
};

// Update overdue status
const updateOverdueStatus = (books: Book[]): Book[] => {
  const today = new Date();
  
  return books.map(book => {
    if (book.status === "borrowed" && book.dueDate) {
      const dueDate = new Date(book.dueDate);
      return {
        ...book,
        isOverdue: isAfter(today, dueDate)
      };
    }
    return book;
  });
};

// Get statistics
export const getBookStatistics = () => {
  const allBooks = updateOverdueStatus(mockBooks);
  const borrowed = allBooks.filter(book => book.status === "borrowed");
  const overdue = borrowed.filter(book => book.isOverdue);
  
  return {
    totalBooks: allBooks.length,
    available: allBooks.filter(book => book.status === "available").length,
    borrowed: borrowed.length,
    overdue: overdue.length,
    reading: allBooks.filter(book => book.status === "reading").length,
    completed: allBooks.filter(book => book.status === "completed").length,
    wishlist: allBooks.filter(book => book.status === "wishlist").length,
  };
};
