
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
  // Adding more books
  {
    id: "9",
    title: "Dune",
    author: "Frank Herbert",
    coverImg: "https://images.unsplash.com/photo-1532012197267-da84d127e765",
    status: "available",
    description: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the "spice" melange.",
    isbn: "9780441172719",
    genre: "Science Fiction",
    publisher: "Ace Books",
    publishedYear: "1965",
    pages: "412",
  },
  {
    id: "10",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    coverImg: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc",
    status: "available",
    description: "Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely traveling any farther than his pantry or cellar. But his contentment is disturbed when the wizard Gandalf and a company of dwarves arrive on his doorstep.",
    isbn: "9780547928227",
    genre: "Fantasy",
    publisher: "Houghton Mifflin Harcourt",
    publishedYear: "1937",
    pages: "310",
  },
  {
    id: "11",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    coverImg: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
    status: "available",
    description: "The story follows the main character, Elizabeth Bennet, as she deals with issues of manners, upbringing, morality, education, and marriage in the society of the landed gentry of the British Regency.",
    isbn: "9780141439518",
    genre: "Classic, Romance",
    publisher: "Penguin Classics",
    publishedYear: "1813",
    pages: "432",
  },
  {
    id: "12",
    title: "The Alchemist",
    author: "Paulo Coelho",
    coverImg: "https://images.unsplash.com/photo-1541963463532-d68292c34b19",
    status: "available",
    description: "The Alchemist follows a young Andalusian shepherd in his journey to the pyramids of Egypt, after having a recurring dream of finding a treasure there.",
    isbn: "9780062315007",
    genre: "Fiction, Fantasy",
    publisher: "HarperOne",
    publishedYear: "1988",
    pages: "208",
  },
  {
    id: "13",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    coverImg: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e",
    status: "available",
    description: "A book that explores the history of the human species from the emergence of Homo sapiens in Africa to the present day.",
    isbn: "9780062316097",
    genre: "Non-fiction, History",
    publisher: "Harper",
    publishedYear: "2014",
    pages: "464",
  },
  {
    id: "14",
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    coverImg: "https://images.unsplash.com/photo-1532012197267-da84d127e765",
    status: "borrowed",
    description: "The Lord of the Rings is an epic high-fantasy novel that tells the story of the One Ring and the quest to destroy it.",
    isbn: "9780618640157",
    genre: "Fantasy",
    publisher: "Houghton Mifflin Harcourt",
    publishedYear: "1954",
    pages: "1178",
    borrowedDate: format(new Date(), "yyyy-MM-dd"),
    dueDate: format(addDays(new Date(), 14), "yyyy-MM-dd")
  },
  {
    id: "15",
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    coverImg: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc",
    status: "available",
    description: "Harry Potter has no idea how famous he is. That's because he's being raised by his miserable aunt and uncle who are terrified Harry will learn that he's really a wizard.",
    isbn: "9780590353427",
    genre: "Fantasy, Young Adult",
    publisher: "Scholastic",
    publishedYear: "1997",
    pages: "309",
  },
  {
    id: "16",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    coverImg: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
    status: "reading",
    description: "The novel details two days in the life of 16-year-old Holden Caulfield after he has been expelled from prep school.",
    isbn: "9780316769488",
    genre: "Fiction, Coming-of-age",
    publisher: "Little, Brown and Company",
    publishedYear: "1951",
    pages: "234",
    progress: 45
  },
  {
    id: "17",
    title: "Brave New World",
    author: "Aldous Huxley",
    coverImg: "https://images.unsplash.com/photo-1541963463532-d68292c34b19",
    status: "available",
    description: "Brave New World is a dystopian novel by English author Aldous Huxley, written in 1931 and published in 1932.",
    isbn: "9780060850524",
    genre: "Science Fiction, Dystopian",
    publisher: "Harper Perennial",
    publishedYear: "1932",
    pages: "288",
  },
  {
    id: "18",
    title: "The Hunger Games",
    author: "Suzanne Collins",
    coverImg: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e",
    status: "completed",
    description: "In a future North America, where the rulers of Panem maintain control through an annual televised survival competition pitting young people against one another.",
    isbn: "9780439023481",
    genre: "Young Adult, Dystopian",
    publisher: "Scholastic Press",
    publishedYear: "2008",
    pages: "374",
  },
  {
    id: "19",
    title: "The Martian",
    author: "Andy Weir",
    coverImg: "https://images.unsplash.com/photo-1532012197267-da84d127e765",
    status: "wishlist",
    description: "When astronaut Mark Watney is stranded on Mars after his crew evacuates without him, he must use his knowledge, wit, and spirit to stay alive and find a way to communicate with Earth.",
    isbn: "9780553418026",
    genre: "Science Fiction",
    publisher: "Crown Publishing Group",
    publishedYear: "2011",
    pages: "369",
  },
  {
    id: "20",
    title: "Gone Girl",
    author: "Gillian Flynn",
    coverImg: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc",
    status: "available",
    description: "On a warm summer morning in North Carthage, Missouri, it is Nick and Amy Dunne's fifth wedding anniversary. Presents are being wrapped and reservations are being made when Nick's clever and beautiful wife disappears.",
    isbn: "9780307588371",
    genre: "Thriller, Mystery",
    publisher: "Crown Publishing Group",
    publishedYear: "2012",
    pages: "432",
  },
  {
    id: "21",
    title: "The Shining",
    author: "Stephen King",
    coverImg: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
    status: "available",
    description: "Jack Torrance's new job at the Overlook Hotel is the perfect chance for a fresh start. But as the harsh winter weather sets in, the idyllic location feels ever more remote... and more sinister.",
    isbn: "9780307743657",
    genre: "Horror",
    publisher: "Anchor",
    publishedYear: "1977",
    pages: "447",
  },
  {
    id: "22",
    title: "The Da Vinci Code",
    author: "Dan Brown",
    coverImg: "https://images.unsplash.com/photo-1541963463532-d68292c34b19",
    status: "borrowed",
    description: "While in Paris, Harvard symbologist Robert Langdon is awakened by a phone call in the dead of the night. The elderly curator of the Louvre has been murdered inside the museum, his body covered in baffling symbols.",
    isbn: "9780307474278",
    genre: "Thriller, Mystery",
    publisher: "Anchor",
    publishedYear: "2003",
    pages: "489",
    borrowedDate: format(addDays(new Date(), -20), "yyyy-MM-dd"),
    dueDate: format(addDays(new Date(), -6), "yyyy-MM-dd")
  },
  {
    id: "23",
    title: "The Girl with the Dragon Tattoo",
    author: "Stieg Larsson",
    coverImg: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e",
    status: "available",
    description: "Mikael Blomkvist, a once-respected financial journalist, watches his professional life rapidly crumble around him. Prospects appear bleak until an unexpected offer to resurrect his name.",
    isbn: "9780307949486",
    genre: "Mystery, Thriller",
    publisher: "Vintage",
    publishedYear: "2005",
    pages: "672",
  },
  {
    id: "24",
    title: "The Road",
    author: "Cormac McCarthy",
    coverImg: "https://images.unsplash.com/photo-1532012197267-da84d127e765",
    status: "available",
    description: "A father and his son walk alone through burned America. Nothing moves in the ravaged landscape save the ash on the wind. It is cold enough to crack stones, and when the snow falls it is gray.",
    isbn: "9780307387899",
    genre: "Post-Apocalyptic",
    publisher: "Vintage",
    publishedYear: "2006",
    pages: "287",
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
    wishlist: allBooks.filter(book => book.status === "wishlist").length
  };
};
